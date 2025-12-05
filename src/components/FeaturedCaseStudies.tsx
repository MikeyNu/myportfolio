import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ArrowUpRight } from 'lucide-react';
import { ImageWithFallback } from './shared/ImageWithFallback';
import { RENDERS } from '../data/renderAssets';

const featuredProjects = [
  {
    id: '1',
    title: 'Sonic Racing: CrossWorlds Stand',
    agency: 'Sega',
    brand: 'Sonic Racing',
    summary: 'Interactive gaming booth featuring immersive racing experiences with custom 3D environments and branded touchpoints.',
    image: RENDERS.pepsiExperience,
    tags: ['Gaming', 'Interactive', 'Brand Identity'],
    category: 'Game/Entertainment IP'
  },
  {
    id: '2',
    title: 'CeraVe Event Environment',
    agency: 'L\'Oréal',
    brand: 'CeraVe',
    summary: 'Premium skincare brand activation with clean, minimal aesthetics and educational touchpoints for product discovery.',
    image: RENDERS.niveaActivation,
    tags: ['Beauty', 'Retail', 'Brand Identity'],
    category: 'Events/Experiences'
  },
  {
    id: '3',
    title: 'Genshin Impact Exhibition',
    agency: 'Hoyoverse',
    brand: 'Genshin Impact',
    summary: 'Large-scale anime gaming exhibition with character displays, interactive zones, and immersive world environments.',
    image: RENDERS.genshinImpact,
    tags: ['Gaming', 'Exhibition', 'Interactive'],
    category: 'Game/Entertainment IP'
  }
];

interface FeaturedCaseStudiesProps {
  onViewCaseStudy: (projectId: string) => void;
}

export function FeaturedCaseStudies({ onViewCaseStudy }: FeaturedCaseStudiesProps) {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Featured Case Studies
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            In-depth looks at selected projects showcasing the complete design process
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project, index) => (
            <Card key={project.id} className="group overflow-hidden hover:shadow-xl transition-all duration-500 border-border bg-card">
              <div className="relative overflow-hidden">
                <ImageWithFallback
                  src={project.image}
                  alt={project.title}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
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

              <CardContent className="p-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
                  {project.title}
                </h3>

                <div className="text-sm text-muted-foreground mb-3">
                  <span className="text-accent">{project.agency}</span> · {project.brand}
                </div>

                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {project.summary}
                </p>

                <Button 
                  variant="ghost" 
                  className="w-full justify-between text-accent hover:text-accent-foreground hover:bg-accent"
                  onClick={() => onViewCaseStudy(project.id)}
                >
                  View Case Study
                  <ArrowUpRight size={16} />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}