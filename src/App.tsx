import { useState, useEffect } from 'react';
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
  const [theme, setTheme] = useState<Theme>('dark'); // Default to dark mode
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize the app
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handlePageChange = (page: string) => {
    setCurrentPage(page as Page);
    setCurrentProjectId(null);
  };

  const handleViewCaseStudy = (projectId: string) => {
    setCurrentProjectId(projectId);
    setCurrentPage('case-study');
  };

  const handleViewAllProjects = () => {
    setCurrentPage('projects');
  };

  const handleBackFromCaseStudy = () => {
    setCurrentPage('projects');
    setCurrentProjectId(null);
  };

  const handleNextProject = (projectId: string) => {
    setCurrentProjectId(projectId);
  };

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
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

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 bg-accent rounded-lg animate-pulse mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-background text-foreground ${theme === 'dark' ? 'dark' : ''}`}>
      <ImprovedCreativeNavigation 
        currentPage={currentPage} 
        onPageChange={handlePageChange}
        onThemeChange={handleThemeChange}
      />
      
      <main className="pt-20 sm:pt-20">
        {renderCurrentPage()}
      </main>
      
      <CreativeFooter onPageChange={handlePageChange} />
    </div>
  );
}