import React from 'react';
import UaFlag from '../../shared/assets/icons/Ukraine.svg?react';
import EnFlag from '../../shared/assets/icons/United-Kingdom.svg?react';

export enum Language {
  EN = 'en',
  UA = 'ua',
}

export const LanguageLabels: Record<Language, string> = {
  [Language.EN]: 'English',
  [Language.UA]: 'Українська',
};

export const LanguageFlags: Record<Language, React.ReactNode> = {
  [Language.EN]: <EnFlag />,
  [Language.UA]: <UaFlag />,
};
