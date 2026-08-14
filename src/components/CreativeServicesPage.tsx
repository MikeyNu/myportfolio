import { ArrowRight } from 'lucide-react';
import { processSteps, services, pageIndex } from '../data/portfolioContent';
import { RENDERS } from '../data/renderAssets';

interface CreativeServicesPageProps {
  onContact: () => void;
}

export function CreativeServicesPage({ onContact }: CreativeServicesPageProps) {
  return (
    <div className="cinematic-page services-page">
      <section className="cinematic-container cinematic-grid services-hero" aria-labelledby="services-title">
        <div className="services-hero-copy">
          <p className="cinematic-kicker">What I do</p>
          <h1 id="services-title" className="cinematic-display services-heading">
            Digital experiences that feel real.
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
          <img src={RENDERS.services4} alt="" />
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
              <img className="service-panel-art" src={service.image} alt="" aria-hidden="true" />
              <div className="service-panel-content">
                <span className="service-panel-index">{service.index}</span>
                <h2 className="service-panel-title">{service.title}</h2>
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

      <section className="cinematic-container services-process" aria-labelledby="process-title">
        <div className="services-process-intro">
          <p id="process-title" className="cinematic-kicker">How I work</p>
          <p className="cinematic-copy">
            A focused process that turns ideas, requirements, and source material into purposeful digital and spatial experiences.
          </p>
        </div>

        {processSteps.map((step) => (
          <article key={step.index} className="process-step">
            <span className="process-step-index">{step.index}</span>
            <h2 className="process-step-title">{step.title}</h2>
            <p className="process-step-description">{step.description}</p>
          </article>
        ))}
      </section>

      <div className="cinematic-container work-page-footer">
        <span className="cinematic-page-index">{pageIndex.services.replace('/ ', '')}</span>
        <span className="cinematic-scroll-cue">Scroll to explore</span>
      </div>
    </div>
  );
}
