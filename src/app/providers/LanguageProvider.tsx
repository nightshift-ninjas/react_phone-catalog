import React, { useState, useEffect } from 'react';
import { Language } from '../../widgets/LanguageButton/types';
import i18n from '../../shared/i18n';
import { LanguageContext } from '../../shared/context/language';

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguageState] = useState<Language>(
    (localStorage.getItem('lng') as Language) || Language.EN,
  );

  const setLanguage = (lng: Language) => {
    setLanguageState(lng);
    localStorage.setItem('lng', lng);
    i18n.changeLanguage(lng);
  };

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
