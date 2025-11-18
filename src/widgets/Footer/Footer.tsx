import React from 'react';
import './Footer.scss';
import { Link } from 'react-router-dom';
import Logo from '../../shared/assets/Logo.svg?react';
import ArrowButton from '../../shared/ui/ArrowButton/ArrowButton';

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
      <div className="footer__logo">
        <Link to="home">
          <Logo />
        </Link>
      </div>

      <nav className="footer__nav">
          <a
            href="https://github.com/nightshift-ninjas/react_phone-catalog"
            target="_blank" className="footer__nav-item"
            rel="noreferrer">
            GITHUB
          </a>
      <Link to="/contacts" className="footer__nav-item">CONTACTS</Link>
      <Link to="/rights" className="footer__nav-item">RIGHTS</Link>
      </nav>


      <div className="footer__top">
          Back to top
          <ArrowButton onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} direction='up'/>
      </div>
      </div>
    </footer>
  );
};
