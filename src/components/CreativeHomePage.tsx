import { ModernHero } from './ModernHero';

interface CreativeHomePageProps {
  onViewWork: () => void;
}

export function CreativeHomePage({ onViewWork }: CreativeHomePageProps) {
  return <ModernHero onViewWork={onViewWork} />;
}
