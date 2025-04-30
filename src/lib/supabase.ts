
import { createClient } from '@supabase/supabase-js';

// Utilizar as credenciais fornecidas
const supabaseUrl = 'https://idhtutcjkniszcsoyyrj.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlkaHR1dGNqa25pc3pjc295eXJqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU5MjM2MjcsImV4cCI6MjA2MTQ5OTYyN30.7DvUoP1Cdfhed6iynfrtA4_4GhvjEypae28XqORdhn4';

// Create and export the Supabase client with better error handling and explicit auth configuration
export const supabase = (() => {
  try {
    return createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        storage: localStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true
      }
    });
  } catch (error) {
    console.error('Erro ao criar cliente Supabase:', error);
    console.info('Caindo para cliente mockado. Recursos de autenticação estarão desativados.');
    
    // Return a more robust mock implementation
    return {
      auth: {
        getSession: () => Promise.resolve({ data: { session: null }, error: null }),
        onAuthStateChange: () => ({ 
          data: { subscription: { unsubscribe: () => {} } },
          error: null
        }),
        signOut: () => Promise.resolve({ error: null }),
        signInWithPassword: () => Promise.resolve({ data: null, error: { message: 'Auth desativado em modo mock' } }),
        signUp: () => Promise.resolve({ data: null, error: { message: 'Auth desativado em modo mock' } }),
        signInWithOAuth: () => Promise.resolve({ data: null, error: { message: 'OAuth desativado em modo mock' } }),
        resetPasswordForEmail: () => Promise.resolve({ data: null, error: { message: 'Redefinição de senha desativada em modo mock' } })
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
  }
})();
