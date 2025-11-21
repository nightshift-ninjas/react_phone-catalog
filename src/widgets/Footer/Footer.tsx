import React, { useContext } from 'react';
import './Footer.scss';
import { Link } from 'react-router-dom';
import Logo from '../../shared/assets/Logo.svg?react';
import ArrowButton from '../../shared/ui/ArrowButton/ArrowButton';
import { ROUTES } from '../../shared/config/routes';
import { LanguageContext } from '../../shared/context/language';

export const Footer: React.FC = () => {
  const { language: lng } = useContext(LanguageContext)!;

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
            CONTACTS
          </Link>
          <Link to={`/${lng}/${ROUTES.rights}`} className="footer__nav-item">
            RIGHTS
          </Link>
        </nav>

        <div className="footer__top">
          Back to top
          <ArrowButton
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            direction="up"
          />
        </div>
      </div>
    </footer>
  );
};
