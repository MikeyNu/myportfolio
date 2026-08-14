import { Moon, Sun } from 'lucide-react';

interface ThemeToggleProps {
  theme: 'light' | 'dark';
  onThemeChange: (theme: 'light' | 'dark') => void;
}

export function ThemeToggle({ theme, onThemeChange }: ThemeToggleProps) {
  const isDark = theme === 'dark';

  const toggleTheme = () => {
    const nextTheme = isDark ? 'light' : 'dark';
    window.localStorage.setItem('theme', nextTheme);
    onThemeChange(nextTheme);
  };

  return (
    <button
      type="button"
      className="cinematic-theme-toggle"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {isDark ? <Sun size={17} aria-hidden="true" /> : <Moon size={17} aria-hidden="true" />}
    </button>
  );
}
