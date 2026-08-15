import { ArrowRight } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { processSteps, services, pageIndex } from '../data/portfolioContent';
import { RENDERS } from '../data/renderAssets';

interface CreativeServicesPageProps {
  onContact: () => void;
}

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

export function CreativeServicesPage({ onContact }: CreativeServicesPageProps) {
  const reduced = useReducedMotion();

  return (
    <div className="cinematic-page services-page">
      <section className="cinematic-container cinematic-grid services-hero" aria-labelledby="services-title">
        <div className="services-hero-copy">
          <p className="cinematic-kicker">What I do</p>
          <h1 id="services-title" className="cinematic-display services-heading">
            Digital experiences<br />that feel real.
          </h1>
          <p className="cinematic-copy services-lead">
            I design and build software, 3D environments, and VR experiences as one connected practice. The medium changes with the problem, but the goal stays the same: clear systems, deliberate visual direction, and production work that can survive beyond the concept stage.
          </p>
          <button type="button" className="cinematic-outline-action" onClick={onContact}>
            Start a project
            <ArrowRight size={15} aria-hidden="true" />
          </button>
        </div>

        <div className="services-hero-art" aria-hidden="true">
          <img src={RENDERS.services4} alt="" className="theme-img-dark" />
          <img src={RENDERS.services4Light} alt="" className="theme-img-light" />
        </div>

        <p className="services-manifesto">
          Experiences<br />
          designed to connect.<br />
          Built to last.
        </p>
      </section>

      <section className="cinematic-container" aria-label="Services">
        <div className="services-band">
          {services.map((service) => (
            <article key={service.id} className="service-panel">
              {/* Art drifts backward on hover — the surface recedes, revealing depth. */}
              <img className="service-panel-art theme-img-dark" src={service.image} alt="" aria-hidden="true" />
              <img className="service-panel-art theme-img-light" src={service.lightImage} alt="" aria-hidden="true" />
              <div className="service-panel-content">
                <span className="service-panel-index">{service.index}</span>
                <h2 className="service-panel-title">{service.shortTitle}</h2>
                <p className="service-panel-description">{service.description}</p>
              </div>

              <div className="service-panel-footer">
                <p className="service-deliverables-title">Key deliverables</p>
                <ul className="service-deliverables">
                  {service.deliverables.map((deliverable) => (
                    <li key={deliverable}>{deliverable}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/*
        Process steps: 5-column horizontal grid at large screens. All enter the
        viewport at the same moment so we need explicit JS stagger — a scroll-
        timeline approach would fire them all simultaneously.
      */}
      <section className="cinematic-container services-process" aria-labelledby="process-title">
        <div className="services-process-intro">
          <p id="process-title" className="cinematic-kicker">How I work</p>
          <p className="cinematic-copy">
            A focused process that turns ideas, requirements, and source material into purposeful digital and spatial experiences.
          </p>
        </div>

        {processSteps.map((step, i) => (
          <motion.article
            key={step.index}
            className="process-step"
            initial={reduced ? false : { y: 8, opacity: 0.4 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: i * 0.07, ease: EASE }}
            viewport={{ once: true, margin: '-5%' }}
          >
            <span className="process-step-index">{step.index}</span>
            <h2 className="process-step-title">{step.title}</h2>
            <p className="process-step-description">{step.description}</p>
          </motion.article>
        ))}
      </section>

      <div className="cinematic-container work-page-footer">
        <span className="cinematic-page-index">{pageIndex.services}</span>
        <span className="cinematic-scroll-cue">Scroll to explore</span>
      </div>
    </div>
  );
}
