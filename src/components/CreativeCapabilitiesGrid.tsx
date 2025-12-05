import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Box, Layout, Palette, Layers, MapPin, Camera, Sparkles, Zap, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Capability {
  icon: any;
  title: string;
  description: string;
  color: string;
  gradient: string;
  skills: string[];
  stats: {
    projects: number;
    experience: string;
  };
}

const capabilities: Capability[] = [
  {
    icon: Box,
    title: '3D Modeling from Direction',
    description: '3D modelling of brand experiences from clear direction (Moodboard, Plan Layout, Brand Identity)',
    color: '#9BB4FF',
    gradient: 'from-blue-500/20 to-purple-500/20',
    skills: ['Blender', 'Cinema 4D', 'Brand Guidelines'],
    stats: { projects: 15, experience: '2 years' }
  },
  {
    icon: Layout,
    title: 'Plans & Elevations',
    description: '3D modeling designs from layout plans & elevations',
    color: '#00D9FF',
    gradient: 'from-cyan-500/20 to-blue-500/20',
    skills: ['AutoCAD', 'SketchUp', 'Technical Drawing'],
    stats: { projects: 12, experience: '1.5 years' }
  },
  {
    icon: Layers,
    title: 'Reference-Based Modeling',
    description: '3D Modelling touchpoints from supplied references',
    color: '#FF6B6B',
    gradient: 'from-red-500/20 to-pink-500/20',
    skills: ['Reference Study', 'Detail Work', 'Asset Creation'],
    stats: { projects: 20, experience: '2 years' }
  },
  {
    icon: Palette,
    title: 'Brand Identity Application',
    description: 'Applying client brand identity across all assets and touchpoints',
    color: '#4ECDC4',
    gradient: 'from-teal-500/20 to-cyan-500/20',
    skills: ['Brand Systems', 'Color Theory', 'Visual Consistency'],
    stats: { projects: 18, experience: '2 years' }
  },
  {
    icon: MapPin,
    title: 'Spatial Layouts',
    description: 'Basic spatial layouts for stands, pop-ups, and events',
    color: '#FFE66D',
    gradient: 'from-yellow-500/20 to-orange-500/20',
    skills: ['Space Planning', 'User Flow', 'Event Design'],
    stats: { projects: 10, experience: '1.5 years' }
  },
  {
    icon: Camera,
    title: 'Visualization & Renders',
    description: 'Visualising designs via clear camera work & renders (touchpoint POVs, plans, elevations, with & without layout grid)',
    color: '#A8E6CF',
    gradient: 'from-green-500/20 to-teal-500/20',
    skills: ['V-Ray', 'Octane', 'Lighting', 'Post-Processing'],
    stats: { projects: 25, experience: '2 years' }
  }
];

export function CreativeCapabilitiesGrid() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedCapability, setSelectedCapability] = useState<number | null>(null);

  return (
    <section className="py-20 bg-background relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-accent/10 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            transition={{
              duration: 10 + Math.random() * 20,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear",
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Creative Header */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full mb-6"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: "spring" }}
          >
            <Sparkles size={16} className="text-accent" />
            <span className="text-accent font-medium">Core Capabilities</span>
          </motion.div>
          
          <motion.h2 
            className="text-4xl md:text-6xl font-bold text-foreground mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <span className="bg-gradient-to-r from-foreground via-accent to-primary bg-clip-text text-transparent">
              Specialized in Creating
            </span>
            <br />
            <span className="text-accent">Immersive 3D Experiences</span>
          </motion.h2>
          
          <motion.p 
            className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            From concept to final render, I bring brand experiences to life through cutting-edge 3D design and visualization
          </motion.p>
        </motion.div>

        {/* Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {capabilities.map((capability, index) => {
            const Icon = capability.icon;
            const isHovered = hoveredIndex === index;
            const isSelected = selectedCapability === index;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => setSelectedCapability(isSelected ? null : index)}
                className="cursor-pointer"
              >
                <Card className={`group relative h-full transition-all duration-500 border-border bg-card hover:shadow-2xl overflow-hidden ${
                  isHovered ? 'scale-105 -translate-y-2' : ''
                } ${isSelected ? 'ring-2 ring-accent ring-offset-2 ring-offset-background' : ''}`}>
                  
                  {/* Animated Background Gradient */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${capability.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  />

                  {/* Floating Particles */}
                  <div className="absolute inset-0 overflow-hidden">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 rounded-full opacity-30"
                        style={{ backgroundColor: capability.color }}
                        initial={{
                          x: Math.random() * 300,
                          y: Math.random() * 400,
                        }}
                        animate={isHovered ? {
                          x: Math.random() * 300,
                          y: Math.random() * 400,
                          scale: [1, 1.5, 1],
                        } : {}}
                        transition={{
                          duration: 2 + Math.random() * 2,
                          repeat: Infinity,
                          repeatType: "reverse",
                        }}
                      />
                    ))}
                  </div>

                  <CardContent className="p-8 relative z-10">
                    {/* Icon and Stats */}
                    <div className="flex items-start justify-between mb-6">
                      <motion.div
                        className="relative"
                        animate={isHovered ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <div 
                          className="w-16 h-16 rounded-2xl flex items-center justify-center relative overflow-hidden"
                          style={{ backgroundColor: capability.color + '20' }}
                        >
                          <motion.div
                            className="absolute inset-0"
                            style={{ backgroundColor: capability.color }}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={isHovered ? { scale: 1, opacity: 0.1 } : { scale: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          />
                          <Icon 
                            size={28} 
                            style={{ color: capability.color }}
                            className="relative z-10"
                          />
                        </div>
                      </motion.div>

                      <motion.div
                        className="text-right"
                        initial={{ opacity: 0, x: 20 }}
                        animate={isHovered ? { opacity: 1, x: 0 } : { opacity: 0.7, x: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        <div className="text-sm text-muted-foreground">Projects</div>
                        <div className="font-bold text-lg" style={{ color: capability.color }}>
                          {capability.stats.projects}+
                        </div>
                      </motion.div>
                    </div>
                    
                    {/* Title */}
                    <motion.h3 
                      className="font-bold text-foreground mb-4 leading-tight"
                      animate={isHovered ? { scale: 1.02 } : { scale: 1 }}
                    >
                      {capability.title}
                    </motion.h3>
                    
                    {/* Description */}
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {capability.description}
                    </p>

                    {/* Skills Tags */}
                    <motion.div 
                      className="flex flex-wrap gap-2 mb-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      {capability.skills.map((skill, skillIndex) => (
                        <motion.span
                          key={skill}
                          className="px-2 py-1 text-xs rounded-full border"
                          style={{ 
                            borderColor: capability.color + '40',
                            backgroundColor: capability.color + '10',
                            color: capability.color
                          }}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={isHovered ? { opacity: 1, scale: 1 } : { opacity: 0.7, scale: 0.9 }}
                          transition={{ delay: skillIndex * 0.05 }}
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </motion.div>

                    {/* Experience Indicator */}
                    <motion.div
                      className="flex items-center gap-2 text-sm"
                      initial={{ opacity: 0, y: 10 }}
                      animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0.6, y: 5 }}
                      transition={{ delay: 0.3 }}
                    >
                      <Globe size={14} style={{ color: capability.color }} />
                      <span className="text-muted-foreground">
                        {capability.stats.experience} experience
                      </span>
                    </motion.div>
                  </CardContent>

                  {/* Interactive Corner Element */}
                  <motion.div
                    className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: capability.color + '20' }}
                    animate={isHovered ? { scale: 1.2, rotate: 180 } : { scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Zap size={14} style={{ color: capability.color }} />
                  </motion.div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}