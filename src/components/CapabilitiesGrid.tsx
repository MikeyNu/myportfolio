import { Card, CardContent } from './ui/card';
import { Box, Layout, Palette, Layers, MapPin, Camera } from 'lucide-react';

const capabilities = [
  {
    icon: Box,
    title: '3D Modeling from Direction',
    description: '3D modelling of brand experiences from clear direction (Moodboard, Plan Layout, Brand Identity)'
  },
  {
    icon: Layout,
    title: 'Plans & Elevations',
    description: '3D modeling designs from layout plans & elevations'
  },
  {
    icon: Layers,
    title: 'Reference-Based Modeling',
    description: '3D Modelling touchpoints from supplied references'
  },
  {
    icon: Palette,
    title: 'Brand Identity Application',
    description: 'Applying client brand identity across all assets and touchpoints'
  },
  {
    icon: MapPin,
    title: 'Spatial Layouts',
    description: 'Basic spatial layouts for stands, pop-ups, and events'
  },
  {
    icon: Camera,
    title: 'Visualization & Renders',
    description: 'Visualising designs via clear camera work & renders (touchpoint POVs, plans, elevations, with & without layout grid)'
  }
];

export function CapabilitiesGrid() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Core Capabilities
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Specialized in creating immersive 3D brand experiences from concept to final render
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {capabilities.map((capability, index) => {
            const Icon = capability.icon;
            return (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-border bg-card">
                <CardContent className="p-8">
                  <div className="mb-6">
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                      <Icon size={24} className="text-accent" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">
                      {capability.title}
                    </h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {capability.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}