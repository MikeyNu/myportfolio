import { Button } from './ui/button';
import { openCalendly } from '../config/calendly';

interface CreativeFooterProps {
  onPageChange: (page: string) => void;
}

const footerNavigation = [
  { id: 'home', label: 'Home' },
  { id: 'projects', label: 'Projects' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' }
];

export function CreativeFooter({ onPageChange }: CreativeFooterProps) {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end mb-12">
          <div className="lg:col-span-8">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Need a 3D environment, spatial concept or interactive build?
            </h2>
            <p className="text-muted-foreground leading-relaxed max-w-2xl">
              Send the brief, source material and intended deliverables. I can assess where 3D, XR or software work is actually needed and what should be produced next.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col sm:flex-row gap-3 lg:justify-start">
            <Button onClick={openCalendly}>Book intro call</Button>
            <Button variant="outline" onClick={() => onPageChange('contact')}>Project inquiry</Button>
          </div>
        </div>

        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <a href="mailto:info@mikeynu.com" className="font-medium text-foreground hover:text-accent transition-colors">
                info@mikeynu.com
              </a>
              <p className="text-sm text-muted-foreground mt-1">Remote collaboration via Teams or Google Meet</p>
            </div>

            <nav className="flex flex-wrap gap-4" aria-label="Footer navigation">
              {footerNavigation.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onPageChange(item.id)}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          <p className="text-xs text-muted-foreground mt-8">© {new Date().getFullYear()} Michael Ndhlovu. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
