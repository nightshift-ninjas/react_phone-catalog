import React from 'react';
import { IconDropdown } from '../../shared/ui/IconDropdown';
import { Language, LanguageFlags, LanguageLabels } from './types';
import { useLanguage } from '../../shared/context/language';
import './LanguageButton.scss';

const languageOptions = [
  {
    label: LanguageLabels[Language.EN],
    icon: LanguageFlags[Language.EN],
    value: Language.EN,
    optionIconWidth: 25,
  },
  {
    label: LanguageLabels[Language.UA],
    icon: LanguageFlags[Language.UA],
    value: Language.UA,
    optionIconWidth: 25,
  },
];

export const LanguageButton: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const handleChange = (lng: string) => {
    setLanguage(lng as Language);
  };

  return (
    <div className="lng-btn">
      <IconDropdown
        options={languageOptions}
        icon={LanguageFlags[language]}
        onChange={handleChange}
        themeIcon={false}
      />
    </div>
  );
};
