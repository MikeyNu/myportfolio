import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Filter, Grid, List, Eye, Layers, Map } from 'lucide-react';
import { ImageWithFallback } from './shared/ImageWithFallback';
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
    year: '2024'
  },
  {
    id: '2',
    title: 'Arknights: Endfield - Gamescom 2025',
    agency: 'JHDS (Contract)',
    brand: 'Arknights: Endfield',
    role: '3D modeling, UV unwrapping, texturing, staff population, character cutouts',
    image: RENDERS.arknitghtsEndfieldHero,
    category: 'Game/Entertainment IP',
    tags: ['Plan Layout', 'Elevations', 'Grid'],
    year: '2025'
  },
  {
    id: '3',
    title: 'Sonic Racing: CrossWorlds - Gamescom 2025',
    agency: 'JHDS (Contract)',
    brand: 'SEGA',
    role: 'UV unwrapping, texture fixing, character cutouts, game item creation',
    image: RENDERS.sonicHero,
    category: 'Game/Entertainment IP',
    tags: ['Brand Identity', 'Touchpoints', 'POVs'],
    year: '2025'
  },
  {
    id: '4',
    title: 'Genshin Impact Exhibition Booth',
    agency: 'JHDS (Contractor)',
    brand: 'Genshin Impact',
    role: 'Stand design from client specifications',
    image: RENDERS.genshinImpact,
    category: 'Game/Entertainment IP',
    tags: ['Stand Design', 'Exhibition', 'Client Spec'],
    year: '2025'
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
    year: '2025'
  },
  {
    id: '6',
    title: 'Hulu Deli Boys Food Truck',
    agency: 'JHDS (Contractor)',
    brand: 'Hulu',
    role: 'Design & build from client specifications, 3D product modeling, lighting setup',
    image: RENDERS.deliBoys,
    category: 'Branded Vehicles',
    tags: ['3D Modeling', 'Design', 'Lighting'],
    year: '2025'
  },
  {
    id: '7',
    title: 'Heineken Pop-up Experience',
    agency: 'JHDS (Contractor)',
    brand: 'Heineken',
    role: 'UV unwrapping and retexturing existing SketchUp file',
    image: RENDERS.heineken,
    category: 'Retail Pop-ups',
    tags: ['UV Mapping', 'Texturing', 'SketchUp'],
    year: '2025'
  },
  {
    id: '8',
    title: 'Pepsi Event Stand',
    agency: 'JHDS (Contractor)',
    brand: 'Pepsi',
    role: 'Design & build from client specifications using Blender and SketchUp',
    image: RENDERS.pepsi,
    category: 'Events/Experiences',
    tags: ['3D Modeling', 'Design', 'Blender', 'SketchUp'],
    year: '2025'
  },
  {
    id: '9',
    title: 'Discovery Bank Video Ad',
    agency: 'JHDS (Contractor)',
    brand: 'Discovery Bank',
    role: 'Motion tracking, rotoscoping, 3D building modeling from video references, tracking model to video, plane animation. End-to-end video ad production.',
    image: RENDERS.discoveryVideo,
    category: 'Animation/Video',
    tags: ['Motion Tracking', 'Rotoscoping', '3D Modeling', 'Animation'],
    year: '2025'
  },
  {
    id: '9',
    title: 'Daimler Conference Hall',
    agency: 'Daimler',
    brand: 'Mercedes-Benz',
    role: 'Corporate space design, presentation environments',
    image: RENDERS.daimlerTruck,
    category: 'Events/Experiences',
    tags: ['Plan Layout', 'Elevations', 'Grid'],
    year: '2023'
  }
];

const categories = [
  'All',
  'Stands',
  'Branded Vehicles',
  'Events/Experiences',
  'Retail Pop-ups',
  'Game/Entertainment IP'
];

const viewToggles = [
  { id: 'povs', label: 'POVs', icon: Eye },
  { id: 'plans', label: 'Plans', icon: Map },
  { id: 'elevations', label: 'Elevations', icon: Layers },
  { id: 'grid', label: 'With Grid', icon: Grid },
  { id: 'no-grid', label: 'Without Grid', icon: List }
];

interface ProjectsPageProps {
  onViewCaseStudy: (projectId: string) => void;
}

export function ProjectsPage({ onViewCaseStudy }: ProjectsPageProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeToggles, setActiveToggles] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const toggleView = (toggleId: string) => {
    setActiveToggles(prev => 
      prev.includes(toggleId) 
        ? prev.filter(id => id !== toggleId)
        : [...prev, toggleId]
    );
  };

  const filteredProjects = allProjects.filter(project => {
    const categoryMatch = selectedCategory === 'All' || project.category === selectedCategory;
    const toggleMatch = activeToggles.length === 0 || 
      activeToggles.some(toggle => {
        if (toggle === 'grid') return project.tags.includes('Grid');
        if (toggle === 'no-grid') return project.tags.includes('No Grid');
        if (toggle === 'povs') return project.tags.includes('POVs');
        if (toggle === 'plans') return project.tags.includes('Plans') || project.tags.includes('Plan Layout');
        if (toggle === 'elevations') return project.tags.includes('Elevations');
        return false;
      });
    
    return categoryMatch && toggleMatch;
  });

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            All Projects
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A comprehensive archive of 3D experience design work across various industries and brands
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-6">
          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* View Toggles */}
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center gap-2 mr-4">
              <Filter size={16} className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground">View:</span>
            </div>
            {viewToggles.map((toggle) => {
              const Icon = toggle.icon;
              return (
                <Button
                  key={toggle.id}
                  variant={activeToggles.includes(toggle.id) ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => toggleView(toggle.id)}
                  className="gap-2"
                >
                  <Icon size={14} />
                  {toggle.label}
                </Button>
              );
            })}
          </div>
        </div>

        {/* Results Count */}
        <div className="text-sm text-muted-foreground mb-8">
          Showing {filteredProjects.length} of {allProjects.length} projects
        </div>

        {/* Projects Grid */}
        <div className={`grid gap-8 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
            : 'grid-cols-1'
        }`}>
          {filteredProjects.map((project) => (
            <Card key={project.id} className="group overflow-hidden hover:shadow-xl transition-all duration-500 border-border bg-card">
              <div className="relative overflow-hidden">
                <ImageWithFallback
                  src={project.image}
                  alt={project.title}
                  className={`w-full object-cover transition-transform duration-500 group-hover:scale-105 ${
                    viewMode === 'grid' ? 'h-64' : 'h-48'
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <Badge className="absolute top-4 left-4 bg-black/50 text-white border-white/20">
                  {project.year}
                </Badge>
              </div>

              <CardContent className="p-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
                  {project.title}
                </h3>

                <div className="text-sm text-muted-foreground mb-3">
                  <span className="text-accent">{project.agency}</span> · {project.brand}
                </div>

                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {project.role}
                </p>

                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => onViewCaseStudy(project.id)}
                >
                  View Case Study
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">
              No projects match the current filters. Try adjusting your selection.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}