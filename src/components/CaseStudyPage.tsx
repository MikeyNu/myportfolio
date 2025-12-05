import { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { ArrowLeft, ArrowRight, Grid, Eye, Map, Layers } from 'lucide-react';
import { ImageWithFallback } from './shared/ImageWithFallback';
import { RENDERS } from '../data/renderAssets';

const caseStudyData = {
  '1': {
    title: 'Stranger Things Experience Truck',
    brand: 'Stranger Things',
    agency: 'Netflix',
    year: '2024',
    role: '3D Experience Designer',
    overview: 'Designed an immersive mobile experience bringing the Upside Down world of Stranger Things directly to fans through a custom-built truck activation.',
    objectives: [
      'Create an authentic Stranger Things atmosphere',
      'Design interactive touchpoints for fan engagement',
      'Ensure smooth visitor flow in confined mobile space',
      'Integrate show branding seamlessly throughout experience'
    ],
    myRole: [
      'Environment modeling of Upside Down atmosphere',
      'Lighting design for eerie, authentic mood',
      'Interactive touchpoint placement and design',
      'Brand identity application across all surfaces',
      'Camera work for promotional renders'
    ],
    deliverables: [
      'Complete 3D environment models',
      'Photorealistic renders (POVs, plans, elevations)', 
      'Interactive touchpoint designs',
      'Brand application guidelines',
      'Construction documentation'
    ],
    image: RENDERS.sbExperience,
    gallery: [
      RENDERS.sbExperience,
      RENDERS.redOneConcept,
      RENDERS.pepsiExperience
    ],
    tags: ['Moodboard', 'Brand Identity', 'POVs'],
    tools: ['Blender', 'Unreal Engine', 'Adobe Creative Suite']
  },
  '2': {
    title: 'Genshin Impact Exhibition Booth',
    brand: 'Genshin Impact',
    agency: 'Hoyoverse',
    year: '2024',
    role: '3D Experience Designer',
    overview: 'Created a large-scale exhibition booth celebrating the world of Genshin Impact with character displays, interactive zones, and immersive environments.',
    objectives: [
      'Showcase game characters in premium displays',
      'Create photo opportunities for fans',
      'Design interactive gaming stations',
      'Maintain authentic game aesthetic'
    ],
    myRole: [
      'Spatial layout design for optimal flow',
      'Character display environment modeling',
      'Interactive zone conceptualization',
      'Game world atmosphere recreation',
      'Technical documentation for construction'
    ],
    deliverables: [
      'Complete booth 3D models',
      'Character display designs',
      'Interactive station layouts',
      'Lighting and atmosphere studies',
      'Construction plans and elevations'
    ],
    image: RENDERS.genshinImpact,
    gallery: [
      RENDERS.genshinImpact,
      RENDERS.punchesTownArena,
      RENDERS.redOneConcept
    ],
    tags: ['Plan Layout', 'Elevations', 'Grid'],
    tools: ['Blender', 'Cinema 4D', 'Figma']
  }
};

interface CaseStudyPageProps {
  projectId: string;
  onBack: () => void;
  onNextProject: (projectId: string) => void;
}

export function CaseStudyPage({ projectId, onBack, onNextProject }: CaseStudyPageProps) {
  const [activeView, setActiveView] = useState<'povs' | 'plans' | 'elevations' | 'grid'>('povs');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const project = caseStudyData[projectId as keyof typeof caseStudyData];
  
  if (!project) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Case Study Not Found
          </h1>
          <Button onClick={onBack}>
            <ArrowLeft size={16} className="mr-2" />
            Back to Projects
          </Button>
        </div>
      </div>
    );
  }

  const viewButtons = [
    { id: 'povs', label: 'POVs', icon: Eye },
    { id: 'plans', label: 'Plans', icon: Map },
    { id: 'elevations', label: 'Elevations', icon: Layers },
    { id: 'grid', label: 'With Grid', icon: Grid }
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <Button variant="ghost" onClick={onBack} className="mb-6">
            <ArrowLeft size={16} className="mr-2" />
            Back to Projects
          </Button>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {project.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
            <span><strong className="text-accent">{project.agency}</strong> · {project.brand}</span>
            <span>•</span>
            <span>{project.year}</span>
            <span>•</span>
            <span>Role: {project.role}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero Image */}
        <div className="mb-12">
          <ImageWithFallback
            src={project.image}
            alt={project.title}
            className="w-full h-96 object-cover rounded-lg"
          />
        </div>

        {/* Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Project Overview
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              {project.overview}
            </p>

            <h3 className="text-xl font-semibold text-foreground mb-4">
              Project Objectives
            </h3>
            <ul className="space-y-2 mb-8">
              {project.objectives.map((objective, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full mt-2" />
                  <span className="text-muted-foreground">{objective}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <Card className="border-border bg-card">
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-4">
                  Project Details
                </h3>
                <div className="space-y-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Client:</span>
                    <div className="font-medium">{project.agency}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Brand:</span>
                    <div className="font-medium">{project.brand}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Year:</span>
                    <div className="font-medium">{project.year}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Tools Used:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {project.tools.map((tool) => (
                        <Badge key={tool} variant="outline" className="text-xs">
                          {tool}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* My Role */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-6">
            My Role & Responsibilities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Key Contributions
              </h3>
              <ul className="space-y-3">
                {project.myRole.map((role, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2" />
                    <span className="text-muted-foreground">{role}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Deliverables
              </h3>
              <ul className="space-y-3">
                {project.deliverables.map((deliverable, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2" />
                    <span className="text-muted-foreground">{deliverable}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* View Toggle */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">
            Project Visualization
          </h2>
          <div className="flex flex-wrap gap-2 mb-6">
            {viewButtons.map((view) => {
              const Icon = view.icon;
              return (
                <Button
                  key={view.id}
                  variant={activeView === view.id ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setActiveView(view.id as any)}
                  className="gap-2"
                >
                  <Icon size={14} />
                  {view.label}
                </Button>
              );
            })}
          </div>
        </div>

        {/* Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {project.gallery.map((image, index) => (
            <div
              key={index}
              className="group cursor-pointer"
              onClick={() => setSelectedImage(image)}
            >
              <ImageWithFallback
                src={image}
                alt={`${project.title} - View ${index + 1}`}
                className="w-full h-64 object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-8 border-t border-border">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft size={16} className="mr-2" />
            Back to Projects
          </Button>
          
          <Button onClick={() => onNextProject('2')}>
            Next Project
            <ArrowRight size={16} className="ml-2" />
          </Button>
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <ImageWithFallback
            src={selectedImage}
            alt="Project detail"
            className="max-w-full max-h-full object-contain"
          />
        </div>
      )}
    </div>
  );
}