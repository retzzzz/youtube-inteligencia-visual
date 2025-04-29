
import { createClient } from '@supabase/supabase-js';

// Utilizar as credenciais fornecidas
const supabaseUrl = 'https://idhtutcjkniszcsoyyrj.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlkaHR1dGNqa25pc3pjc295eXJqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU5MjM2MjcsImV4cCI6MjA2MTQ5OTYyN30.7DvUoP1Cdfhed6iynfrtA4_4GhvjEypae28XqORdhn4';

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
      signUp: () => Promise.resolve({ data: null, error: { message: 'Auth disabled in mock mode' } }),
      signInWithOAuth: () => Promise.resolve({ data: null, error: { message: 'OAuth disabled in mock mode' } }),
      resetPasswordForEmail: () => Promise.resolve({ data: null, error: { message: 'Password reset disabled in mock mode' } })
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
  // Agora nós temos credenciais Supabase válidas
  try {
    return createClient(supabaseUrl, supabaseAnonKey);
  } catch (error) {
    console.error('Error creating Supabase client:', error);
    console.info('Falling back to mock client. Authentication features will be disabled.');
    return createMockClient();
  }
})();
