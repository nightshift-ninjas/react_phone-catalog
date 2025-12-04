import React from 'react';
import { SocialNetworkIcons, type CreatorInfo } from '../../types';
import './CreatorCard.scss';
import { CreatorImageSlider } from '../CreatorImageSlider';
import { useTranslation } from 'react-i18next';
import { SlideIn } from '../../../../shared/animation/SlideIn';

type Props = {
  creator: CreatorInfo;
};

export const CreatorCard: React.FC<Props> = ({ creator }) => {
  const { t } = useTranslation('creators');
  return (
    <div className="creator-info">
      <div className="creator-info__images">
        <SlideIn beforeAnimationState={{ y: 0, x: -80, opacity: 0 }}>
          <CreatorImageSlider images={creator.images} />
        </SlideIn>
      </div>

      <div className="creator-info__info">
        <SlideIn beforeAnimationState={{ opacity: 0 }}>
          <h1 className="creator-info__name">{t(`${creator.key}.name`)}</h1>
        </SlideIn>

        <SlideIn beforeAnimationState={{ opacity: 0, delay: 0.2 }}>
          <h3 className="creator-info__role">{t(`${creator.key}.role`)}</h3>
        </SlideIn>

        <SlideIn beforeAnimationState={{ opacity: 0, delay: 0.4 }}>
          <p className="creator-info__description">
            {t(`${creator.key}.description`)}
          </p>
        </SlideIn>

        <ul className="creator-info__social-network-list">
          {creator.socialNetworks.map((network, index) => (
            <SlideIn
              beforeAnimationState={{ opacity: 0, delay: 0.5 + 0.1 * index }}
              key={index}
            >
              <li className="creator-info__social-network-item">
                <a href={network.link} target="_blank" rel="noreferrer">
                  {SocialNetworkIcons[network.icon]}
                </a>
              </li>
            </SlideIn>
          ))}
        </ul>
      </div>
    </div>
  );
};
