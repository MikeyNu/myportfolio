import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { ImageWithFallback } from './shared/ImageWithFallback';
import { RENDERS } from '../data/renderAssets';

interface Project {
  id: string;
  title: string;
  agency: string;
  brand: string;
  role: string;
  involvement: string;
  image: string;
  tags: string[];
}

const projects: Project[] = [
  {
    id: '1',
    title: 'Netflix Multi-Show Launch Display',
    agency: 'JHDS (Contract)',
    brand: 'Netflix',
    role: '3D Experience Designer',
    involvement: '3D modeling, UV unwrapping, van concept design, texturing',
    image: RENDERS.netflixHero,
    tags: ['Moodboard', 'Brand Identity', 'POVs']
  },
  {
    id: '2',
    title: 'Arknights: Endfield - Gamescom 2025',
    agency: 'JHDS (Contract)',
    brand: 'Arknights: Endfield',
    role: '3D Experience Designer',
    involvement: '3D modeling, UV unwrapping, texturing, staff population, character cutouts',
    image: RENDERS.arknitghtsEndfieldHero,
    tags: ['Plan Layout', 'Elevations', 'Grid']
  },
  {
    id: '3',
    title: 'Sonic Racing: CrossWorlds - Gamescom 2025',
    agency: 'JHDS (Contract)',
    brand: 'SEGA',
    role: '3D Experience Designer',
    involvement: 'UV unwrapping, texture fixing, character cutouts, game item creation',
    image: RENDERS.sonicHero,
    tags: ['Brand Identity', 'Touchpoints', 'POVs']
  },
  {
    id: '4',
    title: 'Genshin Impact Exhibition Booth',
    agency: 'Hoyoverse',
    brand: 'Genshin Impact',
    role: '3D Experience Designer',
    involvement: 'Spatial layouts, character displays, interactive zones',
    image: RENDERS.genshinImpact,
    tags: ['Plan Layout', 'Elevations', 'Grid']
  },
  {
    id: '5',
    title: 'CeraVe Event Environment',
    agency: 'JHDS (Contractor)',
    brand: 'CeraVe',
    role: '3D Product Modeler',
    involvement: '3D modeling, UV unwrapping, texturing in Blender',
    image: RENDERS.cerave,
    tags: ['3D Modeling', 'Texturing', 'Blender']
  },
  {
    id: '6',
    title: 'Hulu Deli Boys Food Truck',
    agency: 'JHDS (Contractor)',
    brand: 'Hulu',
    role: 'Designer & Builder',
    involvement: 'Design & build from client specifications, 3D product modeling, lighting setup',
    image: RENDERS.deliBoys,
    tags: ['3D Modeling', 'Design', 'Lighting']
  },
  {
    id: '7',
    title: 'Heineken Pop-up Experience',
    agency: 'JHDS (Contractor)',
    brand: 'Heineken',
    role: 'UV/Texture Artist',
    involvement: 'UV unwrapping and retexturing in SketchUp',
    image: RENDERS.heineken,
    tags: ['UV Mapping', 'Texturing', 'SketchUp']
  },
  {
    id: '8',
    title: 'Pepsi Event Stand',
    agency: 'JHDS (Contractor)',
    brand: 'Pepsi',
    role: 'Designer & Builder',
    involvement: 'Design & build from client specifications using Blender and SketchUp',
    image: RENDERS.pepsi,
    tags: ['3D Modeling', 'Design', 'Blender', 'SketchUp']
  }
];

interface HeroCarouselProps {
  onViewCaseStudy: (projectId: string) => void;
  onViewAllProjects: () => void;
}

export function HeroCarousel({ onViewCaseStudy, onViewAllProjects }: HeroCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % projects.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % projects.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const currentProject = projects[currentSlide];

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src={currentProject.image}
          alt={currentProject.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-3xl">
            <div className="flex flex-wrap gap-2 mb-4">
              {currentProject.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="bg-white/10 text-white border-white/20">
                  {tag}
                </Badge>
              ))}
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              {currentProject.title}
            </h1>
            
            <div className="text-xl text-white/90 mb-2">
              <span className="text-accent">Agency:</span> {currentProject.agency} · 
              <span className="text-accent ml-2">Brand:</span> {currentProject.brand}
            </div>
            
            <div className="text-lg text-white/80 mb-8">
              <span className="text-accent">Role:</span> {currentProject.role} — 
              <span className="ml-2">Involvement:</span> {currentProject.involvement}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-accent hover:bg-accent/90 text-accent-foreground"
                onClick={() => onViewCaseStudy(currentProject.id)}
              >
                View Case Study
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/30 text-white hover:bg-white/10"
                onClick={onViewAllProjects}
              >
                All Projects
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="absolute bottom-8 left-6 right-6 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            {/* Slide Indicators */}
            <div className="flex space-x-3">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentSlide ? 'bg-accent' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>

            {/* Controls */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-2 text-white/70 hover:text-white transition-colors"
              >
                <Play size={20} className={isPlaying ? 'opacity-100' : 'opacity-50'} />
              </button>
              
              <button
                onClick={prevSlide}
                className="p-2 text-white/70 hover:text-white transition-colors"
              >
                <ChevronLeft size={24} />
              </button>
              
              <button
                onClick={nextSlide}
                className="p-2 text-white/70 hover:text-white transition-colors"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Project Counter */}
      <div className="absolute top-32 right-6 z-10 text-white/70">
        <div className="text-sm">
          {String(currentSlide + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
        </div>
      </div>
    </div>
  );
}