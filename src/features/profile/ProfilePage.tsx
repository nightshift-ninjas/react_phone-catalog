import React, { useEffect } from 'react';
import './ProfilePage.scss';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../shared/hooks';
import { ProfileInfo } from './components/ProfileInfo';

export const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  return (
    <div className="profile">
      <section className="profile__section profile__section--top">
        <div className="profile__subsection">Order statistic with charts</div>

        <div className="profile__subsection">
          <ProfileInfo user={user} />
        </div>
      </section>

      <section className="profile__section">Order list with status</section>
    </div>
  );
};
