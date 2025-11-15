import React from 'react';
import { Outlet } from 'react-router-dom';
import './AuthPage.scss';

const AuthPage: React.FC = () => {
  return (
    <>
      <section className="auth">
        <div className="auth__wrapper">
          <Outlet />
        </div>
      </section>
    </>
  );
};

export default AuthPage;
