import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Zap, Globe, Users, Award, TrendingUp } from 'lucide-react';

const dynamicTexts = [
  {
    text: "2+ Years of 3D Experience Design",
    icon: Award,
    color: "#9BB4FF"
  },
  {
    text: "15+ Brand Experiences Created",
    icon: Sparkles,
    color: "#00D9FF"
  },
  {
    text: "Remote Collaboration via Teams & Meet",
    icon: Globe,
    color: "#FF6B6B"
  },
  {
    text: "Working with Netflix, Hoyoverse, CeraVe",
    icon: Users,
    color: "#4ECDC4"
  },
  {
    text: "Specialized in Immersive Touchpoints",
    icon: Zap,
    color: "#FFE66D"
  },
  {
    text: "From Concept to Final Render",
    icon: TrendingUp,
    color: "#A8E6CF"
  }
];

const stats = [
  { label: "Years Experience", value: "2+", color: "#9BB4FF" },
  { label: "Projects Completed", value: "25+", color: "#00D9FF" },
  { label: "Brand Partners", value: "10+", color: "#FF6B6B" },
  { label: "Client Satisfaction", value: "100%", color: "#4ECDC4" }
];

export function CreativeIntroBar() {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('intro-bar');
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % dynamicTexts.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isVisible]);

  const currentText = dynamicTexts[currentTextIndex];
  const CurrentIcon = currentText.icon;

  return (
    <section id="intro-bar" className="py-12 bg-gradient-to-r from-background via-card to-background relative overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-accent rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * 200,
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * 200,
              scale: [1, 1.5, 1],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Dynamic Text Section */}
          <motion.div
            className="text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center gap-3 px-6 py-3 bg-accent/10 border border-accent/20 rounded-full mb-8"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, type: "spring" }}
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ backgroundColor: currentText.color + '20' }}
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <CurrentIcon size={16} style={{ color: currentText.color }} />
              </motion.div>
              <span className="font-medium text-foreground">Live Experience</span>
            </motion.div>

            <div className="relative h-20 flex items-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTextIndex}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -30, scale: 0.9 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="absolute inset-0 flex items-center"
                >
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">
                    <span 
                      className="bg-gradient-to-r bg-clip-text text-transparent"
                      style={{ 
                        backgroundImage: `linear-gradient(135deg, ${currentText.color}, ${currentText.color}80)`
                      }}
                    >
                      {currentText.text}
                    </span>
                  </h2>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Progress Indicators */}
            <div className="flex justify-center lg:justify-start gap-2 mt-8">
              {dynamicTexts.map((_, index) => (
                <motion.div
                  key={index}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    index === currentTextIndex ? 'w-8' : 'w-2'
                  }`}
                  style={{
                    backgroundColor: index === currentTextIndex 
                      ? currentText.color 
                      : currentText.color + '30'
                  }}
                  whileHover={{ scale: 1.2 }}
                />
              ))}
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            className="grid grid-cols-2 gap-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="relative p-6 rounded-2xl bg-card border border-border hover:shadow-lg transition-all duration-300 group cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                {/* Animated Background */}
                <motion.div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                  style={{ backgroundColor: stat.color }}
                />

                {/* Floating Accent */}
                <motion.div
                  className="absolute top-3 right-3 w-3 h-3 rounded-full"
                  style={{ backgroundColor: stat.color }}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.5,
                  }}
                />

                <div className="relative z-10">
                  <motion.div
                    className="text-3xl font-bold mb-2"
                    style={{ color: stat.color }}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ 
                      delay: 0.5 + index * 0.1, 
                      type: "spring", 
                      stiffness: 300 
                    }}
                  >
                    {stat.value}
                  </motion.div>
                  
                  <div className="text-sm text-muted-foreground font-medium">
                    {stat.label}
                  </div>
                </div>

                {/* Hover Effect Lines */}
                <motion.div
                  className="absolute bottom-0 left-0 h-1 rounded-full"
                  style={{ backgroundColor: stat.color }}
                  initial={{ width: 0 }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Floating Call-to-Action */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <motion.button
            className="group relative px-8 py-4 bg-gradient-to-r from-accent/20 to-primary/20 border border-accent/30 rounded-full font-medium text-foreground hover:from-accent/30 hover:to-primary/30 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-20 rounded-full transition-opacity duration-300"
            />
            <span className="relative flex items-center gap-2">
              <Sparkles size={16} className="text-accent" />
              Explore My Work
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                →
              </motion.div>
            </span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}