import { useEffect, useState } from 'react';
import { ImprovedCreativeNavigation } from './components/ImprovedCreativeNavigation';
import { CreativeHomePage } from './components/CreativeHomePage';
import { CreativeProjectsPage } from './components/CreativeProjectsPage';
import { CreativeServicesPage } from './components/CreativeServicesPage';
import { CreativeAboutPage } from './components/CreativeAboutPage';
import { CreativeContactPage } from './components/CreativeContactPage';
import { CaseStudyPage } from './components/CaseStudyPage';
import { CreativeFooter } from './components/CreativeFooter';
import { getPagePath, parseRoute, syncSeo, type Page } from './seo/siteSeo';

type Theme = 'light' | 'dark';

const getInitialTheme = (): Theme =>
  window.localStorage.getItem('theme') === 'light' ? 'light' : 'dark';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>(() => parseRoute().page);
  const [currentProjectId, setCurrentProjectId] = useState<string | null>(() => parseRoute().projectId);
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    const initialRoute = parseRoute();
    if (window.location.hash) {
      window.history.replaceState(null, '', getPagePath(initialRoute.page, initialRoute.projectId));
    }
  }, []);

  useEffect(() => {
    syncSeo(currentPage, currentProjectId);
  }, [currentPage, currentProjectId]);

  useEffect(() => {
    const onPop = () => {
      const { page, projectId } = parseRoute();
      setCurrentPage(page);
      setCurrentProjectId(projectId);
      window.scrollTo({ top: 0, behavior: 'auto' });
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const moveToTop = () => window.scrollTo({ top: 0, behavior: 'auto' });

  const navigate = (page: Page, projectId: string | null = null) => {
    const path = getPagePath(page, projectId);
    if (window.location.pathname !== path || window.location.hash) {
      window.history.pushState(null, '', path);
    }
    setCurrentPage(page);
    setCurrentProjectId(projectId);
    moveToTop();
  };

  const handlePageChange = (page: string) => {
    navigate(page as Page);
  };

  const handleViewCaseStudy = (projectId: string) => {
    navigate('case-study', projectId);
  };

  const handleBackFromCaseStudy = () => {
    navigate('projects');
  };

  const handleNextProject = (projectId: string) => {
    navigate('case-study', projectId);
  };

  const handleThemeChange = (nextTheme: Theme) => {
    setTheme(nextTheme);
    window.localStorage.setItem('theme', nextTheme);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <CreativeHomePage onViewWork={() => handlePageChange('projects')} />;
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
          <CreativeHomePage onViewWork={() => handlePageChange('projects')} />
        );
      default:
        return <CreativeHomePage onViewWork={() => handlePageChange('projects')} />;
    }
  };

  const showGlobalFooter = currentPage === 'projects' || currentPage === 'services' || currentPage === 'about';

  return (
    <div
      className={`page-${currentPage} min-h-screen bg-background text-foreground ${theme === 'dark' ? 'dark' : ''}`}
      data-page={currentPage}
    >
      <ImprovedCreativeNavigation
        currentPage={currentPage}
        currentTheme={theme}
        onPageChange={handlePageChange}
        onThemeChange={handleThemeChange}
      />

      <main className="cinematic-main">
        {renderCurrentPage()}
      </main>

      {showGlobalFooter && <CreativeFooter onPageChange={handlePageChange} />}
    </div>
  );
}
