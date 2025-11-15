import { Routes, Route, Navigate } from 'react-router-dom';
import App from '../App';
import HomePage from '../../features/home';

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<App />}>
      <Route index element={<HomePage />} />
      <Route path="/home" element={<Navigate to="/" replace />} />
    </Route>
  </Routes>
);
