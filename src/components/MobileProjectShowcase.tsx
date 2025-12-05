import { ImageWithFallback } from './shared/ImageWithFallback';
import { RENDERS } from '../data/renderAssets';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Button } from './ui/button';

interface MobileProjectShowcaseProps {
  onViewCaseStudy: (projectId: string) => void;
  onViewAllProjects: () => void;
}

const featuredWork = [
  { id: '1', img: RENDERS.netflixHero, brand: 'Netflix', category: 'Branded Vehicles' },
  { id: '2', img: RENDERS.sonicHero, brand: 'SEGA', category: 'Gaming' },
  { id: '3', img: RENDERS.arknitghtsEndfieldHero, brand: 'Arknights', category: 'Exhibition' },
  { id: '5', img: RENDERS.cerave, brand: 'CeraVe', category: 'Events' },
  { id: '6', img: RENDERS.deliBoys, brand: 'Hulu', category: 'Branded Vehicles' },
  { id: '4', img: RENDERS.genshinImpact, brand: 'Genshin Impact', category: 'Gaming' }
];

export function MobileProjectShowcase({ 
  onViewCaseStudy, 
  onViewAllProjects 
}: MobileProjectShowcaseProps) {
  return (
    <section className="md:hidden py-8 sm:py-12 bg-background">
      <div className="px-4">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-1.5">
              Featured Work
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              Recent projects for global brands
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onViewAllProjects}
            className="flex items-center gap-1 text-accent hover:text-accent hover:bg-accent/10 min-h-[44px]"
          >
            All
            <ArrowRight size={14} />
          </Button>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-2 gap-4 sm:gap-5">
          {featuredWork.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onViewCaseStudy(project.id)}
              className="relative cursor-pointer group touch-feedback"
            >
              {/* Project Card */}
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-lg">
                <ImageWithFallback
                  src={project.img}
                  alt={project.brand}
                  className="w-full h-full object-cover transition-transform duration-300 group-active:scale-105"
                  loading="lazy"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                  <div className="text-xs sm:text-sm text-white/80 mb-0.5 sm:mb-1 font-medium">{project.category}</div>
                  <div className="font-bold text-white text-sm sm:text-base line-clamp-1">
                    {project.brand}
                  </div>
                </div>
                
                {/* Tap Indicator */}
                <div className="absolute top-3 right-3 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-active:opacity-100 transition-opacity">
                  <ArrowRight size={16} className="text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All CTA */}
        <Button
          onClick={onViewAllProjects}
          className="w-full mt-6 h-12 text-base min-h-[48px]"
          variant="outline"
        >
          View All Projects
          <ArrowRight size={16} className="ml-2" />
        </Button>
      </div>
    </section>
  );
}
