import React, { useState } from 'react';
import './ContactsPage.scss';
import * as Form from '@radix-ui/react-form';
import { Button } from '../../shared/ui/Button';
import { FormInput } from '../../shared/ui/FormInput';
import emailjs from 'emailjs-com';
import { useTranslation } from 'react-i18next';
import { SlideIn } from '../../shared/animation/SlideIn';
import { motion } from 'framer-motion';

export const ContactsPage: React.FC = () => {
  const { t } = useTranslation('contactsPage');

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
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {t("getInTouch")}
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {t("reachUs")}
        </motion.p>


        <SlideIn
          beforeAnimationState={{ y: 20, opacity: 0, delay: 0.2 }}
          trigger="load"
        >
          <Form.Root className="contacts__form" onSubmit={handleSubmit}>
          <div className="contacts__row">
            <FormInput
              name="firstName"
              placeholder={t('placeholder.firstName')}
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <FormInput
              name="lastName"
              placeholder={t('placeholder.lastName')}
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <FormInput
            name="email"
            type="email"
            placeholder={t('placeholder.email')}
            value={formData.email}
            onChange={handleChange}
            required
          />

          <FormInput
            name="subject"
            placeholder={t('placeholder.subject')}
            value={formData.subject}
            onChange={handleChange}
          />

          <FormInput
            name="message"
            placeholder={t('placeholder.message')}
            textarea
            value={formData.message}
            onChange={handleChange}
          />

          <Form.Submit asChild>
            <Button onClick={() => { }}>{t('submit')}</Button>
          </Form.Submit>

          <p className="terms">
            {t('agreeWarning')}
            <a href="#" className="contacts__link">
              {t('termsOfService')}
            </a>
            {t('and')}
            <a href="#" className="contacts__link">
              {t('privacyPolicy')}
            </a>
            .
          </p>
          </Form.Root>
        </SlideIn>
      </div>
    </div>
  );
};
