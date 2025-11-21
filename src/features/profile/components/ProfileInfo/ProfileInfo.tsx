import type { User } from 'firebase/auth';
import React, { useContext } from 'react';
import './ProfileInfo.scss';
import { Button } from '../../../../shared/ui/Button';
import { authClient } from '../../../../services/auth';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../../../shared/ui/Spinner/Spinner';
import { LanguageContext } from '../../../../shared/context/language';
import { ROUTES } from '../../../../shared/config/routes';

type Props = {
  user: User | null;
};

export const ProfileInfo: React.FC<Props> = ({ user }) => {
  const navigate = useNavigate();
  const { language: lng } = useContext(LanguageContext)!;

  const logout = async () => {
    try {
      await authClient.logout();
      navigate(`/${lng}/${ROUTES.login}`);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (!user) {
    return (
      <div className="user-info user-info--center">
        <Spinner size={80} thickness={7} />
      </div>
    );
  }

  return (
    <div className="user-info">
      <h2 className="user-info__welcome">{`Hello ${user.displayName}`}</h2>

      <dl className="user-info__list">
        <div className="user-info__item">
          <dt>ID:</dt>
          <dd>{user.uid}</dd>
        </div>

        <div className="user-info__item">
          <dt>Email:</dt>
          <dd>{user.email}</dd>
        </div>

        <div className="user-info__item user-info__item--capitalize">
          <dt>Created at:</dt>
          <dd>{user.metadata.creationTime}</dd>
        </div>

        <div className="user-info__item user-info__item--capitalize">
          <dt>Last sign:</dt>
          <dd>{user.metadata.lastSignInTime}</dd>
        </div>
      </dl>

      <div className="user-info__button">
        <Button onClick={logout}>Logout</Button>
      </div>
    </div>
  );
};
