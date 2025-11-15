import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import './Navbar.scss';
import Logo from '../../../public/Logo.svg?react';
import FavoriteIcon from '../../../public/icons/favorite.svg?react';
import ShoppingBagIcon from '../../../public/icons/shopping-bag.svg?react';
import ProfileIcon from '../../../public/icons/profile.svg?react';
import type { NavbarLink, NavButton } from './types';
import { ThemeButton } from '../../shared/ui/ThemeButton';
import { Link, NavLink } from 'react-router-dom';

const navLinks: NavbarLink[] = [
  { label: 'home', path: '' },
  { label: 'phones', path: 'catalog/phones' },
  { label: 'tablets', path: 'catalog/tablets' },
  { label: 'accessories', path: 'catalog/accessories' },
];

const navButtons: NavButton[] = [
  { component: ThemeButton as React.ComponentType },
  { path: 'favorite', icon: <FavoriteIcon /> },
  { path: 'cart', icon: <ShoppingBagIcon /> },
  { path: 'auth', icon: <ProfileIcon /> },
];

const getActiveClasses = ({ isActive }: { isActive: boolean }) =>
  cn('nav__link', { 'nav__link--active': isActive });

export const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  // Disable scrolling when mobile menu is opened
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const renderNavList = () => (
    <ul className="nav__list">
      {navLinks.map((link) => (
        <li key={link.label} className="nav__item">
          <NavLink to={`/${link.path}`} className={getActiveClasses}>
            {link.label}
          </NavLink>
        </li>
      ))}
    </ul>
  );

  const renderButtons = () => (
    <div className="nav__btn-group">
      {navButtons.map((btn, index) => (
        <div key={index} className="nav__btn">
          {btn.icon && (
            <Link to={`/${btn.path}`} className="nav__btn-link">
              {btn.icon}
            </Link>
          )}
          {btn.component && <btn.component />}
        </div>
      ))}
    </div>
  );

  return (
    <nav className="nav">
      <div className="nav__block">
        <div className="nav__brand">
          <Link to="home">
            <Logo />
          </Link>
        </div>

        {renderNavList()}
      </div>

      <div className="nav__block">{renderButtons()}</div>

      <button
        onClick={toggleMobileMenu}
        className={cn('nav__humburger', {
          'nav__humburger--active': isMobileMenuOpen,
        })}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div
        className={cn('nav__mobile', {
          'nav__mobile--active': isMobileMenuOpen,
        })}
      >
        {renderNavList()}
        {renderButtons()}
      </div>
    </nav>
  );
};
