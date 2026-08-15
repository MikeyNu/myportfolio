import { capabilities, pageIndex, processSteps, services } from '../data/portfolioContent';
import { RENDERS } from '../data/renderAssets';

export function CreativeAboutPage() {
  return (
    <div className="cinematic-page about-page">
      <section className="cinematic-container cinematic-grid about-hero" aria-labelledby="about-title">
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

        <div className="about-art" aria-hidden="true">
          <img src={RENDERS.approach1} alt="" className="theme-img-dark" />
          <img src={RENDERS.approach1Light} alt="" className="theme-img-light" />
        </div>

        <div className="about-service-rail" aria-label="Primary disciplines">
          {services.map((service) => (
            <span key={service.id}>{service.title}</span>
          ))}
        </div>
      </section>

      <section className="cinematic-container about-lower-band" aria-label="Approach details">
        <article className="about-band-section">
          <p className="cinematic-meta">Philosophy</p>
          <h2 className="about-philosophy-title">Build with intention.<br />Design for perception.</h2>
          <p className="about-philosophy-copy">
            Structure, interaction, imagery, and technology. All serving one purpose. Not filling space.
          </p>
        </article>

        <article className="about-band-section">
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
        </article>

        <article className="about-band-section">
          <p className="cinematic-meta">Process</p>
          <div className="about-process">
            {processSteps.map((step) => (
              <div key={step.index} className="process-step">
                <span className="process-step-index">{step.index}</span>
                <h2 className="process-step-title">{step.title}</h2>
                <p className="process-step-description">{step.description}</p>
              </div>
            ))}
          </div>
        </article>
      </section>

      <div className="about-quote" aria-label="Design philosophy statement">
        <span>We do not just design interfaces.<br />We design how they are felt.</span>
      </div>

      <div className="cinematic-container about-page-footer">
        <span className="cinematic-page-index">{pageIndex.about.replace('/ ', '')}</span>
        <span className="cinematic-scroll-cue">Scroll to explore</span>
      </div>
    </div>
  );
}
