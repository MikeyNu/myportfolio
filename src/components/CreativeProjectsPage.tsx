import { useMemo, useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ArrowUpRight, Search } from 'lucide-react';
import { ImageWithFallback } from './shared/ImageWithFallback';
import { RENDERS } from '../data/renderAssets';

const allProjects = [
  {
    id: '1',
    title: 'Netflix Multi-Show Launch Display',
    agency: 'JHDS (Contract)',
    brand: 'Netflix',
    role: '3D modeling, UV unwrapping, van concept design and texturing',
    image: RENDERS.netflixHero,
    category: 'Branded Vehicles',
    tags: ['Moodboard', 'Brand Identity', 'POVs'],
    year: '2024'
  },
  {
    id: '2',
    title: 'Arknights: Endfield - Gamescom 2025 Stand',
    agency: 'JHDS (Contract)',
    brand: 'Arknights: Endfield',
    role: '3D modeling, UV unwrapping, texturing, staff population and character cutouts',
    image: RENDERS.arknitghtsEndfieldHero,
    category: 'Game/Entertainment IP',
    tags: ['Plan Layout', 'Elevations', 'Grid'],
    year: '2025'
  },
  {
    id: '3',
    title: 'Sonic Racing: CrossWorlds Stand - Gamescom 2025',
    agency: 'JHDS (Contract)',
    brand: 'SEGA',
    role: 'UV unwrapping, texture corrections, character cutouts and game item creation',
    image: RENDERS.sonicHero,
    category: 'Game/Entertainment IP',
    tags: ['Brand Identity', 'Touchpoints', 'POVs'],
    year: '2025'
  },
  {
    id: '4',
    title: 'Genshin Impact Exhibition Booth',
    agency: 'JHDS (Contractor)',
    brand: 'Genshin Impact',
    role: 'Stand design from client specifications',
    image: RENDERS.genshinImpact,
    category: 'Game/Entertainment IP',
    tags: ['Stand Design', 'Exhibition', 'Client Spec'],
    year: '2025'
  },
  {
    id: '5',
    title: 'CeraVe Event Environment',
    agency: 'JHDS (Contractor)',
    brand: 'CeraVe',
    role: '3D product modeling, UV unwrapping and texturing in Blender. Created the initial design concept, with the final design retaining the product models.',
    image: RENDERS.cerave,
    category: 'Events/Experiences',
    tags: ['3D Modeling', 'Texturing', 'Blender'],
    year: '2025'
  },
  {
    id: '6',
    title: 'Hulu Deli Boys Food Truck',
    agency: 'JHDS (Contractor)',
    brand: 'Hulu',
    role: 'Design and build from client specifications, 3D product modeling and lighting setup',
    image: RENDERS.deliBoys,
    category: 'Branded Vehicles',
    tags: ['3D Modeling', 'Design', 'Lighting'],
    year: '2025'
  },
  {
    id: '7',
    title: 'Heineken Pop-up Experience',
    agency: 'JHDS (Contractor)',
    brand: 'Heineken',
    role: 'UV unwrapping and retexturing of an existing SketchUp file',
    image: RENDERS.heineken,
    category: 'Retail Pop-ups',
    tags: ['UV Mapping', 'Texturing', 'SketchUp'],
    year: '2025'
  },
  {
    id: '8',
    title: 'Pepsi Event Stand',
    agency: 'JHDS (Contractor)',
    brand: 'Pepsi',
    role: 'Design and build from client specifications using Blender and SketchUp',
    image: RENDERS.pepsi,
    category: 'Events/Experiences',
    tags: ['3D Modeling', 'Design', 'Blender', 'SketchUp'],
    year: '2025'
  },
  {
    id: '9',
    title: 'Discovery Bank Video Ad',
    agency: 'JHDS (Contractor)',
    brand: 'Discovery Bank',
    role: 'Motion tracking, rotoscoping, 3D building modeling from video references, tracked 3D integration and plane animation',
    image: RENDERS.discoveryVideo,
    category: 'Animation/Video',
    tags: ['Motion Tracking', 'Rotoscoping', '3D Modeling', 'Animation'],
    year: '2025'
  },
  {
    id: '10',
    title: 'Mercedes-Benz Conference Hall',
    agency: 'JHDS (Contractor)',
    brand: 'Mercedes-Benz',
    role: 'Conference hall design developed from live client instructions, including modeling, UV work, texturing, lighting and spatial design',
    image: RENDERS.daimler,
    category: 'Events/Experiences',
    tags: ['3D Modeling', 'Space Design', 'Texturing', 'Lighting'],
    year: '2025'
  },
  {
    id: '11',
    title: 'GAC Automotive Showroom',
    agency: 'GAC Motor',
    brand: 'GAC',
    role: 'Showroom layout, vehicle displays and customer experience planning',
    image: RENDERS.gacShowroom,
    category: 'Retail Pop-ups',
    tags: ['Brand Identity', 'Plans', 'Touchpoints'],
    year: '2023'
  }
];

const caseStudyIds = new Set(['1', '2', '3', '4']);

interface CreativeProjectsPageProps {
  onViewCaseStudy: (projectId: string) => void;
}

export function CreativeProjectsPage({ onViewCaseStudy }: CreativeProjectsPageProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(allProjects.map((project) => project.category)));
    return ['all', ...uniqueCategories];
  }, []);

  const filteredProjects = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return allProjects.filter((project) => {
      const categoryMatch = selectedCategory === 'all' || project.category === selectedCategory;
      const searchMatch = query.length === 0 || [
        project.title,
        project.brand,
        project.agency,
        project.role,
        project.category,
        ...project.tags
      ].some((value) => value.toLowerCase().includes(query));

      return categoryMatch && searchMatch;
    });
  }, [searchQuery, selectedCategory]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">Projects</h1>
            </div>
            <div className="lg:col-span-8">
              <p className="text-lg text-muted-foreground leading-relaxed">
                An archive of spatial, 3D, brand, animation and entertainment work. Use the filters to narrow the archive by project type or search the actual project metadata.
              </p>
            </div>
          </div>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          <div className="lg:col-span-4">
            <label htmlFor="project-search" className="block text-sm font-medium text-foreground mb-2">
              Search the archive
            </label>
            <div className="relative max-w-md">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
              <Input
                id="project-search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Project, brand, agency or skill"
                className="pl-10"
              />
            </div>
          </div>

          <div className="lg:col-span-8">
            <p className="text-sm font-medium text-foreground mb-2">Project type</p>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => {
                const count = category === 'all'
                  ? allProjects.length
                  : allProjects.filter((project) => project.category === category).length;
                const active = selectedCategory === category;

                return (
                  <Button
                    key={category}
                    type="button"
                    size="sm"
                    variant={active ? 'default' : 'outline'}
                    onClick={() => setSelectedCategory(category)}
                    aria-pressed={active}
                  >
                    {category === 'all' ? 'All projects' : category} ({count})
                  </Button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 mb-4" aria-live="polite">
          <p className="text-sm text-muted-foreground">{filteredProjects.length} project{filteredProjects.length === 1 ? '' : 's'}</p>
          {(searchQuery || selectedCategory !== 'all') && (
            <Button type="button" variant="ghost" size="sm" onClick={clearFilters}>
              Clear filters
            </Button>
          )}
        </div>

        {filteredProjects.length === 0 ? (
          <div className="border-t border-border py-16">
            <h2 className="text-2xl font-semibold text-foreground mb-3">No matching projects</h2>
            <p className="text-muted-foreground mb-6">Try a different search term or remove the current category filter.</p>
            <Button type="button" variant="outline" onClick={clearFilters}>Show all projects</Button>
          </div>
        ) : (
          <div>
            {filteredProjects.map((project) => (
              <article key={project.id} className="grid grid-cols-1 lg:grid-cols-12 gap-8 py-8 border-t border-border">
                <div className="lg:col-span-4">
                  {project.image.toLowerCase().endsWith('.mp4') ? (
                    <video
                      src={project.image}
                      controls
                      muted
                      playsInline
                      preload="metadata"
                      className="w-full h-64 object-cover rounded-lg bg-card"
                      aria-label={`${project.title} video preview`}
                    />
                  ) : (
                    <ImageWithFallback
                      src={project.image}
                      alt={project.title}
                      className="w-full h-64 object-cover rounded-lg"
                      loading="lazy"
                    />
                  )}
                </div>

                <div className="lg:col-span-8 flex flex-col justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-3">
                      <span>{project.year}</span>
                      <span>·</span>
                      <span>{project.category}</span>
                      <span>·</span>
                      <span>{project.brand}</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-3">{project.title}</h2>
                    <p className="text-sm text-accent mb-4">{project.agency}</p>
                    <p className="text-muted-foreground leading-relaxed mb-4">{project.role}</p>
                    <p className="text-sm text-foreground">Scope: {project.tags.join(' · ')}</p>
                  </div>

                  {caseStudyIds.has(project.id) && (
                    <div className="pt-6">
                      <Button type="button" variant="outline" onClick={() => onViewCaseStudy(project.id)}>
                        View case study
                        <ArrowUpRight size={16} className="ml-2" />
                      </Button>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
