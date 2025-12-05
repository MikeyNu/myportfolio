import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Moon, Sun, Menu, X, Sparkles, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ThemeToggle } from './ThemeToggle';

interface CreativeNavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  onThemeChange: (theme: 'light' | 'dark') => void;
}

export function CreativeNavigation({ currentPage, onPageChange, onThemeChange }: CreativeNavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const navItems = [
    { id: 'home', label: 'Home', icon: Sparkles },
    { id: 'projects', label: 'Projects', icon: Zap },
    { id: 'about', label: 'About', icon: Sun },
    { id: 'contact', label: 'Contact', icon: Moon }
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



  const handlePageChange = (page: string) => {
    onPageChange(page);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Floating cursor follower */}
      <motion.div
        className="fixed w-4 h-4 bg-accent/30 rounded-full pointer-events-none z-50 mix-blend-difference"
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
            ? 'bg-background/70 backdrop-blur-xl border-b border-border/50 shadow-lg' 
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Animated background gradient */}
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(155, 180, 255, 0.1), transparent 50%)`,
          }}
        />

        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo with creative hover effect */}
            <motion.button 
              onClick={() => handlePageChange('home')}
              className="group relative"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute -inset-2 rounded-lg bg-gradient-to-r from-accent/20 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                layoutId="logoBackground"
              />
              <div className="relative flex items-center space-x-3">
                <motion.div
                  className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles size={16} className="text-accent-foreground" />
                </motion.div>
                <span className="text-lg font-bold bg-gradient-to-r from-foreground to-accent bg-clip-text text-transparent">
                  Michael Ndhlovu
                </span>
              </div>
            </motion.button>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
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

            <div className="flex items-center space-x-4">
              {/* Theme toggle */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ThemeToggle onThemeChange={onThemeChange} />
              </motion.div>
              
              {/* Creative CTA button */}
              <motion.div
                className="hidden md:block"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button className="relative overflow-hidden bg-gradient-to-r from-accent to-primary hover:from-primary hover:to-accent transition-all duration-300">
                  <motion.div
                    className="absolute inset-0 bg-white/20"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6 }}
                  />
                  <span className="relative flex items-center space-x-2">
                    <Zap size={16} />
                    <span>Book a 15-min Intro Call</span>
                  </span>
                </Button>
              </motion.div>

              {/* Mobile menu toggle */}
              <motion.div
                className="md:hidden"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="text-muted-foreground hover:text-foreground"
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
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Creative Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-30 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Menu Content */}
            <motion.div
              className="absolute top-0 right-0 w-80 h-full bg-background/95 backdrop-blur-xl border-l border-border shadow-2xl"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              <div className="p-6 pt-20">
                <div className="space-y-4">
                  {navItems.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <motion.button
                        key={item.id}
                        onClick={() => handlePageChange(item.id)}
                        className={`w-full text-left p-4 rounded-lg transition-all duration-300 ${
                          currentPage === item.id 
                            ? 'bg-accent/10 text-accent border border-accent/20' 
                            : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                        }`}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02, x: 5 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center space-x-3">
                          <Icon size={20} />
                          <span className="capitalize font-medium">{item.label}</span>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>

                <motion.div
                  className="mt-8 pt-6 border-t border-border"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Button 
                    className="w-full bg-gradient-to-r from-accent to-primary hover:from-primary hover:to-accent"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="flex items-center space-x-2">
                      <Zap size={16} />
                      <span>Book a Call</span>
                    </span>
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}