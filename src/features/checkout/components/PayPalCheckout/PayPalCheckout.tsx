import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import './PayPalCheckout.scss';

type PayPalCheckoutProps = {
  totalAmount: number;
};

const CLIENT_ID = import.meta.env.VITE_PAYPAL_CLIENT_ID;
const CURRENCY = 'USD';

const PayPalCheckout: React.FC<PayPalCheckoutProps> = ({ totalAmount }) => {
  return (
    <div className="paypal-btn-wrapper">
      <PayPalScriptProvider
        options={{
          clientId: CLIENT_ID,
          currency: CURRENCY,
        }}
      >
        <div className="paypal-btn">
          <PayPalButtons
            style={{ layout: 'vertical', color: 'black', shape: 'rect' }}
            createOrder={(_, actions) => {
              return actions.order.create({
                intent: 'CAPTURE',
                purchase_units: [
                  {
                    amount: {
                      currency_code: CURRENCY,
                      value: totalAmount.toFixed(2),
                    },
                  },
                ],
              });
            }}
            onApprove={async (_, actions) => {
              if (!actions.order) {
                console.error('Order actions not available');
                return;
              }

              const details = await actions.order.capture();

              // Access payer info safely
              const payerName =
                details?.payer?.name?.given_name ??
                details?.payer?.name?.full_name ??
                'Customer';

              alert(`Transaction completed by ${payerName}`);
            }}
            onError={(err) => {
              console.error(err);
              alert('Something went wrong with the payment.');
            }}
          />
        </div>
      </PayPalScriptProvider>
    </div>
  );
};

export default PayPalCheckout;
