import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import { ImageWithFallback } from './shared/ImageWithFallback';
import { caseStudyProjectIds, projects } from '../data/portfolioContent';

interface CaseStudyPageProps {
  projectId: string;
  onBack: () => void;
  onNextProject: (projectId: string) => void;
}

export function CaseStudyPage({ projectId, onBack, onNextProject }: CaseStudyPageProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const project = projects.find((item) => item.id === projectId && item.caseStudy);

  useEffect(() => {
    if (!selectedImage) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedImage(null);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage]);

  if (!project?.caseStudy) {
    return (
      <div className="cinematic-page">
        <div className="cinematic-container work-empty">
          <p className="cinematic-kicker">Project detail</p>
          <h1 className="cinematic-display project-missing-title">Case study not found.</h1>
          <button type="button" className="cinematic-text-link" onClick={onBack}>
            <ArrowLeft size={14} aria-hidden="true" />
            Back to work
          </button>
        </div>
      </div>
    );
  }

  const caseStudy = project.caseStudy;
  const currentIndex = caseStudyProjectIds.indexOf(project.id);
  const previousProjectId = caseStudyProjectIds[(currentIndex - 1 + caseStudyProjectIds.length) % caseStudyProjectIds.length];
  const nextProjectId = caseStudyProjectIds[(currentIndex + 1) % caseStudyProjectIds.length];
  const galleryImages = caseStudy.gallery.slice(1);

  return (
    <div className="cinematic-page project-detail-page">
      <div className="cinematic-container">
        <header className="project-detail-header">
          <div className="project-breadcrumb">
            <button type="button" onClick={onBack}>Projects</button>
            <span>/</span>
            <span>{project.brand}</span>
          </div>
          <span className="cinematic-meta">{project.year} / {project.category}</span>
        </header>

        <section className="project-detail-hero" aria-labelledby="project-title">
          <div className="project-detail-copy">
            <p className="project-detail-category">3D Design / Visualization</p>
            <h1 id="project-title" className="cinematic-display project-detail-title">{project.title}</h1>

            <div className="project-detail-meta-block">
              <span className="project-detail-meta-label">Agency</span>
              <span className="project-detail-meta-copy">{project.agency}</span>
              <span className="project-detail-meta-label">Role</span>
              <span className="project-detail-meta-copy">{project.role}</span>
              <span className="project-detail-meta-label">Scope</span>
              <span className="project-detail-meta-copy">{project.tags.join(' / ')}</span>
            </div>
          </div>

          <div className="project-detail-media">
            <ImageWithFallback src={project.image} alt={project.title} />
          </div>
        </section>

        <section className="project-detail-narrative" aria-label="Project narrative">
          <article>
            <h2>Challenge</h2>
            <p>{caseStudy.challenge}</p>
          </article>
          <article>
            <h2>Approach</h2>
            <p>{caseStudy.approach}</p>
          </article>
          <article>
            <h2>Outcome</h2>
            <p>{caseStudy.outcome}</p>
          </article>
        </section>

        <section className="project-detail-contributions" aria-label="Project contributions and deliverables">
          <article>
            <h2 className="project-detail-list-title">Key contributions</h2>
            <ul className="project-detail-list">
              {caseStudy.contributions.map((contribution) => (
                <li key={contribution}>{contribution}</li>
              ))}
            </ul>
          </article>

          <article>
            <h2 className="project-detail-list-title">Deliverables</h2>
            <ul className="project-detail-list">
              {caseStudy.deliverables.map((deliverable) => (
                <li key={deliverable}>{deliverable}</li>
              ))}
            </ul>
          </article>
        </section>

        {galleryImages.length > 0 && (
          <section className="project-gallery" aria-labelledby="project-gallery-title">
            <div className="work-archive-heading">
              <p id="project-gallery-title" className="cinematic-kicker">Project gallery</p>
              <p className="cinematic-copy">Additional verified views from the same production work.</p>
            </div>

            <div className="project-gallery-grid">
              {galleryImages.map((image, index) => (
                <button
                  key={image}
                  type="button"
                  className="project-gallery-item"
                  onClick={() => setSelectedImage(image)}
                  aria-label={`Open ${project.title} gallery image ${index + 1}`}
                >
                  <ImageWithFallback src={image} alt={`${project.title}, view ${index + 1}`} loading="lazy" />
                  <span className="project-gallery-caption">{String(index + 1).padStart(2, '0')} / View</span>
                </button>
              ))}
            </div>
          </section>
        )}

        <footer className="project-detail-footer" aria-label="Project navigation">
          <button type="button" onClick={() => onNextProject(previousProjectId)}>
            <ArrowLeft size={13} aria-hidden="true" /> Previous project
          </button>
          <span className="cinematic-meta">{String(currentIndex + 1).padStart(2, '0')} / {String(caseStudyProjectIds.length).padStart(2, '0')}</span>
          <button type="button" onClick={() => onNextProject(nextProjectId)}>
            Next project <ArrowRight size={13} aria-hidden="true" />
          </button>
        </footer>
      </div>

      {selectedImage && (
        <div
          className="project-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Project image viewer"
          onClick={() => setSelectedImage(null)}
        >
          <button
            type="button"
            className="project-lightbox-close"
            onClick={() => setSelectedImage(null)}
            aria-label="Close image viewer"
            autoFocus
          >
            <X size={18} aria-hidden="true" />
          </button>
          <div onClick={(event) => event.stopPropagation()}>
            <ImageWithFallback src={selectedImage} alt={`${project.title} enlarged project view`} />
          </div>
        </div>
      )}
    </div>
  );
}
