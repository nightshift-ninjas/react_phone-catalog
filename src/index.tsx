import './shared/i18n';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { AppRoutes } from './app/routes/AppRoutes.tsx';
import './shared/styles/main.scss';
import {
  LanguageProvider,
  CurrencyProvider,
  CartCountProvider,
  FavoriteCountProvider,
} from './app/providers';
import { ScrollToTop } from './app/routes/ScrollToTop.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <LanguageProvider>
        <CurrencyProvider>
          <CartCountProvider>
            <FavoriteCountProvider>
              <ScrollToTop />
                <AppRoutes />
            </FavoriteCountProvider>
          </CartCountProvider>
        </CurrencyProvider>
      </LanguageProvider>
    </HashRouter>
  </StrictMode>,
);
