import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { ImageWithFallback } from './shared/ImageWithFallback';
import { caseStudyProjectIds, projects } from '../data/portfolioContent';
import { HeroPaintText } from './HeroPaintText';
import { getPagePath, getProjectPath } from '../seo/siteSeo';

interface CaseStudyPageProps {
  projectId: string;
  onBack: () => void;
  onNextProject: (projectId: string) => void;
}

const EASE = [0.25, 0.46, 0.45, 0.94] as const;
const NARRATIVE = ['Challenge', 'Approach', 'Outcome'] as const;

export function CaseStudyPage({ projectId, onBack, onNextProject }: CaseStudyPageProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const reduced = useReducedMotion();
  const project = projects.find((item) => item.id === projectId && item.caseStudy);

  useEffect(() => {
    if (!selectedImage) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedImage(null);
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
          <a
            className="cinematic-text-link"
            href={getPagePath('projects')}
            onClick={(event) => {
              if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
              event.preventDefault();
              onBack();
            }}
          >
            <ArrowLeft size={14} aria-hidden="true" />
            Back to work
          </a>
        </div>
      </div>
    );
  }

  const caseStudy = project.caseStudy;
  const currentIndex = caseStudyProjectIds.indexOf(project.id);
  const previousProjectId = caseStudyProjectIds[(currentIndex - 1 + caseStudyProjectIds.length) % caseStudyProjectIds.length];
  const nextProjectId = caseStudyProjectIds[(currentIndex + 1) % caseStudyProjectIds.length];
  const previousProject = projects.find((item) => item.id === previousProjectId)!;
  const nextProject = projects.find((item) => item.id === nextProjectId)!;
  const galleryImages = caseStudy.gallery.slice(1);

  const navigateProject = (event: React.MouseEvent<HTMLAnchorElement>, targetProjectId: string) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    onNextProject(targetProjectId);
  };

  return (
    <div className="cinematic-page project-detail-page">
      <div className="cinematic-container">
        <header className="project-detail-header">
          <nav className="project-breadcrumb" aria-label="Breadcrumb">
            <a
              href={getPagePath('projects')}
              onClick={(event) => {
                if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
                event.preventDefault();
                onBack();
              }}
            >
              Projects
            </a>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{project.title}</span>
          </nav>
          <span className="cinematic-meta">{project.year} / {project.category}</span>
        </header>

        <div className="project-reference-layout" aria-labelledby="project-title">
          <section className="project-reference-left">
            <p className="project-detail-category">3D Design / Visualization</p>
            <HeroPaintText id="project-title" className="cinematic-display project-detail-title" text={project.brand} />

            <div className="project-reference-summary">
              <div>
                <span className="project-detail-meta-label">Year</span>
                <p className="project-detail-meta-copy">{project.year}</p>
              </div>
              <div>
                <span className="project-detail-meta-label">Agency</span>
                <p className="project-detail-meta-copy">{project.agency}</p>
              </div>
              <div className="project-reference-overview">
                <span className="project-detail-meta-label">Project</span>
                <p className="project-detail-meta-copy">{project.title}</p>
                <span className="project-detail-meta-label">Overview</span>
                <p className="project-detail-meta-copy">{caseStudy.overview}</p>
              </div>
            </div>

            <div className="project-reference-narrative" aria-label="Project narrative">
              {NARRATIVE.map((label, i) => (
                <motion.article
                  key={label}
                  initial={reduced ? false : { y: 10, opacity: 0.4 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.45, delay: i * 0.09, ease: EASE }}
                  viewport={{ once: true, margin: '-5%' }}
                >
                  <h2>{label}</h2>
                  <p>{caseStudy[label.toLowerCase() as 'challenge' | 'approach' | 'outcome']}</p>
                </motion.article>
              ))}
            </div>

            <div className="project-reference-lists">
              <article>
                <h2 className="project-reference-list-heading">Contributions</h2>
                <ul className="project-reference-list">
                  {caseStudy.contributions.map((contribution) => (
                    <li key={contribution}>{contribution}</li>
                  ))}
                </ul>
              </article>
              <article>
                <h2 className="project-reference-list-heading">Deliverables</h2>
                <ul className="project-reference-list">
                  {caseStudy.deliverables.map((deliverable) => (
                    <li key={deliverable}>{deliverable}</li>
                  ))}
                </ul>
              </article>
            </div>
          </section>

          <section className="project-reference-right" aria-label="Project imagery">
            <button
              type="button"
              className="project-reference-hero-media"
              onClick={() => setSelectedImage(project.image)}
              aria-label={`Open ${project.title} hero image`}
            >
              <ImageWithFallback src={project.image} alt={`${project.title} hero render`} />
            </button>

            {galleryImages.length > 0 && (
              <div className="project-reference-gallery">
                {galleryImages.map((image, index) => (
                  <button
                    key={image}
                    type="button"
                    className="project-reference-gallery-item"
                    onClick={() => setSelectedImage(image)}
                    aria-label={`Open ${project.title} gallery image ${index + 1}`}
                  >
                    <ImageWithFallback src={image} alt={`${project.title} project view ${index + 1}`} loading="lazy" />
                    <span className="project-gallery-caption">{String(index + 1).padStart(2, '0')} / View</span>
                  </button>
                ))}
              </div>
            )}
          </section>
        </div>

        <footer className="project-detail-footer" aria-label="Project navigation">
          <a href={getProjectPath(previousProject)} onClick={(event) => navigateProject(event, previousProjectId)}>
            <ArrowLeft size={13} aria-hidden="true" /> Previous project
          </a>
          <span className="cinematic-meta">{String(currentIndex + 1).padStart(2, '0')} / {String(caseStudyProjectIds.length).padStart(2, '0')}</span>
          <a href={getProjectPath(nextProject)} onClick={(event) => navigateProject(event, nextProjectId)}>
            Next project <ArrowRight size={13} aria-hidden="true" />
          </a>
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
