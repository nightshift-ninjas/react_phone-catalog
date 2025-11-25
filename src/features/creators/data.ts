import { SocialNetworkEnum, type CreatorInfo } from './types';
import nhr_1 from '../../shared/assets/img/nhr_1.webp';
import nhr_2 from '../../shared/assets/img/nhr_2.webp';

export const creators: CreatorInfo[] = [
  {
    key: 'nhr',
    images: [nhr_1, nhr_2],
    socialNetworks: [
      {
        link: 'https://www.linkedin.com/in/nazariy-holovach-a6a30738a/',
        icon: SocialNetworkEnum.LINKEDIN,
      },
      {
        link: 'https://github.com/Aiiyuu',
        icon: SocialNetworkEnum.GITHUB,
      },
      {
        link: 'https://t.me/nazariyholovach',
        icon: SocialNetworkEnum.TELEGRAM,
      },
    ],
  },
  {
    key: 'nhr2',
    images: [nhr_2, nhr_1],
    socialNetworks: [
      {
        link: '',
        icon: SocialNetworkEnum.LINKEDIN,
      },
      {
        link: '',
        icon: SocialNetworkEnum.GITHUB,
      },
    ],
  },
];
