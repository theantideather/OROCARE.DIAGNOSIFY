import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  OAuthProvider,
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  type User
} from 'firebase/auth';
import { FIREBASE_CONFIG } from './config';

class FirebaseService {
  private static instance: FirebaseService;
  private auth;
  private googleProvider;
  private appleProvider;

  private constructor() {
    const app = initializeApp(FIREBASE_CONFIG);
    this.auth = getAuth(app);
    this.googleProvider = new GoogleAuthProvider();
    this.appleProvider = new OAuthProvider('apple.com');
  }

  static getInstance(): FirebaseService {
    if (!FirebaseService.instance) {
      FirebaseService.instance = new FirebaseService();
    }
    return FirebaseService.instance;
  }

  async signInWithGoogle(): Promise<User> {
    try {
      const result = await signInWithPopup(this.auth, this.googleProvider);
      return result.user;
    } catch (error: any) {
      console.error('Google sign-in error:', error);
      throw error;
    }
  }

  async signInWithApple(): Promise<User> {
    try {
      const result = await signInWithPopup(this.auth, this.appleProvider);
      return result.user;
    } catch (error: any) {
      console.error('Apple sign-in error:', error);
      throw error;
    }
  }

  async signOut(): Promise<void> {
    try {
      await firebaseSignOut(this.auth);
    } catch (error: any) {
      console.error('Sign out error:', error);
      throw error;
    }
  }

  onAuthStateChange(callback: (user: User | null) => void): () => void {
    return onAuthStateChanged(this.auth, callback);
  }

  getCurrentUser(): User | null {
    return this.auth.currentUser;
  }
}

export const firebaseService = FirebaseService.getInstance();