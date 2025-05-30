import { User as SupabaseUser } from '@supabase/supabase-js';

export interface UserMetadata {
  name?: string;
  // Add other custom fields as needed
}

export interface User extends SupabaseUser {
  user_metadata?: UserMetadata;
}
