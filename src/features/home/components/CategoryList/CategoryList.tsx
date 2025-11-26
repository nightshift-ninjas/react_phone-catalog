import React, { useEffect, useState } from 'react';
import { productService } from '../../../../services/product/product.service';
import CategoryItem from '../CategoryItem/CategoryItem';
import './CategoryList.scss';
import { CategoryLabels } from '../../../catalog/types';

import categoryPhones from '../../../../shared/assets/img/category-phones.webp';
import categoryTablets from '../../../../shared/assets/img/category-tablets.webp';
import categoryAccessories from '../../../../shared/assets/img/category-accessories.webp';
import categoryPhonesVideo from '../../../../shared/assets/video/video-1.webm';
import categoryTabletsVideo from '../../../../shared/assets/video/video-2.webm';
import categoryAccessoriesVideo from '../../../../shared/assets/video/video-3.webm';

import type { Category } from '../../../../services/product';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../../../shared/context/language';

interface CategoryListProps {
  sectionTitle: string;
}

const CategoryList: React.FC<CategoryListProps> = ({ sectionTitle }) => {
  const [categories, setCategories] = useState<
    { category: string; numberOfModels: number }[]
  >([]);

  const { language: lng } = useLanguage();

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

  const getCategoryMedia = (category: string) => {
    switch (category.toLowerCase()) {
      case 'phones':
        return {
          img: categoryPhones,
          video: categoryPhonesVideo,
        };
      case 'tablets':
        return {
          img: categoryTablets,
          video: categoryTabletsVideo,
        };
      case 'accessories':
        return {
          img: categoryAccessories,
          video: categoryAccessoriesVideo,
        };
      default:
        return { img: '', video: '' };
    }
  };

  return (
    <div className="category-list">
      <h2 className="category-list__title">{sectionTitle}</h2>
      <ul className="category-list__list">
        {categories.map((category) => {
          const media = getCategoryMedia(category.category);

          return (
            <li className="category-list__item" key={category.category}>
              <Link to={`/${lng}/catalog/${category.category}`} title="">
                <CategoryItem
                  categoryName={CategoryLabels[category.category as Category]}
                  categoryQuantity={category.numberOfModels}
                  categoryImg={media.img}
                  categoryVideo={media.video}
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CategoryList;
