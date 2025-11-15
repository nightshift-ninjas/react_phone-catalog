import React, { useEffect, useState } from 'react';
import './ThemeButton.scss';
import MoonIcon from '../../../../public/icons/moon.svg?react';
import SunIcon from '../../../../public/icons/moon.svg?react';

export const ThemeButton: React.FC = () => {
  const [isDark, setIsDark] = useState(
    localStorage.getItem('theme') === 'dark',
  );

  const toggleTheme = () => setIsDark((prev) => !prev);

  useEffect(() => {
    const newTheme = isDark ? 'dark' : 'light';

    localStorage.setItem('theme', newTheme);
    document.body.setAttribute('data-theme', newTheme);
  }, [isDark]);

  return (
    <div className="theme-btn" onClick={toggleTheme}>
      {isDark ? <SunIcon /> : <MoonIcon />}
    </div>
  );
};
