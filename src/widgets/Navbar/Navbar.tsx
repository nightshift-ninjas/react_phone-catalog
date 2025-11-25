import React, { useState, useContext } from 'react';
import Logo from '../../shared/assets/Logo.svg?react';
import { Link, NavLink } from 'react-router-dom';
import type { NavbarLink } from './types';
import { ThemeButton } from '../../shared/ui/ThemeButton';
import { NavigationMenu } from 'radix-ui';
import FavoriteIcon from '../../shared/assets/icons/favorite.svg?react';
import ShoppingBagIcon from '../../shared/assets/icons/shopping-bag.svg?react';
import ProfileIcon from '../../shared/assets/icons/profile.svg?react';
import ArrowIcon from '../../shared/assets/icons/arrow-icon-dark.svg?react';
import { LanguageButton } from '../LanguageButton';
import { ROUTES } from '../../shared/config/routes';
import { LanguageContext } from '../../shared/context/language';
import { CurrencyButton } from '../CurrencyButton';
import { useTranslation } from 'react-i18next';
import { SearchButton } from '../SearchButton';
import { useFavoriteCount } from '../../shared/context/favorite';
import cn from 'classnames';
import './Navbar.scss';
import { useCartCount } from '../../shared/context/cart';
import { SlideIn } from '../../shared/animation/SlideIn';

type Props = { onSearchClick: () => void };

const getClasses = ({ isActive }: { isActive: boolean }) =>
  cn('nav__link', { 'nav__link--active': isActive });

const getClassesCatalog = ({ isActive }: { isActive: boolean }) =>
  cn('nav__catalog-link', { 'nav__catalog-link--active': isActive });

export const Navbar: React.FC<Props> = ({ onSearchClick }) => {
  const { count: cartCount } = useCartCount();
  const { count: favoriteCount } = useFavoriteCount();

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

  return (
    <nav className={cn('nav', { 'nav--collapsed': isCollapsed })}>
      <SlideIn beforeAnimationState={{ y: -20, opacity: 0 }}>
        <Link to={`/${lng}`} className="nav__brand">
          <Logo />
        </Link>
      </SlideIn>

      <div className="nav__content">
        <SlideIn beforeAnimationState={{ y: -20, opacity: 0 }}>
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
                        <SlideIn
                          key={index}
                          beforeAnimationState={{
                            delay: 0.2 + 0.1 * index,
                            opacity: 0,
                            y: -20
                          }}
                        >
                          <li className="nav__dropdown-content-item">
                            <NavLink
                              to={item.path}
                              className={getClassesCatalog}
                            >
                              {item.label}
                            </NavLink>
                          </li>
                        </SlideIn>
                      ))}
                    </ul>
                  </NavigationMenu.Content>
                </NavigationMenu.Item>
              </NavigationMenu.List>
            </NavigationMenu.Root>
          </div>
        </SlideIn>

        <SlideIn beforeAnimationState={{ y: -20, opacity: 0 }}>
          <div className="nav__block">
            <SearchButton onSearchClick={onSearchClick} />

            <LanguageButton />
            <CurrencyButton />
            <ThemeButton />

            <NavLink to={`/${lng}/${ROUTES.favorite}`} className={getClasses}>
              <FavoriteIcon />
              {!!favoriteCount && (
                <span className="nav__link-pillow">{favoriteCount}</span>
              )}
            </NavLink>

            <NavLink to={`/${lng}/${ROUTES.cart}`} className={getClasses}>
              <ShoppingBagIcon />
              {!!cartCount && (
                <span className="nav__link-pillow">{cartCount}</span>
              )}
            </NavLink>

            <NavLink to={`/${lng}/${ROUTES.profile}`} className={getClasses}>
              <ProfileIcon />
            </NavLink>
          </div>
        </SlideIn>
      </div>

      <SlideIn beforeAnimationState={{ y: -20, opacity: 0 }}>
        <button className="nav__mobile-btn" onClick={toggleMobileMenu}>
          <span></span>
          <span></span>
          <span></span>
        </button>
      </SlideIn>
    </nav>
  );
};
