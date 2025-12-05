import { useRef, useEffect, useState, useMemo } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ExternalLink, Sparkles, ChevronLeft, ChevronRight, RotateCcw, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { RENDERS } from '../data/renderAssets';
import * as THREE from 'three';

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
    agency: 'L\'Oréal',
    brand: 'CeraVe',
    role: '3D Experience Designer',
    involvement: 'Brand application, product displays, visitor flow',
    image: RENDERS.niveaActivation,
    tags: ['Brand Identity', 'Touchpoints', 'Plans'],
    color: '#00a8e6'
  },
  {
    id: '6',
    title: 'Heineken Pop-up Experience',
    agency: 'Heineken',
    brand: 'Heineken',
    role: '3D Experience Designer',
    involvement: 'Venue design, brand integration, social spaces',
    image: RENDERS.heinekenExperience,
    tags: ['Moodboard', 'POVs', 'No Grid'],
    color: '#00a651'
  }
];

interface ThreeJSHeroProps {
  onViewCaseStudy: (projectId: string) => void;
  onViewAllProjects: () => void;
}

export function ThreeJSHero({ onViewCaseStudy, onViewAllProjects }: ThreeJSHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const frameRef = useRef<number>();
  const mouseRef = useRef({ x: 0, y: 0 });
  const projectMeshesRef = useRef<THREE.Mesh[]>([]);
  const particlesRef = useRef<THREE.Points | null>(null);

  const [currentProject, setCurrentProject] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  const currentProjectData = projects[currentProject];

  // Initialize Three.js scene
  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Store refs
    sceneRef.current = scene;
    rendererRef.current = renderer;
    cameraRef.current = camera;

    // Position camera
    camera.position.set(0, 0, 8);

    // Create particle system
    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = 1000;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;

      const color = new THREE.Color(currentProjectData.color);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.03,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);
    particlesRef.current = particles;

    // Create project gallery - floating cube arrangement
    const textureLoader = new THREE.TextureLoader();
    const cubeGeometry = new THREE.BoxGeometry(1.5, 1, 0.05);

    projects.forEach((project, index) => {
      // Load texture
      textureLoader.load(
        project.image,
        (texture) => {
          const material = new THREE.MeshBasicMaterial({ 
            map: texture,
            transparent: true,
            opacity: index === currentProject ? 1 : 0.4
          });

          const cube = new THREE.Mesh(cubeGeometry, material);
          
          // Arrange cubes in a circular formation
          const angle = (index / projects.length) * Math.PI * 2;
          const radius = 4;
          cube.position.x = Math.cos(angle) * radius;
          cube.position.y = Math.sin(angle) * radius * 0.5;
          cube.position.z = Math.sin(angle) * 2;

          // Add brand color glow
          const glowGeometry = new THREE.BoxGeometry(1.6, 1.1, 0.1);
          const glowMaterial = new THREE.MeshBasicMaterial({
            color: project.color,
            transparent: true,
            opacity: index === currentProject ? 0.3 : 0.1,
            blending: THREE.AdditiveBlending
          });
          const glow = new THREE.Mesh(glowGeometry, glowMaterial);
          glow.position.copy(cube.position);
          glow.position.z -= 0.1;

          scene.add(cube);
          scene.add(glow);
          projectMeshesRef.current.push(cube);

          if (index === projects.length - 1) {
            setIsLoaded(true);
          }
        },
        undefined,
        (error) => {
          console.error('Error loading texture:', error);
          // Create fallback geometry
          const fallbackMaterial = new THREE.MeshBasicMaterial({ 
            color: project.color,
            transparent: true,
            opacity: index === currentProject ? 1 : 0.4
          });
          const cube = new THREE.Mesh(cubeGeometry, fallbackMaterial);
          
          const angle = (index / projects.length) * Math.PI * 2;
          const radius = 4;
          cube.position.x = Math.cos(angle) * radius;
          cube.position.y = Math.sin(angle) * radius * 0.5;
          cube.position.z = Math.sin(angle) * 2;

          scene.add(cube);
          projectMeshesRef.current.push(cube);

          if (index === projects.length - 1) {
            setIsLoaded(true);
          }
        }
      );
    });

    // Add ambient lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);

    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Handle mouse movement
    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };

    container.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);

      if (scene && camera && renderer && particles) {
        // Rotate particles
        particles.rotation.x += 0.001;
        particles.rotation.y += 0.002;

        // Mouse interaction
        camera.position.x += (mouseRef.current.x * 2 - camera.position.x) * 0.05;
        camera.position.y += (mouseRef.current.y * 2 - camera.position.y) * 0.05;
        camera.lookAt(0, 0, 0);

        // Auto-rotate scene
        if (isAutoRotating) {
          scene.rotation.y += 0.005;
        }

        // Animate project cubes
        projectMeshesRef.current.forEach((mesh, index) => {
          if (mesh) {
            // Floating animation
            mesh.position.y += Math.sin(Date.now() * 0.001 + index) * 0.002;
            mesh.rotation.z = Math.sin(Date.now() * 0.001 + index) * 0.1;

            // Highlight current project
            if (mesh.material && 'opacity' in mesh.material) {
              const targetOpacity = index === currentProject ? 1 : 0.4;
              mesh.material.opacity += (targetOpacity - mesh.material.opacity) * 0.1;
            }
          }
        });

        renderer.render(scene, camera);
      }
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (camera && renderer && container) {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      if (renderer) {
        container.removeChild(renderer.domElement);
        renderer.dispose();
      }
    };
  }, [currentProject, isAutoRotating]);

  // Update particle colors when project changes
  useEffect(() => {
    if (particlesRef.current && particlesRef.current.geometry.attributes.color) {
      const colors = particlesRef.current.geometry.attributes.color.array as Float32Array;
      const color = new THREE.Color(currentProjectData.color);
      
      for (let i = 0; i < colors.length; i += 3) {
        colors[i] = color.r;
        colors[i + 1] = color.g;
        colors[i + 2] = color.b;
      }
      
      particlesRef.current.geometry.attributes.color.needsUpdate = true;
    }
  }, [currentProject, currentProjectData.color]);

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
    <div className="relative h-screen overflow-hidden bg-gradient-to-br from-background via-card to-background">
      {/* Three.js Canvas Container */}
      <div ref={containerRef} className="absolute inset-0" />

      {/* Loading Screen */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            className="absolute inset-0 bg-background flex items-center justify-center z-50"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="text-center">
              <motion.div
                className="w-16 h-16 border-4 border-accent/30 border-t-accent rounded-full mx-auto mb-4"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <motion.p
                className="text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Loading 3D Portfolio Experience...
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content Overlay */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: isLoaded ? 0.5 : 2, duration: 0.8 }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentProject}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.6 }}
                >
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {currentProjectData.tags.map((tag, index) => (
                      <motion.div
                        key={tag}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Badge 
                          variant="secondary" 
                          className="bg-card/80 backdrop-blur-sm border border-border"
                          style={{ 
                            borderColor: currentProjectData.color + '40',
                            color: currentProjectData.color 
                          }}
                        >
                          {tag}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>

                  {/* Title */}
                  <motion.h1 
                    className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    {currentProjectData.title.split(' ').map((word, index) => (
                      <motion.span
                        key={index}
                        className="inline-block mr-3"
                        whileHover={{ 
                          color: currentProjectData.color,
                          scale: 1.05 
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        {word}
                      </motion.span>
                    ))}
                  </motion.h1>

                  {/* Project Details */}
                  <div className="space-y-3 mb-8">
                    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
                      <div className="flex items-center gap-2">
                        <span className="text-accent font-medium">Agency:</span>
                        <span className="text-foreground font-medium">{currentProjectData.agency}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-accent font-medium">Brand:</span>
                        <span className="text-foreground font-medium">{currentProjectData.brand}</span>
                      </div>
                    </div>
                    
                    <div className="text-muted-foreground">
                      <span className="text-accent font-medium">Role:</span> {currentProjectData.role} — 
                      <span className="ml-2">{currentProjectData.involvement}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button 
                        size="lg" 
                        className="relative overflow-hidden group"
                        style={{ backgroundColor: currentProjectData.color }}
                        onClick={() => onViewCaseStudy(currentProjectData.id)}
                      >
                        <motion.div
                          className="absolute inset-0 bg-white/20"
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
                        className="border-border hover:bg-accent/10"
                        onClick={onViewAllProjects}
                      >
                        <span className="flex items-center gap-2">
                          <ExternalLink size={18} />
                          All Projects
                        </span>
                      </Button>
                    </motion.div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Right side - 3D Scene controls placeholder */}
            <motion.div
              className="hidden lg:block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: isLoaded ? 1 : 2.5 }}
            >
              <div className="text-center text-muted-foreground">
                <motion.div
                  className="inline-flex items-center gap-2 px-4 py-2 bg-card/50 backdrop-blur-sm border border-border rounded-full mb-4"
                  whileHover={{ scale: 1.05 }}
                >
                  <Zap size={16} className="text-accent" />
                  <span>Interactive 3D Portfolio</span>
                </motion.div>
                <p className="text-sm">
                  Move your mouse to explore • Click and drag to rotate
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <motion.div 
        className="absolute bottom-8 left-6 right-6 z-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: isLoaded ? 1.2 : 3 }}
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
                title={isAutoRotating ? 'Pause rotation' : 'Resume rotation'}
              >
                <RotateCcw size={20} className={isAutoRotating ? 'text-accent' : ''} />
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
        className="absolute top-32 right-6 z-10"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: isLoaded ? 1.4 : 3.2 }}
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
        className="absolute top-6 left-6 z-10"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: isLoaded ? 1.6 : 3.4, type: "spring" }}
      >
        <motion.div
          className="w-12 h-12 rounded-full border-2 border-border backdrop-blur-sm"
          style={{ backgroundColor: currentProjectData.color + '80' }}
          animate={{ 
            boxShadow: `0 0 20px ${currentProjectData.color}40`,
          }}
          transition={{ 
            boxShadow: { duration: 2, repeat: Infinity, repeatType: "reverse" }
          }}
        />
      </motion.div>
    </div>
  );
}