import React from 'react';
import type { Product } from '../../../../services/product';
import { GlobalSearchItem } from '../GlobalSearchItem';
import './GlobalSearchList.scss';

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
