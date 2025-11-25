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

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <LanguageProvider>
        <CurrencyProvider>
          <CartCountProvider>
            <FavoriteCountProvider>
               <AppRoutes />
            </FavoriteCountProvider>
          </CartCountProvider>
        </CurrencyProvider>
      </LanguageProvider>
    </HashRouter>
  </StrictMode>,
);
