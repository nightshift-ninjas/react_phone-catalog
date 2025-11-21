import { firestoreClient } from '../../shared/config/firebase';
import type { Category, Product } from './product.types';

const COLLECTION = 'products';

export const productRepository = {
  getById(id: Product['id']) {
    return firestoreClient.getDocById<Product>(COLLECTION, id);
  },

  getByCategory(category: Category) {
    return firestoreClient.getCollectionByField<Product>(
      COLLECTION,
      'category',
      category,
    );
  },

  getAll() {
    return firestoreClient.getCollection<Product>(COLLECTION);
  },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getPaginated(pageSize: number, lastDoc?: any) {
    return firestoreClient.getCollectionPaginated<Product>(
      COLLECTION,
      pageSize,
      lastDoc,
    );
  },

  update(id: Product['id'], data: Partial<Product>) {
    return firestoreClient.updateDocById<Product>(COLLECTION, id, data);
  },

  getByNamespaceId(namespaceId: string) {
    return firestoreClient.getCollectionByField<Product>(
      COLLECTION,
      'namespaceId',
      namespaceId,
    );
  },
};
