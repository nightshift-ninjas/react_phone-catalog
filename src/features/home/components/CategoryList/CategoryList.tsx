import React, { useEffect, useState } from 'react';
import { productService } from '../../../../services/product/product.service';
import CategoryItem from '../CategoryItem/CategoryItem';
import './CategoryList.scss';
import { CategoryLabels } from '../../../catalog/types';

import categoryPhones from '../../../../shared/assets/img/category-phones.webp';
import categoryTablets from '../../../../shared/assets/img/category-tablets.webp';
import categoryAccessories from '../../../../shared/assets/img/category-accessories.webp';
import type { Category } from '../../../../services/product';

const CategoryList: React.FC = () => {
  const [categories, setCategories] = useState<
    { category: string; numberOfModels: number }[]
  >([]);

  useEffect(() => {
    const fetchCategoryStats = async () => {
      try {
        const categoryStats = await productService.getCategoryStats();
        setCategories(categoryStats);
      } catch (error) {
        console.error('Error fetching category stats:', error);
      }
    };

    fetchCategoryStats();
  }, []);

  const getCategoryImage = (category: string) => {
    switch (category.toLowerCase()) {
      case 'phones':
        return categoryPhones;
      case 'tablets':
        return categoryTablets;
      case 'accessories':
        return categoryAccessories;
      default:
        return '';
    }
  };

  return (
    <div className="category-list">
      <h2 className="category-list__title">Shop by category</h2>
      <div className="category-list__items">
        {categories.map((category) => (
          <CategoryItem
            key={category.category}
            categoryName={CategoryLabels[category.category as Category]}
            categoryQuantity={category.numberOfModels}
            categoryImg={getCategoryImage(category.category)}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
