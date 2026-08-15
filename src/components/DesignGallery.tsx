import { useState } from 'react';
import { ArrowRight, ArrowLeft, X } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';

/* ── Data ──────────────────────────────────────────────────────────────────
 * Add future designs here. Set `url` to the live URL once available.
 * Leave `url` as null to show the "Not Available" overlay instead. */
interface Design {
  id: string;
  title: string;
  image: string | null;
  url: string | null;
}

const DESIGNS: Design[] = [
  { id: 'aurelia',   title: 'Aurelia',   image: '/designs/AURELIA.png',   url: null },
  { id: 'luna',      title: 'Luna',      image: '/designs/LUNA.png',      url: null },
  { id: 'solstice',  title: 'Solstice',  image: '/designs/SOLSTICE.png',  url: null },
  { id: 'stillform', title: 'Stillform', image: '/designs/STILLFORM.png', url: null },
  { id: 'vorax',     title: 'Vorax',     image: '/designs/VORAX.png',     url: null },
  /* ── Coming soon ── */
  { id: 'tbd-1', title: 'Coming Soon', image: null, url: null },
  { id: 'tbd-2', title: 'Coming Soon', image: null, url: null },
  { id: 'tbd-3', title: 'Coming Soon', image: null, url: null },
  { id: 'tbd-4', title: 'Coming Soon', image: null, url: null },
  { id: 'tbd-5', title: 'Coming Soon', image: null, url: null },
];

/* ── Animation helpers ─────────────────────────────────────────────────────
 * Each card begins in a displaced "drawer" state — slightly rotated and
 * offset as if stacked physically — then springs into its grid position
 * with staggered timing.  The stagger and trajectory differ per card so
 * they read as individual physical objects, not a synchronised effect. */

/** Pre-computed offsets so values are stable between renders */
const OFFSETS = DESIGNS.map((_, i) => ({
  /* Y: deeper cards start further below */
  y: 90 + (i % 5) * 22,
  /* X: alternating lean — like folder tabs at different positions */
  x: ((i % 3) - 1) * 28,
  /* Rotation: each card has a slightly different tilt */
  rotate: ((i % 5) - 2) * 2.8,
  /* Stagger delay (ms) — each card arrives a beat after the previous */
  delay: i * 90,
}));

const SPRING = { type: 'spring', damping: 22, stiffness: 180 } as const;
const EASE   = [0.25, 0.46, 0.45, 0.94] as const;

/* ── Not Found overlay ──────────────────────────────────────────────────── */

function DesignNotFound({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      className="design-not-found"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      transition={{ duration: 0.35, ease: EASE }}
      role="dialog"
      aria-modal="true"
      aria-label="Design not available"
    >
      <button
        type="button"
        style={{
          position: 'absolute',
          top: 28,
          right: 28,
          background: 'transparent',
          border: 'none',
          color: 'var(--foreground)',
          cursor: 'pointer',
          opacity: 0.5,
          padding: 8,
        }}
        onClick={onClose}
        aria-label="Close"
      >
        <X size={18} aria-hidden="true" />
      </button>

      <p className="design-not-found-code" aria-hidden="true">404</p>

      <div className="design-not-found-body">
        <h2 className="design-not-found-title">
          Page not<br />available yet.
        </h2>
        <p className="design-not-found-copy">
          This design is complete but its live URL hasn't been published yet. Check back soon.
        </p>
        <button
          type="button"
          className="design-not-found-back"
          onClick={onClose}
        >
          <ArrowLeft size={13} aria-hidden="true" />
          Back to gallery
        </button>
      </div>
    </motion.div>
  );
}

/* ── Card ────────────────────────────────────────────────────────────────── */

interface DesignCardProps {
  design: Design;
  index: number;
  inView: boolean;
  reduced: boolean;
  onView: (design: Design) => void;
}

function DesignCard({ design, index, inView, reduced, onView }: DesignCardProps) {
  const off = OFFSETS[index];
  const isReal = design.image !== null;

  return (
    <motion.article
      className="design-card"
      initial={reduced ? false : {
        y: off.y,
        x: off.x,
        rotate: off.rotate,
        scale: 0.87,
        opacity: 0,
      }}
      animate={inView ? {
        y: 0,
        x: 0,
        rotate: 0,
        scale: 1,
        opacity: 1,
      } : undefined}
      transition={reduced ? {} : {
        ...SPRING,
        delay: off.delay / 1000,
        opacity: { duration: 0.4, ease: EASE, delay: off.delay / 1000 },
      }}
    >
      {/* Image frame */}
      <div className="design-card-frame">
        {isReal ? (
          <>
            {/* CSS background-image: prevents right-click "Save Image As" */}
            <div
              className="design-card-image"
              style={{ backgroundImage: `url(${design.image})` }}
              aria-hidden="true"
            />
            {/* Transparent shield: intercepts the context menu event */}
            <div
              className="design-card-shield"
              onContextMenu={(e) => e.preventDefault()}
              onDragStart={(e) => e.preventDefault()}
              aria-hidden="true"
            />
          </>
        ) : (
          <div className="design-card-placeholder" aria-hidden="true">
            <div className="design-card-placeholder-line" />
            <span className="design-card-placeholder-label">Coming soon</span>
            <div className="design-card-placeholder-line" />
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="design-card-footer">
        <h3 className="design-card-title">{design.title}</h3>

        {isReal ? (
          <button
            type="button"
            className="design-card-action"
            onClick={() => onView(design)}
            aria-label={`View ${design.title} design`}
          >
            View
            <ArrowRight size={11} aria-hidden="true" />
          </button>
        ) : (
          <span className="design-card-unavailable" aria-label="Not yet available">—</span>
        )}
      </div>
    </motion.article>
  );
}

/* ── Gallery section ─────────────────────────────────────────────────────── */

export function DesignGallery() {
  const [notFound, setNotFound] = useState(false);
  const [inView, setInView] = useState(false);
  const reduced = useReducedMotion();

  const handleView = (design: Design) => {
    if (design.url) {
      window.open(design.url, '_blank', 'noopener,noreferrer');
    } else {
      setNotFound(true);
    }
  };

  return (
    <>
      <section className="design-gallery" aria-labelledby="gallery-title">
        <div className="cinematic-container">
          {/* Section header */}
          <motion.header
            className="design-gallery-header"
            initial={reduced ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <p className="cinematic-kicker">UI Design / Interface Work</p>
            <h2 id="gallery-title" className="design-gallery-title">
              Design<br />portfolio.
            </h2>
            <p className="design-gallery-lead">
              A selection of interface and experience designs spanning web applications,
              consumer products, and branded digital environments.
            </p>
          </motion.header>

          {/* Grid — use IntersectionObserver to trigger the card animations */}
          <motion.div
            className="design-gallery-grid"
            onViewportEnter={() => setInView(true)}
            viewport={{ once: true, margin: '-5%' }}
          >
            {DESIGNS.map((design, i) => (
              <DesignCard
                key={design.id}
                design={design}
                index={i}
                inView={inView}
                reduced={!!reduced}
                onView={handleView}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Not Found overlay — rendered outside the section so it covers everything */}
      {notFound && (
        <DesignNotFound onClose={() => setNotFound(false)} />
      )}
    </>
  );
}
