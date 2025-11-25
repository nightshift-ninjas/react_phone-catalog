import React from 'react';
import { SocialNetworkIcons, type CreatorInfo } from '../../types';
import './CreatorCard.scss';
import { CreatorImageSlider } from '../CreatorImageSlider';
import { useTranslation } from 'react-i18next';

type Props = {
  creator: CreatorInfo;
};

export const CreatorCard: React.FC<Props> = ({ creator }) => {
  const { t } = useTranslation('creators');
  return (
    <div className="creator-info">
      <div className="creator-info__images">
        <CreatorImageSlider images={creator.images} />
      </div>

      <div className="creator-info__info">
        <h1 className="creator-info__name">{t(`${creator.key}.name`)}</h1>
        <h3 className="creator-info__role">{t(`${creator.key}.role`)}</h3>
        <p className="creator-info__description">
          {t(`${creator.key}.description`)}
        </p>

        <ul className="creator-info__social-network-list">
          {creator.socialNetworks.map((network, index) => (
            <li key={index} className="creator-info__social-network-item">
              <a href={network.link} target="_blank" rel="noreferrer">
                {SocialNetworkIcons[network.icon]}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
