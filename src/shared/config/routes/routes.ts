export const ROUTES = {
  root: '/:lng',

  home: '',
  catalog: 'catalog',
  catalogCategory: 'catalog/:category',
  productDetail: 'catalog/:category/product/:id',

  cart: 'cart',
  favorite: 'favorite',
  contacts: 'contacts',
  creators: 'creators',
  rights: 'rights',
  checkout: 'checkout',
  profile: 'profile',

  auth: 'auth',
  login: 'auth/login',
  signup: 'auth/signup',
} as const;
