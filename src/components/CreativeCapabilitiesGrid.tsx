interface Capability {
  title: string;
  description: string;
  skills: string[];
}

const capabilities: Capability[] = [
  {
    title: '3D modeling from direction',
    description: 'Build brand experiences from supplied moodboards, plan layouts, visual references and brand systems.',
    skills: ['Blender', 'SketchUp', 'Brand guidelines']
  },
  {
    title: 'Plans and elevations',
    description: 'Translate technical drawings and spatial information into clear three-dimensional environments for review and development.',
    skills: ['Technical drawing', 'Spatial interpretation', 'Layout development']
  },
  {
    title: 'Reference-based modeling',
    description: 'Reconstruct products, props, environments and touchpoints from supplied references with close attention to proportion and detail.',
    skills: ['Reference study', 'Asset creation', 'Detail modeling']
  },
  {
    title: 'Brand identity application',
    description: 'Carry established brand systems across physical assets and spatial touchpoints without diluting the source identity.',
    skills: ['Brand systems', 'Material treatment', 'Visual consistency']
  },
  {
    title: 'Spatial layouts',
    description: 'Develop practical layouts for stands, pop-ups, showrooms and events with attention to circulation, sightlines and audience flow.',
    skills: ['Space planning', 'Audience flow', 'Experience design']
  },
  {
    title: 'Visualization and renders',
    description: 'Create presentation and production views through intentional cameras, lighting, materials and post-production.',
    skills: ['Camera work', 'Lighting', 'Rendering', 'Post-production']
  }
];

export function CreativeCapabilitiesGrid() {
  return (
    <section className="py-20 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">3D experience design capabilities</h2>
            <p className="text-muted-foreground leading-relaxed">
              The portfolio is strongest when the design problem is specific: turn direction, drawings or references into spatial work that can be reviewed, presented and produced.
            </p>
          </div>

          <div className="lg:col-span-8">
            {capabilities.map((capability, index) => (
              <div key={capability.title} className="grid grid-cols-1 md:grid-cols-3 gap-4 py-6 border-t border-border">
                <div>
                  <span className="text-sm text-accent">0{index + 1}</span>
                  <h3 className="text-xl font-semibold text-foreground mt-2">{capability.title}</h3>
                </div>
                <div className="md:col-span-2">
                  <p className="text-muted-foreground leading-relaxed mb-3">{capability.description}</p>
                  <p className="text-sm text-foreground">{capability.skills.join(' · ')}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
