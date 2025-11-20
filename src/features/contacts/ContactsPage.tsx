import React from 'react';
import './ContactsPage.scss';
import * as Form from '@radix-ui/react-form';
import { Button } from '../../shared/ui/Button';
import { FormInput } from '../../shared/ui/FormInput';

export const ContactsPage: React.FC = () => {
  return (
    <div className="contacts">
      <div className="contacts__card">
        <h1>Get in Touch</h1>
        <p>You can reach us anytime</p>

        <Form.Root className="contacts__form">
          <div className="contacts__row">
            <FormInput name="firstName" placeholder="First name" required />
            <FormInput name="lastName" placeholder="Last name" required />
          </div>

          <FormInput
            name="email"
            type="email"
            placeholder="Your email"
            required
          />

          <FormInput name="phone" placeholder="Your phone" />

          <FormInput
            name="message"
            placeholder="Tell us what we can help you with..."
            textarea
          />

          <Form.Submit asChild>
            <Button onClick={() => console.log('submit clicked')}>
              Submit
            </Button>
          </Form.Submit>

          <p className="terms">
            By contacting us, you agree to our
            <a href="#" className="contacts__link">
              Terms of service
            </a>
            and
            <a href="#" className="contacts__link">
              Privacy Policy
            </a>
            .
          </p>
        </Form.Root>
      </div>
    </div>
  );
};
