export enum Category {
  PHONES = 'phones',
  TABLETS = 'tablets',
  Accessory = 'accessories',
}

export interface CategoryStats {
  category: Category;
  numberOfModels: number;
}

export interface ProductDescriptionSection {
  title: string;
  text: string[];
}

export interface ProductBase {
  id: string;
  category: Category;
  name: string;
  screen?: string;
  resolution?: string;
  processor?: string;
  ram?: string;
  camera?: string;
  zoom?: string;
  cell?: string[];
  description?: ProductDescriptionSection[];
  color?: string;
  colorsAvailable?: string[];
  capacity?: string;
  capacityAvailable?: string[];
  images?: string[];
  type: string;
  priceRegular: number;
  priceDiscount?: number;
  namespaceId: string;
  year?: number;
}

export interface Phone extends ProductBase {
  category: Category.PHONES;
}

export interface Tablet extends ProductBase {
  category: Category.TABLETS;
}

export interface Accessory extends ProductBase {
  category: Category.Accessory;
}

export type Product = Phone | Tablet | Accessory;
