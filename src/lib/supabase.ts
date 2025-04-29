
import { createClient } from '@supabase/supabase-js';

// Get environment variables with fallbacks
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Create a mock client for when credentials are missing
const createMockClient = () => {
  console.warn('Using mock Supabase client. Authentication features will not work.');
  
  // Return a minimal mock implementation that won't break public routes
  return {
    auth: {
      getSession: () => Promise.resolve({ data: { session: null } }),
      onAuthStateChange: () => ({ 
        data: { subscription: { unsubscribe: () => {} } } 
      }),
      signOut: () => Promise.resolve({ error: null })
    },
    from: () => ({
      select: () => ({
        eq: () => ({
          single: () => Promise.resolve({ data: null, error: null })
        })
      })
    })
  };
};

// Create and export the Supabase client
export const supabase = !supabaseUrl || !supabaseAnonKey 
  ? createMockClient() 
  : createClient(supabaseUrl, supabaseAnonKey);

// Log warning for missing environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables. Check your .env file.');
  console.info('Public routes will work, but authentication features will be disabled.');
}
