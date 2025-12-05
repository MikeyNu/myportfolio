import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Moon, Sun } from 'lucide-react';
import { openCalendly } from '../config/calendly';

interface NavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export function Navigation({ currentPage, onPageChange }: NavigationProps) {
  const [isDark, setIsDark] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // Set dark mode by default
    document.documentElement.classList.add('dark');
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-background/80 backdrop-blur-md border-b border-border' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <button 
              onClick={() => onPageChange('home')}
              className="text-lg font-medium text-foreground hover:text-accent transition-colors"
            >
              Michael Ndhlovu
            </button>
            
            <div className="hidden md:flex items-center space-x-6">
              {['home', 'projects', 'about', 'contact'].map((page) => (
                <button
                  key={page}
                  onClick={() => onPageChange(page)}
                  className={`capitalize transition-colors ${
                    currentPage === page 
                      ? 'text-accent' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="text-muted-foreground hover:text-foreground"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </Button>
            
            <Button className="hidden md:inline-flex" onClick={() => openCalendly()}>
              Book a 15-min Intro Call
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}