import { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ExternalLink, Sparkles, ChevronLeft, ChevronRight, RotateCcw, Zap, Play, Pause } from 'lucide-react';
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

interface CSS3DHeroProps {
  onViewCaseStudy: (projectId: string) => void;
  onViewAllProjects: () => void;
}

export function CSS3DHero({ onViewCaseStudy, onViewAllProjects }: CSS3DHeroProps) {
  const [currentProject, setCurrentProject] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const currentProjectData = projects[currentProject];

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

  useEffect(() => {
    if (!isAutoRotating) return;

    const interval = setInterval(() => {
      setCurrentProject((prev) => (prev + 1) % projects.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoRotating]);

  const nextProject = () => {
    setCurrentProject((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const goToProject = (index: number) => {
    setCurrentProject(index);
  };

  return (
    <div 
      ref={containerRef}
      className="relative h-screen overflow-hidden bg-gradient-to-br from-background via-card to-background"
      style={{
        perspective: '1000px',
      }}
    >
      {/* 3D Floating Particles Background */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 100 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              backgroundColor: currentProjectData.color + '30',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              scale: [1, Math.random() + 0.5, 1],
              opacity: [0.3, 1, 0.3],
              rotateZ: [0, 360],
            }}
            transition={{
              duration: 8 + Math.random() * 12,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* 3D Project Gallery */}
      <div 
        className="absolute inset-0 flex items-center justify-center"
        style={{
          transformStyle: 'preserve-3d',
          transform: `rotateX(${mousePosition.y * 20 - 10}deg) rotateY(${mousePosition.x * 20 - 10}deg)`,
        }}
      >
        <motion.div
          className="relative"
          animate={isAutoRotating ? { rotateY: 360 } : {}}
          transition={isAutoRotating ? { 
            duration: 20, 
            repeat: Infinity, 
            ease: "linear" 
          } : {}}
          style={{
            transformStyle: 'preserve-3d',
            width: '800px',
            height: '600px',
          }}
        >
          {projects.map((project, index) => {
            const angle = (index / projects.length) * 360;
            const isActive = index === currentProject;
            
            return (
              <motion.div
                key={project.id}
                className={`absolute cursor-pointer group ${
                  isActive ? 'z-20' : 'z-10'
                }`}
                style={{
                  transformStyle: 'preserve-3d',
                  transform: `
                    rotateY(${angle}deg) 
                    translateZ(${isActive ? '350px' : '250px'}) 
                    scale(${isActive ? '1.2' : '0.8'})
                  `,
                  width: '300px',
                  height: '200px',
                  left: '50%',
                  top: '50%',
                  marginLeft: '-150px',
                  marginTop: '-100px',
                }}
                onClick={() => goToProject(index)}
                whileHover={{ scale: isActive ? 1.3 : 0.9 }}
                transition={{ duration: 0.3 }}
              >
                {/* Project Card */}
                <div className={`relative w-full h-full rounded-xl overflow-hidden shadow-2xl transition-all duration-500 ${
                  isActive ? 'shadow-accent/50' : 'shadow-black/20'
                }`}>
                  {/* Image */}
                  <ImageWithFallback
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Gradient Overlay */}
                  <div 
                    className="absolute inset-0 opacity-60"
                    style={{
                      background: `linear-gradient(135deg, ${project.color}80 0%, transparent 70%)`,
                    }}
                  />
                  
                  {/* Brand Color Border */}
                  <div 
                    className={`absolute inset-0 border-4 rounded-xl transition-all duration-300 ${
                      isActive ? 'border-opacity-100' : 'border-opacity-30'
                    }`}
                    style={{ borderColor: project.color }}
                  />

                  {/* Content Overlay */}
                  <div className="absolute inset-0 p-4 flex flex-col justify-end text-white">
                    <div className="transform transition-all duration-300 group-hover:translate-y-0 translate-y-4">
                      <Badge 
                        className="mb-2 bg-black/50 text-white border-white/20"
                        style={{ backgroundColor: project.color + '80' }}
                      >
                        {project.agency}
                      </Badge>
                      <h3 className={`font-bold leading-tight transition-all duration-300 ${
                        isActive ? 'text-lg' : 'text-base'
                      }`}>
                        {project.title}
                      </h3>
                    </div>
                  </div>

                  {/* Floating Elements */}
                  {isActive && (
                    <>
                      {/* Orbiting Elements */}
                      {project.tags.map((tag, tagIndex) => (
                        <motion.div
                          key={tag}
                          className="absolute text-xs px-2 py-1 bg-black/70 text-white rounded-full"
                          style={{
                            left: '50%',
                            top: '50%',
                            marginLeft: '-20px',
                            marginTop: '-10px',
                          }}
                          animate={{
                            rotateZ: 360,
                            x: Math.cos((tagIndex / project.tags.length) * 2 * Math.PI + Date.now() * 0.001) * 60,
                            y: Math.sin((tagIndex / project.tags.length) * 2 * Math.PI + Date.now() * 0.001) * 60,
                          }}
                          transition={{
                            rotateZ: { duration: 10, repeat: Infinity, ease: "linear" },
                            x: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                            y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                          }}
                        >
                          {tag}
                        </motion.div>
                      ))}
                    </>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Content Overlay */}
      <div className="relative z-30 h-full flex items-center">
        <div className="max-w-6xl mx-auto px-6 w-full">
          <div className="max-w-2xl">
            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentProject}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  {/* Clean Tags */}
                  <div className="flex flex-wrap gap-3 mb-8">
                    {currentProjectData.tags.map((tag) => (
                      <Badge 
                        key={tag}
                        variant="secondary" 
                        className="bg-background/80 text-muted-foreground border-border/50 px-3 py-1"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Clean Title */}
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-8 leading-tight">
                    {currentProjectData.title}
                  </h1>

                  {/* Simplified Project Details */}
                  <div className="space-y-4 mb-10">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
                      <div>
                        <span className="text-muted-foreground">Agency</span>
                        <div className="font-medium text-foreground">{currentProjectData.agency}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Brand</span>
                        <div className="font-medium text-foreground">{currentProjectData.brand}</div>
                      </div>
                    </div>
                    
                    <div>
                      <span className="text-muted-foreground">Role</span>
                      <div className="font-medium text-foreground">{currentProjectData.role}</div>
                      <div className="text-muted-foreground mt-1">{currentProjectData.involvement}</div>
                    </div>
                  </div>

                  {/* Clean Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button 
                      size="lg" 
                      className="bg-foreground text-background hover:bg-foreground/90"
                      onClick={() => onViewCaseStudy(currentProjectData.id)}
                    >
                      <Sparkles size={18} className="mr-2" />
                      View Case Study
                    </Button>
                    
                    <Button 
                      size="lg" 
                      variant="outline" 
                      className="border-border text-foreground hover:bg-muted"
                      onClick={onViewAllProjects}
                    >
                      <ExternalLink size={18} className="mr-2" />
                      All Projects
                    </Button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <motion.div 
        className="absolute bottom-8 left-6 right-6 z-30"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            {/* Project Indicators */}
            <div className="flex space-x-2">
              {projects.map((project, index) => (
                <motion.button
                  key={index}
                  onClick={() => goToProject(index)}
                  className={`relative overflow-hidden rounded-full transition-all duration-300 ${
                    index === currentProject ? 'w-12 h-4' : 'w-4 h-4'
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <div 
                    className={`w-full h-full rounded-full transition-all ${
                      index === currentProject ? 'opacity-100' : 'opacity-40'
                    }`}
                    style={{
                      backgroundColor: project.color
                    }}
                  />
                  {index === currentProject && (
                    <motion.div
                      className="absolute inset-0 bg-white/30 rounded-full"
                      initial={{ x: '-100%' }}
                      animate={{ x: '100%' }}
                      transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                    />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Controls */}
            <div className="flex items-center space-x-3 bg-card/80 backdrop-blur-sm border border-border rounded-full px-4 py-2">
              <motion.button
                onClick={() => setIsAutoRotating(!isAutoRotating)}
                className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                title={isAutoRotating ? 'Pause auto-play' : 'Resume auto-play'}
              >
                {isAutoRotating ? <Pause size={20} className="text-accent" /> : <Play size={20} />}
              </motion.button>
              
              <motion.button
                onClick={prevProject}
                className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                whileHover={{ scale: 1.1, x: -2 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronLeft size={24} />
              </motion.button>
              
              <motion.button
                onClick={nextProject}
                className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                whileHover={{ scale: 1.1, x: 2 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronRight size={24} />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Project Counter */}
      <motion.div 
        className="absolute top-32 right-6 z-30"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.4 }}
      >
        <div className="bg-card/80 backdrop-blur-sm border border-border rounded-lg px-4 py-2">
          <div className="text-muted-foreground text-sm mb-1">Project</div>
          <div className="text-foreground font-mono text-lg">
            {String(currentProject + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
          </div>
        </div>
      </motion.div>

      {/* Brand Color Indicator */}
      <motion.div 
        className="absolute top-6 left-6 z-30"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.6, type: "spring" }}
      >
        <motion.div
          className="w-12 h-12 rounded-full border-2 border-border backdrop-blur-sm flex items-center justify-center"
          style={{ backgroundColor: currentProjectData.color + '20' }}
          animate={{ 
            boxShadow: `0 0 20px ${currentProjectData.color}40`,
          }}
          transition={{ 
            boxShadow: { duration: 2, repeat: Infinity, repeatType: "reverse" }
          }}
        >
          <div 
            className="w-6 h-6 rounded-full"
            style={{ backgroundColor: currentProjectData.color }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}