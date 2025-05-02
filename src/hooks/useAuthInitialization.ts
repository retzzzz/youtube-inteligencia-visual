
import { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { saveUserToLocalStorage, createUserFromSession } from '@/utils/authUtils';

export const useAuthInitialization = (
  setIsLoggedIn: (value: boolean) => void,
  setUser: (user: any) => void,
  setSession: (session: any) => void,
  initializeApiKeyState: () => void,
  checkSubscription: (isLoggedIn: boolean) => Promise<any>
) => {
  const navigate = useNavigate();

  const setupAuthListeners = useCallback(() => {
    try {
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (event, sessionData) => {
          console.log("Auth state changed:", event);
          
          if (sessionData) {
            // User is logged in or session is updated
            const userId = sessionData.user.id;
            const userName = sessionData.user.user_metadata?.name || "Usuário";
            
            saveUserToLocalStorage(userId, userName);
            
            setUser({
              name: userName,
              id: userId
            });
            
            setSession(sessionData);
            setIsLoggedIn(true);
            
            // Check subscription status after login
            await checkSubscription(true);
            
            // Initialize API key state
            initializeApiKeyState();

            // If user is on login page or root, redirect to dashboard
            if (window.location.pathname === '/login' || window.location.pathname === '/') {
              navigate('/dashboard');
            }
          } else if (event === 'SIGNED_OUT') {
            // User logged out
            setIsLoggedIn(false);
            setUser(null);
            setSession(null);
            
            // Redirect to login page when logged out
            navigate("/login");
          }
        }
      );
      
      return subscription;
    } catch (error) {
      console.error("Error setting up auth state listener:", error);
      return { unsubscribe: () => {} };
    }
  }, [navigate, setIsLoggedIn, setUser, setSession, checkSubscription, initializeApiKeyState]);

  const initializeAuth = useCallback(async () => {
    try {
      // Check if user has an existing session
      const { data, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error("Error getting session:", error);
        return;
      }
      
      if (data.session) {
        setSession(data.session);
        setIsLoggedIn(true);
        
        setUser(createUserFromSession(data.session));
        
        // Initialize API key state
        initializeApiKeyState();
        
        // Check subscription
        await checkSubscription(true);
      } else {
        console.log("No active session found");
      }
    } catch (error) {
      console.error("Error initializing authentication:", error);
    }
  }, [setSession, setIsLoggedIn, setUser, initializeApiKeyState, checkSubscription]);

  return {
    setupAuthListeners,
    initializeAuth
  };
};
