import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';
import { ImageWithFallback } from './shared/ImageWithFallback';
import { RENDERS } from '../data/renderAssets';

interface ModernHeroProps {
  onViewCaseStudy: (projectId: string) => void;
  onViewAllProjects: () => void;
}

export function ModernHero({ onViewCaseStudy, onViewAllProjects }: ModernHeroProps) {
  return (
    <section className="bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-4">
            <p className="text-lg font-medium text-accent mb-4">Michael Ndhlovu</p>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight mb-6">
              3D experience design, immersive technology and software.
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              I design brand environments and exhibition experiences, build production-ready 3D assets and renders, and develop XR and web products that carry those ideas into interactive form.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <Button size="lg" onClick={onViewAllProjects}>
                View projects
                <ArrowRight size={16} className="ml-2" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => onViewCaseStudy('1')}>
                Open Netflix case study
              </Button>
            </div>

            <div className="border-t border-border pt-6">
              <p className="text-sm text-muted-foreground mb-2">Selected client work</p>
              <p className="text-sm text-foreground leading-relaxed">
                Netflix · SEGA · Arknights: Endfield · CeraVe · Heineken · Discovery Bank
              </p>
            </div>
          </div>

          <div className="lg:col-span-8">
            <button
              type="button"
              onClick={() => onViewCaseStudy('1')}
              className="w-full text-left group"
              aria-label="Open Netflix multi-show launch display case study"
            >
              <ImageWithFallback
                src={RENDERS.netflixHero}
                alt="Netflix multi-show launch display"
                className="w-full h-96 object-cover rounded-lg"
              />
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pt-4">
                <div>
                  <p className="font-medium text-foreground">Netflix multi-show launch display</p>
                  <p className="text-sm text-muted-foreground">3D modeling, UV work, concept design and texturing</p>
                </div>
                <span className="text-sm text-accent flex items-center gap-2">
                  Case study
                  <ArrowRight size={14} />
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
