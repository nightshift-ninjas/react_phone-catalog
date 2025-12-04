import React from 'react';
import { Button } from '../../shared/ui/Button';
import { useNavigate } from 'react-router-dom';
import GIF from '../../shared/assets/img/404.gif';
import { useTranslation } from 'react-i18next';
import { SlideIn } from '../../shared/animation/SlideIn';
import './NotFound.scss';

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation('notFound');

  return (
    <section className="_404">
      <SlideIn
        beforeAnimationState={{
          x: 0,
          y: -50,
          opacity: 0,
        }}
      >
        <h1 className="_404__title">404</h1>
      </SlideIn>

      <SlideIn
        beforeAnimationState={{
          x: 0,
          y: -50,
          opacity: 0,
        }}
      >
        <h3 className="_404__subtitle">{t('404_title')}</h3>
      </SlideIn>

      <SlideIn
        beforeAnimationState={{
          x: 0,
          y: -50,
          opacity: 0,
        }}
      >
        <p className="_404__text">{t('404_message')}</p>
      </SlideIn>

      <SlideIn
        beforeAnimationState={{
          x: 0,
          y: -50,
          opacity: 0,
        }}
      >
        <img className="_404__gif" src={GIF} alt="404" />
      </SlideIn>

      <SlideIn>
        <Button onClick={() => navigate('/')}>{t('404_goHomeAction')}</Button>
      </SlideIn>
    </section>
  );
};

export default NotFound;
