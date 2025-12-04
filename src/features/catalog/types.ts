import { Category } from '../../services/product';

export const CategoryLabels: Record<Category, string> = {
  [Category.PHONES]: 'categories.phones',
  [Category.TABLETS]: 'categories.tablets',
  [Category.Accessory]: 'categories.accessories'
};
