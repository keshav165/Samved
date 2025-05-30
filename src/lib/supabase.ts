import { createClient } from '@supabase/supabase-js/dist/main/index.js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Auth functions
export const signInWithEmail = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};

export const signUpWithEmail = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

// Database functions
export const fetchData = async (table: string) => {
  const { data, error } = await supabase.from(table).select('*');
  return { data, error };
};

export const insertData = async (table: string, data: any) => {
  const { data: insertedData, error } = await supabase
    .from(table)
    .insert([data])
    .select();
  return { data: insertedData, error };
};

export const updateData = async (table: string, id: string, data: any) => {
  const { data: updatedData, error } = await supabase
    .from(table)
    .update(data)
    .eq('id', id)
    .select();
  return { data: updatedData, error };
};

export const deleteData = async (table: string, id: string) => {
  const { error } = await supabase.from(table).delete().eq('id', id);
  return { error };
};
