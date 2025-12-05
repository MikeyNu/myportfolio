import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Mail, Calendar, Copy, Check, Send, MessageCircle, Clock, Zap, Globe, Star, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const projectTypes = [
  { 
    type: 'Exhibition stands and trade show booths',
    icon: '🏢',
    color: '#9BB4FF'
  },
  { 
    type: 'Branded vehicle experiences and wraps',
    icon: '🚛',
    color: '#00D9FF'
  },
  { 
    type: 'Event venues and pop-up activations',
    icon: '🎪',
    color: '#FF6B6B'
  },
  { 
    type: 'Retail spaces and showrooms',
    icon: '🏪',
    color: '#4ECDC4'
  },
  { 
    type: 'Gaming and entertainment IP experiences',
    icon: '🎮',
    color: '#FFE66D'
  },
  { 
    type: 'Corporate environments and conference spaces',
    icon: '🏢',
    color: '#A8E6CF'
  }
];

const contactMethods = [
  {
    title: 'Direct Email',
    description: 'Quick questions or project inquiries',
    icon: Mail,
    color: '#9BB4FF',
    action: 'Email Now',
    response: '24 hours'
  },
  {
    title: 'Video Call',
    description: '15-minute intro call to discuss your project',
    icon: Calendar,
    color: '#00D9FF',
    action: 'Schedule Call',
    response: 'Same day'
  },
  {
    title: 'Instant Chat',
    description: 'Real-time discussion about your needs',
    icon: MessageCircle,
    color: '#FF6B6B',
    action: 'Start Chat',
    response: 'Live'
  }
];

export function CreativeContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    budget: '',
    timeline: '',
    message: ''
  });
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hoveredMethod, setHoveredMethod] = useState<number | null>(null);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText('info@mikeynu.com');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Form submitted:', formData);
    setIsSubmitting(false);
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      company: '',
      budget: '',
      timeline: '',
      message: ''
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-accent/15 rounded-full"
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
        {/* Creative Header */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
          >
            <Heart size={16} className="text-accent" />
            <span className="text-accent font-medium">Let's Connect</span>
          </motion.div>
          
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Let's{' '}
            <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
              Work Together
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Ready to bring your brand experience to life in 3D? 
            Let's discuss your project and explore creative possibilities together.
          </motion.p>
        </motion.div>

        {/* Contact Methods */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          {contactMethods.map((method, index) => {
            const Icon = method.icon;
            const isHovered = hoveredMethod === index;
            
            return (
              <motion.div
                key={index}
                className="group cursor-pointer"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1, duration: 0.6 }}
                onMouseEnter={() => setHoveredMethod(index)}
                onMouseLeave={() => setHoveredMethod(null)}
                whileHover={{ y: -8 }}
              >
                <Card className="border-border bg-card h-full relative overflow-hidden group-hover:shadow-2xl transition-all duration-500">
                  {/* Animated Background */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                    style={{ backgroundColor: method.color }}
                  />

                  <CardContent className="p-8 text-center relative z-10">
                    <motion.div
                      className="w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center relative"
                      style={{ backgroundColor: method.color + '20' }}
                      animate={isHovered ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Icon size={28} style={{ color: method.color }} />
                      
                      {/* Floating particles */}
                      {isHovered && (
                        <div className="absolute inset-0">
                          {Array.from({ length: 3 }).map((_, i) => (
                            <motion.div
                              key={i}
                              className="absolute w-2 h-2 rounded-full"
                              style={{ backgroundColor: method.color }}
                              initial={{
                                x: Math.random() * 40 - 20,
                                y: Math.random() * 40 - 20,
                                scale: 0,
                              }}
                              animate={{
                                scale: [0, 1, 0],
                                y: [0, -20],
                              }}
                              transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                delay: i * 0.2,
                              }}
                            />
                          ))}
                        </div>
                      )}
                    </motion.div>
                    
                    <h3 className="font-bold text-xl text-foreground mb-3 group-hover:text-accent transition-colors">
                      {method.title}
                    </h3>
                    
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {method.description}
                    </p>

                    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-6">
                      <Clock size={14} style={{ color: method.color }} />
                      <span>Response: {method.response}</span>
                    </div>
                    
                    <Button 
                      className="w-full relative overflow-hidden group"
                      style={{ backgroundColor: method.color }}
                      onClick={() => {
                        if (method.action === 'Start Chat') {
                          window.open('https://wa.me/27659001045', '_blank');
                        }
                      }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-white/20"
                        initial={{ x: '-100%' }}
                        whileHover={{ x: '100%' }}
                        transition={{ duration: 0.6 }}
                      />
                      <span className="relative">{method.action}</span>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info & Project Types */}
          <div className="space-y-8">
            {/* Direct Contact Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Card className="border-border bg-card relative overflow-hidden">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <motion.div
                      className="w-10 h-10 bg-accent/20 rounded-xl flex items-center justify-center"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Mail className="text-accent" size={20} />
                    </motion.div>
                    Direct Contact
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <motion.div 
                    className="flex items-center justify-between p-4 bg-muted rounded-lg mb-4 group cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    onClick={copyEmail}
                  >
                    <span className="font-medium">info@mikeynu.com</span>
                    <motion.div
                      animate={copied ? { scale: [1, 1.2, 1] } : {}}
                      transition={{ duration: 0.3 }}
                    >
                      <Button
                        variant="ghost"
                        size="sm"
                      >
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={copied ? 'copied' : 'copy'}
                            initial={{ opacity: 0, rotate: -90 }}
                            animate={{ opacity: 1, rotate: 0 }}
                            exit={{ opacity: 0, rotate: 90 }}
                            transition={{ duration: 0.2 }}
                          >
                            {copied ? (
                              <Check size={16} className="text-green-500" />
                            ) : (
                              <Copy size={16} />
                            )}
                          </motion.div>
                        </AnimatePresence>
                      </Button>
                    </motion.div>
                  </motion.div>
                  <p className="text-muted-foreground text-sm">
                    Email me directly for quick questions or project inquiries. 
                    I typically respond within 24 hours.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Project Types */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <Star size={20} className="text-accent" />
                <h3 className="text-xl font-bold text-foreground">
                  Project Types I Work On
                </h3>
              </div>
              
              <div className="space-y-4">
                {projectTypes.map((project, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-4 p-4 bg-card border border-border rounded-lg group cursor-pointer transition-all duration-300 hover:shadow-md"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 + index * 0.1 }}
                    onMouseEnter={() => setHoveredProject(index)}
                    onMouseLeave={() => setHoveredProject(null)}
                    whileHover={{ x: 8 }}
                  >
                    <motion.div
                      className="text-2xl"
                      animate={hoveredProject === index ? { scale: 1.2, rotate: 10 } : { scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {project.icon}
                    </motion.div>
                    
                    <span 
                      className="text-muted-foreground text-sm flex-1 group-hover:text-foreground transition-colors"
                      style={{ color: hoveredProject === index ? project.color : undefined }}
                    >
                      {project.type}
                    </span>

                    <motion.div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: project.color }}
                      animate={hoveredProject === index ? { scale: [1, 1.5, 1] } : { scale: 1 }}
                      transition={{ duration: 0.6, repeat: hoveredProject === index ? Infinity : 0 }}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Card className="border-border bg-card relative overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <motion.div
                    className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Send className="text-primary" size={20} />
                  </motion.div>
                  Project Inquiry Form
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1 }}
                    >
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Name *
                      </label>
                      <Input
                        required
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="Your full name"
                        className="bg-input border-border focus:ring-accent"
                      />
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.1 }}
                    >
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Email *
                      </label>
                      <Input
                        required
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="your@email.com"
                        className="bg-input border-border focus:ring-accent"
                      />
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 }}
                  >
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Company
                    </label>
                    <Input
                      value={formData.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                      placeholder="Your company or agency"
                      className="bg-input border-border focus:ring-accent"
                    />
                  </motion.div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.3 }}
                    >
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Budget Range
                      </label>
                      <Select onValueChange={(value) => handleInputChange('budget', value)}>
                        <SelectTrigger className="bg-input border-border">
                          <SelectValue placeholder="Select budget range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="under-5k">Under $5,000</SelectItem>
                          <SelectItem value="5k-15k">$5,000 - $15,000</SelectItem>
                          <SelectItem value="15k-30k">$15,000 - $30,000</SelectItem>
                          <SelectItem value="30k-plus">$30,000+</SelectItem>
                          <SelectItem value="discuss">Let's discuss</SelectItem>
                        </SelectContent>
                      </Select>
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.4 }}
                    >
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Timeline
                      </label>
                      <Select onValueChange={(value) => handleInputChange('timeline', value)}>
                        <SelectTrigger className="bg-input border-border">
                          <SelectValue placeholder="Project timeline" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="urgent">ASAP (Rush)</SelectItem>
                          <SelectItem value="1-2weeks">1-2 weeks</SelectItem>
                          <SelectItem value="1month">1 month</SelectItem>
                          <SelectItem value="2-3months">2-3 months</SelectItem>
                          <SelectItem value="flexible">Flexible</SelectItem>
                        </SelectContent>
                      </Select>
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5 }}
                  >
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Project Details *
                    </label>
                    <Textarea
                      required
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      placeholder="Tell me about your project: What kind of experience are you looking to create? Do you have brand guidelines, floor plans, or reference materials? What are your main objectives?"
                      rows={6}
                      className="bg-input border-border focus:ring-accent resize-none"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.6 }}
                  >
                    <Button 
                      type="submit" 
                      className="w-full relative overflow-hidden group bg-gradient-to-r from-accent to-primary hover:from-primary hover:to-accent" 
                      disabled={isSubmitting}
                    >
                      <motion.div
                        className="absolute inset-0 bg-white/20"
                        initial={{ x: '-100%' }}
                        whileHover={{ x: '100%' }}
                        transition={{ duration: 0.6 }}
                      />
                      <span className="relative flex items-center justify-center gap-2">
                        {isSubmitting ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            >
                              <Zap size={16} />
                            </motion.div>
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send size={16} />
                            Send Project Inquiry
                          </>
                        )}
                      </span>
                    </Button>
                  </motion.div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Response Time Notice */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7 }}
        >
          <div className="relative p-8 bg-gradient-to-r from-accent/10 to-primary/10 border border-accent/20 rounded-2xl backdrop-blur-sm">
            <motion.div
              className="absolute top-4 right-4 w-4 h-4 bg-green-500 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            
            <div className="flex items-center justify-center gap-3 mb-4">
              <Clock size={20} className="text-accent" />
              <h3 className="font-bold text-foreground">Response Guarantee</h3>
            </div>
            
            <p className="text-muted-foreground">
              <strong className="text-accent">Typical Response Time:</strong> Within 24 hours for email inquiries. 
              For urgent projects, please mention "URGENT" in your subject line.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}