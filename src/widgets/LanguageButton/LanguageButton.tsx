import React, { useState } from 'react';
import { IconDropdown } from '../../shared/ui/IconDropdown';
import { Language, LanguageFlags, LanguageLabels } from './types';
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
  const [currentLanguage, setCurrentLanguage] = useState(Language.EN);

  return (
    <div className="lng-btn">
      <IconDropdown
        options={languageOptions}
        icon={LanguageFlags[currentLanguage]}
        onChange={(val) => setCurrentLanguage(val as Language)}
        themeIcon={false}
      />
    </div>
  );
};
