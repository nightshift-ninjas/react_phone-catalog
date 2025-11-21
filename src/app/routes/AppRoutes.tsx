import { Navigate, Route, Routes } from 'react-router-dom';
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

import { ROUTES } from '../../shared/config/routes';

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/en" replace />} />

    <Route path=":lng" element={<App />}>
      <Route index element={<HomePage />} />
      <Route path={ROUTES.home} element={<Navigate to=".." replace />} />

      <Route path={ROUTES.catalog} element={<CatalogPage />} />
      <Route path={ROUTES.catalogCategory} element={<CatalogPage />} />
      <Route path={ROUTES.productDetail} element={<ProductDetailPage />} />

      <Route path={ROUTES.cart} element={<CartPage />} />
      <Route path={ROUTES.favorite} element={<FavoritePage />} />

      <Route path={ROUTES.contacts} element={<ContactsPage />} />
      <Route path={ROUTES.rights} element={<RightsPage />} />
      <Route path={ROUTES.checkout} element={<CheckoutPage />} />
      <Route path={ROUTES.profile} element={<ProfilePage />} />
    </Route>
    
    <Route path="*" element={<NotFound />} />

    <Route path=":lng/auth" element={<AuthPage />}>
      <Route
        index
        element={<Navigate to={ROUTES.login.replace('auth/', '')} replace />}
      />
      <Route path="login" element={<LoginPage />} />
      <Route path="signup" element={<SignupPage />} />
    </Route>

    <Route path="*" element={<Navigate to="/en" replace />} />
  </Routes>
);
