import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import { ImageWithFallback } from './shared/ImageWithFallback';
import { RENDERS } from '../data/renderAssets';

const caseStudyData = {
  '1': {
    title: 'Netflix Multi-Show Launch Display',
    brand: 'Netflix',
    agency: 'JHDS (Contract)',
    year: '2024',
    role: '3D Experience Designer',
    overview: 'Designed launch display installations for multiple Netflix flagship shows including Stranger Things, Wednesday, One Piece and Squid Game. The project involved branded vehicle concepts and detailed 3D assets for promotional activations.',
    objectives: [
      'Create a cohesive multi-show launch display',
      'Design branded vehicle wraps and concepts',
      'Model detailed 3D assets for each show',
      'Maintain a consistent Netflix brand identity across the activation'
    ],
    myRole: [
      '3D modeling of display assets and installations',
      'UV unwrapping for texture application',
      'Van concept design for mobile activations',
      'Texturing with show-specific branding',
      'Asset optimization for production'
    ],
    deliverables: [
      'Complete 3D models for all four shows',
      'Van concept designs and renders',
      'UV unwrapped assets ready for texturing',
      'Final textured renders for approval',
      'Production-ready files'
    ],
    image: RENDERS.netflixHero,
    gallery: [
      RENDERS.netflixHero,
      RENDERS.netflix,
      RENDERS.netflix2,
      RENDERS.netflix3,
      RENDERS.netflix4,
      RENDERS.netflix5
    ],
    tags: ['Moodboard', 'Brand Identity', 'POVs'],
    tools: ['Blender', 'SketchUp', 'Unreal Engine', 'Adobe Creative Suite']
  },
  '2': {
    title: 'Arknights: Endfield - Gamescom 2025 Stand',
    brand: 'Arknights: Endfield',
    agency: 'JHDS (Contract)',
    year: '2025',
    role: '3D Experience Designer',
    overview: 'Created an installation booth for Arknights: Endfield at Gamescom 2025. The work translated in-game environments into a large-scale physical display with character cutouts and branded staff elements.',
    objectives: [
      'Recreate a game installation booth in physical space',
      'Design large-scale display areas',
      'Create life-sized character cutouts',
      'Develop staff population with branded elements'
    ],
    myRole: [
      '3D modeling of the installation booth from the game',
      'UV unwrapping for detailed texturing',
      'Texturing to match the game aesthetic',
      'Modeling human figures with branded t-shirts',
      'Creating character cutouts of game characters',
      'Technical documentation'
    ],
    deliverables: [
      'Complete booth 3D models',
      'Installation display designs',
      'Character cutout files',
      'Staff population models',
      'Textured final renders',
      'Construction documentation'
    ],
    image: RENDERS.arknitghtsEndfieldHero,
    gallery: [
      RENDERS.arknitghtsEndfieldHero,
      RENDERS.arknitghtsEndfield,
      RENDERS.arknitghtsEndfieldBooth
    ],
    tags: ['Plan Layout', 'Elevations', 'Grid'],
    tools: ['Blender', 'SketchUp', 'Unreal Engine', 'Adobe Creative Suite']
  },
  '3': {
    title: 'Sonic Racing: CrossWorlds Stand - Gamescom 2025',
    brand: 'SEGA',
    agency: 'JHDS (Contract)',
    year: '2025',
    role: '3D Experience Designer',
    overview: 'Developed the Sonic Racing: CrossWorlds exhibition stand for Gamescom 2025, with a focus on technical asset preparation, texture corrections, character cutouts and game items.',
    objectives: [
      'Create a Sonic Racing exhibition stand',
      'Optimize existing 3D assets',
      'Design character and item cutouts',
      'Maintain the source visual identity of the game'
    ],
    myRole: [
      'UV unwrapping of stand assets',
      'Fixing and optimizing textures',
      'Creating cutouts of game characters',
      'Modeling game items and props',
      'Technical preparation for production'
    ],
    deliverables: [
      'UV unwrapped stand models',
      'Optimized texture maps',
      'Character cutout designs',
      'Game item models',
      'Production-ready files'
    ],
    image: RENDERS.sonicHero,
    gallery: [
      RENDERS.sonicHero,
      RENDERS.sonic,
      RENDERS.sonic2,
      RENDERS.sonic3,
      RENDERS.sonic4
    ],
    tags: ['Brand Identity', 'Touchpoints', 'POVs'],
    tools: ['Blender', 'SketchUp', 'Unreal Engine', 'Adobe Creative Suite']
  },
  '4': {
    title: 'Genshin Impact Exhibition Booth',
    brand: 'Genshin Impact',
    agency: 'Hoyoverse',
    year: '2024',
    role: '3D Experience Designer',
    overview: 'Created a large-scale exhibition booth for Genshin Impact with character displays, audience areas and an environment shaped around the source visual identity.',
    objectives: [
      'Showcase game characters in physical displays',
      'Create audience photo opportunities',
      'Plan interactive gaming areas',
      'Maintain the visual identity of the game'
    ],
    myRole: [
      'Spatial layout design for audience flow',
      'Character display environment modeling',
      'Interactive zone conceptualization',
      'Game-world atmosphere development',
      'Technical documentation for construction'
    ],
    deliverables: [
      'Complete booth 3D models',
      'Character display designs',
      'Interactive station layouts',
      'Lighting and atmosphere studies',
      'Construction plans and elevations'
    ],
    image: RENDERS.genshinImpact,
    gallery: [RENDERS.genshinImpact],
    tags: ['Plan Layout', 'Elevations', 'Grid'],
    tools: ['Blender', 'SketchUp', 'Unreal Engine', 'Adobe Creative Suite']
  }
};

const caseStudyOrder = ['1', '2', '3', '4'] as const;

interface CaseStudyPageProps {
  projectId: string;
  onBack: () => void;
  onNextProject: (projectId: string) => void;
}

export function CaseStudyPage({ projectId, onBack, onNextProject }: CaseStudyPageProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const project = caseStudyData[projectId as keyof typeof caseStudyData];

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

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-4">Case study not found</h1>
          <Button onClick={onBack}>
            <ArrowLeft size={16} className="mr-2" />
            Back to projects
          </Button>
        </div>
      </div>
    );
  }

  const currentIndex = caseStudyOrder.indexOf(projectId as typeof caseStudyOrder[number]);
  const nextProjectId = caseStudyOrder[(currentIndex + 1) % caseStudyOrder.length];
  const galleryImages = project.gallery.slice(1);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <Button variant="ghost" onClick={onBack} className="mb-8">
            <ArrowLeft size={16} className="mr-2" />
            Back to projects
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8">
              <p className="text-sm text-accent mb-3">{project.brand} · {project.year}</p>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight mb-4">{project.title}</h1>
              <p className="text-lg text-muted-foreground">{project.agency} · {project.role}</p>
            </div>
            <div className="lg:col-span-4">
              <p className="text-sm text-muted-foreground mb-2">Project scope</p>
              <p className="text-sm text-foreground leading-relaxed">{project.tags.join(' · ')}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <ImageWithFallback
          src={project.image}
          alt={project.title}
          className="w-full h-96 object-cover rounded-lg mb-16"
        />

        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          <div className="lg:col-span-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">Project overview</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-10">{project.overview}</p>

            <h3 className="text-xl font-semibold text-foreground mb-4">Objectives</h3>
            <ul className="space-y-3">
              {project.objectives.map((objective) => (
                <li key={objective} className="flex items-start gap-3 text-muted-foreground">
                  <span className="text-accent">•</span>
                  <span>{objective}</span>
                </li>
              ))}
            </ul>
          </div>

          <aside className="lg:col-span-4">
            <h2 className="text-xl font-semibold text-foreground mb-4">Project details</h2>
            <dl>
              <div className="border-t border-border py-4">
                <dt className="text-sm text-muted-foreground">Client / agency</dt>
                <dd className="font-medium text-foreground mt-1">{project.agency}</dd>
              </div>
              <div className="border-t border-border py-4">
                <dt className="text-sm text-muted-foreground">Brand</dt>
                <dd className="font-medium text-foreground mt-1">{project.brand}</dd>
              </div>
              <div className="border-t border-border py-4">
                <dt className="text-sm text-muted-foreground">Year</dt>
                <dd className="font-medium text-foreground mt-1">{project.year}</dd>
              </div>
              <div className="border-t border-border py-4">
                <dt className="text-sm text-muted-foreground">Tools</dt>
                <dd className="text-sm text-foreground leading-relaxed mt-1">{project.tools.join(' · ')}</dd>
              </div>
            </dl>
          </aside>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">Key contributions</h2>
            <ul className="space-y-3">
              {project.myRole.map((role) => (
                <li key={role} className="flex items-start gap-3 text-muted-foreground">
                  <span className="text-accent">•</span>
                  <span>{role}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">Deliverables</h2>
            <ul className="space-y-3">
              {project.deliverables.map((deliverable) => (
                <li key={deliverable} className="flex items-start gap-3 text-muted-foreground">
                  <span className="text-accent">•</span>
                  <span>{deliverable}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {galleryImages.length > 0 && (
          <section className="mb-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-8">
              <div className="lg:col-span-4">
                <h2 className="text-3xl font-bold text-foreground">Project gallery</h2>
              </div>
              <div className="lg:col-span-8">
                <p className="text-muted-foreground">Additional views from the same project. Select an image to inspect it at a larger size.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {galleryImages.map((image, index) => (
                <button
                  key={image}
                  type="button"
                  onClick={() => setSelectedImage(image)}
                  className="w-full text-left"
                  aria-label={`Open ${project.title} gallery image ${index + 1}`}
                >
                  <ImageWithFallback
                    src={image}
                    alt={`${project.title}, additional view ${index + 1}`}
                    className="w-full h-64 object-cover rounded-lg"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          </section>
        )}

        <div className="flex flex-col sm:flex-row justify-between gap-4 pt-8 border-t border-border">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft size={16} className="mr-2" />
            Project archive
          </Button>
          <Button onClick={() => onNextProject(nextProjectId)}>
            Next case study
            <ArrowRight size={16} className="ml-2" />
          </Button>
        </div>
      </main>

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Project image viewer"
          onClick={() => setSelectedImage(null)}
        >
          <Button
            type="button"
            variant="secondary"
            size="icon"
            className="absolute top-4 right-4"
            onClick={() => setSelectedImage(null)}
            aria-label="Close image viewer"
          >
            <X size={18} />
          </Button>
          <ImageWithFallback
            src={selectedImage}
            alt={`${project.title} enlarged project view`}
            className="max-w-full max-h-full object-contain"
          />
        </div>
      )}
    </div>
  );
}
