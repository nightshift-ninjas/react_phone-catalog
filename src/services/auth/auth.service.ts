import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  type User,
  updateProfile,
} from 'firebase/auth';
import { auth } from '../../shared/config/firebase';

export const authClient = {
  // Register new user
  async register(email: string, password: string, displayName?: string) {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );

    // Update Firebase Auth profile
    if (displayName) {
      await updateProfile(user, { displayName });
    }

    return user;
  },

  // Login
  async login(email: string, password: string) {
    return await signInWithEmailAndPassword(auth, email, password);
  },

  // Logout
  async logout() {
    return await signOut(auth);
  },

  // Listener for auth state
  onChange(callback: (user: User | null) => void) {
    return onAuthStateChanged(auth, callback);
  },

  // Get current user
  getCurrentUser(): User | null {
    return auth.currentUser;
  },

  // Login with Google
  async loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      return user;
    } catch (error) {
      console.error(`Google login failed: ${error}`);
    }
  },
};
