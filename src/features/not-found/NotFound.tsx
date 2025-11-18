import React from 'react';
import { Button } from '../../shared/ui/Button';
import { useNavigate } from 'react-router-dom';
import GIF from '../../shared/assets/img/404.gif';
import './NotFound.scss';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="_404">
      <h1 className="_404__title">404</h1>
      <h3 className="_404__subtitle">Looks like you&apos;re lost</h3>
      <p className="_404__text">The page you are looking for not available</p>

      <img className="_404__gif" src={GIF} alt="404" />

      <Button onClick={() => navigate('/')}>Go to home</Button>
    </section>
  );
};

export default NotFound;
