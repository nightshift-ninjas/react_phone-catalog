import React, { useState, forwardRef } from 'react';
import { FormInput } from '../../../../shared/ui/FormInput';
import * as Form from '@radix-ui/react-form';
import ToggleSwitch from '../../../../shared/ui/ToggleSwitch/ToggleSwitch';
import './CheckoutForm.scss';
import { PaymentMethod } from '../../../../services/order';
import RadioGroupComponent from '../../../../shared/ui/RadioGroup/RadioGroup';
import type { User } from 'firebase/auth';
import { useTranslation } from 'react-i18next';


type Props = {
  user: User | null;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onPaymentMethodChange: (method: PaymentMethod) => void;
};

// Shorten from InputField
type InFd = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

export const CheckoutForm = forwardRef<HTMLFormElement, Props>(
  ({ user, onSubmit, onPaymentMethodChange }, ref) => {
    const display = user?.displayName?.trim() || '';
    const displayParts = display.split(' ');
    const initialFirst = displayParts.length >= 1 ? displayParts[0] : '';
    const initialLast =
      displayParts.length >= 2 ? displayParts.slice(1).join(' ') : '';

    const [firstName, setFirstName] = useState(initialFirst);
    const [lastName, setLastName] = useState(initialLast);
    const [email, setEmail] = useState(user?.email || '');
    const [mobile, setMobile] = useState(user?.phoneNumber || '');
    const [isScheduled, setIsScheduled] = useState(true);
    const { t } = useTranslation('checkoutForm');

    const paymentMethodOptions = [
      { label: t('payment.online') , value: PaymentMethod.ONLINE_PAYMENT },
      { label: t('payment.cash'), value: PaymentMethod.CASH_ON_DELIVERY },
      { label: t('payment.pos'), value: PaymentMethod.POS_ON_DELIVERY },
    ];

    return (
      <Form.Root ref={ref} className="checkout-form" onSubmit={onSubmit}>
        <div className="checkout-form__block">
          <div className="checkout-form__row">
            <FormInput
              name="first-name"
              placeholder={t('checkoutForm.firstName')}
              label={t('checkoutForm.firstName')}
              required
              value={firstName}
              onChange={(event: InFd) => setFirstName(event.target.value)}
            />
            <FormInput
              name="last-name"
              placeholder={t('checkoutForm.lastName')}
              label={t('checkoutForm.lastName')}
              value={lastName}
              onChange={(event: InFd) => setLastName(event.target.value)}
            />
          </div>

          <div className="checkout-form__row">
            <FormInput
              name="email"
              placeholder={t('checkoutForm.email')}
              type="email"
              label={t('checkoutForm.email')}
              required
              value={email}
              onChange={(event: InFd) => setEmail(event.target.value)}
            />
            <FormInput
              name="phone"
              placeholder={t('checkoutForm.mobile')}
              label={t('checkoutForm.mobile')}
              type="tel"
              required
              value={mobile}
              onChange={(event: InFd) => setMobile(event.target.value)}
            />
          </div>

          <div className="checkout-form__row">
            <FormInput
              name="country"
              placeholder={t('checkoutForm.country')}
              label={t('checkoutForm.country')}
              required
            />
            <FormInput
              name="city"
              placeholder={t('checkoutForm.city')} 
              label={t('checkoutForm.city')} 
              required 
            />
          </div>

          <div className="checkout-form__row">
            <FormInput
              name="address"
              placeholder={t('checkoutForm.address')}
              label={t('checkoutForm.address')}
              className="checkout-form__long"
              required
            />
            <FormInput 
              name="zip" 
              placeholder={t('checkoutForm.zip')}
              label={t('checkoutForm.zip')}
              required 
            />
            <FormInput 
              name="state" 
              placeholder={t('checkoutForm.state')}
              label={t('checkoutForm.state')} 
            />
          </div>
        </div>

        <div className="checkout-form__switcher">
          <ToggleSwitch
            label={t('schedule.delivery')}
            checked={isScheduled}
            onChange={setIsScheduled}
          />
        </div>

        <div className="checkout-form__block">
          <div className="checkout-form__row">
            <FormInput
              name="delivery-date"
              type="date"
              label={t('schedule.date')}
              disabled={!isScheduled}
            />
            <FormInput
              name="delivery-time"
              type="time"
              label={t('schedule.time')}
              disabled={!isScheduled}
            />
          </div>

          <div className="checkout-form__row">
            <FormInput
              name="delivery-notes"
              placeholder={t('schedule.notesForCourier')}
              label={t('schedule.notes')}
              className="checkout-form__long"
              textarea
              disabled={!isScheduled}
            />
          </div>
        </div>

        <h6 className="checkout-form__label">{t('payment.method')}</h6>

        <div className="checkout-form__block">
          <RadioGroupComponent
            name="payment-method"
            defaultValue={PaymentMethod.ONLINE_PAYMENT}
            options={paymentMethodOptions}
            onValueChange={(value) =>
              onPaymentMethodChange(value as PaymentMethod)
            }
          />
        </div>
      </Form.Root>
    );
  },
);

CheckoutForm.displayName = 'CheckoutForm';
