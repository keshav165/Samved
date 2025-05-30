import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

type UserWithRole = User & {
  user_metadata?: {
    name?: string;
    role?: string;
  };
};

type AuthContextType = {
  user: UserWithRole | null;
  loading: boolean;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserWithRole | null>(null);
  const [loading, setLoading] = useState(true);
  const isAuthenticated = !!user;

  const fetchUserWithRole = async (user: User | null) => {
    if (!user) return null;

    try {
      // First check if we have the role in user_metadata
      if (user.user_metadata?.role) {
        return user;
      }

      // If not, fetch from profiles table
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      if (error) throw error;

      // Update user_metadata with the role from profiles
      const updatedUser = {
        ...user,
        user_metadata: {
          ...user.user_metadata,
          role: profile.role
        }
      };

      return updatedUser;
    } catch (error) {
      console.error('Error fetching user role:', error);
      return user; // Return the original user if there's an error
    }
  };

  useEffect(() => {
    // Check active sessions and set the user
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const userWithRole = await fetchUserWithRole(session.user);
        setUser(userWithRole);
      } else {
        setUser(null);
      }
      setLoading(false);
    };

    getSession();

    // Listen for changes in authentication state
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event: string, session: { user: User | null } | null) => {
        if (session?.user) {
          const userWithRole = await fetchUserWithRole(session.user);
          setUser(userWithRole);
        } else {
          setUser(null);
        }
        setLoading(false);
      }
    );

    // Cleanup subscription on unmount
    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};
