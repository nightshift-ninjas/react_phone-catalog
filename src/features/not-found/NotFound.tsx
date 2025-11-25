import React from 'react';
import { Button } from '../../shared/ui/Button';
import { useNavigate } from 'react-router-dom';
import GIF from '../../shared/assets/img/404.gif';
import './NotFound.scss';
import { useTranslation } from 'react-i18next';

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation('notFound');

  return (
    <section className="_404">
      <h1 className="_404__title">404</h1>
      <h3 className="_404__subtitle">{t('404_title')}</h3>
      <p className="_404__text">{t('404_message')}</p>

      <img className="_404__gif" src={GIF} alt="404" />

      <Button onClick={() => navigate('/')}>{t('404_goHomeAction')}</Button>
    </section>
  );
};

export default NotFound;
