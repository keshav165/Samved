import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

// Define our user metadata type
type UserMetadata = {
  name?: string;
  role?: string;
  [key: string]: any;
};

// Define the shape of the user object we'll use in our app
interface AppUser {
  id: string;
  email?: string;
  user_metadata?: UserMetadata;
}

type AuthContextType = {
  user: AppUser | null;
  loading: boolean;
  isAuthenticated: boolean;
};

// Helper function to safely extract user data
const extractUserData = (user: User | null): AppUser | null => {
  if (!user) return null;
  
  // Safely access user properties with type assertions
  const userId = (user as any).id || '';
  const userEmail = (user as any).email || undefined;
  const userMetadata = (user as any).user_metadata || {};
  
  return {
    id: userId,
    email: userEmail,
    user_metadata: userMetadata
  };
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);
  const isAuthenticated = !!user;

  // Fetch user role from profiles table if not in user_metadata
  const fetchUserRole = async (userId: string): Promise<string | null> => {
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', userId)
        .single();

      if (error) throw error;
      return (profile as any)?.role || null;
    } catch (error) {
      console.error('Error fetching user role:', error);
      return null;
    }
  };

  // Process user data and fetch role if needed
  const processUserData = async (user: User | null): Promise<AppUser | null> => {
    if (!user) return null;
    
    const userData = extractUserData(user);
    if (!userData) return null;

    // If we already have the role, return the user data as is
    if (userData.user_metadata?.role) {
      return userData;
    }

    // Otherwise, fetch the role from the profiles table
    const role = await fetchUserRole(userData.id);
    if (role) {
      return {
        ...userData,
        user_metadata: {
          ...userData.user_metadata,
          role
        }
      };
    }

    return userData;
  };

  // Handle auth state changes
  const handleAuthChange = async (session: any) => {
    try {
      if (session?.user) {
        const userData = await processUserData(session.user);
        setUser(userData);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Error handling auth change:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial session check
    const getInitialSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        await handleAuthChange(session);
      } catch (error) {
        console.error('Error getting initial session:', error);
        setUser(null);
        setLoading(false);
      }
    };

    getInitialSession();

    // Subscribe to auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        await handleAuthChange(session);
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
