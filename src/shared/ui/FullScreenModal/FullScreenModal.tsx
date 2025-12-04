import React from 'react';
import './FullScreenModal.scss';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const FullScreenModal: React.FC<Props> = ({
  isOpen,
  onClose,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <div className="full-screen-modal">
      <div className="full-screen-modal__backdrop" onClick={onClose} />
      <div className="full-screen-modal__content" onClick={onClose}>
        {children}
      </div>
    </div>
  );
};
