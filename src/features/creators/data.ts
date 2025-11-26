import { SocialNetworkEnum, type CreatorInfo } from './types';
import nhr_1 from '../../shared/assets/img/nhr_1.webp';
import nhr_2 from '../../shared/assets/img/nhr_2.webp';
import vpm from '../../shared/assets/img/vpm.jpg';
import mkm_1 from '../../shared/assets/img/mkm_1.webp';

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
    key: 'vpm',
    images: [vpm],
    socialNetworks: [
      {
        link: 'https://www.linkedin.com/in/viktoriia-pitsan-4426a238b/',
        icon: SocialNetworkEnum.LINKEDIN,
      },
      {
        link: 'https://github.com/ViktoriiaPitsan',
        icon: SocialNetworkEnum.GITHUB,
      },
      {
        link: 'https://t.me/Pitsan_Viktoriia',
        icon: SocialNetworkEnum.TELEGRAM,
      },
    ],
  },

  {
    key: 'mkm',
    images: [mkm_1],
    socialNetworks: [
      {
        link: 'https://www.linkedin.com/in/marina-kramarchuk-5a009b333/',
        icon: SocialNetworkEnum.LINKEDIN,
      },
      {
        link: 'https://github.com/MarinaKramarchuk',
        icon: SocialNetworkEnum.GITHUB,
      },
      {
        link: 'https://t.me/mar_kram',
        icon: SocialNetworkEnum.TELEGRAM,
      },
    ],
  },
];
