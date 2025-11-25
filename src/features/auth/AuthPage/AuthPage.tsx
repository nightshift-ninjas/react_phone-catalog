import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AuthSlider } from '../AuthSlider';
import { Theme } from '../../../shared/ui/ThemeButton/types';
import { AnimatePresence } from 'framer-motion';
import authSliderImg1 from '../../../shared/assets/img/auth-slider-1.webp';
import authSliderImg2 from '../../../shared/assets/img/auth-slider-2.webp';
import authSliderImg3 from '../../../shared/assets/img/auth-slider-3.webp';
import { motion } from 'framer-motion';
import { authVariants } from './anims';
import './AuthPage.scss';

const AuthPage: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    const stored = localStorage.getItem('theme') as Theme | null;
    const currentTheme: Theme = stored ?? Theme.LIGHT;

    document.body.setAttribute('data-theme', currentTheme);
  }, []);

  return (
    <>
      <section className="auth">
        <div className="auth__wrapper">
          <div className="auth__block">
            <AuthSlider
              slides={[authSliderImg1, authSliderImg2, authSliderImg3]}
            />
          </div>

          <div className="auth__block">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                variants={authVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>
    </>
  );
};

export default AuthPage;
