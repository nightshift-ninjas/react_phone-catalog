import { useContext } from 'react';
import { LanguageContext } from './LanguageContext';

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used inside LanguageProvider');
  }
  return ctx;
};
