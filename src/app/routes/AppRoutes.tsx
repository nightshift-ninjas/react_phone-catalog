import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import App from '../App';

import AuthPage, { LoginPage, SignupPage } from '../../features/auth';
import NotFound from '../../features/not-found';
import CartPage from '../../features/cart';
import FavoritePage from '../../features/favorite';
import ProductDetailPage from '../../features/product-detail';
import CatalogPage from '../../features/catalog';
import HomePage from '../../features/home';
import { ContactsPage } from '../../features/contacts';
import { RightsPage } from '../../features/rights';
import { CheckoutPage } from '../../features/checkout';
import { ProfilePage } from '../../features/profile';
import { CreatorsPage } from '../../features/creators';
import { ROUTES } from '../../shared/config/routes';
import { AnimatePresence } from 'framer-motion';
import { PageSwitcher } from '../../shared/animation/PageSwitcher';

export const AppRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <PageSwitcher>
            <Navigate to="/en" replace />
          </PageSwitcher>
        } />

        <Route
          path=":lng"
          element={
            <PageSwitcher>
              <App />
            </PageSwitcher>
          }
        >
          <Route index element={
            <PageSwitcher>
              <HomePage />
            </PageSwitcher>
          } />
          <Route path={ROUTES.home} element={
            <PageSwitcher>
              <Navigate to=".." replace />
            </PageSwitcher>
          } />

          <Route path={ROUTES.catalog} element={
            <PageSwitcher>
              <CatalogPage />
            </PageSwitcher>
          } />
          <Route path={ROUTES.catalogCategory} element={
            <PageSwitcher>
              <CatalogPage />
            </PageSwitcher>
          } />
          <Route path={ROUTES.productDetail} element={
            <PageSwitcher>
              <ProductDetailPage />
            </PageSwitcher>
          } />

          <Route path={ROUTES.cart} element={
            <PageSwitcher>
              <CartPage />
            </PageSwitcher>
          } />
          <Route path={ROUTES.favorite} element={
            <PageSwitcher>
              <FavoritePage />
            </PageSwitcher>
          } />

          <Route path={ROUTES.contacts} element={
            <PageSwitcher>
              <ContactsPage />
            </PageSwitcher>
          } />
          <Route path={ROUTES.creators} element={
            <PageSwitcher>
              <CreatorsPage />
            </PageSwitcher>
          } />
          <Route path={ROUTES.rights} element={
            <PageSwitcher>
              <RightsPage />
            </PageSwitcher>
          } />
          <Route path={ROUTES.checkout} element={
            <PageSwitcher>
              <CheckoutPage />
            </PageSwitcher>
          } />
          <Route path={ROUTES.profile} element={
            <PageSwitcher>
              <ProfilePage />
            </PageSwitcher>
          } />
        </Route>

        <Route path="*" element={
          <PageSwitcher>
            <NotFound />
          </PageSwitcher>
        } />

        <Route path=":lng/auth" element={
          <PageSwitcher>
            <AuthPage />
          </PageSwitcher>
        }>
          <Route
            index
            element={
              <PageSwitcher>
                <Navigate to={ROUTES.login.replace('auth/', '')} replace />
              </PageSwitcher>
            }
          />
          <Route path="login" element={
            <PageSwitcher>
              <LoginPage />
            </PageSwitcher>
          } />
          <Route path="signup" element={
            <PageSwitcher>
              <SignupPage />
            </PageSwitcher>
          } />
        </Route>

        <Route path="*" element={
          <PageSwitcher>
            <Navigate to="/en" replace />
          </PageSwitcher>
        } />
      </Routes>
    </AnimatePresence>
  );
};
