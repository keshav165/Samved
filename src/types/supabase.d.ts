import { User as SupabaseUser } from '@supabase/supabase-js';

declare module '@supabase/supabase-js' {
  interface UserMetadata {
    name?: string;
    // Add other custom fields as needed
  }

  interface User {
    user_metadata?: UserMetadata;
  }
}

declare global {
  namespace Supabase {
    interface UserMetadata {
      name?: string;
    }
  }
}
