import React, { useState } from 'react';
import './ContactsPage.scss';
import * as Form from '@radix-ui/react-form';
import { Button } from '../../shared/ui/Button';
import { FormInput } from '../../shared/ui/FormInput';
import emailjs from 'emailjs-com';

export const ContactsPage: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    emailjs
      .send(
        'service_xhw8s4n',
        'template_ryw3pgm',
        {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
        '41scgEAATYOVe9gbz',
      )
      .then(() => {
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          subject: '',
          message: '',
        });

        event.currentTarget.reset();
      });
  };

  return (
    <div className="contacts">
      <div className="contacts__card">
        <h1>Get in Touch</h1>
        <p>You can reach us anytime</p>

        <Form.Root className="contacts__form" onSubmit={handleSubmit}>
          <div className="contacts__row">
            <FormInput
              name="firstName"
              placeholder="First name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <FormInput
              name="lastName"
              placeholder="Last name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <FormInput
            name="email"
            type="email"
            placeholder="Your email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <FormInput
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
          />

          <FormInput
            name="message"
            placeholder="Tell us what we can help you with..."
            textarea
            value={formData.message}
            onChange={handleChange}
          />

          <Form.Submit asChild>
            <Button onClick={() => {}}>Submit</Button>
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
