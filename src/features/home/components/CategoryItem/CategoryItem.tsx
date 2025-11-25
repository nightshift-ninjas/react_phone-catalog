import React from 'react';
import './CategoryItem.scss';
import { useTranslation } from 'react-i18next';

type Props = {
  categoryImg: string;
  categoryQuantity: number;
  categoryName: string;
};

const CategoryItem: React.FC<Props> = ({
  categoryImg,
  categoryQuantity,
  categoryName,
}) => {
  const { t } = useTranslation('homePage');

  return (
    <article className="category-item">
      <div className="category-item__img-wrapper">
        <img
          src={categoryImg}
          alt={categoryName}
          className="category-item__img"
        />
      </div>

      <h3 className="category-item__title">{t(categoryName)}</h3>

      <p className="category-item__count">{categoryQuantity} models</p>
    </article>
  );
};

export default CategoryItem;
