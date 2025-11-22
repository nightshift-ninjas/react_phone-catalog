import './shared/i18n';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { AppRoutes } from './app/routes/AppRoutes.tsx';
import './shared/styles/main.scss';
import { LanguageProvider } from './app/providers/LanguageProvider.tsx';
import { CurrencyProvider } from './app/providers/CurrencyProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <LanguageProvider>
        <CurrencyProvider>
          <AppRoutes />
        </CurrencyProvider>
      </LanguageProvider>
    </HashRouter>
  </StrictMode>,
);
