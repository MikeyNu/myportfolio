import { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Menu, X, Sparkles, Zap, Home, FolderOpen, User, Mail, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence, PanInfo } from 'motion/react';
import { ThemeToggle } from './ThemeToggle';
import { openCalendly } from '../config/calendly';

interface ImprovedCreativeNavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  onThemeChange: (theme: 'light' | 'dark') => void;
}

export function ImprovedCreativeNavigation({ currentPage, onPageChange, onThemeChange }: ImprovedCreativeNavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const lastFocusedElement = useRef<HTMLElement | null>(null);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home, description: 'Welcome & Overview' },
    { id: 'projects', label: 'Projects', icon: FolderOpen, description: 'Portfolio & Case Studies' },
    { id: 'about', label: 'About', icon: User, description: 'Experience & Skills' },
    { id: 'contact', label: 'Contact', icon: Mail, description: 'Get In Touch' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        closeMobileMenu();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMobileMenuOpen]);

  // Focus management for accessibility
  useEffect(() => {
    if (isMobileMenuOpen) {
      lastFocusedElement.current = document.activeElement as HTMLElement;
      // Focus first menu item
      setTimeout(() => {
        const firstMenuItem = mobileMenuRef.current?.querySelector('button');
        firstMenuItem?.focus();
      }, 300);
    } else if (lastFocusedElement.current) {
      lastFocusedElement.current.focus();
    }
  }, [isMobileMenuOpen]);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const openMobileMenu = () => {
    setIsMobileMenuOpen(true);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handlePageChange = (page: string) => {
    onPageChange(page);
    closeMobileMenu();
  };

  const handleContactClick = () => {
    openCalendly();
  };

  // Handle swipe to close
  const handlePanEnd = (event: any, info: PanInfo) => {
    if (info.offset.x > 100 && info.velocity.x > 500) {
      closeMobileMenu();
    }
  };

  return (
    <>
      {/* Floating cursor follower - hidden on mobile */}
      <motion.div
        className="fixed w-4 h-4 bg-accent/30 rounded-full pointer-events-none z-50 mix-blend-difference hidden md:block"
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
        }}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 200,
          mass: 0.5,
        }}
      />

      <motion.nav 
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled 
            ? 'bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-lg' 
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Animated background gradient - hidden on mobile for performance */}
        <motion.div
          className="absolute inset-0 opacity-30 hidden md:block"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(155, 180, 255, 0.1), transparent 50%)`,
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.button 
              onClick={() => handlePageChange('home')}
              className="group relative"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Michael Ndhlovu - Home"
            >
              <motion.div
                className="absolute -inset-2 rounded-lg bg-gradient-to-r from-accent/20 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                layoutId="logoBackground"
              />

            </motion.button>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <motion.button
                    key={item.id}
                    onClick={() => handlePageChange(item.id)}
                    className={`relative px-4 py-2 rounded-lg transition-all duration-300 ${
                      currentPage === item.id 
                        ? 'text-accent' 
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={`Navigate to ${item.label}`}
                  >
                    {currentPage === item.id && (
                      <motion.div
                        className="absolute inset-0 bg-accent/10 border border-accent/20 rounded-lg"
                        layoutId="activeNavBackground"
                        initial={false}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                    <span className="relative flex items-center space-x-2">
                      <Icon size={16} />
                      <span className="capitalize">{item.label}</span>
                    </span>
                  </motion.button>
                );
              })}
            </div>

            {/* Right side controls */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Theme toggle */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ThemeToggle onThemeChange={onThemeChange} />
              </motion.div>
              
              {/* CTA button - Now visible on all screens */}
              <motion.div
                className="hidden sm:block"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  className="relative overflow-hidden bg-gradient-to-r from-accent to-primary hover:from-primary hover:to-accent transition-all duration-300 min-h-[48px]"
                  onClick={handleContactClick}
                >
                  <motion.div
                    className="absolute inset-0 bg-white/20"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6 }}
                  />
                  <span className="relative flex items-center space-x-2">
                    <Zap size={16} />
                    <span className="hidden xl:inline">Book a 15-min Intro Call</span>
                    <span className="xl:hidden">Book Call</span>
                  </span>
                </Button>
              </motion.div>

              {/* Mobile menu toggle */}
              <motion.div
                className="lg:hidden"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={isMobileMenuOpen ? closeMobileMenu : openMobileMenu}
                  className="text-muted-foreground hover:text-foreground relative"
                  aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                  aria-expanded={isMobileMenuOpen}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={isMobileMenuOpen ? 'close' : 'menu'}
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </motion.div>
                  </AnimatePresence>
                  
                  {/* Menu button indicator */}
                  <motion.div
                    className="absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full"
                    initial={{ scale: 0 }}
                    animate={{ scale: isMobileMenuOpen ? 0 : 1 }}
                    transition={{ delay: 0.2 }}
                  />
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Enhanced Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-30 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Backdrop with blur */}
            <motion.div
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMobileMenu}
            />
            
            {/* Menu Content */}
            <motion.div
              ref={mobileMenuRef}
              className="absolute top-0 right-0 w-full max-w-sm h-full bg-background/95 backdrop-blur-xl border-l border-border shadow-2xl"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              onPanEnd={handlePanEnd}
              drag="x"
              dragConstraints={{ left: 0, right: 300 }}
              dragElastic={0.1}
            >
              {/* Menu Header */}
              <div className="flex items-center justify-between p-4 sm:p-6 border-b border-border/50">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                    <Sparkles size={16} className="text-accent-foreground" />
                  </div>
                  <div>
                    <div className="font-bold text-foreground">Michael Ndhlovu</div>
                    <div className="text-xs text-muted-foreground">3D Experience Designer</div>
                  </div>
                </div>
                
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={closeMobileMenu}
                  className="text-muted-foreground hover:text-foreground"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </Button>
              </div>

              {/* Navigation Items */}
              <div className="flex-1 p-4 sm:p-6 space-y-2">
                {navItems.map((item, index) => {
                  const Icon = item.icon;
                  const isActive = currentPage === item.id;
                  
                  return (
                    <motion.button
                      key={item.id}
                      onClick={() => handlePageChange(item.id)}
                      className={`w-full text-left p-4 rounded-xl transition-all duration-300 group ${
                        isActive
                          ? 'bg-accent/10 text-accent border border-accent/20 shadow-sm' 
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted/50 border border-transparent'
                      }`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + 0.1 }}
                      whileHover={{ scale: 1.02, x: 5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className={`p-2 rounded-lg transition-colors ${
                            isActive ? 'bg-accent/20' : 'bg-muted/50 group-hover:bg-accent/10'
                          }`}>
                            <Icon size={20} />
                          </div>
                          <div>
                            <div className="font-medium capitalize">{item.label}</div>
                            <div className="hidden sm:block text-xs text-muted-foreground">{item.description}</div>
                          </div>
                        </div>
                        
                        {isActive && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-2 h-2 bg-accent rounded-full"
                          />
                        )}
                        
                        {!isActive && (
                          <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        )}
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {/* Menu Footer */}
              <div className="p-4 sm:p-6 border-t border-border/50 space-y-4">
                {/* Theme toggle for mobile */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Appearance</span>
                  <ThemeToggle onThemeChange={onThemeChange} />
                </div>
                
                {/* CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <Button 
                    className="w-full bg-gradient-to-r from-accent to-primary hover:from-primary hover:to-accent text-sm sm:text-base"
                    onClick={handleContactClick}
                  >
                    <span className="flex items-center justify-center space-x-2">
                      <Zap size={16} />
                      <span>Book a 15-min Call</span>
                    </span>
                  </Button>
                </motion.div>
                
                {/* Status indicator */}
                <div className="flex items-center justify-center space-x-2 text-xs text-muted-foreground">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span>Available for new projects</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}