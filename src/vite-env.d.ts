/// <reference types="vite/client" />

// Extend the Supabase User type to include our custom fields
declare module '@supabase/supabase-js' {
  export interface User {
    email?: string;
    user_metadata?: {
      name?: string;
      // Add other custom fields as needed
    };
  }
}
