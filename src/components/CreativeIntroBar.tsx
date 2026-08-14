const practiceAreas = [
  {
    title: 'Spatial and 3D',
    description: 'Exhibition stands, branded environments, retail spaces, event activations, asset creation and high-quality visualization.'
  },
  {
    title: 'XR and real-time',
    description: 'AR and VR experiences that combine 3D content, interaction design and real-time engines for practical audience experiences.'
  },
  {
    title: 'Web and software',
    description: 'Interactive websites and custom software built with the same attention to hierarchy, usability and visual execution as the physical work.'
  }
];

export function CreativeIntroBar() {
  return (
    <section className="bg-card border-b border-border">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <h2 className="text-3xl font-bold text-foreground mb-4">One practice across physical and digital experience.</h2>
            <p className="text-muted-foreground leading-relaxed">
              The work moves between spatial design, 3D production and development, with each discipline used where it materially improves the final experience.
            </p>
          </div>

          <div className="lg:col-span-8">
            {practiceAreas.map((area) => (
              <div key={area.title} className="grid grid-cols-1 md:grid-cols-3 gap-4 py-6 border-t border-border">
                <h3 className="font-semibold text-foreground">{area.title}</h3>
                <p className="md:col-span-2 text-muted-foreground leading-relaxed">{area.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
