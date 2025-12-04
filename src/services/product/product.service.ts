import { productRepository } from './product.repository';
import { Category, type CategoryStats, type Product } from './product.types';
import type { DocumentData } from 'firebase/firestore';

export const productService = {
  async fetchProductById(id: Product['id']): Promise<Product> {
    const product = await productRepository.getById(id);

    if (!product) {
      throw new Error(`Product with id "${id}" not found`);
    }

    return product;
  },

  async fetchByCategory(category: Category): Promise<Product[]> {
    const products = await productRepository.getByCategory(category);
    return products;
  },

  async fetchAll(): Promise<Product[]> {
    const products = await productRepository.getAll();
    return products;
  },

  async updateProduct(id: Product['id'], data: Partial<Product>) {
    return productRepository.update(id, data);
  },

  async fetchPaginated(pageSize: number, lastDoc?: DocumentData | null) {
    return productRepository.getPaginated(pageSize, lastDoc);
  },

  async getCategoryStats(): Promise<CategoryStats[]> {
    const products = await productRepository.getAll();

    const categoryCounts: Record<Category, number> = {
      [Category.PHONES]: 0,
      [Category.TABLETS]: 0,
      [Category.Accessory]: 0,
    };

    for (const p of products) {
      categoryCounts[p.category]++;
    }

    return Object.entries(categoryCounts).map(([category, numberOfModels]) => ({
      category: category as Category,
      numberOfModels,
    }));
  },

  async fetchByNamespaceId(namespaceId: string): Promise<Product[]> {
    const products = await productRepository.getByNamespaceId(namespaceId);
    return products;
  },
};
