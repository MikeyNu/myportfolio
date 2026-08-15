import { ModernHero } from './ModernHero';
import { DesignGallery } from './DesignGallery';

interface CreativeHomePageProps {
  onViewWork: () => void;
}

export function CreativeHomePage({ onViewWork }: CreativeHomePageProps) {
  return (
    <>
      <ModernHero onViewWork={onViewWork} />
      <DesignGallery />
    </>
  );
}
