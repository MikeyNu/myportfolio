import { Button } from './ui/button';
import { Mail, Download, Calendar, Heart, Sparkles, MapPin, Clock, Star, Zap, Globe } from 'lucide-react';
import { motion } from 'motion/react';
import { openCalendly } from '../config/calendly';

interface CreativeFooterProps {
  onPageChange: (page: string) => void;
}

const services = [
  { name: '3D Experience Design', icon: Sparkles, color: '#9BB4FF' },
  { name: 'Brand Environment Modeling', icon: Star, color: '#00D9FF' },
  { name: 'Spatial Layout Planning', icon: Globe, color: '#FF6B6B' },
  { name: 'Visualization & Renders', icon: Zap, color: '#4ECDC4' }
];

const quickStats = [
  { label: 'Response Time', value: '24hrs', icon: Clock },
  { label: 'Remote Work', value: '100%', icon: MapPin },
  { label: 'Experience', value: '2+ Years', icon: Star },
  { label: 'Projects', value: '25+', icon: Zap }
];

export function CreativeFooter({ onPageChange }: CreativeFooterProps) {
  return (
    <footer className="relative bg-gradient-to-br from-card via-background to-card border-t border-border overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-accent/30 rounded-full"
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

      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        {/* Header Section */}
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
            <Heart size={16} className="text-accent" />
            <span className="text-accent font-medium">Let's Create Together</span>
          </motion.div>

          <motion.h2 
            className="text-2xl md:text-3xl font-bold text-foreground mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            Ready to bring your{' '}
            <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
              vision to life?
            </span>
          </motion.h2>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center gap-2 mb-6">
              <motion.div
                className="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Mail size={16} className="text-accent" />
              </motion.div>
              <h3 className="font-bold text-foreground">Get in Touch</h3>
            </div>
            
            <div className="space-y-4">
              <motion.a 
                href="mailto:info@michaelnu.co.za" 
                className="flex items-center text-muted-foreground hover:text-accent transition-colors group"
                whileHover={{ x: 5 }}
              >
                <Mail size={16} className="mr-3 group-hover:text-accent" />
                <div>
                  <div className="font-medium">info@mikeynu.com</div>
                  <div className="text-xs">Direct email</div>
                </div>
              </motion.a>
              
              <motion.div 
                className="flex items-start text-muted-foreground"
                whileHover={{ x: 5 }}
              >
                <MapPin size={16} className="mr-3 mt-1 text-accent" />
                <div>
                  <div className="font-medium">Remote Work</div>
                  <div className="text-xs">Teams or Google Meet</div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-2 mb-6">
              <motion.div
                className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Globe size={16} className="text-primary" />
              </motion.div>
              <h3 className="font-bold text-foreground">Navigation</h3>
            </div>
            
            <div className="space-y-3">
              {['home', 'projects', 'about', 'contact'].map((page, index) => (
                <motion.button
                  key={page}
                  onClick={() => onPageChange(page)}
                  className="block text-muted-foreground hover:text-accent transition-colors capitalize font-medium group"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  whileHover={{ x: 5 }}
                >
                  <span className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    {page}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center gap-2 mb-6">
              <motion.div
                className="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Sparkles size={16} className="text-accent" />
              </motion.div>
              <h3 className="font-bold text-foreground">Services</h3>
            </div>
            
            <div className="space-y-3">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <motion.div
                    key={service.name}
                    className="flex items-center gap-3 text-sm text-muted-foreground group cursor-pointer"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    whileHover={{ x: 5 }}
                  >
                    <Icon size={14} style={{ color: service.color }} />
                    <span className="group-hover:text-foreground transition-colors">
                      {service.name}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center gap-2 mb-6">
              <motion.div
                className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Zap size={16} className="text-primary" />
              </motion.div>
              <h3 className="font-bold text-foreground">Quick Actions</h3>
            </div>
            
            <div className="space-y-3">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button variant="outline" size="sm" className="w-full justify-start group">
                  <Download size={16} className="mr-2 group-hover:text-accent transition-colors" />
                  Download CV
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  size="sm" 
                  className="w-full justify-start relative overflow-hidden group"
                  onClick={() => openCalendly()}
                >
                  <motion.div
                    className="absolute inset-0 bg-white/20"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6 }}
                  />
                  <Calendar size={16} className="mr-2 relative z-10" />
                  <span className="relative z-10">Book 15-min Call</span>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Stats Row */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-y border-border mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          {quickStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                className="text-center group cursor-pointer"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  className="w-10 h-10 bg-accent/10 rounded-xl mx-auto mb-2 flex items-center justify-center group-hover:bg-accent/20 transition-colors"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Icon size={16} className="text-accent" />
                </motion.div>
                <div className="font-bold text-accent text-lg group-hover:scale-110 transition-transform">
                  {stat.value}
                </div>
                <div className="text-xs text-muted-foreground">
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom Bar */}
        <motion.div 
          className="flex flex-col md:flex-row justify-between items-center gap-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7 }}
        >
          <div className="text-sm text-muted-foreground flex items-center gap-2">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Heart size={14} className="text-accent" />
            </motion.div>
            © 2025 Michael Ndhlovu. All rights reserved.
          </div>
          
          <motion.div 
            className="flex items-center gap-3 text-sm text-muted-foreground"
            whileHover={{ scale: 1.05 }}
          >
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="w-2 h-2 bg-green-500 rounded-full" />
              </motion.div>
              <span>Available for new projects</span>
            </div>
            <div className="text-muted-foreground">•</div>
            <div>3D Experience Designer</div>
          </motion.div>
        </motion.div>

        {/* Floating CTA */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
          <motion.button
            onClick={() => onPageChange('contact')}
            className="group relative px-8 py-4 bg-gradient-to-r from-accent/20 to-primary/20 border border-accent/30 rounded-full font-medium text-foreground hover:from-accent/30 hover:to-primary/30 transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-20 rounded-full transition-opacity duration-300"
            />
            <span className="relative flex items-center gap-3">
              <Sparkles size={16} className="text-accent" />
              Start Your Project
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                →
              </motion.div>
            </span>
          </motion.button>
        </motion.div>
      </div>
    </footer>
  );
}