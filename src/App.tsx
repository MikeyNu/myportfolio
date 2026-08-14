import { useState } from 'react';
import { ImprovedCreativeNavigation } from './components/ImprovedCreativeNavigation';
import { CreativeHomePage } from './components/CreativeHomePage';
import { CreativeProjectsPage } from './components/CreativeProjectsPage';
import { CreativeServicesPage } from './components/CreativeServicesPage';
import { CreativeAboutPage } from './components/CreativeAboutPage';
import { CreativeContactPage } from './components/CreativeContactPage';
import { CaseStudyPage } from './components/CaseStudyPage';
import { CreativeFooter } from './components/CreativeFooter';

type Page = 'home' | 'projects' | 'services' | 'about' | 'contact' | 'case-study';
type Theme = 'light' | 'dark';

const getInitialTheme = (): Theme => {
  if (typeof window === 'undefined') {
    return 'dark';
  }

  return window.localStorage.getItem('theme') === 'light' ? 'light' : 'dark';
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [currentProjectId, setCurrentProjectId] = useState<string | null>(null);
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  const moveToTop = () => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const handlePageChange = (page: string) => {
    setCurrentPage(page as Page);
    setCurrentProjectId(null);
    moveToTop();
  };

  const handleViewCaseStudy = (projectId: string) => {
    setCurrentProjectId(projectId);
    setCurrentPage('case-study');
    moveToTop();
  };

  const handleBackFromCaseStudy = () => {
    setCurrentPage('projects');
    setCurrentProjectId(null);
    moveToTop();
  };

  const handleNextProject = (projectId: string) => {
    setCurrentProjectId(projectId);
    moveToTop();
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <CreativeHomePage />;
      case 'projects':
        return (
          <CreativeProjectsPage
            onViewCaseStudy={handleViewCaseStudy}
            onViewServices={() => handlePageChange('services')}
          />
        );
      case 'services':
        return <CreativeServicesPage onContact={() => handlePageChange('contact')} />;
      case 'about':
        return <CreativeAboutPage />;
      case 'contact':
        return <CreativeContactPage />;
      case 'case-study':
        return currentProjectId ? (
          <CaseStudyPage
            projectId={currentProjectId}
            onBack={handleBackFromCaseStudy}
            onNextProject={handleNextProject}
          />
        ) : (
          <CreativeHomePage />
        );
      default:
        return <CreativeHomePage />;
    }
  };

  const showGlobalFooter = currentPage === 'projects' || currentPage === 'services' || currentPage === 'about';

  return (
    <div className={`min-h-screen bg-background text-foreground ${theme === 'dark' ? 'dark' : ''}`}>
      <ImprovedCreativeNavigation
        currentPage={currentPage}
        currentTheme={theme}
        onPageChange={handlePageChange}
        onThemeChange={setTheme}
      />

      <main className="cinematic-main">
        {renderCurrentPage()}
      </main>

      {showGlobalFooter && <CreativeFooter onPageChange={handlePageChange} />}
    </div>
  );
}
