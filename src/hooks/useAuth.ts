import { useState, useEffect } from 'react';
import { type User } from 'firebase/auth';
import { authService } from '../services/auth/authService';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = authService.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      setError(null);
      await authService.signInWithGoogle();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const signOut = async () => {
    try {
      setError(null);
      await authService.signOut();
    } catch (err: any) {
      setError(err.message);
    }
  };

  return {
    user,
    loading,
    error,
    signInWithGoogle,
    signOut
  };
}