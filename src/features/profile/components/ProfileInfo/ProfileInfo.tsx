import type { User } from 'firebase/auth';
import React from 'react';
import './ProfileInfo.scss';
import { Button } from '../../../../shared/ui/Button';
import { authClient } from '../../../../services/auth';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../../../shared/ui/Spinner/Spinner';

type Props = {
  user: User | null;
};

export const ProfileInfo: React.FC<Props> = ({ user }) => {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await authClient.logout();
      navigate('/login');
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
      <h2>{`Hello ${user.displayName}`}</h2>

      <ul className="user-info__list">
        <li className="user-info__item">
          <span>ID:</span>
          <span>{user.uid}</span>
        </li>

        <li className="user-info__item">
          <span>Email:</span>
          <span>{user.email}</span>
        </li>

        <li className="user-info__item user-info__item--capitalize">
          <span>Created at:</span>
          <span>{user.metadata.creationTime}</span>
        </li>

        <li className="user-info__item user-info__item--capitalize">
          <span>Last sign:</span>
          <span>{user.metadata.lastSignInTime}</span>
        </li>
      </ul>

      <div className="user-info__button">
        <Button onClick={logout}>Logout</Button>
      </div>
    </div>
  );
};
