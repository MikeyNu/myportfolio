import { useState } from 'react';

const clients = [
  { name: 'Netflix', projects: 'Truck: Stranger Things, One Piece, Wednesday, Squid Game' },
  { name: 'Hulu', projects: 'Truck: Deli Boys' },
  { name: 'DreamWorks', projects: 'How to Train Your Dragon' },
  { name: 'Amazon MGM Studios', projects: 'Various Productions' },
  { name: 'Warner Bros', projects: 'The Wizard of Oz @ The Sphere' },
  { name: 'Hoyoverse', projects: 'Genshin Impact' },
  { name: 'Heineken', projects: 'Brand Experiences' },
  { name: 'Jimmy\'s Iced Coffee', projects: 'Pop-up Experiences' },
  { name: 'Pepsi', projects: 'Event Activations' },
  { name: 'Punchestown', projects: 'Event Venues' },
  { name: 'SBS', projects: 'Special Broadcasting Service' },
  { name: 'CeraVe', projects: 'Event Environment' },
  { name: 'Discovery Bank', projects: 'Animation Ad' },
  { name: 'Sega', projects: 'Sonic Racing: CrossWorlds stand' },
  { name: 'Arknights', projects: 'Endfield Booth' },
  { name: 'GAC', projects: 'Showroom' },
  { name: 'Daimler', projects: 'Conference Hall' },
  { name: 'COSM', projects: 'Immersive Venues' },
  { name: 'Logitech', projects: 'Event Assets' }
];

export function ClientLogoRail() {
  const [hoveredClient, setHoveredClient] = useState<string | null>(null);

  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-2">
            Trusted by Industry Leaders
          </h2>
          <p className="text-sm text-muted-foreground">
            Logos shown for project context
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {clients.map((client, index) => (
            <div
              key={index}
              className="relative group"
              onMouseEnter={() => setHoveredClient(client.name)}
              onMouseLeave={() => setHoveredClient(null)}
            >
              <div className="bg-card border border-border rounded-lg p-6 h-20 flex items-center justify-center transition-all duration-300 hover:border-accent/50 hover:shadow-md">
                <span className={`font-medium text-center transition-colors duration-300 ${
                  hoveredClient === client.name ? 'text-accent' : 'text-muted-foreground'
                }`}>
                  {client.name}
                </span>
              </div>

              {/* Tooltip */}
              {hoveredClient === client.name && (
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 z-10">
                  <div className="bg-popover border border-border rounded-lg p-3 shadow-lg min-w-48">
                    <div className="text-sm font-medium text-popover-foreground mb-1">
                      {client.name}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {client.projects}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}