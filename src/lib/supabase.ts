
import { createClient } from '@supabase/supabase-js';

// Get environment variables with fallbacks
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Create a more comprehensive mock client
const createMockClient = () => {
  console.warn('Using mock Supabase client. Authentication features will not work.');
  
  // Return a more robust mock implementation
  return {
    auth: {
      getSession: () => Promise.resolve({ data: { session: null }, error: null }),
      onAuthStateChange: () => ({ 
        data: { subscription: { unsubscribe: () => {} } },
        error: null
      }),
      signOut: () => Promise.resolve({ error: null }),
      signInWithPassword: () => Promise.resolve({ data: null, error: { message: 'Auth disabled in mock mode' } }),
      signUp: () => Promise.resolve({ data: null, error: { message: 'Auth disabled in mock mode' } })
    },
    from: (table) => ({
      select: (columns) => ({
        eq: (column, value) => ({
          single: () => Promise.resolve({ data: null, error: null }),
          order: () => ({
            limit: () => Promise.resolve({ data: [], error: null })
          })
        }),
        order: () => ({
          limit: () => Promise.resolve({ data: [], error: null })
        })
      }),
      insert: () => Promise.resolve({ data: null, error: null }),
      update: () => ({
        eq: () => Promise.resolve({ data: null, error: null })
      }),
      delete: () => ({
        eq: () => Promise.resolve({ data: null, error: null })
      })
    })
  };
};

// Create and export the Supabase client with better error handling
export const supabase = (() => {
  // First, check if we have the required credentials
  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Missing Supabase environment variables. Check your .env file.');
    console.info('Public routes will work, but authentication features will be disabled.');
    return createMockClient();
  }
  
  // If we have credentials, create a real client with error handling
  try {
    return createClient(supabaseUrl, supabaseAnonKey);
  } catch (error) {
    console.error('Error creating Supabase client:', error);
    console.info('Falling back to mock client. Authentication features will be disabled.');
    return createMockClient();
  }
})();
