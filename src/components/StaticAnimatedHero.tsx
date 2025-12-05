import { useEffect, useRef, useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ExternalLink, Sparkles, Play } from 'lucide-react';
import { motion } from 'motion/react';

interface Blob {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  opacity: number;
}

interface StaticAnimatedHeroProps {
  onViewCaseStudy: (projectId: string) => void;
  onViewAllProjects: () => void;
}

export function StaticAnimatedHero({ onViewCaseStudy, onViewAllProjects }: StaticAnimatedHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [blobs, setBlobs] = useState<Blob[]>([]);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);
  const animationRef = useRef<number>();

  // Color palette for blobs
  const colors = ['#9BB4FF', '#8B5CF6', '#06B6D4', '#84CC16', '#F59E0B', '#EF4444'];

  // Initialize blobs and particles
  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const rect = container.getBoundingClientRect();

    // Create blobs
    const newBlobs: Blob[] = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * rect.width,
      y: Math.random() * rect.height,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      size: 60 + Math.random() * 100,
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: 0.1 + Math.random() * 0.3,
    }));

    // Create particles
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 10,
    }));

    setBlobs(newBlobs);
    setParticles(newParticles);
  }, []);

  // Blob physics animation
  useEffect(() => {
    if (!containerRef.current || blobs.length === 0) return;

    const animate = () => {
      setBlobs(prevBlobs => {
        const container = containerRef.current;
        if (!container) return prevBlobs;

        const rect = container.getBoundingClientRect();
        
        return prevBlobs.map(blob => {
          let { x, y, vx, vy } = blob;
          
          // Update position
          x += vx;
          y += vy;
          
          // Bounce off walls with damping
          if (x <= blob.size / 2 || x >= rect.width - blob.size / 2) {
            vx *= -0.8;
            x = Math.max(blob.size / 2, Math.min(rect.width - blob.size / 2, x));
          }
          if (y <= blob.size / 2 || y >= rect.height - blob.size / 2) {
            vy *= -0.8;
            y = Math.max(blob.size / 2, Math.min(rect.height - blob.size / 2, y));
          }
          
          // Add some friction
          vx *= 0.995;
          vy *= 0.995;
          
          // Random impulse occasionally
          if (Math.random() < 0.001) {
            vx += (Math.random() - 0.5) * 0.5;
            vy += (Math.random() - 0.5) * 0.5;
          }
          
          return { ...blob, x, y, vx, vy };
        });
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [blobs.length]);

  // Blob collision detection
  useEffect(() => {
    const checkCollisions = () => {
      setBlobs(prevBlobs => {
        const newBlobs = [...prevBlobs];
        
        for (let i = 0; i < newBlobs.length; i++) {
          for (let j = i + 1; j < newBlobs.length; j++) {
            const blob1 = newBlobs[i];
            const blob2 = newBlobs[j];
            
            const dx = blob2.x - blob1.x;
            const dy = blob2.y - blob1.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const minDistance = (blob1.size + blob2.size) / 2;
            
            if (distance < minDistance) {
              // Collision detected - soft cloth-like response
              const angle = Math.atan2(dy, dx);
              const targetX = blob1.x + Math.cos(angle) * minDistance;
              const targetY = blob1.y + Math.sin(angle) * minDistance;
              
              const ax = (targetX - blob2.x) * 0.02;
              const ay = (targetY - blob2.y) * 0.02;
              
              // Soft velocity exchange
              const vx1 = blob1.vx * 0.9 + blob2.vx * 0.1;
              const vy1 = blob1.vy * 0.9 + blob2.vy * 0.1;
              const vx2 = blob2.vx * 0.9 + blob1.vx * 0.1;
              const vy2 = blob2.vy * 0.9 + blob1.vy * 0.1;
              
              newBlobs[i] = { ...blob1, vx: vx1, vy: vy1 };
              newBlobs[j] = { ...blob2, vx: vx2 + ax, vy: vy2 + ay };
            }
          }
        }
        
        return newBlobs;
      });
    };

    const interval = setInterval(checkCollisions, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative h-screen overflow-hidden bg-gradient-to-br from-background via-card to-background"
    >
      {/* Animated Background Particles */}
      <div className="absolute inset-0">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-1 h-1 bg-accent/20 rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={{
              x: [0, Math.random() * 200 - 100, 0],
              y: [0, Math.random() * 200 - 100, 0],
              scale: [1, 1.5, 1],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Floating Blobs */}
      <div className="absolute inset-0">
        {blobs.map((blob) => (
          <motion.div
            key={blob.id}
            className="absolute rounded-full blur-xl"
            style={{
              left: blob.x - blob.size / 2,
              top: blob.y - blob.size / 2,
              width: blob.size,
              height: blob.size,
              backgroundColor: blob.color,
              opacity: blob.opacity,
              filter: 'blur(40px)',
            }}
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Cloth-like Wave Effect */}
      <div className="absolute inset-0">
        <svg className="w-full h-full opacity-10" viewBox="0 0 1200 800">
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#9BB4FF" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          
          <motion.path
            d="M0,400 Q300,300 600,400 T1200,400 L1200,800 L0,800 Z"
            fill="url(#waveGradient)"
            animate={{
              d: [
                "M0,400 Q300,300 600,400 T1200,400 L1200,800 L0,800 Z",
                "M0,450 Q300,350 600,450 T1200,450 L1200,800 L0,800 Z",
                "M0,400 Q300,500 600,400 T1200,400 L1200,800 L0,800 Z",
                "M0,400 Q300,300 600,400 T1200,400 L1200,800 L0,800 Z",
              ],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </svg>
      </div>

      {/* Main Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-6xl mx-auto px-6 w-full">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              {/* Header Badge */}
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 bg-card/80 backdrop-blur-sm border border-border rounded-full mb-8"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                <span className="text-sm text-muted-foreground">3D Experience Designer</span>
              </motion.div>

              {/* Main Title */}
              <motion.h1 
                className="text-5xl md:text-7xl lg:text-8xl font-bold text-foreground mb-8 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                Michael{' '}
                <motion.span
                  className="text-transparent bg-gradient-to-r from-accent to-primary bg-clip-text"
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  Ndhlovu
                </motion.span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p 
                className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
              >
                Crafting immersive 3D brand experiences for{' '}
                <span className="text-foreground font-medium">Netflix</span>,{' '}
                <span className="text-foreground font-medium">Hoyoverse</span>,{' '}
                <span className="text-foreground font-medium">CeraVe</span>, and other industry leaders.
              </motion.p>

              {/* Key Specialties */}
              <motion.div
                className="flex flex-wrap gap-3 mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
              >
                {['3D Modeling', 'Spatial Design', 'Brand Integration', 'Experience Design'].map((specialty, index) => (
                  <motion.div
                    key={specialty}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.4 + index * 0.1 }}
                  >
                    <Badge 
                      variant="secondary" 
                      className="bg-card/60 backdrop-blur-sm text-foreground border-border/50 px-4 py-2 text-sm"
                    >
                      {specialty}
                    </Badge>
                  </motion.div>
                ))}
              </motion.div>

              {/* Call to Action */}
              <motion.div 
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6, duration: 0.8 }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    size="lg" 
                    className="bg-accent text-accent-foreground hover:bg-accent/90 px-8 py-6 text-lg"
                    onClick={onViewAllProjects}
                  >
                    <Play size={20} className="mr-2" />
                    Explore Portfolio
                  </Button>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-border text-foreground hover:bg-muted px-8 py-6 text-lg"
                    onClick={() => onViewCaseStudy('1')}
                  >
                    <Sparkles size={20} className="mr-2" />
                    Featured Work
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Status Indicator */}
      <motion.div 
        className="absolute bottom-8 right-6 z-10"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        <div className="bg-card/80 backdrop-blur-sm border border-border rounded-lg px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <div>
              <div className="text-sm text-foreground font-medium">Available for Projects</div>
              <div className="text-xs text-muted-foreground">Remote • Teams/Google Meet</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Experience Badge */}
      <motion.div 
        className="absolute top-6 right-6 z-10"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2.2, type: "spring", stiffness: 200 }}
      >
        <div className="bg-card/80 backdrop-blur-sm border border-border rounded-full w-20 h-20 flex flex-col items-center justify-center">
          <div className="text-2xl font-bold text-accent">2+</div>
          <div className="text-xs text-muted-foreground">Years</div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.4, duration: 0.8 }}
      >
        <motion.div
          className="flex flex-col items-center gap-2 text-muted-foreground"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="text-xs uppercase tracking-wider">Scroll to explore</div>
          <div className="w-px h-8 bg-border" />
        </motion.div>
      </motion.div>
    </div>
  );
}