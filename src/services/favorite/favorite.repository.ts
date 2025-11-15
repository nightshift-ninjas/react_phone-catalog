import type { User } from "../auth";
import { firestoreClient } from "../../shared/config/firebase";
import type { FavoriteItem, FavoriteItemCreate } from "./favorite.types";

const COLLECTION = "favorites";

export const favoriteRepository = {
  // get all favorite items of a user
  getByUserId(userId: User["id"]): Promise<FavoriteItem[]> {
    return firestoreClient.getCollectionByField<FavoriteItem>(
      COLLECTION,
      "userId",
      userId
    );
  },

  // add a favorite item
  async add(data: FavoriteItemCreate) {
    const ref = await firestoreClient.createDoc<FavoriteItemCreate>(
      COLLECTION,
      data
    );
    return { id: ref.id, ...data } as FavoriteItem;
  },

  // remove a favorite item by document ID
  delete(id: FavoriteItem["id"]) {
    return firestoreClient.deleteDocById(COLLECTION, id);
  },
};
