const clients = [
  { name: 'Netflix', projects: 'Stranger Things, One Piece, Wednesday and Squid Game' },
  { name: 'Hulu', projects: 'Deli Boys food truck display' },
  { name: 'DreamWorks', projects: 'How to Train Your Dragon' },
  { name: 'Amazon MGM Studios', projects: 'Production and experience work' },
  { name: 'Warner Bros', projects: 'The Wizard of Oz at the Sphere' },
  { name: 'Hoyoverse', projects: 'Genshin Impact exhibition' },
  { name: 'Heineken', projects: 'Pop-up brand experiences' },
  { name: "Jimmy's Iced Coffee", projects: 'Pop-up experience design' },
  { name: 'Pepsi', projects: 'Event activations' },
  { name: 'CeraVe', projects: '3D product modeling and texturing' },
  { name: 'Discovery Bank', projects: 'Motion tracking and animation for video advertising' },
  { name: 'SEGA', projects: 'Sonic Racing: CrossWorlds' },
  { name: 'Arknights', projects: 'Endfield exhibition booth' },
  { name: 'GAC Motor', projects: 'Automotive showroom' },
  { name: 'Daimler', projects: 'Conference hall design' },
  { name: 'COSM', projects: 'Immersive venue work' },
  { name: 'Logitech', projects: 'Event assets and displays' }
];

export function CreativeClientLogoRail() {
  return (
    <section className="py-20 bg-card border-b border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Selected clients and collaborations</h2>
            <p className="text-muted-foreground leading-relaxed">
              A cross-section of entertainment, consumer, automotive and technology work represented across the portfolio.
            </p>
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            {clients.map((client) => (
              <div key={client.name} className="border-t border-border pt-4">
                <h3 className="font-semibold text-foreground mb-1">{client.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{client.projects}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
