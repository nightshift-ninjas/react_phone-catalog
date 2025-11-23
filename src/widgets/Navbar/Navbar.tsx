import React, { useState, useContext } from 'react';
import Logo from '../../shared/assets/Logo.svg?react';
import { Link, NavLink } from 'react-router-dom';
import type { NavbarLink, NavButton } from './types';
import { ThemeButton } from '../../shared/ui/ThemeButton';
import { NavigationMenu } from 'radix-ui';
import FavoriteIcon from '../../shared/assets/icons/favorite.svg?react';
import ShoppingBagIcon from '../../shared/assets/icons/shopping-bag.svg?react';
import ProfileIcon from '../../shared/assets/icons/profile.svg?react';
import ArrowIcon from '../../shared/assets/icons/arrow-icon-dark.svg?react';
import cn from 'classnames';
import './Navbar.scss';
import { LanguageButton } from '../LanguageButton';
import { ROUTES } from '../../shared/config/routes';
import { LanguageContext } from '../../shared/context/language';
import { CurrencyButton } from '../CurrencyButton';
import { useTranslation } from 'react-i18next';

const getClasses = ({ isActive }: { isActive: boolean }) =>
  cn('nav__link', { 'nav__link--active': isActive });

const getClassesCatalog = ({ isActive }: { isActive: boolean }) =>
  cn('nav__catalog-link', { 'nav__catalog-link--active': isActive });

export const Navbar: React.FC = () => {
  const { language: lng } = useContext(LanguageContext)!;
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { t } = useTranslation('navbar');

  const toggleMobileMenu = () => setIsCollapsed((prev) => !prev);

  const catalogLinks: NavbarLink[] = [
    { label: t('navLinks.phones'), path: `/${lng}/${ROUTES.catalog}/phones` },
    { label: t('navLinks.tablets'), path: `/${lng}/${ROUTES.catalog}/tablets` },
    {
      label: t('navLinks.accessories'),
      path: `/${lng}/${ROUTES.catalog}/accessories`,
    },
  ];

  const navButtons: NavButton[] = [
    { component: LanguageButton as React.ComponentType },
    { component: CurrencyButton as React.ComponentType },
    { component: ThemeButton as React.ComponentType },
    { path: `/${lng}/${ROUTES.favorite}`, icon: <FavoriteIcon /> },
    { path: `/${lng}/${ROUTES.cart}`, icon: <ShoppingBagIcon /> },
    { path: `/${lng}/${ROUTES.profile}`, icon: <ProfileIcon /> },
  ];

  return (
    <nav className={cn('nav', { 'nav--collapsed': isCollapsed })}>
      <Link to={`/${lng}`} className="nav__brand">
        <Logo />
      </Link>

      <div className="nav__content">
        <div className="nav__block">
          <NavLink to={`/${lng}`} end className={getClasses}>
            {t('navLinks.home')}
          </NavLink>

          <NavigationMenu.Root className="nav__dropdown">
            <NavigationMenu.List className="nav__dropdown-list">
              <NavigationMenu.Item>
                <NavigationMenu.Trigger className="nav__dropdown-btn">
                  {t('navLinks.catalog')}
                  <ArrowIcon />
                </NavigationMenu.Trigger>

                <NavigationMenu.Content className="nav__dropdown-content">
                  <ul className="nav__dropdown-content-list">
                    {catalogLinks.map((item, index) => (
                      <li key={index} className="nav__dropdown-content-item">
                        <NavLink to={item.path} className={getClassesCatalog}>
                          {item.label}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenu.Content>
              </NavigationMenu.Item>
            </NavigationMenu.List>
          </NavigationMenu.Root>
        </div>

        <div className="nav__block">
          {navButtons.map((btn, i) => {
            if (btn.component) {
              const Comp = btn.component;
              return <Comp key={i} />;
            }

            return (
              <NavLink key={i} to={btn.path!} className={getClasses}>
                {btn.icon}
              </NavLink>
            );
          })}
        </div>
      </div>

      <button className="nav__mobile-btn" onClick={toggleMobileMenu}>
        <span></span>
        <span></span>
        <span></span>
      </button>
    </nav>
  );
};
