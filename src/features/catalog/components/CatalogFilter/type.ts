export enum ProductSortTypes {
  NAME_ASC = 'name_asc',
  NAME_DESC = 'name_desc',
  PRICE_ASC = 'price_asc',
  PRICE_DESC = 'price_desc',
  DISCOUNT_ASC = 'discount_asc',
  DISCOUNT_DESC = 'discount_desc',
}

export const ProductItemsPerPage = {
  THIRTY: 30,
  FORTY: 40,
  FIFTY: 50,
  SIXTY: 60,
} as const;