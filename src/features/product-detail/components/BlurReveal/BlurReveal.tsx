import React, { useRef, useEffect, useState } from 'react';
import { Button } from '../../../../shared/ui/Button';
import './BlurReveal.scss';
import { useTranslation } from 'react-i18next';
import BlurParticle from './BlurParticle';

export const BlurReveal: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { t } = useTranslation('productDetail');

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [overlayHidden, setOverlayHidden] = useState(false);
  const [modalOpen, setModalOpen] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d')!;
    let animationFrame: number;

    const resize = () => {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particleCount = 100;
    const particles = Array.from(
      { length: particleCount },
      () => new BlurParticle(canvas.width, canvas.height),
    );

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.update();
        p.draw(ctx);
      });

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', resize);
    };
  }, []);

  const revealContent = () => {
    setOverlayHidden(true);
    setModalOpen(false);
  };

  return (
    <div className="blur-reveal" ref={containerRef}>
      {!overlayHidden && (
        <canvas
          ref={canvasRef}
          className="blur-reveal__overlay"
          onClick={() => setModalOpen(true)}
        />
      )}

      {modalOpen && (
        <div className="blur-reveal__modal">
          <div className="blur-reveal__modal-inner">
            <p className="blur-reveal__modal-text">{t('translationWarning')}</p>

            <Button onClick={revealContent}>{t('showOriginal')}</Button>
          </div>
        </div>
      )}

      <div className="blur-reveal__content">{children}</div>
    </div>
  );
};
