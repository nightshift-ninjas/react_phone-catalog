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

  const handleContentClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  return (
    <div className="full-screen-modal" onClick={onClose}>
      <div className="full-screen-modal__backdrop"></div>
      <div className="full-screen-modal__content" onClick={handleContentClick}>
        {children}
      </div>
    </div>
  );
};
