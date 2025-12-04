export interface UserData {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string; // idk, maybe we will use it later
  createdAt: number;
}

export interface User extends UserData {
  id: string; // ChatGPT says that firestore document id (often same as uid)
}

export type CreateUserDTO = {
  email: string;
  displayName?: string;
};
