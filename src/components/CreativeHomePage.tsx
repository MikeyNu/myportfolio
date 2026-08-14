import { ModernHero } from './ModernHero';
import { CreativeIntroBar } from './CreativeIntroBar';
import { CreativeCapabilitiesGrid } from './CreativeCapabilitiesGrid';
import { CreativeClientLogoRail } from './CreativeClientLogoRail';
import { FeaturedCaseStudies } from './FeaturedCaseStudies';

interface CreativeHomePageProps {
  onViewCaseStudy: (projectId: string) => void;
  onViewAllProjects: () => void;
}

export function CreativeHomePage({ onViewCaseStudy, onViewAllProjects }: CreativeHomePageProps) {
  return (
    <div className="min-h-screen">
      <ModernHero
        onViewCaseStudy={onViewCaseStudy}
        onViewAllProjects={onViewAllProjects}
      />
      <CreativeIntroBar />
      <CreativeCapabilitiesGrid />
      <FeaturedCaseStudies onViewCaseStudy={onViewCaseStudy} />
      <CreativeClientLogoRail />
    </div>
  );
}
