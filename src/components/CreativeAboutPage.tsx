import { Button } from './ui/button';
import { ImageWithFallback } from './shared/ImageWithFallback';
import { RENDERS } from '../data/renderAssets';
import { openCalendly } from '../config/calendly';

const disciplines = [
  {
    title: '3D experience design',
    description: 'Brand environments, exhibition stands, retail spaces and event experiences developed from direction, plans and client requirements.'
  },
  {
    title: '3D generalist work',
    description: 'Modeling, UV work, texturing, lighting, rendering, animation and asset development, with Blender as the primary production tool.'
  },
  {
    title: 'Web development',
    description: 'Responsive interactive websites and web applications built with React, TypeScript and modern browser technologies.'
  },
  {
    title: 'Software development',
    description: 'Custom product and platform work spanning frontend systems, backend services and production implementation.'
  },
  {
    title: 'XR experiences',
    description: 'AR and VR work combining real-time engines, spatial interaction and 3D content for immersive digital experiences.'
  },
  {
    title: 'Character and cloth',
    description: 'Character asset work and cloth simulation using Blender, Marvelous Designer and supporting production tools.'
  }
];

const tools = [
  { name: 'Blender', category: '3D modeling and animation' },
  { name: 'SketchUp', category: '3D experience design' },
  { name: 'Unreal Engine', category: 'Real-time and XR' },
  { name: 'Marvelous Designer', category: 'Cloth simulation' },
  { name: 'Adobe Creative Suite', category: 'Design and post-production' },
  { name: 'React / TypeScript', category: 'Web development' },
  { name: 'Three.js', category: 'WebGL and 3D web' },
  { name: 'Unity', category: 'XR development' },
  { name: 'Figma', category: 'Interface design' },
  { name: 'Node.js', category: 'Backend development' }
];

const workProcess = [
  {
    step: '01',
    title: 'Discovery',
    description: 'Understand the brand system, project requirements, source material and spatial constraints before choosing a production approach.'
  },
  {
    step: '02',
    title: 'Direction',
    description: 'Establish the visual and spatial direction through references, layouts, plans and the client material already available.'
  },
  {
    step: '03',
    title: 'Modeling and build',
    description: 'Create the environment, assets and branded touchpoints at the level of fidelity required for review or production.'
  },
  {
    step: '04',
    title: 'Camera and visualization',
    description: 'Use deliberate camera positions, lighting and materials to communicate the design clearly rather than relying on decorative presentation effects.'
  },
  {
    step: '05',
    title: 'Delivery',
    description: 'Prepare the agreed renders, views, assets, plans, elevations or implementation files for the next production stage.'
  }
];

export function CreativeAboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-8">
              <p className="text-lg font-medium text-accent mb-4">Michael Ndhlovu</p>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight mb-6">
                A multidisciplinary designer and developer with a 3D production core.
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                My work combines 3D experience design, generalist production, XR and software development. The common thread is building something concrete from a brief, reference, plan or product requirement, then carrying it through to a clear visual or interactive result.
              </p>

              <div className="border-t border-border pt-6 mb-8">
                <p className="text-sm text-foreground leading-relaxed">
                  7+ years in 3D · 3+ years in 3D experience design · 5+ years in web development · Remote collaboration via Teams or Google Meet
                </p>
              </div>

              <Button size="lg" onClick={openCalendly}>Book a 15-minute intro call</Button>
            </div>

            <div className="lg:col-span-4">
              <ImageWithFallback
                src={RENDERS.gacShowroom}
                alt="GAC automotive showroom environment"
                className="w-full h-96 object-cover rounded-lg"
              />
              <p className="text-sm text-muted-foreground pt-3">Selected spatial design work from the portfolio.</p>
            </div>
          </div>
        </div>
      </header>

      <section className="py-20 bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Disciplines</h2>
              <p className="text-muted-foreground leading-relaxed">
                Each area below reflects work represented in the portfolio rather than a decorative capability score.
              </p>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              {disciplines.map((discipline) => (
                <div key={discipline.title} className="border-t border-border pt-4">
                  <h3 className="text-xl font-semibold text-foreground mb-2">{discipline.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{discipline.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Production tools</h2>
              <p className="text-muted-foreground leading-relaxed">
                Tools are shown by their role in the workflow, without arbitrary proficiency percentages.
              </p>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              {tools.map((tool) => (
                <div key={tool.name} className="flex items-start justify-between gap-6 border-t border-border pt-4">
                  <h3 className="font-semibold text-foreground">{tool.name}</h3>
                  <p className="text-sm text-muted-foreground text-right">{tool.category}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Working process</h2>
              <p className="text-muted-foreground leading-relaxed">
                The process adapts to the brief, but the sequence keeps decisions tied to source material and production needs.
              </p>
            </div>

            <div className="lg:col-span-8">
              {workProcess.map((step) => (
                <div key={step.step} className="grid grid-cols-1 md:grid-cols-3 gap-4 py-6 border-t border-border">
                  <div>
                    <span className="text-sm text-accent">{step.step}</span>
                    <h3 className="text-xl font-semibold text-foreground mt-2">{step.title}</h3>
                  </div>
                  <p className="md:col-span-2 text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
