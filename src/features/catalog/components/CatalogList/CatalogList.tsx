import React from 'react';
import type { Product } from '../../../../services/product';
import { ProductCard } from '../../../../widgets/ProductCard';
import { motion, AnimatePresence } from 'framer-motion';
import { listItemVariants } from './anims';
import './CatalogList.scss';

type Props = {
  products: Product[];
};

export const CatalogList: React.FC<Props> = ({ products }) => {
  return (
    <div className="catalog-list">
      <ul className="catalog-list__list">
        {products.map((product, index) => (
          <AnimatePresence key={product.id}>
            <motion.li
              className="catalog-list__item"
              variants={listItemVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              custom={index}
              layout
            >
              <ProductCard product={product} />
            </motion.li>
          </AnimatePresence>
        ))}
      </ul>
    </div>
  );
};
