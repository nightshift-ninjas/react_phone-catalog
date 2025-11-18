export enum ProductSortTypes {
  NAME_ASC = 'name_asc',
  NAME_DESC = 'name_desc',
  PRICE_ASC = 'price_asc',
  PRICE_DESC = 'price_desc',
  DISCOUNT_ASC = 'discount_asc',
  DISCOUNT_DESC = 'discount_desc',
}

export const ProductSortLabels: Record<ProductSortTypes, string> = {
  [ProductSortTypes.NAME_ASC]: 'Name Ascending',
  [ProductSortTypes.NAME_DESC]: 'Name Descending',
  [ProductSortTypes.PRICE_ASC]: 'Price Ascending',
  [ProductSortTypes.PRICE_DESC]: 'Price Descending',
  [ProductSortTypes.DISCOUNT_ASC]: 'Discount Ascending',
  [ProductSortTypes.DISCOUNT_DESC]: 'Discount Descending',
};

export const ProductItemsPerPage = {
  FIVE: 5,
  TEN: 10,
  FIFTEEN: 15,
  TWENTY: 20,
  TWENTY_FIVE: 25,
  THIRTY: 30,
} as const;