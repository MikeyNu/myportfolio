import { useEffect, useRef } from 'react';

/* ─── Simulation constants ─────────────────────────────────────────────────── */
const FIELD_SIZE = 256;      // ping-pong RT resolution
const BRUSH_RADIUS = 0.14;   // Gaussian spread in UV space (0-1)
const SMEAR_STRENGTH = 0.18; // UV displacement applied to text texture
const SMEAR_TAPS = 8;        // streak samples in the display pass
const REMAIN_PER_SECOND = 0.04; // what fraction of velocity survives 1 s
const FLOOR_PER_FRAME = 0.003;  // absolute floor subtracted each frame
const DRAG_SCALE = 2.0;         // cursor px/s → velocity units
const MAX_VELOCITY = 0.85;
const IDLE_GRACE_MS = 2800; // stop rAF this long after last motion
const MAX_DT = 1 / 30;

/* ─── WebGL2 shaders ───────────────────────────────────────────────────────── */
const QUAD_VERT = `#version 300 es
in vec2 aPos;
out vec2 vUv;
void main() {
  vUv = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}`;

/* Gaussian diffuse → decay → cursor inject */
const FIELD_FRAG = `#version 300 es
precision highp float;
in vec2 vUv;
out vec4 fragColor;
uniform sampler2D uField;
uniform vec2 uTexel;
uniform vec2 uPointer;   // [0,1]² UV
uniform vec2 uDrag;      // velocity to inject
uniform float uAspect;   // cssWidth / cssHeight
uniform float uRadius;
uniform float uDecay;    // pow(remain, dt)
uniform float uFloor;    // absolute threshold

vec2 load(vec2 uv) {
  return texture(uField, uv).xy * 2.0 - 1.0;
}

void main() {
  /* 3×3 Gaussian diffuse (spreads paint outward each frame) */
  vec2 f = vec2(0.0);
  f += load(vUv + uTexel * vec2(-1.0,-1.0)) * 0.0625;
  f += load(vUv + uTexel * vec2( 0.0,-1.0)) * 0.125;
  f += load(vUv + uTexel * vec2( 1.0,-1.0)) * 0.0625;
  f += load(vUv + uTexel * vec2(-1.0, 0.0)) * 0.125;
  f += load(vUv)                             * 0.25;
  f += load(vUv + uTexel * vec2( 1.0, 0.0)) * 0.125;
  f += load(vUv + uTexel * vec2(-1.0, 1.0)) * 0.0625;
  f += load(vUv + uTexel * vec2( 0.0, 1.0)) * 0.125;
  f += load(vUv + uTexel * vec2( 1.0, 1.0)) * 0.0625;

  /* dt-based exponential decay */
  f *= uDecay;

  /* Hard floor so the field always reaches exactly 0 */
  float m = length(f);
  if (m > 0.0) f *= max(0.0, m - uFloor) / m;

  /* Cursor injection: Gaussian stamp in the drag direction */
  vec2 d = (vUv - uPointer) * vec2(uAspect, 1.0);
  f += uDrag * exp(-dot(d, d) / (uRadius * uRadius));

  /* Poison guard: a single NaN in a ping-pong RT is permanent */
  if (!(f.x == f.x)) f.x = 0.0;
  if (!(f.y == f.y)) f.y = 0.0;
  f = clamp(f, vec2(-1.0), vec2(1.0));

  /* Encode [-1,1] → [0,1] so RGBA8 fallback targets work */
  fragColor = vec4(f * 0.5 + 0.5, 0.0, 1.0);
}`;

/* Multi-tap streak: sample back along the displacement for a smear trail */
const DISPLAY_FRAG = `#version 300 es
precision highp float;
in vec2 vUv;
out vec4 fragColor;
uniform sampler2D uText;
uniform sampler2D uField;
uniform vec3 uColor;
uniform float uStrength;
const int TAPS = ${SMEAR_TAPS};

void main() {
  vec2 disp = (texture(uField, vUv).xy * 2.0 - 1.0) * uStrength;
  float a = 0.0;
  for (int i = 0; i < TAPS; i++) {
    float t = float(i) / float(TAPS - 1);
    vec2 uv = vUv - disp * t;
    a += texture(uText, uv).a;
  }
  fragColor = vec4(uColor, a / float(TAPS));
}`;

/* ─── GL helpers ────────────────────────────────────────────────────────────── */
function glShader(gl: WebGL2RenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    console.error('[HeroPaintText] shader compile:', gl.getShaderInfoLog(s));
    gl.deleteShader(s);
    return null;
  }
  return s;
}

function glProgram(gl: WebGL2RenderingContext, vert: string, frag: string) {
  const vs = glShader(gl, gl.VERTEX_SHADER, vert);
  const fs = glShader(gl, gl.FRAGMENT_SHADER, frag);
  if (!vs || !fs) return null;
  const p = gl.createProgram()!;
  gl.attachShader(p, vs);
  gl.attachShader(p, fs);
  gl.bindAttribLocation(p, 0, 'aPos');
  gl.linkProgram(p);
  gl.deleteShader(vs);
  gl.deleteShader(fs);
  if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
    console.error('[HeroPaintText] program link:', gl.getProgramInfoLog(p));
    gl.deleteProgram(p);
    return null;
  }
  return p;
}

function makeRT(gl: WebGL2RenderingContext, size: number, halfFloat: boolean) {
  const tex = gl.createTexture()!;
  gl.bindTexture(gl.TEXTURE_2D, tex);
  const fmt = halfFloat ? gl.RGBA16F : gl.RGBA8;
  const type = halfFloat ? gl.HALF_FLOAT : gl.UNSIGNED_BYTE;
  gl.texImage2D(gl.TEXTURE_2D, 0, fmt, size, size, 0, gl.RGBA, type, null);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  const fbo = gl.createFramebuffer()!;
  gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
  /* Encoded zero = 0.5 in both channels */
  gl.clearColor(0.5, 0.5, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);
  return { tex, fbo };
}

/* ─── Component ─────────────────────────────────────────────────────────────── */
interface HeroPaintTextProps {
  text: string;
  className?: string;
  id?: string;
}

export function HeroPaintText({ text, className, id }: HeroPaintTextProps) {
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const h1 = h1Ref.current;
    const canvas = canvasRef.current;
    if (!h1 || !canvas) return;

    /* Only skip the effect when the user has explicitly requested less motion.
     * The previous (pointer: fine) and (min-width: 901px) guards blocked touch
     * and mobile entirely — removed so swipe on the hero title works on touch. */
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

    let disposed = false;
    let cleanup: (() => void) | null = null;

    const start = () => {
      if (disposed || cleanup) return;
      if (reduced.matches) return;

      /* ── WebGL2 context ── */
      const gl = canvas.getContext('webgl2', {
        alpha: true,
        premultipliedAlpha: false,
        antialias: false,
        depth: false,
        stencil: false,
        preserveDrawingBuffer: false,
        powerPreference: 'low-power',
      });
      if (!gl) return; /* graceful: plain h1 stays visible */

      const fieldProg = glProgram(gl, QUAD_VERT, FIELD_FRAG);
      const dispProg = glProgram(gl, QUAD_VERT, DISPLAY_FRAG);
      if (!fieldProg || !dispProg) return;

      const halfFloat =
        !!gl.getExtension('EXT_color_buffer_half_float') ||
        !!gl.getExtension('EXT_color_buffer_float');

      /* Full-screen triangle (one draw call per pass) */
      const vao = gl.createVertexArray()!;
      const vbo = gl.createBuffer()!;
      gl.bindVertexArray(vao);
      gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
      gl.enableVertexAttribArray(0);
      gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
      gl.bindVertexArray(null);

      /* Ping-pong field render targets */
      let rts = [makeRT(gl, FIELD_SIZE, halfFloat), makeRT(gl, FIELD_SIZE, halfFloat)];
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);

      /* Text alpha texture (uploaded once per rasterize call) */
      const textTex = gl.createTexture()!;
      gl.bindTexture(gl.TEXTURE_2D, textTex);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

      /* Uniform locations */
      const uF = {
        field:   gl.getUniformLocation(fieldProg, 'uField')!,
        texel:   gl.getUniformLocation(fieldProg, 'uTexel')!,
        pointer: gl.getUniformLocation(fieldProg, 'uPointer')!,
        drag:    gl.getUniformLocation(fieldProg, 'uDrag')!,
        aspect:  gl.getUniformLocation(fieldProg, 'uAspect')!,
        radius:  gl.getUniformLocation(fieldProg, 'uRadius')!,
        decay:   gl.getUniformLocation(fieldProg, 'uDecay')!,
        floor:   gl.getUniformLocation(fieldProg, 'uFloor')!,
      };
      const uD = {
        text:     gl.getUniformLocation(dispProg, 'uText')!,
        field:    gl.getUniformLocation(dispProg, 'uField')!,
        color:    gl.getUniformLocation(dispProg, 'uColor')!,
        strength: gl.getUniformLocation(dispProg, 'uStrength')!,
      };

      /* Offscreen 2-D rasterizer */
      const raster = document.createElement('canvas');
      const rctx = raster.getContext('2d')!;

      /* State shared between rasterize / onPointerMove / draw */
      let natW = 1;   // h1.offsetWidth  (natural / pre-CSS-scale px)
      let natH = 1;   // h1.offsetHeight
      let color: [number, number, number] = [1, 1, 1];
      let uvX = 0.5;  // current pointer UV
      let uvY = 0.5;
      let pendingDx = 0; // accumulated drag delta since last draw()
      let pendingDy = 0;
      let prevX = 0;
      let prevY = 0;
      let hasPrev = false;
      let lastMotion = 0;
      let lastTs = 0;
      let rafId = 0;
      let loopRunning = false;
      let ready = false;

      /* ── Read foreground colour from the CSS custom property ──
       * Cannot use getComputedStyle(h1).color because once data-paint='on'
       * is set the h1 has color:transparent, giving rgba(0,0,0,0). */
      const readColor = () => {
        const pageRoot = h1.closest('[data-page]') ?? document.documentElement;
        const fg = getComputedStyle(pageRoot).getPropertyValue('--foreground').trim();
        if (fg.startsWith('#') && fg.length >= 7) {
          color = [
            parseInt(fg.slice(1, 3), 16) / 255,
            parseInt(fg.slice(3, 5), 16) / 255,
            parseInt(fg.slice(5, 7), 16) / 255,
          ];
        }
      };

      /* ── Rasterize the heading into the text texture ── */
      const rasterize = () => {
        if (!rctx) return;

        const style = getComputedStyle(h1);

        /* Use NATURAL (pre-scale) dimensions so glyphs aren't clipped */
        natW = h1.offsetWidth  || 1;
        natH = h1.offsetHeight || 1;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);

        raster.width  = Math.max(1, Math.round(natW * dpr));
        raster.height = Math.max(1, Math.round(natH * dpr));

        const fontSize   = parseFloat(style.fontSize)   || 16;
        const fontFamily = style.fontFamily;
        const fontWeight = style.fontWeight;
        const fontStyle  = style.fontStyle;
        const spacing    = parseFloat(style.letterSpacing) || 0;
        const content    = style.textTransform === 'uppercase' ? text.toUpperCase() : text;

        rctx.clearRect(0, 0, raster.width, raster.height);
        rctx.setTransform(dpr, 0, 0, dpr, 0, 0); /* only DPR — no CSS scale */
        rctx.font = `${fontStyle} ${fontWeight} ${fontSize}px ${fontFamily}`;
        rctx.textBaseline = 'alphabetic';
        rctx.textAlign = 'left';
        rctx.fillStyle = '#fff';

        /* Use actualBoundingBox for placement so we don't overshoot the
         * natural height.  fontBoundingBox covers every glyph in the font
         * (including descenders we don't have here) and is ~40% taller. */
        const metrics = rctx.measureText(content);
        const ascent  = metrics.actualBoundingBoxAscent  || fontSize * 0.75;
        const descent = metrics.actualBoundingBoxDescent || fontSize * 0.1;
        /* Centre within the natural line-height */
        const lineH   = parseFloat(style.lineHeight) || fontSize;
        const baseline = Math.round((lineH - (ascent + descent)) / 2 + ascent);

        if (spacing) {
          let cx = 0;
          for (const ch of content) {
            rctx.fillText(ch, cx, baseline);
            cx += rctx.measureText(ch).width + spacing;
          }
        } else {
          rctx.fillText(content, 0, baseline);
        }

        /* WebGL canvas: same natural backing size */
        canvas.width  = raster.width;
        canvas.height = raster.height;

        /* Position the canvas at the h1's natural layout location and give it
         * the SAME CSS transform so the browser scales it identically. */
        canvas.style.width           = `${natW}px`;
        canvas.style.height          = `${natH}px`;
        canvas.style.left            = `${h1.offsetLeft}px`;
        canvas.style.top             = `${h1.offsetTop}px`;
        canvas.style.transform       = style.transform;
        canvas.style.transformOrigin = style.transformOrigin;

        gl.bindTexture(gl.TEXTURE_2D, textTex);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, raster);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);

        readColor();
        ready = true;
        h1.dataset.paint = 'on';
        kickLoop();
      };

      /* ── Draw one frame ── */
      const draw = (dt: number) => {
        /* Consume accumulated drag */
        let dx = pendingDx;
        let dy = pendingDy;
        pendingDx = 0;
        pendingDy = 0;

        /* Natural-space delta → velocity UV units */
        let vx = (dx / natW) * DRAG_SCALE;
        let vy = (-dy / natH) * DRAG_SCALE; /* flip Y: canvas Y down, UV Y up */
        const vm = Math.hypot(vx, vy);
        if (vm > MAX_VELOCITY) { vx = vx / vm * MAX_VELOCITY; vy = vy / vm * MAX_VELOCITY; }

        gl.bindVertexArray(vao);
        gl.disable(gl.BLEND);

        /* Pass 1: update displacement field */
        gl.useProgram(fieldProg);
        gl.bindFramebuffer(gl.FRAMEBUFFER, rts[1].fbo);
        gl.viewport(0, 0, FIELD_SIZE, FIELD_SIZE);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, rts[0].tex);
        gl.uniform1i(uF.field, 0);
        gl.uniform2f(uF.texel, 1 / FIELD_SIZE, 1 / FIELD_SIZE);
        gl.uniform2f(uF.pointer, uvX, uvY);
        gl.uniform2f(uF.drag, vx, vy);
        gl.uniform1f(uF.aspect, natW / Math.max(1, natH));
        gl.uniform1f(uF.radius, BRUSH_RADIUS);
        gl.uniform1f(uF.decay, Math.pow(REMAIN_PER_SECOND, dt));
        gl.uniform1f(uF.floor, FLOOR_PER_FRAME);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
        rts = [rts[1], rts[0]]; /* swap */

        /* Pass 2: display — streak-sample the text texture */
        gl.useProgram(dispProg);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, textTex);
        gl.uniform1i(uD.text, 0);
        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, rts[0].tex);
        gl.uniform1i(uD.field, 1);
        gl.uniform3f(uD.color, color[0], color[1], color[2]);
        gl.uniform1f(uD.strength, SMEAR_STRENGTH);
        gl.drawArrays(gl.TRIANGLES, 0, 3);

        gl.bindVertexArray(null);
      };

      /* ── rAF loop ── */
      const frame = (ts: number) => {
        if (disposed) return;
        const dt = Math.min(MAX_DT, Math.max(0, (ts - lastTs) / 1000)) || 1 / 60;
        lastTs = ts;
        draw(dt);
        if (ts - lastMotion > IDLE_GRACE_MS) {
          loopRunning = false;
          rafId = 0;
          return;
        }
        rafId = requestAnimationFrame(frame);
      };

      const kickLoop = () => {
        if (disposed || !ready || document.hidden) return;
        lastMotion = performance.now();
        if (loopRunning) return;
        loopRunning = true;
        lastTs = performance.now();
        rafId = requestAnimationFrame(frame);
      };

      /* ── Pointer tracking ── */
      const onMove = (e: PointerEvent) => {
        if (!ready) return;

        /* The canvas has the same CSS transform as h1.
         * getBoundingClientRect gives the VISUAL (post-scale) rect.
         * Unmap to natural space by dividing by the CSS scale ratio. */
        const vr = canvas.getBoundingClientRect();
        const sx = vr.width  / Math.max(1, natW);
        const sy = vr.height / Math.max(1, natH);
        const nx = (e.clientX - vr.left)  / sx; /* natural-space X */
        const ny = (e.clientY - vr.top)   / sy; /* natural-space Y */

        if (hasPrev) {
          pendingDx += nx - prevX;
          pendingDy += ny - prevY;
        }
        prevX = nx;
        prevY = ny;
        hasPrev = true;

        uvX = nx / Math.max(1, natW);
        uvY = 1 - ny / Math.max(1, natH); /* flip Y for UV */
        uvX = Math.max(0, Math.min(1, uvX));
        uvY = Math.max(0, Math.min(1, uvY));

        kickLoop();
      };

      const onLeave = () => { hasPrev = false; };

      const onVisibility = () => {
        if (document.hidden) {
          cancelAnimationFrame(rafId);
          rafId = 0;
          loopRunning = false;
        } else {
          lastTs = performance.now();
          kickLoop();
        }
      };

      const onContextLost = (e: Event) => {
        e.preventDefault();
        cancelAnimationFrame(rafId);
        rafId = 0;
        loopRunning = false;
        ready = false;
        delete h1.dataset.paint;
      };

      /* Listen on the whole hero section so the cursor is tracked across
       * the full hero, not just the small .hero-reference-copy box. */
      const surface: EventTarget =
        h1.closest('.portfolio-video-hero') ?? document.documentElement;
      surface.addEventListener('pointermove', onMove as EventListener, { passive: true });
      surface.addEventListener('pointerleave', onLeave as EventListener, { passive: true });
      document.addEventListener('visibilitychange', onVisibility);
      canvas.addEventListener('webglcontextlost', onContextLost);

      /* Rasterize on resize */
      let resizeTimer = 0;
      const ro = new ResizeObserver(() => {
        clearTimeout(resizeTimer);
        resizeTimer = window.setTimeout(rasterize, 150);
      });
      ro.observe(h1);

      /* Re-read colour on theme toggle. One rAF delay lets CSS custom
       * properties resolve before we sample --foreground. */
      const root = h1.closest('[data-page]');
      const mo = new MutationObserver(() => {
        requestAnimationFrame(() => { readColor(); kickLoop(); });
      });
      if (root) mo.observe(root, { attributes: true, attributeFilter: ['class'] });

      /* Start after fonts are ready */
      let fontsCancelled = false;
      document.fonts.ready.then(() => {
        if (!fontsCancelled && !disposed) rasterize();
      });

      cleanup = () => {
        fontsCancelled = true;
        cancelAnimationFrame(rafId);
        clearTimeout(resizeTimer);
        surface.removeEventListener('pointermove', onMove as EventListener);
        surface.removeEventListener('pointerleave', onLeave as EventListener);
        document.removeEventListener('visibilitychange', onVisibility);
        canvas.removeEventListener('webglcontextlost', onContextLost);
        ro.disconnect();
        mo.disconnect();
        gl.deleteProgram(fieldProg);
        gl.deleteProgram(dispProg);
        gl.deleteTexture(textTex);
        rts.forEach((rt) => { gl.deleteTexture(rt.tex); gl.deleteFramebuffer(rt.fbo); });
        gl.deleteBuffer(vbo);
        gl.deleteVertexArray(vao);
        /* NOT calling WEBGL_lose_context — StrictMode double-mount re-uses the
         * same canvas element and getContext() would return the lost context. */
        delete h1.dataset.paint;
        ready = false;
        loopRunning = false;
        canvas.style.transform = '';
      };
    };

    const stop = () => { cleanup?.(); cleanup = null; };

    const evaluate = () => {
      if (!reduced.matches) start();
      else stop();
    };

    evaluate();
    reduced.addEventListener('change', evaluate);

    return () => {
      disposed = true;
      reduced.removeEventListener('change', evaluate);
      stop();
    };
  }, [text]);

  return (
    <>
      <h1 ref={h1Ref} id={id} className={className}>
        {text}
      </h1>
      <canvas ref={canvasRef} className="hero-paint-canvas" aria-hidden="true" />
    </>
  );
}
