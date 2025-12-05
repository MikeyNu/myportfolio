import { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Filter, Grid, List, Eye, Layers, Map, Search, Sparkles, TrendingUp, Calendar } from 'lucide-react';
import { Input } from './ui/input';
import { ImageWithFallback } from './shared/ImageWithFallback';
import { motion, AnimatePresence } from 'motion/react';
import { RENDERS } from '../data/renderAssets';

const allProjects = [
  {
    id: '1',
    title: 'Netflix Multi-Show Launch Display',
    agency: 'JHDS (Contract)',
    brand: 'Netflix',
    role: '3D modeling, UV unwrapping, van concept design, texturing',
    image: RENDERS.netflixHero,
    category: 'Branded Vehicles',
    tags: ['Moodboard', 'Brand Identity', 'POVs'],
    year: '2024',
    color: '#e50914',
    featured: true,
    description: 'Launch display for Stranger Things, Wednesday, One Piece, and Squid Games'
  },
  {
    id: '2',
    title: 'Arknights: Endfield - Gamescom 2025 Stand',
    agency: 'JHDS (Contract)',
    brand: 'Arknights: Endfield',
    role: '3D modeling, UV unwrapping, texturing, staff population, character cutouts',
    image: RENDERS.arknitghtsEndfieldHero,
    category: 'Game/Entertainment IP',
    tags: ['Plan Layout', 'Elevations', 'Grid'],
    year: '2025',
    color: '#4a90e2',
    featured: true,
    description: 'Designed installation booth from game for Gamescom 2025'
  },
  {
    id: '3',
    title: 'Sonic Racing: CrossWorlds Stand - Gamescom 2025',
    agency: 'JHDS (Contract)',
    brand: 'SEGA',
    role: 'UV unwrapping, texture fixing, character cutouts, game item creation',
    image: RENDERS.sonicHero,
    category: 'Game/Entertainment IP',
    tags: ['Brand Identity', 'Touchpoints', 'POVs'],
    year: '2025',
    color: '#0066cc',
    featured: true,
    description: 'Sonic Racing: CrossWorlds stand for Gamescom 2025'
  },
  {
    id: '4',
    title: 'Genshin Impact Exhibition Booth',
    agency: 'Hoyoverse',
    brand: 'Genshin Impact',
    role: 'Spatial layouts, character displays, interactive zones',
    image: RENDERS.genshinImpact,
    category: 'Game/Entertainment IP',
    tags: ['Plan Layout', 'Elevations', 'Grid'],
    year: '2024',
    color: '#4a90e2',
    featured: false
  },
  {
    id: '5',
    title: 'CeraVe Event Environment',
    agency: 'JHDS (Contractor)',
    brand: 'CeraVe',
    role: '3D product modeling, UV unwrapping, texturing (Blender). Created initial design concept; final design utilized my product models.',
    image: RENDERS.cerave,
    category: 'Events/Experiences',
    tags: ['3D Modeling', 'Texturing', 'Blender'],
    year: '2024',
    color: '#00a8e6',
    featured: false
  },
  {
    id: '6',
    title: 'Heineken Pop-up Experience',
    agency: 'Heineken',
    brand: 'Heineken',
    role: 'Venue design, brand integration, social spaces',
    image: RENDERS.heinekenExperience,
    category: 'Retail Pop-ups',
    tags: ['Moodboard', 'POVs', 'No Grid'],
    year: '2024',
    color: '#00a651'
  },
  {
    id: '7',
    title: 'Discovery Bank Retail Space',
    agency: 'Discovery',
    brand: 'Discovery Bank',
    role: 'Retail layout, customer journey, digital touchpoints',
    image: RENDERS.deliBooys,
    category: 'Retail Pop-ups',
    tags: ['Plan Layout', 'Brand Identity', 'Elevations'],
    year: '2023',
    color: '#f47920'
  },
  {
    id: '8',
    title: 'Daimler Conference Hall',
    agency: 'Daimler',
    brand: 'Mercedes-Benz',
    role: 'Corporate space design, presentation environments',
    image: RENDERS.daimlerTruck,
    category: 'Events/Experiences',
    tags: ['Plan Layout', 'Elevations', 'Grid'],
    year: '2023',
    color: '#0f1419'
  },
  {
    id: '9',
    title: 'GAC Automotive Showroom',
    agency: 'GAC Motor',
    brand: 'GAC',
    role: 'Showroom layout, vehicle displays, customer experience',
    image: RENDERS.gacShowroom,
    category: 'Retail Pop-ups',
    tags: ['Brand Identity', 'Plans', 'Touchpoints'],
    year: '2023',
    color: '#c41e3a'
  }
];

const categories = [
  { id: 'all', label: 'All Projects', count: allProjects.length },
  { id: 'stands', label: 'Stands', count: 0 },
  { id: 'branded-vehicles', label: 'Branded Vehicles', count: allProjects.filter(p => p.category === 'Branded Vehicles').length },
  { id: 'events', label: 'Events/Experiences', count: allProjects.filter(p => p.category === 'Events/Experiences').length },
  { id: 'retail', label: 'Retail Pop-ups', count: allProjects.filter(p => p.category === 'Retail Pop-ups').length },
  { id: 'gaming', label: 'Game/Entertainment IP', count: allProjects.filter(p => p.category === 'Game/Entertainment IP').length }
];

const viewToggles = [
  { id: 'povs', label: 'POVs', icon: Eye },
  { id: 'plans', label: 'Plans', icon: Map },
  { id: 'elevations', label: 'Elevations', icon: Layers },
  { id: 'grid', label: 'With Grid', icon: Grid },
  { id: 'no-grid', label: 'Without Grid', icon: List }
];

interface CreativeProjectsPageProps {
  onViewCaseStudy: (projectId: string) => void;
}

export function CreativeProjectsPage({ onViewCaseStudy }: CreativeProjectsPageProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeToggles, setActiveToggles] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'masonry'>('masonry');
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleProjects, setVisibleProjects] = useState<string[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const projectId = entry.target.getAttribute('data-project');
            if (projectId && !visibleProjects.includes(projectId)) {
              setVisibleProjects(prev => [...prev, projectId]);
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('[data-project]');
    elements.forEach(el => observer.observe(el));

    return () => {
      elements.forEach(el => observer.unobserve(el));
    };
  }, [visibleProjects]);

  const toggleView = (toggleId: string) => {
    setActiveToggles(prev => 
      prev.includes(toggleId) 
        ? prev.filter(id => id !== toggleId)
        : [...prev, toggleId]
    );
  };

  const filteredProjects = allProjects.filter(project => {
    const categoryMatch = selectedCategory === 'all' || 
      (selectedCategory === 'branded-vehicles' && project.category === 'Branded Vehicles') ||
      (selectedCategory === 'events' && project.category === 'Events/Experiences') ||
      (selectedCategory === 'retail' && project.category === 'Retail Pop-ups') ||
      (selectedCategory === 'gaming' && project.category === 'Game/Entertainment IP');
    
    const searchMatch = searchQuery === '' || 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.agency.toLowerCase().includes(searchQuery.toLowerCase());
    
    const toggleMatch = activeToggles.length === 0 || 
      activeToggles.some(toggle => {
        if (toggle === 'grid') return project.tags.includes('Grid');
        if (toggle === 'no-grid') return project.tags.includes('No Grid');
        if (toggle === 'povs') return project.tags.includes('POVs');
        if (toggle === 'plans') return project.tags.includes('Plans') || project.tags.includes('Plan Layout');
        if (toggle === 'elevations') return project.tags.includes('Elevations');
        return false;
      });
    
    return categoryMatch && searchMatch && toggleMatch;
  });

  const featuredProjects = filteredProjects.filter(p => p.featured);
  const regularProjects = filteredProjects.filter(p => !p.featured);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-accent/20 rounded-full"
            initial={{
              x: Math.random() * 1200,
              y: Math.random() * 800,
            }}
            animate={{
              x: Math.random() * 1200,
              y: Math.random() * 800,
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

      <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        {/* Creative Header */}
        <motion.div 
          className="text-center mb-16"
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
            <TrendingUp size={16} className="text-accent" />
            <span className="text-accent font-medium">Portfolio</span>
          </motion.div>
          
          <motion.h1 
            className="text-4xl md:text-6xl font-bold text-foreground mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <span className="bg-gradient-to-r from-foreground via-accent to-primary bg-clip-text text-transparent">
              Creative Projects
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            A comprehensive archive of 3D experience design work across various industries and global brands
          </motion.p>
        </motion.div>

        {/* Enhanced Search and Filters */}
        <motion.div 
          className="mb-12 space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search projects, brands, or agencies..."
              className="pl-10 bg-card border-border"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + index * 0.05 }}
              >
                <Button
                  variant={selectedCategory === category.id ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className="gap-2 relative overflow-hidden"
                >
                  <span>{category.label}</span>
                  <Badge 
                    variant="secondary" 
                    className="text-xs bg-accent/20 text-accent border-accent/30"
                  >
                    {category.count}
                  </Badge>
                  {selectedCategory === category.id && (
                    <motion.div
                      className="absolute inset-0 bg-accent/10"
                      layoutId="activeCategory"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </Button>
              </motion.div>
            ))}
          </div>

          {/* View Toggles */}
          <div className="flex flex-wrap justify-center gap-2">
            <div className="flex items-center gap-2 mr-4">
              <Filter size={16} className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground">View Types:</span>
            </div>
            {viewToggles.map((toggle, index) => {
              const Icon = toggle.icon;
              return (
                <motion.div
                  key={toggle.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.05 }}
                >
                  <Button
                    variant={activeToggles.includes(toggle.id) ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => toggleView(toggle.id)}
                    className="gap-2"
                  >
                    <Icon size={14} />
                    {toggle.label}
                  </Button>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Results Summary */}
        <motion.div 
          className="flex items-center justify-between mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <div className="text-sm text-muted-foreground">
            Showing <span className="text-accent font-medium">{filteredProjects.length}</span> of{' '}
            <span className="font-medium">{allProjects.length}</span> projects
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Layout:</span>
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <Grid size={14} />
            </Button>
            <Button
              variant={viewMode === 'masonry' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('masonry')}
            >
              <Layers size={14} />
            </Button>
          </div>
        </motion.div>

        {/* Featured Projects */}
        {featuredProjects.length > 0 && (
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <Sparkles size={20} className="text-accent" />
              <h2 className="text-2xl font-bold text-foreground">Featured Projects</h2>
              <div className="flex-1 h-px bg-gradient-to-r from-accent/50 to-transparent" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProjects.map((project, index) => (
                <ProjectCard 
                  key={project.id}
                  project={project}
                  index={index}
                  onViewCaseStudy={onViewCaseStudy}
                  isFeatured={true}
                  isVisible={visibleProjects.includes(project.id)}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Regular Projects Grid */}
        {regularProjects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <Calendar size={20} className="text-muted-foreground" />
              <h2 className="text-2xl font-bold text-foreground">All Projects</h2>
              <div className="flex-1 h-px bg-gradient-to-r from-muted-foreground/30 to-transparent" />
            </div>
            
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
            }`}>
              {regularProjects.map((project, index) => (
                <ProjectCard 
                  key={project.id}
                  project={project}
                  index={index + featuredProjects.length}
                  onViewCaseStudy={onViewCaseStudy}
                  isFeatured={false}
                  isVisible={visibleProjects.includes(project.id)}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* No Results */}
        {filteredProjects.length === 0 && (
          <motion.div 
            className="text-center py-20"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 }}
          >
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Search size={24} className="text-muted-foreground" />
            </div>
            <p className="text-muted-foreground text-lg mb-4">
              No projects match your current filters
            </p>
            <Button 
              onClick={() => {
                setSelectedCategory('all');
                setActiveToggles([]);
                setSearchQuery('');
              }}
              variant="outline"
            >
              Clear All Filters
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}

interface ProjectCardProps {
  project: any;
  index: number;
  onViewCaseStudy: (projectId: string) => void;
  isFeatured: boolean;
  isVisible: boolean;
}

function ProjectCard({ project, index, onViewCaseStudy, isFeatured, isVisible }: ProjectCardProps) {
  return (
    <motion.div
      data-project={project.id}
      initial={{ opacity: 0, y: 50 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ y: -8 }}
      className="group cursor-pointer"
      onClick={() => onViewCaseStudy(project.id)}
    >
      <Card className={`overflow-hidden border-border bg-card hover:shadow-2xl transition-all duration-500 ${
        isFeatured ? 'ring-1 ring-accent/20' : ''
      }`}>
        <div className="relative overflow-hidden">
          <ImageWithFallback
            src={project.image}
            alt={project.title}
            className={`w-full object-cover transition-all duration-700 group-hover:scale-110 ${
              isFeatured ? 'h-80' : 'h-64'
            }`}
          />
          
          {/* Gradient Overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: `linear-gradient(to top, ${project.color}40, transparent, transparent)`
            }}
          />
          
          {/* Featured Badge */}
          {isFeatured && (
            <motion.div
              className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1 bg-accent/90 text-accent-foreground rounded-full text-xs font-medium"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
            >
              <Sparkles size={12} />
              Featured
            </motion.div>
          )}
          
          {/* Year Badge */}
          <Badge className="absolute top-4 right-4 bg-black/50 text-white border-white/20">
            {project.year}
          </Badge>

          {/* Color Indicator */}
          <motion.div
            className="absolute bottom-4 right-4 w-8 h-8 rounded-full border-2 border-white/30"
            style={{ backgroundColor: project.color + '80' }}
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <CardContent className="p-6">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag: string, tagIndex: number) => (
              <motion.div
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 + tagIndex * 0.05 }}
              >
                <Badge 
                  variant="secondary" 
                  className="text-xs"
                  style={{ 
                    borderColor: project.color + '40',
                    backgroundColor: project.color + '10',
                    color: project.color
                  }}
                >
                  {tag}
                </Badge>
              </motion.div>
            ))}
          </div>

          {/* Title */}
          <motion.h3 
            className="font-bold text-foreground mb-3 leading-tight group-hover:text-accent transition-colors"
            style={{ fontSize: isFeatured ? '1.25rem' : '1.125rem' }}
            whileHover={{ scale: 1.02 }}
          >
            {project.title}
          </motion.h3>

          {/* Agency & Brand */}
          <div className="text-sm text-muted-foreground mb-3">
            <span className="font-medium" style={{ color: project.color }}>
              {project.agency}
            </span>
            {' · '}
            <span>{project.brand}</span>
          </div>

          {/* Role */}
          <p className="text-muted-foreground text-sm leading-relaxed mb-4">
            {project.role}
          </p>

          {/* Action Button */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button 
              variant="outline" 
              className="w-full group-hover:bg-accent group-hover:text-accent-foreground transition-colors"
            >
              View Case Study
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}