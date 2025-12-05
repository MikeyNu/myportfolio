import { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Download, Calendar, MapPin, User, Award, Target, Zap, Globe, Star, Clock, Coffee } from 'lucide-react';
import { ImageWithFallback } from './shared/ImageWithFallback';
import { RENDERS } from '../data/renderAssets';
import { motion, AnimatePresence } from 'motion/react';

const tools = [
  { name: 'Blender', category: '3D Modeling & Animation (Primary)', level: 95, color: '#FF7300' },
  { name: 'SketchUp', category: '3D Experience Design', level: 88, color: '#005F9E' },
  { name: 'Unreal Engine', category: 'Real-time & XR', level: 85, color: '#0E1128' },
  { name: 'Marvelous Designer', category: 'Cloth Simulation', level: 90, color: '#FF4081' },
  { name: 'Adobe Creative Suite', category: 'Design & Post-production', level: 88, color: '#FF0000' },
  { name: 'React/TypeScript', category: 'Web Development', level: 85, color: '#61DAFB' },
  { name: 'Three.js', category: 'WebGL & 3D Web', level: 80, color: '#000000' },
  { name: 'Unity', category: 'XR Development', level: 75, color: '#000000' },
  { name: 'Figma', category: 'UI/UX Design', level: 90, color: '#F24E1E' },
  { name: 'Node.js', category: 'Backend Development', level: 78, color: '#339933' }
];

const workProcess = [
  {
    step: '01',
    title: 'Discovery',
    description: 'Understanding brand guidelines, project requirements, and spatial constraints',
    icon: Target,
    color: '#9BB4FF'
  },
  {
    step: '02',
    title: 'Direction',
    description: 'Creating moodboards, layout plans, and establishing visual direction',
    icon: Star,
    color: '#00D9FF'
  },
  {
    step: '03',
    title: 'Modeling',
    description: '3D environment creation, brand application, and touchpoint development',
    icon: Zap,
    color: '#FF6B6B'
  },
  {
    step: '04',
    title: 'Camera/Renders',
    description: 'Strategic camera placement, lighting setup, and high-quality visualization',
    icon: Globe,
    color: '#4ECDC4'
  },
  {
    step: '05',
    title: 'Delivery',
    description: 'Final renders, POVs, plans, elevations, and comprehensive documentation',
    icon: Award,
    color: '#FFE66D'
  }
];

const expertiseAreas = [
  {
    title: '3D Experience Design',
    description: 'Creating immersive brand environments with SketchUp, Unreal Engine, and Blender',
    icon: Target,
    projects: 30,
    years: 3
  },
  {
    title: '3D Generalist Work',
    description: 'Full-spectrum 3D: modeling, texturing, lighting, animation with Blender expertise',
    icon: Zap,
    projects: 100,
    years: 7
  },
  {
    title: 'Website Development',
    description: 'Modern, responsive web applications using React, TypeScript, and cutting-edge frameworks',
    icon: Globe,
    projects: 50,
    years: 5
  },
  {
    title: 'Software Development',
    description: 'Custom software solutions with modern development practices and tools',
    icon: Star,
    projects: 15,
    years: 1
  },
  {
    title: 'XR Experiences',
    description: 'Immersive AR/VR solutions combining 3D artistry with real-time programming',
    icon: Award,
    projects: 20,
    years: 2
  },
  {
    title: 'Character & Cloth',
    description: 'Advanced character modeling and realistic cloth simulation with Marvelous Designer',
    icon: Coffee,
    projects: 40,
    years: 5
  }
];

const stats = [
  { number: '7+', label: 'Years 3D Experience', icon: Clock, color: '#9BB4FF' },
  { number: '5+', label: 'Years Development', icon: Star, color: '#00D9FF' },
  { number: '100+', label: 'Projects Delivered', icon: Award, color: '#FF6B6B' },
  { number: '100%', label: 'Remote Ready', icon: Globe, color: '#4ECDC4' }
];

export function CreativeAboutPage() {
  const [activeProcess, setActiveProcess] = useState(0);
  const [visibleSections, setVisibleSections] = useState<string[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.getAttribute('data-section');
            if (sectionId && !visibleSections.includes(sectionId)) {
              setVisibleSections(prev => [...prev, sectionId]);
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('[data-section]');
    elements.forEach(el => observer.observe(el));

    return () => {
      elements.forEach(el => observer.unobserve(el));
    };
  }, [visibleSections]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveProcess((prev) => (prev + 1) % workProcess.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-accent/10 rounded-full"
            initial={{
              x: Math.random() * 1200,
              y: Math.random() * 800,
            }}
            animate={{
              x: Math.random() * 1200,
              y: Math.random() * 800,
              scale: [1, 1.5, 1],
              opacity: [0.3, 1, 0.3],
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

      <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        {/* Hero Section */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24"
          data-section="hero"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div>
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
            >
              <User size={16} className="text-accent" />
              <span className="text-accent font-medium">About Michael</span>
            </motion.div>

            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Multi-Disciplinary{' '}
              <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                Designer
              </span>
              <br />
              & Developer
            </motion.h1>
            
            <motion.p 
              className="text-xl text-muted-foreground mb-4 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              I'm Michael Ndhlovu, a versatile creative professional combining multiple disciplines to deliver exceptional results.
            </motion.p>
            
            <motion.div
              className="space-y-3 mb-8 text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <p className="flex items-start gap-2">
                <span className="text-accent font-semibold mt-1">•</span>
                <span><strong className="text-foreground">3D Experience Designer</strong> (3+ years) — SketchUp, Unreal Engine, Blender</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-accent font-semibold mt-1">•</span>
                <span><strong className="text-foreground">3D Generalist</strong> (7+ years) — Blender specialist, Marvelous Designer, Adobe Creative Suite</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-accent font-semibold mt-1">•</span>
                <span><strong className="text-foreground">Web & Software Developer</strong> (5+ years web, 1+ year software)</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-accent font-semibold mt-1">•</span>
                <span><strong className="text-foreground">XR Experience Creator</strong> — Immersive AR/VR combining 3D & programming</span>
              </p>
            </motion.div>
            
            <motion.div 
              className="flex items-center gap-6 mb-10"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin size={16} className="text-accent" />
                <span>Remote Work</span>
              </div>
              <div className="text-muted-foreground">•</div>
              <div className="text-muted-foreground">Teams or Google Meet</div>
            </motion.div>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button size="lg" className="relative overflow-hidden group">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6 }}
                  />
                  <Calendar size={16} className="mr-2" />
                  Book a 15-min Intro Call
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button size="lg" variant="outline">
                  <Download size={16} className="mr-2" />
                  Download CV
                </Button>
              </motion.div>
            </motion.div>
          </div>

          <motion.div 
            className="relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <motion.div
              className="absolute -inset-4 bg-gradient-to-r from-accent/20 to-primary/20 rounded-2xl"
              animate={{
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <ImageWithFallback
              src={RENDERS.punchesTownArena}
              alt="Professional workspace"
              className="relative w-full h-96 object-cover rounded-2xl"
            />
            
            {/* Floating Stats */}
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  className="absolute bg-card/90 backdrop-blur-sm border border-border rounded-lg p-3 shadow-lg"
                  style={{
                    top: `${20 + index * 15}%`,
                    right: index % 2 === 0 ? '-10%' : 'auto',
                    left: index % 2 === 1 ? '-10%' : 'auto',
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 + index * 0.2 }}
                  whileHover={{ scale: 1.1 }}
                >
                  <div className="flex items-center gap-2">
                    <Icon size={16} style={{ color: stat.color }} />
                    <div>
                      <div className="font-bold text-sm" style={{ color: stat.color }}>
                        {stat.number}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

        {/* Expertise Section */}
        <motion.div 
          className="mb-24"
          data-section="expertise"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-16">
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-6"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, type: "spring" }}
            >
              <Award size={16} className="text-primary" />
              <span className="text-primary font-medium">Expertise</span>
            </motion.div>
            
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              Areas of{' '}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Specialization
              </span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {expertiseAreas.map((expertise, index) => {
              const Icon = expertise.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ y: -8 }}
                >
                  <Card className="border-border bg-card h-full group hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-8">
                      <div className="flex items-start justify-between mb-6">
                        <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                          <Icon size={24} className="text-accent" />
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-muted-foreground">Projects</div>
                          <div className="font-bold text-accent text-lg">
                            {expertise.projects}+
                          </div>
                        </div>
                      </div>
                      
                      <h3 className="font-bold text-foreground mb-4 group-hover:text-accent transition-colors">
                        {expertise.title}
                      </h3>
                      
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                        {expertise.description}
                      </p>

                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock size={14} className="text-accent" />
                        <span>{expertise.years} years experience</span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* How I Work Section */}
        <motion.div 
          className="mb-24"
          data-section="process"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-16">
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full mb-6"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, type: "spring" }}
            >
              <Zap size={16} className="text-accent" />
              <span className="text-accent font-medium">Process</span>
            </motion.div>
            
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              How I{' '}
              <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                Create
              </span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {workProcess.map((process, index) => {
              const Icon = process.icon;
              const isActive = activeProcess === index;
              
              return (
                <motion.div 
                  key={index}
                  className="text-center group cursor-pointer"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setActiveProcess(index)}
                >
                  <motion.div 
                    className={`w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 relative overflow-hidden ${
                      isActive ? 'ring-2 ring-offset-2 ring-offset-background' : ''
                    }`}
                    style={{ 
                      backgroundColor: process.color + '20',
                      ringColor: isActive ? process.color : undefined
                    }}
                    animate={isActive ? { scale: [1, 1.1, 1] } : { scale: 1 }}
                    transition={{ duration: 0.6 }}
                  >
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 rounded-2xl"
                        style={{ backgroundColor: process.color }}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 0.1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                    
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span 
                        className="font-bold text-sm absolute top-2 left-2"
                        style={{ color: process.color }}
                      >
                        {process.step}
                      </span>
                      <Icon 
                        size={28} 
                        style={{ color: process.color }}
                        className="relative z-10"
                      />
                    </div>
                  </motion.div>
                  
                  <h3 className={`font-bold mb-3 transition-colors ${
                    isActive ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'
                  }`}>
                    {process.title}
                  </h3>
                  
                  <AnimatePresence>
                    {isActive && (
                      <motion.p 
                        className="text-muted-foreground text-sm leading-relaxed"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {process.description}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Tools & Technology */}
        <motion.div 
          className="mb-24"
          data-section="tools"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-16">
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-6"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, type: "spring" }}
            >
              <Zap size={16} className="text-primary" />
              <span className="text-primary font-medium">Tools</span>
            </motion.div>
            
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              Tools &{' '}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Technology
              </span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tools.map((tool, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="border-border bg-card p-6 group hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-bold text-foreground group-hover:text-accent transition-colors">
                        {tool.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {tool.category}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-lg" style={{ color: tool.color }}>
                        {tool.level}%
                      </div>
                    </div>
                  </div>
                  
                  <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: tool.color }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${tool.level}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
                    />
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Experience Stats */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.05 }}
                className="group cursor-pointer"
              >
                <div className="p-6 bg-card border border-border rounded-xl group-hover:shadow-lg transition-all duration-300">
                  <motion.div
                    className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center"
                    style={{ backgroundColor: stat.color + '20' }}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Icon size={20} style={{ color: stat.color }} />
                  </motion.div>
                  
                  <motion.div 
                    className="text-3xl font-bold mb-2"
                    style={{ color: stat.color }}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ 
                      delay: index * 0.1 + 0.5, 
                      type: "spring", 
                      stiffness: 300 
                    }}
                  >
                    {stat.number}
                  </motion.div>
                  
                  <div className="text-muted-foreground font-medium">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}