import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Star, Users, Award, Trophy, Crown } from 'lucide-react';

const clients = [
  { 
    name: 'Netflix', 
    projects: 'Stranger Things, One Piece, Wednesday, Squid Game',
    tier: 'premium',
    color: '#e50914',
    icon: Crown
  },
  { 
    name: 'Hulu', 
    projects: 'Deli Boys Food Truck Display',
    tier: 'premium',
    color: '#1ce783',
    icon: Star
  },
  { 
    name: 'DreamWorks', 
    projects: 'How to Train Your Dragon',
    tier: 'premium',
    color: '#0073e6',
    icon: Trophy
  },
  { 
    name: 'Amazon MGM Studios', 
    projects: 'Various Productions',
    tier: 'premium',
    color: '#ff9900',
    icon: Crown
  },
  { 
    name: 'Warner Bros', 
    projects: 'The Wizard of Oz @ The Sphere',
    tier: 'premium',
    color: '#005eb8',
    icon: Star
  },
  { 
    name: 'Hoyoverse', 
    projects: 'Genshin Impact Exhibition',
    tier: 'standard',
    color: '#4a90e2',
    icon: Award
  },
  { 
    name: 'Heineken', 
    projects: 'Pop-up Brand Experiences',
    tier: 'standard',
    color: '#00a651',
    icon: Users
  },
  { 
    name: 'Jimmy\'s Iced Coffee', 
    projects: 'Pop-up Experience Design',
    tier: 'standard',
    color: '#d4a574',
    icon: Sparkles
  },
  { 
    name: 'Pepsi', 
    projects: 'Event Activations',
    tier: 'standard',
    color: '#004b93',
    icon: Star
  },
  { 
    name: 'CeraVe', 
    projects: '3D Product Modeling & Texturing',
    tier: 'standard',
    color: '#00a8e6',
    icon: Award
  },
  { 
    name: 'Discovery Bank', 
    projects: 'Retail Space & Animation',
    tier: 'standard',
    color: '#f47920',
    icon: Users
  },
  { 
    name: 'Sega', 
    projects: 'Sonic Racing: CrossWorlds',
    tier: 'standard',
    color: '#0066cc',
    icon: Trophy
  },
  { 
    name: 'Arknights', 
    projects: 'Endfield Exhibition Booth',
    tier: 'standard',
    color: '#ff6b35',
    icon: Star
  },
  { 
    name: 'GAC Motor', 
    projects: 'Automotive Showroom',
    tier: 'standard',
    color: '#c41e3a',
    icon: Award
  },
  { 
    name: 'Daimler', 
    projects: 'Conference Hall Design',
    tier: 'standard',
    color: '#0f1419',
    icon: Crown
  },
  { 
    name: 'COSM', 
    projects: 'Immersive Venues',
    tier: 'standard',
    color: '#9b4dca',
    icon: Star
  },
  { 
    name: 'Logitech', 
    projects: 'Event Assets & Displays',
    tier: 'standard',
    color: '#00b8fc',
    icon: Users
  }
];

export function CreativeClientLogoRail() {
  const [hoveredClient, setHoveredClient] = useState<string | null>(null);
  const [visibleClients, setVisibleClients] = useState<string[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const clientName = entry.target.getAttribute('data-client');
            if (clientName && !visibleClients.includes(clientName)) {
              setVisibleClients(prev => [...prev, clientName]);
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('[data-client]');
    elements.forEach(el => observer.observe(el));

    return () => {
      elements.forEach(el => observer.unobserve(el));
    };
  }, [visibleClients]);

  const premiumClients = clients.filter(c => c.tier === 'premium');
  const standardClients = clients.filter(c => c.tier === 'standard');

  return (
    <section className="py-20 bg-gradient-to-br from-background via-card/50 to-background relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-accent/10 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * 400,
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * 400,
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

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Creative Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
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
            <Users size={16} className="text-accent" />
            <span className="text-accent font-medium">Industry Partners</span>
          </motion.div>
          
          <motion.h2 
            className="text-3xl md:text-5xl font-bold text-foreground mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Trusted by{' '}
            <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
              Global Leaders
            </span>
          </motion.h2>
          
          <motion.p 
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Working with entertainment giants, tech innovators, and brand leaders worldwide
          </motion.p>
        </motion.div>

        {/* Premium Clients Section */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <Crown size={20} className="text-accent" />
            <h3 className="text-xl font-semibold text-foreground">Premium Partners</h3>
            <div className="flex-1 h-px bg-gradient-to-r from-accent/50 to-transparent" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {premiumClients.map((client, index) => {
              const Icon = client.icon;
              const isVisible = visibleClients.includes(client.name);
              
              return (
                <motion.div
                  key={client.name}
                  data-client={client.name}
                  className="relative group cursor-pointer"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  onMouseEnter={() => setHoveredClient(client.name)}
                  onMouseLeave={() => setHoveredClient(null)}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <motion.div
                    className="relative bg-card border border-border rounded-xl p-6 h-28 flex flex-col items-center justify-center transition-all duration-300 overflow-hidden"
                    style={{
                      borderColor: hoveredClient === client.name ? client.color + '40' : undefined,
                      backgroundColor: hoveredClient === client.name ? client.color + '05' : undefined,
                    }}
                  >
                    {/* Animated Background */}
                    <motion.div
                      className="absolute inset-0 opacity-10"
                      style={{ backgroundColor: client.color }}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={hoveredClient === client.name ? { scale: 1, opacity: 0.1 } : { scale: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    />

                    {/* Premium Badge */}
                    <motion.div
                      className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: client.color + '20' }}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                      <Icon size={12} style={{ color: client.color }} />
                    </motion.div>

                    <motion.span 
                      className="font-semibold text-center transition-colors duration-300 relative z-10"
                      style={{
                        color: hoveredClient === client.name ? client.color : undefined
                      }}
                      animate={hoveredClient === client.name ? { scale: 1.05 } : { scale: 1 }}
                    >
                      {client.name}
                    </motion.span>

                    {/* Floating Elements */}
                    {hoveredClient === client.name && (
                      <motion.div
                        className="absolute inset-0 pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        {Array.from({ length: 3 }).map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute w-1 h-1 rounded-full"
                            style={{ backgroundColor: client.color }}
                            initial={{
                              x: Math.random() * 100,
                              y: Math.random() * 80,
                              scale: 0,
                            }}
                            animate={{
                              scale: [0, 1, 0],
                              y: [Math.random() * 80, Math.random() * 80 - 20],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: i * 0.2,
                            }}
                          />
                        ))}
                      </motion.div>
                    )}
                  </motion.div>

                  {/* Enhanced Tooltip */}
                  <AnimatePresence>
                    {hoveredClient === client.name && (
                      <motion.div
                        className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 z-20"
                        initial={{ opacity: 0, y: -10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div 
                          className="bg-popover border rounded-lg p-4 shadow-xl min-w-64 backdrop-blur-sm"
                          style={{ borderColor: client.color + '40' }}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <Icon size={16} style={{ color: client.color }} />
                            <span className="font-semibold text-popover-foreground">
                              {client.name}
                            </span>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {client.projects}
                          </div>
                          <div className="flex items-center gap-1 mt-2">
                            <Crown size={12} style={{ color: client.color }} />
                            <span className="text-xs font-medium" style={{ color: client.color }}>
                              Premium Partner
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Standard Clients Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <Sparkles size={20} className="text-muted-foreground" />
            <h3 className="text-xl font-semibold text-foreground">Collaboration Partners</h3>
            <div className="flex-1 h-px bg-gradient-to-r from-muted-foreground/30 to-transparent" />
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {standardClients.map((client, index) => {
              const Icon = client.icon;
              const isVisible = visibleClients.includes(client.name);
              
              return (
                <motion.div
                  key={client.name}
                  data-client={client.name}
                  className="relative group cursor-pointer"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ delay: (index + premiumClients.length) * 0.05, duration: 0.4 }}
                  onMouseEnter={() => setHoveredClient(client.name)}
                  onMouseLeave={() => setHoveredClient(null)}
                  whileHover={{ scale: 1.03, y: -3 }}
                >
                  <motion.div
                    className="bg-card border border-border rounded-lg p-4 h-20 flex items-center justify-center transition-all duration-300"
                    style={{
                      borderColor: hoveredClient === client.name ? client.color + '40' : undefined,
                      backgroundColor: hoveredClient === client.name ? client.color + '05' : undefined,
                    }}
                  >
                    <span 
                      className="font-medium text-center text-sm transition-colors duration-300"
                      style={{
                        color: hoveredClient === client.name ? client.color : undefined
                      }}
                    >
                      {client.name}
                    </span>
                  </motion.div>

                  {/* Simple Tooltip */}
                  <AnimatePresence>
                    {hoveredClient === client.name && (
                      <motion.div
                        className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 z-20"
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.15 }}
                      >
                        <div className="bg-popover border border-border rounded-md p-2 shadow-lg min-w-48">
                          <div className="text-xs text-muted-foreground">
                            {client.projects}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Stats Summary */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
            <motion.div
              className="text-center"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-2xl font-bold text-accent">5</div>
              <div className="text-sm text-muted-foreground">Premium Partners</div>
            </motion.div>
            <motion.div
              className="text-center"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-2xl font-bold text-primary">13</div>
              <div className="text-sm text-muted-foreground">Active Collaborations</div>
            </motion.div>
            <motion.div
              className="text-center"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-2xl font-bold text-accent">25+</div>
              <div className="text-sm text-muted-foreground">Projects Delivered</div>
            </motion.div>
            <motion.div
              className="text-center"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-2xl font-bold text-primary">100%</div>
              <div className="text-sm text-muted-foreground">Client Satisfaction</div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}