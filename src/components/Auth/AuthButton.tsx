import React, { useState, useEffect } from 'react';
import { User, LogOut } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { AuthModal } from './AuthModal';
import type { User as SupabaseUser } from '@supabase/supabase-js';

export function AuthButton() {
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (loading) {
    return (
      <button className="bg-gray-200 text-gray-400 px-4 py-2 rounded-lg
                       border-2 border-black cursor-not-allowed">
        Loading...
      </button>
    );
  }

  if (user) {
    return (
      <button
        onClick={handleSignOut}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg
                 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
                 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                 active:translate-x-0.5 active:translate-y-0.5
                 active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]
                 transition-all flex items-center gap-2"
      >
        <LogOut className="w-5 h-5" />
        <span>Sign Out</span>
      </button>
    );
  }

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="bg-green-600 text-white px-4 py-2 rounded-lg
                 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
                 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                 active:translate-x-0.5 active:translate-y-0.5
                 active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]
                 transition-all flex items-center gap-2"
      >
        <User className="w-5 h-5" />
        <span>Sign In</span>
      </button>

      {showModal && <AuthModal onClose={() => setShowModal(false)} />}
    </>
  );
}