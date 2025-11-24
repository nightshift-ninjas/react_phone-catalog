import React from 'react';
import type { Product } from '../../../../services/product';
import './GlobalSearchList.scss';
import { GlobalSearchItem } from '../GlobalSearchItem';

type Props = {
  products: Product[];
};

export const GlobalSearchList: React.FC<Props> = ({ products }) => {
  return (
    <ul className="search-list">
      {products.map((product) => (
        <li key={product.id}>
          <GlobalSearchItem product={product} />
        </li>
      ))}
    </ul>
  );
};
