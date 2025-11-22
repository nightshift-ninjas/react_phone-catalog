import React from 'react';
import { Link } from 'react-router-dom';
import type { BreadcrumbItem } from './types';
import HomeIcon from '../../assets/icons/home.svg?react';
import './Breadcrumb.scss';
import { useLanguage } from '../../context/language';

type Props = {
  items: BreadcrumbItem[];
  separator?: string;
};

export const Breadcrumb: React.FC<Props> = ({
  items = [],
  separator = '>',
}) => {
  const { language: lng } = useLanguage();
  return (
    <nav className="bread-crumb">
      <Link to="/">
        <HomeIcon />
      </Link>

      {items.length > 0 && <span>{separator}</span>}

      {items.map((item, index) => (
        <React.Fragment key={index}>
          <Link to={`/${lng}${item.link}`} className="bread-crumb__link">
            {item.text}
          </Link>

          {index < items.length - 1 && <span>{separator}</span>}
        </React.Fragment>
      ))}
    </nav>
  );
};
