import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { X } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { getPagePath, type Page } from '../seo/siteSeo';

interface ImprovedCreativeNavigationProps {
  currentPage: string;
  currentTheme: 'light' | 'dark';
  onPageChange: (page: string) => void;
  onThemeChange: (theme: 'light' | 'dark') => void;
}

const navItems: { id: Exclude<Page, 'home' | 'case-study'>; label: string }[] = [
  { id: 'projects', label: 'Work' },
  { id: 'services', label: 'Services' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' }
];

function shouldUseClientNavigation(event: MouseEvent<HTMLAnchorElement>) {
  return !event.defaultPrevented
    && event.button === 0
    && !event.metaKey
    && !event.ctrlKey
    && !event.shiftKey
    && !event.altKey;
}

export function ImprovedCreativeNavigation({
  currentPage,
  currentTheme,
  onPageChange,
  onThemeChange
}: ImprovedCreativeNavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const lastFocusedElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      mobileMenuRef.current?.querySelector<HTMLElement>('.cinematic-mobile-menu-link')?.focus();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      lastFocusedElement.current?.focus();
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const handleLink = (event: MouseEvent<HTMLAnchorElement>, page: Page) => {
    if (!shouldUseClientNavigation(event)) return;
    event.preventDefault();
    onPageChange(page);
    setIsMobileMenuOpen(false);
  };

  const isActivePage = (page: string) => {
    return currentPage === page || (currentPage === 'case-study' && page === 'projects');
  };

  return (
    <>
      <nav className="cinematic-nav" aria-label="Primary navigation" data-scrolled={scrolled}>
        <div className="cinematic-nav-inner">
          <a
            className="cinematic-brand"
            href={getPagePath('home')}
            onClick={(event) => handleLink(event, 'home')}
            aria-label="Mikey Nu, home"
          >
            MN
          </a>

          <div className="cinematic-nav-actions">
            <div className="cinematic-nav-links">
              {navItems.map((item) => {
                const active = isActivePage(item.id);
                return (
                  <a
                    key={item.id}
                    href={getPagePath(item.id)}
                    className="cinematic-nav-link"
                    data-active={active}
                    onClick={(event) => handleLink(event, item.id)}
                    aria-current={active ? 'page' : undefined}
                  >
                    {item.label}
                  </a>
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
              {isMobileMenuOpen ? (
                <X size={19} aria-hidden="true" />
              ) : (
                <svg width="19" height="13" viewBox="0 0 19 13" fill="none" aria-hidden="true">
                  <rect x="0" y="0" width="19" height="1.5" fill="currentColor" />
                  <rect x="6" y="5.5" width="13" height="1.5" fill="currentColor" />
                  <rect x="0" y="11" width="19" height="1.5" fill="currentColor" />
                </svg>
              )}
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
                <a
                  key={item.id}
                  href={getPagePath(item.id)}
                  className="cinematic-mobile-menu-link"
                  data-active={active}
                  onClick={(event) => handleLink(event, item.id)}
                  aria-current={active ? 'page' : undefined}
                >
                  <span>{item.label}</span>
                  <span className="cinematic-meta">0{index + 1}</span>
                </a>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
