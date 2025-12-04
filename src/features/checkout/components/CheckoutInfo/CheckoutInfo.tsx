import React, { useState } from 'react';
import './CheckoutInfo.scss';
import PayPalCheckout from '../PayPalCheckout/PayPalCheckout';
import { Button, ButtonTypes } from '../../../../shared/ui/Button';
import { PaymentMethod } from '../../../../services/order';
import type { Currency } from '../../../../widgets/CurrencyButton';
import { convertPrice } from '../../../../shared/utils';
import { useCurrency } from '../../../../shared/context/currency';
import ToggleSwitch from '../../../../shared/ui/ToggleSwitch/ToggleSwitch';
import * as Form from '@radix-ui/react-form';
import { FormInput } from '../../../../shared/ui/FormInput';
import { useTranslation } from 'react-i18next';

type Props = {
  totalAmount: number;
  finalTotalAmount: number;
  discountAmount?: number;
  paymentMethod: PaymentMethod;
  formRef: React.RefObject<HTMLFormElement | null>;
  onPromoApply: (promoCode: string) => void;
};

export const CheckoutInfo: React.FC<Props> = ({
  paymentMethod,
  formRef,
  finalTotalAmount,
  totalAmount,
  discountAmount,
  onPromoApply,
}) => {
  const [usePromo, setUsePromo] = useState(false);
  const { rates, currentCurrency } = useCurrency();
  const { t } = useTranslation('checkoutInfo');

  const formattedTotal = convertPrice(
    totalAmount,
    rates,
    currentCurrency as Currency,
  );

  const formattedDiscount = convertPrice(
    discountAmount,
    rates,
    currentCurrency as Currency,
  );

  const formattedFinalTotal = convertPrice(
    finalTotalAmount,
    rates,
    currentCurrency as Currency,
  );

  const submitOrder = () => {
    formRef.current?.requestSubmit();
  };

  const handlePromoFormSubmit = (
    event: React.FormEvent<HTMLFormElement>,
  ): void => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const promoCode = formData.get('promo');

    if (typeof promoCode === 'string' && promoCode.trim() !== '') {
      onPromoApply(promoCode.trim());
    }
  };

  return (
    <section className="checkout-info" aria-labelledby="checkout-summary-title">
      <h2 className="checkout-info__title">{t('order.summary')}</h2>

      <dl className="checkout-info__list">
        <div className="checkout-info__row">
          <dt>{t('order.subtotal')}</dt>
          <dd>{formattedTotal}</dd>
        </div>

        <div className="checkout-info__row">
          <dt>{t('order.shipping')}</dt>
          <dd>--</dd>
        </div>

        {formattedDiscount && (
          <div className="checkout-info__row">
            <dt>{t('order.discount')}</dt>
            <dd>{formattedDiscount}</dd>
          </div>
        )}

        <hr className="checkout-info__divider" />

        <div className="checkout-info__row checkout-info__row--total">
          <dt>{t('order.total')} (USD)</dt>
          <dd>{formattedFinalTotal}</dd>
        </div>
      </dl>

      <div className="checkout-form__switcher">
        <ToggleSwitch
          label={t('promo.usePromo')}
          checked={usePromo}
          onChange={setUsePromo}
        />
      </div>

      {usePromo && (
        <>
          <Form.Root onSubmit={handlePromoFormSubmit}>
            <FormInput
              name="promo"
              type="text"
              label={t('promo.promocode')}
              disabled={!usePromo}
            />

            <Button onClick={() => {}} type={ButtonTypes.SUBMIT}>
              {t('promo.apply')}
            </Button>
          </Form.Root>
          <hr />
        </>
      )}

      {paymentMethod === PaymentMethod.ONLINE_PAYMENT ? (
        <PayPalCheckout totalAmount={finalTotalAmount} onSuccess={submitOrder} />
      ) : (
        <Button onClick={submitOrder}>{t('confirmOrder')}</Button>
      )}
    </section>
  );
};
