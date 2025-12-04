import React, { useEffect, useState } from 'react';
import './ThemeButton.scss';
import MoonIcon from '../../assets/icons/moon.svg?react';
import SunIcon from '../../assets/icons/sun.svg?react';
import { Theme } from './types';

export const ThemeButton: React.FC = () => {
  const [isDark, setIsDark] = useState<boolean>(() => {
    const stored = localStorage.getItem('theme') as Theme | null;
    return stored ? stored === Theme.DARK : false;
  });

  const toggleTheme = () => setIsDark((prev) => !prev);

  useEffect(() => {
    const newTheme = isDark ? Theme.DARK : Theme.LIGHT;

    localStorage.setItem('theme', newTheme);
    document.body.setAttribute('data-theme', newTheme);
  }, [isDark]);

  return (
    <button className="theme-btn" onClick={toggleTheme}>
      {isDark ? <SunIcon /> : <MoonIcon />}
    </button>
  );
};
