import React, { useState } from 'react';
import './CategoryItem.scss';
import { useTranslation } from 'react-i18next';

type Props = {
  categoryImg: string;
  categoryVideo: string;
  categoryQuantity: number;
  categoryName: string;
};

const CategoryItem: React.FC<Props> = ({
  categoryImg,
  categoryVideo,
  categoryQuantity,
  categoryName,
}) => {
  const { t } = useTranslation('homePage');
  const [isHovered, setIsHovered] = useState(false);

  return (
    <article
      className="category-item"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="category-item__media-wrapper">
        
        <img
          src={categoryImg}
          alt={categoryName}
          className={`category-item__media category-item__media--img ${
            isHovered && categoryVideo ? 'hidden-on-hover' : ''
          }`}
        />

        {categoryVideo && (
          <video
            src={categoryVideo}
            autoPlay
            loop
            muted
            playsInline
            className={`category-item__media category-item__media--video ${
              isHovered ? 'visible-on-hover' : ''
            }`}
          />
        )}
        
      </div>

      <h3 className="category-item__title">{t(categoryName)}</h3>
      <p className="category-item__count">{categoryQuantity} models</p>
    </article>
  );
};

export default CategoryItem;