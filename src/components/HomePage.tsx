import { HeroCarousel } from './HeroCarousel';
import { IntroBar } from './IntroBar';
import { CapabilitiesGrid } from './CapabilitiesGrid';
import { ClientLogoRail } from './ClientLogoRail';
import { FeaturedCaseStudies } from './FeaturedCaseStudies';

interface HomePageProps {
  onViewCaseStudy: (projectId: string) => void;
  onViewAllProjects: () => void;
}

export function HomePage({ onViewCaseStudy, onViewAllProjects }: HomePageProps) {
  return (
    <div className="min-h-screen">
      {/* Hero Carousel */}
      <HeroCarousel 
        onViewCaseStudy={onViewCaseStudy}
        onViewAllProjects={onViewAllProjects}
      />
      
      {/* Intro Bar */}
      <IntroBar />
      
      {/* Capabilities Grid */}
      <CapabilitiesGrid />
      
      {/* Client Logo Rail */}
      <ClientLogoRail />
      
      {/* Featured Case Studies */}
      <FeaturedCaseStudies onViewCaseStudy={onViewCaseStudy} />
    </div>
  );
}