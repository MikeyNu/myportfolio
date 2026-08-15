import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

interface ImprovedCreativeNavigationProps {
  currentPage: string;
  currentTheme: 'light' | 'dark';
  onPageChange: (page: string) => void;
  onThemeChange: (theme: 'light' | 'dark') => void;
}

const navItems = [
  { id: 'projects', label: 'Work' },
  { id: 'services', label: 'Services' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' }
];

export function ImprovedCreativeNavigation({
  currentPage,
  currentTheme,
  onPageChange,
  onThemeChange
}: ImprovedCreativeNavigationProps) {
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
      mobileMenuRef.current?.querySelector<HTMLButtonElement>('.cinematic-mobile-menu-link')?.focus();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      lastFocusedElement.current?.focus();
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const handlePageChange = (page: string) => {
    onPageChange(page);
    setIsMobileMenuOpen(false);
  };

  const isActivePage = (page: string) => {
    return currentPage === page || ((currentPage === 'home' || currentPage === 'case-study') && page === 'projects');
  };

  return (
    <>
      <nav className="cinematic-nav" aria-label="Primary navigation">
        <div className="cinematic-nav-inner">
          <button
            type="button"
            className="cinematic-brand"
            onClick={() => handlePageChange('home')}
            aria-label="Mikey Nu, home"
          >
            MN
          </button>

          <div className="cinematic-nav-actions">
            <div className="cinematic-nav-links">
              {navItems.map((item) => {
                const active = isActivePage(item.id);
                return (
                  <button
                    key={item.id}
                    type="button"
                    className="cinematic-nav-link"
                    data-active={active}
                    onClick={() => handlePageChange(item.id)}
                    aria-current={active ? 'page' : undefined}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>

            <ThemeToggle theme={currentTheme} onThemeChange={onThemeChange} />

            <button
              type="button"
              className="cinematic-menu-toggle"
              onClick={() => setIsMobileMenuOpen((open) => !open)}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="cinematic-mobile-menu"
            >
              {isMobileMenuOpen ? <X size={19} aria-hidden="true" /> : <Menu size={19} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div
          id="cinematic-mobile-menu"
          className="cinematic-mobile-menu"
          ref={mobileMenuRef}
        >
          <div className="cinematic-mobile-menu-list">
            {navItems.map((item, index) => {
              const active = isActivePage(item.id);
              return (
                <button
                  key={item.id}
                  type="button"
                  className="cinematic-mobile-menu-link"
                  data-active={active}
                  onClick={() => handlePageChange(item.id)}
                  aria-current={active ? 'page' : undefined}
                >
                  <span>{item.label}</span>
                  <span className="cinematic-meta">0{index + 1}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
