import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Download, Calendar, MapPin } from 'lucide-react';
import { ImageWithFallback } from './shared/ImageWithFallback';
import { RENDERS } from '../data/renderAssets';

const tools = [
  { name: 'Blender', category: '3D Modeling & Animation (Primary)' },
  { name: 'SketchUp', category: '3D Experience Design' },
  { name: 'Unreal Engine', category: 'Real-time Rendering & XR' },
  { name: 'Marvelous Designer', category: 'Cloth Simulation' },
  { name: 'Adobe Creative Suite', category: 'Post-production & Design' },
  { name: 'React', category: 'Web Development' },
  { name: 'TypeScript', category: 'Software Development' },
  { name: 'Three.js', category: 'WebGL & 3D Web' },
  { name: 'Figma', category: 'UI/UX Design' },
  { name: 'Unity', category: 'XR Development' }
];

const workProcess = [
  {
    step: '01',
    title: 'Discovery',
    description: 'Understanding brand guidelines, project requirements, and spatial constraints'
  },
  {
    step: '02',
    title: 'Direction',
    description: 'Creating moodboards, layout plans, and establishing visual direction'
  },
  {
    step: '03',
    title: 'Modeling',
    description: '3D environment creation, brand application, and touchpoint development'
  },
  {
    step: '04',
    title: 'Camera/Renders',
    description: 'Strategic camera placement, lighting setup, and high-quality visualization'
  },
  {
    step: '05',
    title: 'Delivery',
    description: 'Final renders, POVs, plans, elevations, and comprehensive documentation'
  }
];

export function AboutPage() {
  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Multi-Disciplinary Designer & Developer
            </h1>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              I'm Michael Ndhlovu, a versatile creative professional with expertise spanning multiple disciplines. 
              As a <strong className="text-foreground">3D Experience Designer</strong> (3+ years with SketchUp, Unreal Engine, Blender), 
              <strong className="text-foreground"> 3D Generalist</strong> (7+ years specializing in Blender, Marvelous Designer, Adobe Creative Suite), 
              <strong className="text-foreground"> Software & Website Designer</strong> (5+ years web development, 1+ year software development), 
              and <strong className="text-foreground">XR Experience Creator</strong>, I bring immersive brand experiences to life by combining 
              3D artistry with cutting-edge technology.
            </p>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              My strength lies predominantly in <strong className="text-accent">Blender</strong>, where I excel at creating detailed environments, 
              characters, and interactive experiences. Whether you need stunning 3D visualizations, immersive XR experiences, or full-stack 
              creative solutions, I deliver end-to-end excellence.
            </p>
            
            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin size={16} />
                <span>Remote Work</span>
              </div>
              <div className="text-muted-foreground">•</div>
              <div className="text-muted-foreground">Teams or Google Meet</div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg">
                <Calendar size={16} className="mr-2" />
                Book a 15-min Intro Call
              </Button>
              <Button size="lg" variant="outline">
                <Download size={16} className="mr-2" />
                Download CV
              </Button>
            </div>
          </div>

          <div className="relative">
            <ImageWithFallback
              src={RENDERS.aomMaize}
              alt="Professional workspace"
              className="w-full h-96 object-cover rounded-lg"
            />
          </div>
        </div>

        {/* Expertise Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            Areas of Expertise
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: '3D Experience Design',
                description: '3+ years creating immersive brand environments with SketchUp, Unreal Engine, and Blender'
              },
              {
                title: '3D Generalist Work',
                description: '7+ years of expertise in modeling, texturing, lighting, and animation with Blender as primary tool'
              },
              {
                title: 'Website Development',
                description: '5+ years building responsive, interactive websites with modern frameworks and technologies'
              },
              {
                title: 'Software Development',
                description: '1+ year creating custom software solutions with TypeScript, React, and modern dev tools'
              },
              {
                title: 'XR Experience Creation',
                description: 'Immersive AR/VR experiences combining 3D artistry with real-time programming'
              },
              {
                title: 'Character & Cloth Design',
                description: 'Advanced character modeling and realistic cloth simulation using Marvelous Designer'
              }
            ].map((expertise, index) => (
              <Card key={index} className="border-border bg-card">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground mb-3">
                    {expertise.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {expertise.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* How I Work Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">
            How I Work
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {workProcess.map((process, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-accent font-bold text-lg">{process.step}</span>
                </div>
                <h3 className="font-semibold text-foreground mb-3">
                  {process.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {process.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Tools & Technology */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            Tools & Technology
          </h2>
          <div className="flex flex-wrap gap-3 justify-center">
            {tools.map((tool, index) => (
              <Badge key={index} variant="secondary" className="px-4 py-2">
                <span className="font-medium">{tool.name}</span>
                <span className="ml-2 text-xs text-muted-foreground">
                  {tool.category}
                </span>
              </Badge>
            ))}
          </div>
        </div>

        {/* Experience Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { number: '2+', label: 'Years Experience' },
            { number: '20+', label: 'Brands Worked With' },
            { number: '50+', label: 'Projects Delivered' },
            { number: '100%', label: 'Remote Delivery' }
          ].map((stat, index) => (
            <div key={index}>
              <div className="text-3xl font-bold text-accent mb-2">
                {stat.number}
              </div>
              <div className="text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}