import { ArrowRight } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { HeroPaintText } from './HeroPaintText';
import { getPagePath } from '../seo/siteSeo';

interface ModernHeroProps {
  onViewWork: () => void;
}

const SYNC_THRESHOLD = 0.08;
const SYNC_INTERVAL = 3000;

export function ModernHero({ onViewWork }: ModernHeroProps) {
  const lightRef = useRef<HTMLVideoElement>(null);
  const darkRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const light = lightRef.current;
    const dark = darkRef.current;
    if (!light || !dark) return;

    const syncNow = () => {
      if (dark.readyState >= 2 && light.readyState >= 2) {
        const diff = Math.abs(dark.currentTime - light.currentTime);
        if (diff > SYNC_THRESHOLD) dark.currentTime = light.currentTime;
      }
    };

    dark.addEventListener('canplay', syncNow, { once: true });
    const interval = setInterval(syncNow, SYNC_INTERVAL);

    const onLoop = () => {
      if (dark.readyState >= 2) dark.currentTime = light.currentTime;
    };
    light.addEventListener('seeked', onLoop);

    return () => {
      clearInterval(interval);
      dark.removeEventListener('canplay', syncNow);
      light.removeEventListener('seeked', onLoop);
    };
  }, []);

  return (
    <section className="portfolio-video-hero" aria-label="Portfolio hero">
      <video
        ref={lightRef}
        className="portfolio-hero-video portfolio-hero-video-light"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
      >
        <source src="/renders/bg_video_lightmode.mp4" type="video/mp4" />
      </video>

      <video
        ref={darkRef}
        className="portfolio-hero-video portfolio-hero-video-dark"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
      >
        <source src="/renders/bg_video_darkmode.mp4" type="video/mp4" />
      </video>

      <div className="hero-reference-overlay cinematic-container">
        <div className="hero-reference-copy">
          <p className="cinematic-kicker">Software / 3D Design / VR</p>
          <HeroPaintText text="Mikey Nu" className="cinematic-display hero-reference-title" />
          <a
            className="cinematic-outline-action hero-reference-action"
            href={getPagePath('projects')}
            onClick={(event) => {
              if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
              event.preventDefault();
              onViewWork();
            }}
          >
            View selected work
            <ArrowRight size={15} aria-hidden="true" />
          </a>
        </div>

        <span className="cinematic-page-index hero-page-index">01 - Intro</span>
        <span className="cinematic-scroll-cue hero-scroll-cue">Scroll to explore</span>
      </div>
    </section>
  );
}
