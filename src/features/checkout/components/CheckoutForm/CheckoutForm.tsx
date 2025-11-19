import React, { useState, forwardRef } from 'react';
import { FormInput } from '../../../../shared/ui/FormInput';
import * as Form from '@radix-ui/react-form';
import ToggleSwitch from '../../../../shared/ui/ToggleSwitch/ToggleSwitch';
import './CheckoutForm.scss';
import { PaymentMethod } from './types';
import RadioGroupComponent from '../../../../shared/ui/RadioGroup/RadioGroup';
import type { User } from 'firebase/auth';

const paymentMethodOptions = [
  { label: 'Online Payment', value: PaymentMethod.ONLINE_PAYMENT },
  { label: 'Cash on Delivery', value: PaymentMethod.CASH_ON_DELIVERY },
  { label: 'POS on Delivery', value: PaymentMethod.POS_ON_DELIVERY },
];

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
    const [isScheduled, setIsScheduled] = useState(false);

    return (
      <Form.Root ref={ref} className="checkout-form" onSubmit={onSubmit}>
        <div className="checkout-form__block">
          <div className="checkout-form__row">
            <FormInput
              name="first-name"
              placeholder="First Name"
              label="First Name"
              required
              value={firstName}
              onChange={(event: InFd) => setFirstName(event.target.value)}
            />
            <FormInput
              name="last-name"
              placeholder="Last Name"
              label="Last Name"
              value={lastName}
              onChange={(event: InFd) => setLastName(event.target.value)}
            />
          </div>

          <div className="checkout-form__row">
            <FormInput
              name="email"
              placeholder="Email"
              type="email"
              label="Email"
              required
              value={email}
              onChange={(event: InFd) => setEmail(event.target.value)}
            />
            <FormInput
              name="phone"
              placeholder="Mobile Number"
              label="Mobile Number"
              type="tel"
              required
              value={mobile}
              onChange={(event: InFd) => setMobile(event.target.value)}
            />
          </div>

          <div className="checkout-form__row">
            <FormInput
              name="country"
              placeholder="Country"
              label="Country"
              required
            />
            <FormInput name="city" placeholder="City" label="City" required />
          </div>

          <div className="checkout-form__row">
            <FormInput
              name="address"
              placeholder="Address"
              label="Address"
              className="checkout-form__long"
              required
            />
            <FormInput name="zip" placeholder="ZIP" label="ZIP" required />
            <FormInput name="state" placeholder="State" label="State" />
          </div>
        </div>

        <div className="checkout-form__switcher">
          <ToggleSwitch
            label="Schedule Delivery"
            checked={isScheduled}
            onChange={setIsScheduled}
          />
        </div>

        <div className="checkout-form__block">
          <div className="checkout-form__row">
            <FormInput
              name="delivery-date"
              type="date"
              label="Delivery Date"
              disabled={!isScheduled}
            />
            <FormInput
              name="delivery-time"
              type="time"
              label="Delivery Time"
              disabled={!isScheduled}
            />
          </div>

          <div className="checkout-form__row">
            <FormInput
              name="delivery-notes"
              placeholder="Notes for the courier"
              label="Delivery Notes"
              className="checkout-form__long"
              textarea
              disabled={!isScheduled}
            />
          </div>
        </div>

        <h6 className="checkout-form__label">Payment Method</h6>

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
