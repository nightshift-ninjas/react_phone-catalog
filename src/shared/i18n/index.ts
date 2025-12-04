import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { Language } from '../../widgets/LanguageButton';

interface Resources {
  [lng: string]: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [ns: string]: Record<string, any>;
  };
}

const translationFiles = import.meta.glob('./languages/**/*.json', {
  eager: true,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}) as Record<string, { default: Record<string, any> }>;

const resources: Resources = {};

Object.entries(translationFiles).forEach(([path, module]) => {
  const parts = path.split('/');
  const lng = parts[parts.length - 2];
  const nsWithExt = parts[parts.length - 1];
  const ns = nsWithExt.replace('.json', '');

  if (!resources[lng]) resources[lng] = {};
  resources[lng][ns] = module.default;
});

// Initialize i18next
i18n.use(initReactI18next).init({
  resources,
  lng: Language.EN,
  fallbackLng: Language.EN,
  defaultNS: 'common',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
