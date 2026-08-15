import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './styles/fonts.css';
import './index.css';
import './styles/portfolio-overrides.css';
import './styles/cinematic-portfolio.css';
import './styles/cinematic-reference-layout.css';
import './styles/cinematic-accessibility.css';
import './styles/cinematic-strict-qa.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
