import React, { useContext } from 'react';
import './Footer.scss';
import { Link } from 'react-router-dom';
import Logo from '../../shared/assets/Logo.svg?react';
import { ROUTES } from '../../shared/config/routes';
import { LanguageContext } from '../../shared/context/language';
import { ArrowButton } from '../../shared/ui/ArrowButton';
import { useTranslation } from 'react-i18next';

export const Footer: React.FC = () => {
  const { language: lng } = useContext(LanguageContext)!;
  const { t } = useTranslation('footer');

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__logo">
          <Link to={`/${lng}`}>
            <Logo />
          </Link>
        </div>

        <nav className="footer__nav">
          <a
            href="https://github.com/nightshift-ninjas/react_phone-catalog"
            target="_blank"
            className="footer__nav-item"
            rel="noreferrer"
          >
            GITHUB
          </a>
          <Link to={`/${lng}/${ROUTES.contacts}`} className="footer__nav-item">
            {t('footerLinks.contacts')}
          </Link>
          <Link to={`/${lng}/${ROUTES.rights}`} className="footer__nav-item">
            {t('footerLinks.rights')}
          </Link>
        </nav>

        <div className="footer__top">
          {t('topButton')}
          <ArrowButton
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            direction="up"
          />
        </div>
      </div>
    </footer>
  );
};
