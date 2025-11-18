import React from 'react';
import './CategoryItem.scss';

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
  return (
    <article className="category-item">
      <div className="category-item__img-wrapper">
        <img
          src={categoryImg}
          alt={categoryName}
          className="category-item__img"
        />
      </div>

      <h3 className="category-item__title">{categoryName}</h3>

      <p className="category-item__count">{categoryQuantity} models</p>
    </article>
  );
};

export default CategoryItem;
