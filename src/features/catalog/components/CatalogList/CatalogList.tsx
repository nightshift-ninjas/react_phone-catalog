import React from 'react';
import type { Product } from '../../../../services/product';
import { ProductCard } from '../../../../widgets/ProductCard';
import { SlideIn } from '../../../../shared/animation/SlideIn';
import './CatalogList.scss';

type Props = {
  products: Product[];
};

export const CatalogList: React.FC<Props> = ({ products }) => {
  return (
    <div className="catalog-list">
      <ul className="catalog-list__list">
        {products.map((product, index) => {
          const delay = ((index % 4) + 1) * 0.1;
          return (
            <SlideIn
              key={product.id}
              beforeAnimationState={{ delay }}
            >
              <li className="catalog-list__item">
                <ProductCard product={product} />
              </li>
            </SlideIn>
          );
        })}
      </ul>
    </div>
  );
};