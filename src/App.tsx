import { useEffect, useState } from 'react';
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

const VALID_PAGES: Page[] = ['home', 'projects', 'services', 'about', 'contact'];

function parseHash(): { page: Page; projectId: string | null } {
  const raw = window.location.hash.replace(/^#\/?/, '');
  if (!raw || raw === 'home') return { page: 'home', projectId: null };
  if (raw.startsWith('case-study/')) {
    const id = raw.slice('case-study/'.length) || null;
    return { page: 'case-study', projectId: id };
  }
  if ((VALID_PAGES as string[]).includes(raw)) return { page: raw as Page, projectId: null };
  return { page: 'home', projectId: null };
}

function toHash(page: Page, projectId: string | null): string {
  if (page === 'case-study' && projectId) return `#case-study/${projectId}`;
  if (page === 'home') return '#home';
  return `#${page}`;
}

const getInitialTheme = (): Theme =>
  window.localStorage.getItem('theme') === 'light' ? 'light' : 'dark';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>(() => parseHash().page);
  const [currentProjectId, setCurrentProjectId] = useState<string | null>(() => parseHash().projectId);
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  /* Keep the URL hash in sync with app state */
  useEffect(() => {
    const hash = toHash(currentPage, currentProjectId);
    if (window.location.hash !== hash) {
      window.history.pushState(null, '', hash);
    }
  }, [currentPage, currentProjectId]);

  /* Handle browser back / forward */
  useEffect(() => {
    const onPop = () => {
      const { page, projectId } = parseHash();
      setCurrentPage(page);
      setCurrentProjectId(projectId);
      window.scrollTo({ top: 0, behavior: 'auto' });
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const moveToTop = () => window.scrollTo({ top: 0, behavior: 'auto' });

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

  const handleThemeChange = (t: Theme) => {
    setTheme(t);
    window.localStorage.setItem('theme', t);
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
