import { useRef } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { capabilities, pageIndex, processSteps, services } from '../data/portfolioContent';
import { RENDERS } from '../data/renderAssets';
import { useParallax } from '../hooks/useParallax';

/* Ease curve: smooth deceleration, matches the site's cinematic pacing. */
const EASE = [0.25, 0.46, 0.45, 0.94] as const;

export function CreativeAboutPage() {
  const heroRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  /* Portrait is a presence — heavier, it lags behind scroll slightly.
   * Discipline rail is a label system — lighter, it drifts ahead slightly.
   * Both effects are applied to wrappers so CSS positioning is untouched. */
  const artY  = useParallax(heroRef, reduced ? [0, 0] : [24, -24]);
  const railY = useParallax(heroRef, reduced ? [0, 0] : [-10, 10]);

  /* Stagger variants for band sections (side-by-side at desktop) */
  const bandContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };
  const bandItem = reduced
    ? {}
    : {
        hidden: { opacity: 0.35 },
        visible: { opacity: 1, transition: { duration: 0.55, ease: EASE } },
      };

  /* Quote: two lines land sequentially — claim first, then consequence. */
  const quoteContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.14 } },
  };
  const quoteLine = reduced
    ? {}
    : {
        hidden: { y: 6, opacity: 0.3 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: EASE } },
      };

  return (
    <div className="cinematic-page about-page">
      <section
        ref={heroRef}
        className="cinematic-container cinematic-grid about-hero"
        aria-labelledby="about-title"
      >
        <div className="about-copy">
          <p className="cinematic-kicker">About / Approach</p>
          <h1 id="about-title" className="cinematic-display about-heading">
            Design as<br />experience engineering.
          </h1>
          <p className="cinematic-copy about-lead">
            I design digital and spatial experiences where software, 3D production, and immersive technology align to make complex work clear, useful, and memorable.
          </p>

          <div className="about-identity">
            <div className="about-identity-block">
              <p className="cinematic-meta">Designer & Developer</p>
              <p className="about-identity-name">Michael Ndhlovu</p>
            </div>
            <div className="about-identity-block">
              <p className="cinematic-meta">Creative Practice</p>
              <p className="about-identity-name">Mikey Nu</p>
            </div>
          </div>
        </div>

        {/* Portrait: scroll at 0.85× page speed — heavier, more present. */}
        <div className="about-art" aria-hidden="true">
          <motion.div className="about-art-parallax" style={{ y: artY }}>
            <img src={RENDERS.approach1} alt="" className="theme-img-dark" />
            <img src={RENDERS.approach1Light} alt="" className="theme-img-light" />
          </motion.div>
        </div>

        {/* Discipline rail: scroll at 1.06× speed — lighter, recedes into background. */}
        <div className="about-service-rail" aria-label="Primary disciplines">
          <motion.div style={{ y: railY }}>
            {services.map((service) => (
              <span key={service.id}>{service.title}</span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Lower band: three sections fade up sequentially on scroll entry. */}
      <motion.section
        className="cinematic-container about-lower-band"
        aria-label="Approach details"
        variants={bandContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-8%' }}
      >
        <motion.article className="about-band-section" variants={bandItem}>
          <p className="cinematic-meta">Philosophy</p>
          <h2 className="about-philosophy-title">Build with intention.<br />Design for perception.</h2>
          <p className="about-philosophy-copy">
            Structure, interaction, imagery, and technology. All serving one purpose. Not filling space.
          </p>
        </motion.article>

        <motion.article className="about-band-section" variants={bandItem}>
          <p className="cinematic-meta">Capabilities</p>
          <div className="about-capabilities">
            {capabilities.map((capability) => (
              <div key={capability.index}>
                <img src={capability.icon} alt="" aria-hidden="true" className="about-capability-icon" />
                <span className="about-capability-index">{capability.index}</span>
                <h2 className="about-capability-title">{capability.title}</h2>
                <p className="about-capability-copy">{capability.description}</p>
              </div>
            ))}
          </div>
        </motion.article>

        <motion.article className="about-band-section" variants={bandItem}>
          <p className="cinematic-meta">Process</p>
          <div className="about-process">
            {processSteps.map((step, i) => (
              <motion.div
                key={step.index}
                className="process-step"
                initial={reduced ? false : { y: 7, opacity: 0.4 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: i * 0.06, ease: EASE }}
                viewport={{ once: true, margin: '-5%' }}
              >
                <span className="process-step-index">{step.index}</span>
                <h2 className="process-step-title">{step.title}</h2>
                <p className="process-step-description">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.article>
      </motion.section>

      {/* Quote: two lines land in sequence — first the claim, then the consequence. */}
      <motion.div
        className="about-quote"
        aria-label="Design philosophy statement"
        variants={quoteContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-10%' }}
      >
        <span>
          <motion.span className="about-quote-line" variants={quoteLine}>
            We do not just design interfaces.
          </motion.span>
          <br />
          <motion.span className="about-quote-line" variants={quoteLine}>
            We design how they are felt.
          </motion.span>
        </span>
      </motion.div>

      <div className="cinematic-container about-page-footer">
        <span className="cinematic-page-index">{pageIndex.about.replace('/ ', '')}</span>
        <span className="cinematic-scroll-cue">Scroll to explore</span>
      </div>
    </div>
  );
}
