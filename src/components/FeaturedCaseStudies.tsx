import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ArrowUpRight } from 'lucide-react';
import { ImageWithFallback } from './shared/ImageWithFallback';
import { RENDERS } from '../data/renderAssets';

const featuredProjects = [
  {
    id: '1',
    title: 'Netflix Multi-Show Launch Display',
    agency: 'JHDS (Contract)',
    brand: 'Netflix',
    summary: 'Launch display for Stranger Things, Wednesday, One Piece, and Squid Games. Role included 3D modeling, UV unwrapping, van concept design, and texturing.',
    image: RENDERS.netflixHero,
    tags: ['Branded Vehicles', '3D Modeling', 'Texturing'],
    category: 'Branded Vehicles'
  },
  {
    id: '2',
    title: 'Arknights: Endfield - Gamescom 2025',
    agency: 'JHDS (Contract)',
    brand: 'Arknights: Endfield',
    summary: 'Designed an installation booth from the game for Gamescom 2025. Created 3D models, UV unwrapping, texturing, staff population with branded t-shirts, and character cutouts.',
    image: RENDERS.arknitghtsEndfieldHero,
    tags: ['Gaming', 'Exhibition', 'Character Design'],
    category: 'Game/Entertainment IP'
  },
  {
    id: '3',
    title: 'Sonic Racing: CrossWorlds - Gamescom 2025',
    agency: 'JHDS (Contract)',
    brand: 'SEGA',
    summary: 'Created the Sonic Racing: CrossWorlds stand for Gamescom 2025. Handled UV unwrapping, texture fixing, character cutouts, and game item creation.',
    image: RENDERS.sonicHero,
    tags: ['Gaming', 'Interactive', 'Brand Identity'],
    category: 'Game/Entertainment IP'
  }
];

interface FeaturedCaseStudiesProps {
  onViewCaseStudy: (projectId: string) => void;
}

export function FeaturedCaseStudies({ onViewCaseStudy }: FeaturedCaseStudiesProps) {
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Featured Case Studies
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            In-depth looks at selected projects showcasing the complete design process
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {featuredProjects.map((project, index) => (
            <Card key={project.id} className="group overflow-hidden hover:shadow-xl transition-all duration-500 border-border bg-card touch-feedback">
              <div className="relative overflow-hidden">
                <ImageWithFallback
                  src={project.image}
                  alt={project.title}
                  className="w-full h-56 sm:h-64 md:h-72 object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <Button
                  size="sm"
                  className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0"
                  onClick={() => onViewCaseStudy(project.id)}
                >
                  <ArrowUpRight size={16} />
                </Button>
              </div>

              <CardContent className="p-5 sm:p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs sm:text-sm">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-3 group-hover:text-accent transition-colors line-clamp-2">
                  {project.title}
                </h3>

                <div className="text-sm sm:text-base text-muted-foreground mb-4">
                  <span className="text-accent font-medium">{project.agency}</span> · {project.brand}
                </div>

                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-5 line-clamp-3">
                  {project.summary}
                </p>

                <Button 
                  variant="ghost" 
                  className="w-full justify-between text-accent hover:text-accent-foreground hover:bg-accent min-h-[44px] text-sm sm:text-base font-medium"
                  onClick={() => onViewCaseStudy(project.id)}
                >
                  View Case Study
                  <ArrowUpRight size={16} className="sm:hidden" />
                  <ArrowUpRight size={18} className="hidden sm:block" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}