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
    <div className="category-item">
      <div className="category-item__image-container">
        <img
          src={categoryImg}
          alt={categoryName}
          className="category-item__image"
        />
      </div>
      <h3 className="category-item__name">{categoryName}</h3>
      <p className="category-item__quantity">{categoryQuantity} models</p>
    </div>
  );
};

export default CategoryItem;
