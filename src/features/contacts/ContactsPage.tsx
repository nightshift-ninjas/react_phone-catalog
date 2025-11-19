import React from 'react';
import './ContactsPage.scss';
import * as Form from "@radix-ui/react-form";
import { Button } from '../../shared/ui/Button';

export const ContactsPage: React.FC = () => {
  return (
    <div className="contacts">
      <div className="contacts__card">

        <h1>Get in Touch</h1>
        <p>You can reach us anytime</p>

        <Form.Root className="contacts__form">

          <div className="contacts__row">

            <Form.Field name="firstName" className="contacts__field">
              <Form.Control asChild>
                <input type="text" placeholder="First name" required />
              </Form.Control>

              <Form.Message match="valueMissing" className="radix-form-message">
                First name is required
              </Form.Message>
            </Form.Field>

            <Form.Field name="lastName" className="contacts__field">
              <Form.Control asChild>
                <input type="text" placeholder="Last name" required />
              </Form.Control>

              <Form.Message match="valueMissing" className="radix-form-message">
                Last name is required
              </Form.Message>
            </Form.Field>

          </div>

          <Form.Field name="email" className="contacts__field">
            <Form.Control asChild>
              <input type="email" placeholder="Your email" required />
            </Form.Control>

            <Form.Message match="valueMissing" className="radix-form-message">
              Please enter your email
            </Form.Message>

            <Form.Message match="typeMismatch" className="radix-form-message">
              Please enter a valid email
            </Form.Message>
          </Form.Field>

          <Form.Field name="phone" className="contacts__field">
            <Form.Control asChild>
              <input type="text" placeholder="Your phone" />
            </Form.Control>
          </Form.Field>

          <Form.Field name="message" className="contacts__field">
            <Form.Control asChild>
              <textarea placeholder="Tell us what we can help you with..." />
            </Form.Control>
          </Form.Field>

          <Form.Submit asChild>
            <Button onClick={() => console.log("submit clicked")}>
              Submit
            </Button>
          </Form.Submit>

          <p className="terms">
            By contacting us, you agree to our
            <a href="#" className="contacts__link"> Terms of service </a>
            and
            <a href="#" className="contacts__link"> Privacy Policy</a>.
          </p>

        </Form.Root>
      </div>
    </div>
  );
};
