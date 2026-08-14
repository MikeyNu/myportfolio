import { useEffect, useRef, useState } from 'react';
import { Button } from './ui/button';
import { ArrowRight, Menu, X } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { openCalendly } from '../config/calendly';

interface ImprovedCreativeNavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  onThemeChange: (theme: 'light' | 'dark') => void;
}

const navItems = [
  { id: 'home', label: 'Home', description: 'Overview and selected work' },
  { id: 'projects', label: 'Projects', description: 'Portfolio archive and case studies' },
  { id: 'about', label: 'About', description: 'Experience, tools and working process' },
  { id: 'contact', label: 'Contact', description: 'Project inquiry and direct contact' }
];

export function ImprovedCreativeNavigation({ currentPage, onPageChange, onThemeChange }: ImprovedCreativeNavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const lastFocusedElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      lastFocusedElement.current = document.activeElement as HTMLElement;
      const firstMenuItem = mobileMenuRef.current?.querySelector<HTMLButtonElement>('.mobile-nav-item');
      firstMenuItem?.focus();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      lastFocusedElement.current?.focus();
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const handlePageChange = (page: string) => {
    onPageChange(page);
    setIsMobileMenuOpen(false);
  };

  const handleBookCall = () => {
    setIsMobileMenuOpen(false);
    openCalendly();
  };

  const isActivePage = (page: string) => {
    return currentPage === page || (currentPage === 'case-study' && page === 'projects');
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-40 bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => handlePageChange('home')}
              className="text-left"
              aria-label="Michael Ndhlovu, home"
            >
              <span className="block font-semibold text-foreground">Michael Ndhlovu</span>
              <span className="hidden sm:block text-xs text-muted-foreground">3D experience design · XR · software</span>
            </button>

            <div className="hidden lg:flex items-center gap-2">
              {navItems.map((item) => {
                const active = isActivePage(item.id);
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handlePageChange(item.id)}
                    className={`px-4 py-2 text-sm font-medium transition-colors ${active ? 'text-accent' : 'text-muted-foreground hover:text-foreground'}`}
                    aria-current={active ? 'page' : undefined}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-2">
              <ThemeToggle onThemeChange={onThemeChange} />
              <div className="hidden lg:block">
                <Button onClick={handleBookCall}>
                  Book intro call
                </Button>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setIsMobileMenuOpen((open) => !open)}
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className="fixed top-20 left-0 right-0 bottom-0 z-30 lg:hidden bg-background" ref={mobileMenuRef}>
          <div className="px-6 py-8">
            <div className="border-t border-border">
              {navItems.map((item) => {
                const active = isActivePage(item.id);
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handlePageChange(item.id)}
                    className="mobile-nav-item w-full flex items-center justify-between gap-6 py-6 text-left border-b border-border"
                    aria-current={active ? 'page' : undefined}
                  >
                    <span>
                      <span className={`block text-lg font-semibold ${active ? 'text-accent' : 'text-foreground'}`}>{item.label}</span>
                      <span className="block text-sm text-muted-foreground mt-1">{item.description}</span>
                    </span>
                    <ArrowRight size={18} className={active ? 'text-accent' : 'text-muted-foreground'} />
                  </button>
                );
              })}
            </div>

            <div className="pt-8">
              <Button className="w-full" onClick={handleBookCall}>
                Book a 15-minute intro call
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
