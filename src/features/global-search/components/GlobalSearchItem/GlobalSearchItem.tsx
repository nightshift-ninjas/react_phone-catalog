import React from 'react';
import type { Product } from '../../../../services/product';
import './GlobalSearchItem.scss';
import { BASE_URL } from '../../../../widgets/ProductCard';
import { convertPrice } from '../../../../shared/utils';
import { useCurrency } from '../../../../shared/context/currency';
import type { Currency } from '../../../../widgets/CurrencyButton';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../../../shared/context/language';
import { ROUTES } from '../../../../shared/config/routes';

type Props = {
  product: Product;
};

export const GlobalSearchItem: React.FC<Props> = ({ product }) => {
  const { language: lng } = useLanguage();
  const { rates, currentCurrency } = useCurrency();

  const price = product.priceDiscount
    ? product.priceDiscount
    : product.priceRegular;

  const priceFormatted = convertPrice(
    price,
    rates,
    currentCurrency as Currency,
  );

  const productLink = `/${lng}/${ROUTES.catalog}/${product.category}/product/${product.id}`;

  return (
    <Link to={productLink}>
      <article className="search-item">
        <div className="search-item__block">
          <img
            className="search-item__thumbnail"
            src={`${BASE_URL}${product.images?.[0]}`}
            alt={product.name}
          />

          <p className="search-item__name">{product.name}</p>
        </div>

        <div className="search-item__block">
          <span className="search-item__price">{priceFormatted}</span>
        </div>
      </article>
    </Link>
  );
};
