import { ModernHero } from './ModernHero';
import { MobileProjectShowcase } from './MobileProjectShowcase';
import { CreativeIntroBar } from './CreativeIntroBar';
import { CreativeCapabilitiesGrid } from './CreativeCapabilitiesGrid';
import { CreativeClientLogoRail } from './CreativeClientLogoRail';
import { FeaturedCaseStudies } from './FeaturedCaseStudies';
import { motion } from 'motion/react';

interface CreativeHomePageProps {
  onViewCaseStudy: (projectId: string) => void;
  onViewAllProjects: () => void;
}

export function CreativeHomePage({ onViewCaseStudy, onViewAllProjects }: CreativeHomePageProps) {
  return (
    <motion.div 
      className="min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Hero Section */}
      <ModernHero 
        onViewCaseStudy={onViewCaseStudy}
        onViewAllProjects={onViewAllProjects}
      />
      
      {/* Mobile Project Showcase - Shows portfolio immediately on mobile */}
      <MobileProjectShowcase 
        onViewCaseStudy={onViewCaseStudy}
        onViewAllProjects={onViewAllProjects}
      />
      
      {/* Intro Bar */}
      <CreativeIntroBar />
      
      {/* Capabilities Grid */}
      <CreativeCapabilitiesGrid />
      
      {/* Client Logo Rail */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <CreativeClientLogoRail />
      </motion.div>
      
      {/* Featured Case Studies */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <FeaturedCaseStudies onViewCaseStudy={onViewCaseStudy} />
      </motion.div>
    </motion.div>
  );
}