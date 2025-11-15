import { Navigate, Route, Routes } from 'react-router-dom';
import NotFound from '../../features/not-found';
import AuthPage, { LoginPage, SignupPage } from '../../features/auth';
import CartPage from '../../features/cart';
import FavoritePage from '../../features/favorite';
import ProductDetailPage from '../../features/product-detail';
import CatalogPage from '../../features/catalog';
import HomePage from '../../features/home';
import App from '../App';

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<App />}>
      <Route index element={<HomePage />} />
      <Route path="home" element={<Navigate to="/" replace />} />

      <Route path="catalog" element={<CatalogPage />} />
      <Route path="catalog/:category" element={<CatalogPage />} />
      <Route path="catalog/:type/product/:id" element={<ProductDetailPage />} />

      <Route path="cart" element={<CartPage />} />

      <Route path="favorite" element={<FavoritePage />} />
    </Route>

    <Route path="auth/" element={<AuthPage />}>
      <Route index element={<Navigate to="login" replace />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="signup" element={<SignupPage />} />
    </Route>

    <Route path="*" element={<NotFound />} />
  </Routes>
);
