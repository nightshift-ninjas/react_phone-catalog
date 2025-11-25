import { useNavigate } from 'react-router-dom';
import { Button } from '../../../../shared/ui/Button';
import type React from 'react';
import { useContext } from 'react';
import { LanguageContext } from '../../../../shared/context/language';
import { ROUTES } from '../../../../shared/config/routes';

import './CartInfo.scss';
import { useCurrency } from '../../../../shared/context/currency';
import { convertPrice } from '../../../../shared/utils';
import type { Currency } from '../../../../widgets/CurrencyButton';
import { useTranslation } from 'react-i18next';

type Props = {
  total: number;
  itemsCount: number;
};

export const CartInfo: React.FC<Props> = ({ total, itemsCount }) => {
  const navigate = useNavigate();
  const { language: lng } = useContext(LanguageContext)!;
  const { rates, currentCurrency } = useCurrency();
  const { t } = useTranslation('cartPage');

  const totalFormatted = convertPrice(
    total,
    rates,
    currentCurrency as Currency,
  );

  const handleClick = () => navigate(`/${lng}/${ROUTES.checkout}`);

  return (
    <div className="cart-info">
      <div className="cart-info__wrapper">
        <div className="cart-info__total-price">{totalFormatted}</div>
        <div className="cart-info__total-items">
          {t('totalItemsLabel', {
            count: itemsCount,
          })}
        </div>
      </div>

      <div className="cart-info__divider" />

      <Button onClick={handleClick}>{t('checkoutAction')}</Button>
    </div>
  );
};
