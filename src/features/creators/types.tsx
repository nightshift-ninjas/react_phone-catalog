import Linkedin from '../../shared/assets/icons/linkedin.svg?react';
import Telegram from '../../shared/assets/icons/telegram.svg?react';
import Github from '../../shared/assets/icons/github.svg?react';
import Instagram from '../../shared/assets/icons/instagram.svg?react';
import Facebook from '../../shared/assets/icons/facebook.svg?react';
import Spotify from '../../shared/assets/icons/spotify.svg?react';

export interface CreatorInfo {
  key: string;
  images: string[];
  socialNetworks: SocialNetwork[];
}

export interface SocialNetwork {
  link: string;
  icon: SocialNetworkEnum;
}

export enum SocialNetworkEnum {
  LINKEDIN = 'linkedin',
  TELEGRAM = 'telegram',
  GITHUB = 'github',
  INSTAGRAM = 'instagram',
  FACEBOOK = 'facebook',
  SPOTIFY = 'spotify',
}

export const SocialNetworkIcons: Record<SocialNetworkEnum, React.ReactNode> = {
  [SocialNetworkEnum.LINKEDIN]: <Linkedin />,
  [SocialNetworkEnum.TELEGRAM]: <Telegram />,
  [SocialNetworkEnum.GITHUB]: <Github />,
  [SocialNetworkEnum.INSTAGRAM]: <Instagram />,
  [SocialNetworkEnum.FACEBOOK]: <Facebook />,
  [SocialNetworkEnum.SPOTIFY]: <Spotify />,
};
