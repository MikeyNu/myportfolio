export function ModernHero() {
  return (
    <section className="portfolio-video-hero" aria-label="Portfolio hero">
      <video
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
    </section>
  );
}
