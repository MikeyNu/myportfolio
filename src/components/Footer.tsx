import { Button } from './ui/button';
import { Mail, Download, Calendar } from 'lucide-react';
import { openCalendly } from '../config/calendly';

interface FooterProps {
  onPageChange: (page: string) => void;
}

export function Footer({ onPageChange }: FooterProps) {
  return (
    <footer className="bg-card border-t border-border py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Contact */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Get in Touch</h3>
            <div className="space-y-3">
              <a 
                href="mailto:info@mikeynu.com" 
                className="flex items-center text-muted-foreground hover:text-accent transition-colors"
              >
                <Mail size={16} className="mr-2" />
                info@mikeynu.com
              </a>
              <div className="text-sm text-muted-foreground">
                Remote work via Teams or Google Meet
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Navigation</h3>
            <div className="space-y-2">
              {['home', 'projects', 'about', 'contact'].map((page) => (
                <button
                  key={page}
                  onClick={() => onPageChange(page)}
                  className="block text-muted-foreground hover:text-accent transition-colors capitalize"
                >
                  {page}
                </button>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Services</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div>3D Experience Design</div>
              <div>Brand Environment Modeling</div>
              <div>Spatial Layout Planning</div>
              <div>Visualization & Renders</div>
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Download size={16} className="mr-2" />
                Download CV
              </Button>
              <Button size="sm" className="w-full justify-start" onClick={() => openCalendly()}>
                <Calendar size={16} className="mr-2" />
                Book 15-min Call
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-muted-foreground">
              © 2025 Michael Ndhlovu. All rights reserved.
            </div>
            
            <div className="flex items-center gap-6">
              <div className="text-sm text-muted-foreground">
                3D Experience Designer • 2 Years Experience
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}