import { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ChevronLeft, ChevronRight, Play, Pause, ExternalLink, Sparkles } from 'lucide-react';
import { ImageWithFallback } from './shared/ImageWithFallback';
import { RENDERS } from '../data/renderAssets';
import { motion, AnimatePresence } from 'motion/react';

interface Project {
  id: string;
  title: string;
  agency: string;
  brand: string;
  role: string;
  involvement: string;
  image: string;
  tags: string[];
  color: string;
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
    tags: ['Moodboard', 'Brand Identity', 'POVs'],
    color: '#e50914'
  },
  {
    id: '2',
    title: 'Arknights: Endfield - Gamescom 2025',
    agency: 'JHDS (Contract)',
    brand: 'Arknights: Endfield',
    role: '3D Experience Designer',
    involvement: '3D modeling, UV unwrapping, texturing, staff population, character cutouts',
    image: RENDERS.arknitghtsEndfieldHero,
    tags: ['Plan Layout', 'Elevations', 'Grid'],
    color: '#4a90e2'
  },
  {
    id: '3',
    title: 'Sonic Racing: CrossWorlds - Gamescom 2025',
    agency: 'JHDS (Contract)',
    brand: 'SEGA',
    role: '3D Experience Designer',
    involvement: 'UV unwrapping, texture fixing, character cutouts, game item creation',
    image: RENDERS.sonicHero,
    tags: ['Brand Identity', 'Touchpoints', 'POVs'],
    color: '#0066cc'
  },
  {
    id: '4',
    title: 'Genshin Impact Exhibition Booth',
    agency: 'Hoyoverse',
    brand: 'Genshin Impact',
    role: '3D Experience Designer',
    involvement: 'Spatial layouts, character displays, interactive zones',
    image: RENDERS.genshinImpact,
    tags: ['Plan Layout', 'Elevations', 'Grid'],
    color: '#4a90e2'
  },
  {
    id: '5',
    title: 'CeraVe Event Environment',
    agency: 'JHDS (Contractor)',
    brand: 'CeraVe',
    role: '3D Product Modeler',
    involvement: '3D modeling, UV unwrapping, texturing in Blender',
    image: RENDERS.cerave,
    tags: ['3D Modeling', 'Texturing', 'Blender'],
    color: '#00a8e6'
  },
  {
    id: '6',
    title: 'Hulu Deli Boys Food Truck',
    agency: 'JHDS (Contractor)',
    brand: 'Hulu',
    role: 'Designer & Builder',
    involvement: 'Design & build from client specifications, 3D product modeling, lighting setup',
    image: RENDERS.deliBoys,
    tags: ['3D Modeling', 'Design', 'Lighting'],
    color: '#1ce783'
  },
  {
    id: '7',
    title: 'Heineken Pop-up Experience',
    agency: 'JHDS (Contractor)',
    brand: 'Heineken',
    role: 'UV/Texture Artist',
    involvement: 'UV unwrapping and retexturing in SketchUp',
    image: RENDERS.heineken,
    tags: ['UV Mapping', 'Texturing', 'SketchUp'],
    color: '#00a651'
  },
  {
    id: '8',
    title: 'Pepsi Event Stand',
    agency: 'JHDS (Contractor)',
    brand: 'Pepsi',
    role: 'Designer & Builder',
    involvement: 'Design & build from client specifications using Blender and SketchUp',
    image: RENDERS.pepsi,
    tags: ['3D Modeling', 'Design', 'Blender', 'SketchUp'],
    color: '#004b93'
  }
];

interface CreativeHeroCarouselProps {
  onViewCaseStudy: (projectId: string) => void;
  onViewAllProjects: () => void;
}

export function CreativeHeroCarousel({ onViewCaseStudy, onViewAllProjects }: CreativeHeroCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const currentProject = projects[currentSlide];

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % projects.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => container.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % projects.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + projects.length) % projects.length);
  };

  return (
    <div ref={containerRef} className="relative h-screen overflow-hidden">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-accent/20 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              x: mousePosition.x * 100 + Math.random() * 50,
              y: mousePosition.y * 100 + Math.random() * 50,
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Dynamic Background Images with Parallax */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          className="absolute inset-0"
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        >
          <div 
            className="absolute inset-0 transform transition-transform duration-500 ease-out"
            style={{
              transform: `translate(${mousePosition.x * -20}px, ${mousePosition.y * -20}px) scale(1.1)`,
            }}
          >
            <ImageWithFallback
              src={currentProject.image}
              alt={currentProject.title}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Dynamic Gradient Overlay */}
          <motion.div 
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            style={{
              background: `linear-gradient(135deg, ${currentProject.color}20 0%, rgba(0,0,0,0.8) 50%, transparent 100%)`,
            }}
          />
          
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Main Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-4xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                {/* Floating Tags */}
                <motion.div 
                  className="flex flex-wrap gap-3 mb-6"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  {currentProject.tags.map((tag, index) => (
                    <motion.div
                      key={tag}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                    >
                      <Badge 
                        variant="secondary" 
                        className="bg-white/10 text-white border-white/20 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 cursor-pointer"
                        style={{ borderColor: currentProject.color + '40' }}
                      >
                        {tag}
                      </Badge>
                    </motion.div>
                  ))}
                </motion.div>
                
                {/* Main Title with Creative Typography */}
                <motion.h1 
                  className="text-4xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                >
                  <motion.span
                    className="inline-block"
                    whileHover={{ scale: 1.05, rotate: -1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    {currentProject.title.split(' ').map((word, index) => (
                      <motion.span
                        key={index}
                        className="inline-block mr-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                        whileHover={{ 
                          color: currentProject.color,
                          textShadow: `0 0 20px ${currentProject.color}40`
                        }}
                      >
                        {word}
                      </motion.span>
                    ))}
                  </motion.span>
                </motion.h1>
                
                {/* Animated Project Details */}
                <motion.div 
                  className="space-y-4 mb-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 text-lg text-white/90">
                    <motion.div
                      className="flex items-center gap-2"
                      whileHover={{ scale: 1.05 }}
                    >
                      <span className="text-accent font-medium">Agency:</span> 
                      <span className="font-medium">{currentProject.agency}</span>
                    </motion.div>
                    <motion.div
                      className="flex items-center gap-2"
                      whileHover={{ scale: 1.05 }}
                    >
                      <span className="text-accent font-medium">Brand:</span> 
                      <span className="font-medium">{currentProject.brand}</span>
                    </motion.div>
                  </div>
                  
                  <motion.div 
                    className="text-white/80 text-lg max-w-2xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    <span className="text-accent font-medium">Role:</span> {currentProject.role} — 
                    <span className="ml-2">{currentProject.involvement}</span>
                  </motion.div>
                </motion.div>

                {/* Action Buttons with Enhanced Styling */}
                <motion.div 
                  className="flex flex-col sm:flex-row gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.6 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button 
                      size="lg" 
                      className="bg-accent hover:bg-accent/90 text-accent-foreground relative overflow-hidden group min-w-[200px]"
                      onClick={() => onViewCaseStudy(currentProject.id)}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        initial={{ x: '-100%' }}
                        whileHover={{ x: '100%' }}
                        transition={{ duration: 0.6 }}
                      />
                      <span className="relative flex items-center gap-2">
                        <Sparkles size={18} />
                        View Case Study
                      </span>
                    </Button>
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button 
                      size="lg" 
                      variant="outline" 
                      className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm min-w-[180px]"
                      onClick={onViewAllProjects}
                    >
                      <span className="flex items-center gap-2">
                        <ExternalLink size={18} />
                        All Projects
                      </span>
                    </Button>
                  </motion.div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Enhanced Navigation */}
      <div className="absolute bottom-8 left-6 right-6 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            {/* Creative Slide Indicators */}
            <div className="flex space-x-2">
              {projects.map((project, index) => (
                <motion.button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`relative overflow-hidden rounded-full transition-all duration-300 ${
                    index === currentSlide ? 'w-12 h-4' : 'w-4 h-4'
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <div 
                    className={`w-full h-full rounded-full transition-all ${
                      index === currentSlide ? 'bg-accent' : 'bg-white/30'
                    }`}
                    style={{
                      backgroundColor: index === currentSlide ? project.color : undefined
                    }}
                  />
                  {index === currentSlide && (
                    <motion.div
                      className="absolute inset-0 bg-white/30 rounded-full"
                      initial={{ x: '-100%' }}
                      animate={{ x: '100%' }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Enhanced Controls */}
            <div className="flex items-center space-x-3 bg-black/20 backdrop-blur-sm rounded-full px-4 py-2">
              <motion.button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-2 text-white/70 hover:text-white transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
              </motion.button>
              
              <motion.button
                onClick={prevSlide}
                className="p-2 text-white/70 hover:text-white transition-colors"
                whileHover={{ scale: 1.1, x: -2 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronLeft size={24} />
              </motion.button>
              
              <motion.button
                onClick={nextSlide}
                className="p-2 text-white/70 hover:text-white transition-colors"
                whileHover={{ scale: 1.1, x: 2 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronRight size={24} />
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Creative Project Counter */}
      <motion.div 
        className="absolute top-32 right-6 z-10"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2 }}
      >
        <div className="bg-black/20 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/10">
          <div className="text-white/70 text-sm mb-1">Project</div>
          <div className="text-white font-mono text-lg">
            {String(currentSlide + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
          </div>
        </div>
      </motion.div>

      {/* Floating Brand Color Indicator */}
      <motion.div 
        className="absolute top-6 left-6 z-10"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.4, type: "spring" }}
      >
        <motion.div
          className="w-12 h-12 rounded-full border-2 border-white/30 backdrop-blur-sm"
          style={{ backgroundColor: currentProject.color + '80' }}
          animate={{ 
            boxShadow: `0 0 20px ${currentProject.color}40`,
            rotate: 360 
          }}
          transition={{ 
            boxShadow: { duration: 2, repeat: Infinity, repeatType: "reverse" },
            rotate: { duration: 20, repeat: Infinity, ease: "linear" }
          }}
        />
      </motion.div>
    </div>
  );
}