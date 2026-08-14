import { useState } from 'react';
import { ImprovedCreativeNavigation } from './components/ImprovedCreativeNavigation';
import { CreativeHomePage } from './components/CreativeHomePage';
import { CreativeProjectsPage } from './components/CreativeProjectsPage';
import { CreativeAboutPage } from './components/CreativeAboutPage';
import { CreativeContactPage } from './components/CreativeContactPage';
import { CaseStudyPage } from './components/CaseStudyPage';
import { CreativeFooter } from './components/CreativeFooter';

type Page = 'home' | 'projects' | 'about' | 'contact' | 'case-study';
type Theme = 'light' | 'dark';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [currentProjectId, setCurrentProjectId] = useState<string | null>(null);
  const [theme, setTheme] = useState<Theme>('dark');

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

  const handleViewAllProjects = () => {
    setCurrentPage('projects');
    setCurrentProjectId(null);
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
        return (
          <CreativeHomePage
            onViewCaseStudy={handleViewCaseStudy}
            onViewAllProjects={handleViewAllProjects}
          />
        );
      case 'projects':
        return <CreativeProjectsPage onViewCaseStudy={handleViewCaseStudy} />;
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
          <CreativeHomePage
            onViewCaseStudy={handleViewCaseStudy}
            onViewAllProjects={handleViewAllProjects}
          />
        );
      default:
        return (
          <CreativeHomePage
            onViewCaseStudy={handleViewCaseStudy}
            onViewAllProjects={handleViewAllProjects}
          />
        );
    }
  };

  return (
    <div className={`min-h-screen bg-background text-foreground ${theme === 'dark' ? 'dark' : ''}`}>
      <ImprovedCreativeNavigation
        currentPage={currentPage}
        onPageChange={handlePageChange}
        onThemeChange={setTheme}
      />

      <main className="pt-20">
        {renderCurrentPage()}
      </main>

      <CreativeFooter onPageChange={handlePageChange} />
    </div>
  );
}
