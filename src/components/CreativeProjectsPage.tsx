import { useMemo, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { HeroPaintText } from './HeroPaintText';
import { ImageWithFallback } from './shared/ImageWithFallback';
import { projects, caseStudyProjectIds, pageIndex, type ServiceId } from '../data/portfolioContent';
import { getPagePath, getProjectPath } from '../seo/siteSeo';

type WorkFilter = 'all' | ServiceId;

const filters: { id: WorkFilter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'software', label: 'Software' },
  { id: '3d', label: '3D' },
  { id: 'vr', label: 'VR' }
];

interface CreativeProjectsPageProps {
  onViewCaseStudy: (projectId: string) => void;
  onViewServices: () => void;
}

function ProjectMedia({ title, source }: { title: string; source: string }) {
  if (source.toLowerCase().endsWith('.mp4')) {
    return (
      <video
        src={source}
        controls
        muted
        playsInline
        preload="metadata"
        aria-label={`${title} video preview`}
      />
    );
  }

  return <ImageWithFallback src={source} alt={`${title} project render`} loading="lazy" />;
}

export function CreativeProjectsPage({ onViewCaseStudy, onViewServices }: CreativeProjectsPageProps) {
  const [activeFilter, setActiveFilter] = useState<WorkFilter>('all');

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') {
      return projects;
    }
    return projects.filter((project) => project.discipline === activeFilter);
  }, [activeFilter]);

  const featuredProjects = filteredProjects.slice(0, 3);
  const archiveProjects = filteredProjects.slice(3);

  return (
    <div className="cinematic-page work-page">
      <div className="cinematic-container cinematic-grid">
        <aside className="work-intro-rail">
          <p className="cinematic-kicker">Work / Selected projects</p>
          <HeroPaintText className="cinematic-display work-heading" text="Selected work" />
          <p className="cinematic-copy work-intro-copy">
            A selection of production work built with precision across 3D, spatial design, visualization, and interactive disciplines. Software and VR services are available even where public case studies are not yet documented in this archive.
          </p>
        </aside>

        <section className="work-content-field" aria-label="Selected portfolio work">
          <div className="work-filter-row" aria-label="Filter projects by discipline">
            {filters.map((filter) => {
              const active = activeFilter === filter.id;
              return (
                <button
                  key={filter.id}
                  type="button"
                  className="cinematic-filter"
                  data-active={active}
                  aria-pressed={active}
                  onClick={() => setActiveFilter(filter.id)}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>

          {filteredProjects.length === 0 ? (
            <div className="work-empty" aria-live="polite">
              <p className="cinematic-kicker">Portfolio evidence</p>
              <h2 className="cinematic-display work-heading">Public case studies coming later.</h2>
              <p className="cinematic-copy work-intro-copy">
                This portfolio does not currently contain a documented public case study for this discipline. The service remains available, but no project is invented simply to fill the layout.
              </p>
              <a
                className="cinematic-text-link work-project-action"
                href={getPagePath('services')}
                onClick={(event) => {
                  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
                  event.preventDefault();
                  onViewServices();
                }}
              >
                View services
                <ArrowRight size={14} aria-hidden="true" />
              </a>
            </div>
          ) : (
            <>
              <div className="work-featured-list">
                {featuredProjects.map((project, index) => {
                  const hasCaseStudy = caseStudyProjectIds.includes(project.id);
                  return (
                    <article key={project.id} className="work-project">
                      <div className="work-project-copy">
                        <span className="work-project-index">0{index + 1}</span>
                        <h2 className="work-project-title">{project.brand}</h2>
                        <p className="work-project-category">{project.category}</p>
                        <p className="work-project-summary">{project.role}</p>
                        {hasCaseStudy && (
                          <a
                            className="cinematic-text-link work-project-action"
                            href={getProjectPath(project)}
                            onClick={(event) => {
                              if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
                              event.preventDefault();
                              onViewCaseStudy(project.id);
                            }}
                          >
                            View project
                            <ArrowRight size={14} aria-hidden="true" />
                          </a>
                        )}
                      </div>

                      <div className="work-project-media">
                        <ProjectMedia title={project.title} source={project.image} />
                      </div>
                    </article>
                  );
                })}
              </div>

              {archiveProjects.length > 0 && (
                <section className="work-archive" aria-labelledby="work-archive-title">
                  <div className="work-archive-heading">
                    <p id="work-archive-title" className="cinematic-kicker">Archive</p>
                    <p className="cinematic-copy">
                      Additional verified portfolio work, kept deliberately compact so the hierarchy remains image-led rather than card-led.
                    </p>
                  </div>

                  {archiveProjects.map((project, index) => {
                    const hasCaseStudy = caseStudyProjectIds.includes(project.id);
                    const projectNumber = String(index + featuredProjects.length + 1).padStart(2, '0');
                    return (
                      <article key={project.id} className="work-archive-row">
                        <span className="work-archive-index">{projectNumber}</span>
                        <h2 className="work-archive-title">{project.title}</h2>
                        <p className="work-archive-meta">{project.year}<br />{project.brand}</p>
                        <p className="work-archive-role">{project.role}</p>
                        {hasCaseStudy ? (
                          <a
                            className="cinematic-text-link"
                            href={getProjectPath(project)}
                            onClick={(event) => {
                              if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
                              event.preventDefault();
                              onViewCaseStudy(project.id);
                            }}
                          >
                            View
                            <ArrowRight size={13} aria-hidden="true" />
                          </a>
                        ) : (
                          <span className="cinematic-meta">Client work</span>
                        )}
                      </article>
                    );
                  })}
                </section>
              )}
            </>
          )}
        </section>
      </div>

      <div className="cinematic-container work-page-footer">
        <span className="cinematic-page-index">{pageIndex.work}</span>
        <span className="cinematic-scroll-cue">Scroll to explore</span>
      </div>
    </div>
  );
}
