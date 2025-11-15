import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { AppRoutes } from './app/routes/AppRoutes.tsx';
import './shared/styles/main.scss';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <AppRoutes />
    </HashRouter>
  </StrictMode>,
);
