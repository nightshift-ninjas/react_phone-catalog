export enum Category {
  PHONES = "phones",
  TABLETS = "tablets",
  Accessory = "accessories",
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
}

export interface Phone extends ProductBase {
  category: Category.PHONES;
  itemId?: string;
  fullPrice?: number;
  price?: number;
  year?: number;
  image?: string;
}

export interface Tablet extends ProductBase {
  category: Category.TABLETS;
  namespaceId: string;
  priceRegular: number;
  priceDiscount: number;
}

export interface Accessory extends ProductBase {
  category: Category.Accessory;
  namespaceId: string;
  priceRegular: number;
  priceDiscount: number;
}

export type Product = Phone | Tablet | Accessory;
