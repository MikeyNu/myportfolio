import { ModernHero } from './ModernHero';
import { CreativeIntroBar } from './CreativeIntroBar';
import { CreativeCapabilitiesGrid } from './CreativeCapabilitiesGrid';
import { CreativeClientLogoRail } from './CreativeClientLogoRail';
import { FeaturedCaseStudies } from './FeaturedCaseStudies';

interface CreativeHomePageProps {
  onViewCaseStudy: (projectId: string) => void;
}

export function CreativeHomePage({ onViewCaseStudy }: CreativeHomePageProps) {
  return (
    <div className="min-h-screen">
      <ModernHero />
      <CreativeIntroBar />
      <CreativeCapabilitiesGrid />
      <FeaturedCaseStudies onViewCaseStudy={onViewCaseStudy} />
      <CreativeClientLogoRail />
    </div>
  );
}
