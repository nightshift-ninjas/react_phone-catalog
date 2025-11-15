import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  limit,
  startAfter,
  addDoc,
  updateDoc,
  deleteDoc,
  type DocumentData,
  QueryConstraint,
  where,
} from "firebase/firestore";

import { db } from "./firebase";

export const firestoreClient = {
  // Fetch a single document by ID
  async getDocById<T>(path: string, id: string): Promise<T | null> {
    const ref = doc(db, path, id);
    const snap = await getDoc(ref);
    return snap.exists() ? ({ id: snap.id, ...snap.data() } as T) : null;
  },

  // Fetch whole collection
  async getCollection<T>(path: string): Promise<T[]> {
    const ref = collection(db, path);
    const snap = await getDocs(ref);

    return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as T[];
  },

  // Fetch collection by field
  async getCollectionByField<T>(
    path: string,
    field: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value: any
  ): Promise<T[]> {
    const ref = collection(db, path);

    const q = query(ref, where(field, "==", value));

    const snap = await getDocs(q);

    return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as T[];
  },

  // Paginated collection
  async getCollectionPaginated<T>(
    path: string,
    pageSize: number = 10,
    lastDocSnapshot?: DocumentData | null
  ) {
    const ref = collection(db, path);

    const constraints: QueryConstraint[] = [limit(pageSize)];

    if (lastDocSnapshot) {
      constraints.push(startAfter(lastDocSnapshot));
    }

    const q = query(ref, ...constraints);
    const snap = await getDocs(q);

    const data = snap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as T[];

    return {
      data,
      lastDoc: snap.docs[snap.docs.length - 1] ?? null,
    };
  },

  // Create document
  async createDoc<T>(path: string, data: T) {
    const ref = collection(db, path);
    return await addDoc(ref, data as DocumentData);
  },

  // Update by ID
  async updateDocById<T>(path: string, id: string, data: Partial<T>) {
    const ref = doc(db, path, id);
    return await updateDoc(ref, data as DocumentData);
  },

  // Delete by ID
  async deleteDocById(path: string, id: string) {
    const ref = doc(db, path, id);
    return await deleteDoc(ref);
  },
};
