import { createContext } from 'react';
import { Language } from '../../../widgets/LanguageButton/types';

export type LanguageContextType = {
  language: Language;
  setLanguage: (lng: Language) => void;
};

export const LanguageContext = createContext<LanguageContextType | null>(null);
