import { Button } from './ui/button';
import { ArrowUpRight } from 'lucide-react';
import { ImageWithFallback } from './shared/ImageWithFallback';
import { RENDERS } from '../data/renderAssets';

const featuredProjects = [
  {
    id: '1',
    title: 'Netflix Multi-Show Launch Display',
    agency: 'JHDS (Contract)',
    brand: 'Netflix',
    summary: 'Launch display for Stranger Things, Wednesday, One Piece and Squid Game. Role included 3D modeling, UV unwrapping, van concept design and texturing.',
    image: RENDERS.netflixHero,
    category: 'Branded vehicles'
  },
  {
    id: '2',
    title: 'Arknights: Endfield at Gamescom 2025',
    agency: 'JHDS (Contract)',
    brand: 'Arknights: Endfield',
    summary: 'Installation booth created from the game for Gamescom 2025, including 3D modeling, UV unwrapping, texturing, branded staff population and character cutouts.',
    image: RENDERS.arknitghtsEndfieldHero,
    category: 'Exhibition design'
  },
  {
    id: '3',
    title: 'Sonic Racing: CrossWorlds at Gamescom 2025',
    agency: 'JHDS (Contract)',
    brand: 'SEGA',
    summary: 'Stand work for Sonic Racing: CrossWorlds, covering UV unwrapping, texture corrections, character cutouts and game item creation.',
    image: RENDERS.sonicHero,
    category: 'Gaming and entertainment IP'
  }
];

interface FeaturedCaseStudiesProps {
  onViewCaseStudy: (projectId: string) => void;
}

export function FeaturedCaseStudies({ onViewCaseStudy }: FeaturedCaseStudiesProps) {
  return (
    <section className="py-20 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-12">
          <div className="lg:col-span-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Selected case studies</h2>
          </div>
          <div className="lg:col-span-8">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Detailed examples showing the actual brief, role, production work and visual output behind selected projects.
            </p>
          </div>
        </div>

        <div>
          {featuredProjects.map((project) => (
            <article key={project.id} className="grid grid-cols-1 lg:grid-cols-12 gap-8 py-8 border-t border-border items-center">
              <div className="lg:col-span-8">
                <ImageWithFallback
                  src={project.image}
                  alt={project.title}
                  className="w-full h-96 object-cover rounded-lg"
                  loading="lazy"
                />
              </div>

              <div className="lg:col-span-4">
                <p className="text-sm text-muted-foreground mb-3">{project.category} · {project.brand}</p>
                <h3 className="text-2xl font-semibold text-foreground mb-3">{project.title}</h3>
                <p className="text-sm text-accent mb-4">{project.agency}</p>
                <p className="text-muted-foreground leading-relaxed mb-6">{project.summary}</p>
                <Button variant="outline" onClick={() => onViewCaseStudy(project.id)}>
                  View case study
                  <ArrowUpRight size={16} className="ml-2" />
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
