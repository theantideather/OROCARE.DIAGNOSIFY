import React from 'react';
import { useAuth } from '../../hooks/useAuth';

export function AuthButtons() {
  const { user, loading, error, signInWithGoogle, signInWithApple, signOut } = useAuth();

  if (loading) {
    return (
      <div className="animate-pulse bg-gray-200 h-10 w-32 rounded-lg"></div>
    );
  }

  if (user) {
    return (
      <div className="flex items-center gap-4">
        <img
          src={user.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.uid}`}
          alt={user.displayName || 'User'}
          className="w-8 h-8 rounded-full border-2 border-black"
        />
        <button
          onClick={signOut}
          className="px-4 py-2 bg-red-600 text-white rounded-lg
                   border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
                   hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                   transition-all"
        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <div className="flex gap-2">
      <button
        onClick={signInWithGoogle}
        className="px-4 py-2 bg-white text-gray-800 rounded-lg
                 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
                 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                 transition-all flex items-center gap-2"
      >
        <img 
          src="https://www.google.com/favicon.ico" 
          alt="Google"
          className="w-4 h-4"
        />
        Sign in with Google
      </button>

      <button
        onClick={signInWithApple}
        className="px-4 py-2 bg-black text-white rounded-lg
                 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
                 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                 transition-all flex items-center gap-2"
      >
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
          <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z"/>
        </svg>
        Sign in with Apple
      </button>
    </div>
  );
}