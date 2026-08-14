import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './styles/portfolio-overrides.css';
import './styles/cinematic-portfolio.css';
import './styles/cinematic-reference-layout.css';
import './styles/cinematic-accessibility.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
