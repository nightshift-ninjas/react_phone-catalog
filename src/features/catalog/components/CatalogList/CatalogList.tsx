import React from 'react';
import type { Product } from '../../../../services/product';
import { ProductCard } from '../../../../widgets/ProductCard';
import './CatalogList.scss';

type Props = {
  products: Product[];
};

export const CatalogList: React.FC<Props> = ({ products }) => {
  return (
    <div className="catalog-list">
      <ul className="catalog-list__list">
        {products.map((product) => (
          <li key={product.id} className="catalog-list__item">
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </div>
  );
};
