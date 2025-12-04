import React, { useState, forwardRef } from 'react';
import { FormInput } from '../../../../shared/ui/FormInput';
import * as Form from '@radix-ui/react-form';
import ToggleSwitch from '../../../../shared/ui/ToggleSwitch/ToggleSwitch';
import { PaymentMethod } from '../../../../services/order';
import RadioGroupComponent from '../../../../shared/ui/RadioGroup/RadioGroup';
import type { User } from 'firebase/auth';
import { useTranslation } from 'react-i18next';
import './CheckoutForm.scss';

import { postService } from '../../../../services/post';
import type { NPCity, NPWarehouse } from '../../../../services/post';
import { AutoComplete } from '../../../../shared/ui/AutoComplete';

type Props = {
  user: User | null;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onPaymentMethodChange: (method: PaymentMethod) => void;
};

type InFd = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

export const CheckoutForm = forwardRef<HTMLFormElement, Props>(
  ({ user, onSubmit, onPaymentMethodChange }, ref) => {
    const display = user?.displayName?.trim() || '';
    const displayParts = display.split(' ');
    const initialFirst = displayParts[0] || '';
    const initialLast =
      displayParts.length > 1 ? displayParts.slice(1).join(' ') : '';

    const [firstName, setFirstName] = useState(initialFirst);
    const [lastName, setLastName] = useState(initialLast);
    const [email, setEmail] = useState(user?.email || '');
    const [mobile, setMobile] = useState(user?.phoneNumber || '');
    const [isScheduled, setIsScheduled] = useState(true);

    const { t } = useTranslation('checkoutForm');

    const [cityInput, setCityInput] = useState('');
    const [cities, setCities] = useState<NPCity[]>([]);
    const [selectedCity, setSelectedCity] = useState<NPCity | null>(null);

    const [warehouseInput, setWarehouseInput] = useState('');
    const [warehouses, setWarehouses] = useState<NPWarehouse[]>([]);
    const [selectedWarehouse, setSelectedWarehouse] = useState<string>('');

    // Handle city typing and selection
    async function handleCityInput(text: string) {
      setCityInput(text);

      if (text.length < 2) {
        setCities([]);
        return;
      }

      const res = await postService.searchCities(text);
      if (res.success) setCities(res.data);
    }

    async function handleCitySelect(ref: string) {
      const city = cities.find((c) => c.Ref === ref);
      if (!city) return;

      setSelectedCity(city);
      setCityInput(city.Description);

      const res = await postService.getWarehouses(city.Ref);
      if (res.success) setWarehouses(res.data);
      setSelectedWarehouse('');
      setWarehouseInput('');
    }

    function handleWarehouseInput(text: string) {
      setWarehouseInput(text);
      setSelectedWarehouse(text);
    }

    function handleWarehouseSelect(ref: string) {
      const warehouse = warehouses.find((w) => w.Ref === ref);
      if (!warehouse) return;

      setSelectedWarehouse(warehouse.Ref);
      setWarehouseInput(warehouse.Description);
    }

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
              onChange={(e: InFd) => setFirstName(e.target.value)}
            />

            <FormInput
              name="last-name"
              placeholder={t('checkoutForm.lastName')}
              label={t('checkoutForm.lastName')}
              value={lastName}
              onChange={(e: InFd) => setLastName(e.target.value)}
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
              onChange={(e: InFd) => setEmail(e.target.value)}
            />

            <FormInput
              name="phone"
              placeholder={t('checkoutForm.mobile')}
              label={t('checkoutForm.mobile')}
              type="tel"
              required
              value={mobile}
              onChange={(e: InFd) => setMobile(e.target.value)}
            />
          </div>

          <div className="checkout-form__row">
            <div className="checkout-form__form-input">
              <AutoComplete
                label={t('checkoutForm.city')}
                placeholder={t('checkoutForm.city')}
                value={cityInput}
                items={cities.map((c) => c.Ref)}
                itemLabels={cities.map((c) => c.Description)}
                onInput={(text) => handleCityInput(text)}
                onSelect={(ref) => handleCitySelect(ref)}
              />
              <input
                type="hidden"
                name="city"
                value={selectedCity?.Ref || cityInput}
              />
            </div>
          </div>

          <div className="checkout-form__row">
            <div className="checkout-form__form-input">
              <AutoComplete
                label={t('checkoutForm.warehouse')}
                placeholder={t('checkoutForm.warehouse')}
                value={warehouseInput}
                items={warehouses.map((w) => w.Ref)}
                itemLabels={warehouses.map((w) => w.Description)}
                onInput={(text) => handleWarehouseInput(text)}
                onSelect={(ref) => handleWarehouseSelect(ref)}
              />
              <input type="hidden" name="warehouse" value={selectedWarehouse} />
            </div>
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
            options={[
              {
                label: t('payment.online'),
                value: PaymentMethod.ONLINE_PAYMENT,
              },
              {
                label: t('payment.cash'),
                value: PaymentMethod.CASH_ON_DELIVERY,
              },
              { label: t('payment.pos'), value: PaymentMethod.POS_ON_DELIVERY },
            ]}
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
