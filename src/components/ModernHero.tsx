import { useEffect, useRef, useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ExternalLink, Sparkles, Play, ArrowRight, Grid3x3, Box, Layers3 } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';

interface ModernHeroProps {
  onViewCaseStudy: (projectId: string) => void;
  onViewAllProjects: () => void;
}

export function ModernHero({ onViewCaseStudy, onViewAllProjects }: ModernHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Parallax effects
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const rotate = useTransform(scrollY, [0, 500], [0, 5]);

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

  const brands = ['Netflix', 'Hoyoverse', 'CeraVe', 'Heineken', 'Discovery', 'Sega'];

  return (
    <div 
      ref={containerRef}
      className="relative min-h-[560px] md:min-h-[640px] lg:h-[calc(100vh-5rem)] overflow-hidden bg-background pb-8 lg:pb-0"
    >
      {/* Geometric Background Elements */}
      <div className="absolute inset-0">
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(155, 180, 255, 0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(155, 180, 255, 0.5) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`,
          }}
        />

        {/* Floating Geometric Shapes */}
        <motion.div
          className="absolute top-20 right-20 w-32 h-32 border border-accent/20 rotate-45"
          style={{ y: y1, rotate }}
          animate={{
            rotateZ: [45, 135, 45],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        <motion.div
          className="absolute bottom-32 left-16 w-24 h-24 border-2 border-accent/30 rounded-full"
          style={{ y: y2 }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute top-1/2 right-10 w-16 h-16"
          style={{ y: y1 }}
          animate={{
            rotateY: [0, 180, 360],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <div className="w-full h-full border border-accent/40 transform rotate-12" />
        </motion.div>

        {/* Wireframe Elements */}
        <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 1200 800">
          <defs>
            <linearGradient id="wireframeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.1" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
            </linearGradient>
          </defs>
          
          <motion.path
            d="M200,150 L400,100 L600,200 L800,120 L1000,180"
            stroke="url(#wireframeGradient)"
            strokeWidth="2"
            fill="none"
            className="text-accent"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, delay: 1 }}
          />
          
          <motion.path
            d="M100,300 L300,250 L500,350 L700,280 L900,340"
            stroke="url(#wireframeGradient)"
            strokeWidth="2"
            fill="none"
            className="text-primary"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, delay: 1.5 }}
          />
        </svg>

        {/* Floating Particles */}
        {Array.from({ length: typeof window !== 'undefined' && window.innerWidth < 768 ? 8 : 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-accent/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.4, 1, 0.4],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {/* Professional Badge */}
                <motion.div
                  className="hidden sm:inline-flex items-center gap-3 px-4 py-2 bg-card/50 border border-border rounded-full mb-6 sm:mb-8"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  <Box size={16} className="text-accent" />
                  <span className="text-sm text-muted-foreground">Multi-Disciplinary Designer & Developer</span>
                  <div className="w-1 h-1 bg-accent rounded-full animate-pulse" />
                  <span className="text-sm text-muted-foreground">7+ Years</span>
                </motion.div>

                {/* Main Title */}
                <motion.div
                  className="mb-4 sm:mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                >
                  <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl leading-tight mb-4">tight mb-4">
                    <span className="block text-foreground">Michael</span>
                    <span className="block gradient-text">Ndhlovu</span>
                  </h1>
                </motion.div>

                {/* Subtitle */}
                <motion.p
                  className="text-base md:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 md:mb-10 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  Crafting immersive 3D experiences, interactive websites, custom software, and XR solutions 
                  through technical excellence and creative innovation. Blender specialist with full-stack capabilities.
                </motion.p>

                {/* Brand Carousel */}
                <motion.div
                  className="mb-6 sm:mb-8 md:mb-10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.8 }}
                >
                  <div className="text-sm text-muted-foreground mb-2 sm:mb-3">Trusted by</div>
                  <div className="flex flex-wrap gap-4">
                    {brands.map((brand, index) => (
                      <motion.div
                        key={brand}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.2 + index * 0.1 }}
                        className="group"
                      >
                        <Badge 
                          variant="outline" 
                          className="px-4 py-2 bg-background/50 border-border/50 hover:border-accent/50 hover:bg-accent/5 transition-all duration-300 cursor-pointer"
                        >
                          {brand}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Call to Action */}
                <motion.div 
                  className="flex flex-col sm:flex-row gap-3 sm:gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4, duration: 0.8 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full sm:w-auto"
                  >
                    <Button 
                      size="lg" 
                      className="w-full sm:w-auto bg-accent text-accent-foreground hover:bg-accent/90 px-8 py-6 min-h-[48px] text-base group"
                      onClick={onViewAllProjects}
                    >
                      <Play size={20} className="mr-2 group-hover:translate-x-1 transition-transform" />
                      Explore Portfolio
                    </Button>
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full sm:w-auto"
                  >
                    <Button 
                      size="lg" 
                      variant="outline" 
                      className="w-full sm:w-auto border-border text-foreground hover:bg-muted px-8 py-6 min-h-[48px] text-base group"
                      onClick={() => onViewCaseStudy('1')}
                    >
                      <Sparkles size={20} className="mr-2 group-hover:rotate-12 transition-transform" />
                      Featured Work
                      <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-4">
              <motion.div
                className="space-y-8"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.6, duration: 0.8 }}
              >
                {/* Skills */}
                <div className="bg-card/30 border border-border rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Layers3 size={20} className="text-accent" />
                    <h3 className="font-medium text-foreground">Core Expertise</h3>
                  </div>
                  <div className="space-y-3">
                    {[
                      { skill: '3D Modeling & Rendering', level: 95 },
                      { skill: 'Spatial Design', level: 90 },
                      { skill: 'Brand Integration', level: 88 },
                      { skill: 'Experience Design', level: 92 }
                    ].map((item, index) => (
                      <motion.div
                        key={item.skill}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.8 + index * 0.1 }}
                      >
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-foreground">{item.skill}</span>
                          <span className="text-muted-foreground">{item.level}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-1.5">
                          <motion.div 
                            className="bg-accent h-1.5 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${item.level}%` }}
                            transition={{ delay: 2 + index * 0.1, duration: 1 }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Status */}
                <div className="bg-card/30 border border-border rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <h3 className="font-medium text-foreground">Availability</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Currently available for new projects and collaborations.
                  </p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Grid3x3 size={14} />
                    <span>Remote • Teams/Google Meet</span>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-card/30 border border-border rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-accent mb-1">15+</div>
                    <div className="text-xs text-muted-foreground">Projects</div>
                  </div>
                  <div className="bg-card/30 border border-border rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-accent mb-1">6</div>
                    <div className="text-xs text-muted-foreground">Major Brands</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.4, duration: 0.8 }}
      >
        <motion.div
          className="flex flex-col items-center gap-2 text-muted-foreground cursor-pointer group"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        >
          <div className="text-xs uppercase tracking-wider group-hover:text-accent transition-colors">
            Scroll to explore
          </div>
          <div className="w-px h-8 bg-border group-hover:bg-accent transition-colors" />
        </motion.div>
      </motion.div>

      {/* Background Accent */}
      <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-gradient-to-tl from-accent/5 to-transparent pointer-events-none" />
    </div>
  );
}