import { productRepository } from "./product.repository";
import type { Category, Product } from "./product.types";
import type { DocumentData } from "firebase/firestore";

export const productService = {
  async fetchProductById(id: Product["id"]): Promise<Product> {
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

  async updateProduct(id: Product["id"], data: Partial<Product>) {
    return productRepository.update(id, data);
  },

  async fetchPaginated(pageSize: number, lastDoc?: DocumentData | null) {
    return productRepository.getPaginated(pageSize, lastDoc);
  },
};
