import React from 'react';
import type { Product } from '../../../../services/product';
import './ProductDescription.scss';
import { useTranslation } from 'react-i18next';

type Props = {
  product: Product;
};

const ProductDescription: React.FC<Props> = ({ product }) => {
  const { t } = useTranslation('productDetail');

  const specs = [
    { label: t('productInfo.screen'), value: product.screen },
    { label: t('productInfo.resolution'), value: product.resolution },
    { label: t('productInfo.processor'), value: product.processor },
    { label: t('productInfo.ram'), value: product.ram },
    { label: t('productInfo.camera'), value: product.camera },
    { label: t('productInfo.zoom'), value: product.zoom },
    { label: t('productInfo.cell'), value: product.cell?.join(', ') },
  ];

  return (
    <div className="product-description">
      <div className="about-section">
        <h2 className="about-section__title">{t('about')}</h2>
        {product.description?.map((section) => (
          <div key={section.title} className="about-section__content">
            <h2 className="about-section__section-title">{section.title}</h2>
            <ul className="about-section__text">
              {section.text.map((line, idx) => (
                <li key={idx} className="about-section__text-item">
                  {line}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="tech-specs-section">
        <h2 className="tech-specs-section__title">{t('techSpecs')}</h2>
        <ul className="tech-specs-section__list">
          {specs.map(
            (spec, idx) =>
              spec.value && (
                <li key={idx} className="tech-specs-section__item">
                  <div className="tech-specs-section__row">
                    <strong className="tech-specs-section__label">
                      {spec.label}:
                    </strong>
                    <span className="tech-specs-section__value">
                      {spec.value}
                    </span>
                  </div>
                </li>
              ),
          )}
        </ul>
      </div>
    </div>
  );
};

export default ProductDescription;
