
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { clearUserFromLocalStorage } from '@/utils/authUtils';

export const useAuthenticationHandlers = (
  setIsLoggedIn: (value: boolean) => void,
  setUser: (user: any) => void,
  setSession: (session: any) => void,
  setSubscription: (subscription: any) => void
) => {
  const navigate = useNavigate();

  const logout = useCallback(async () => {
    try {
      await supabase.auth.signOut();
      clearUserFromLocalStorage();
      setIsLoggedIn(false);
      setUser(null);
      setSession(null);
      setSubscription(null);
      navigate("/login");
    } catch (error) {
      console.error("Error during logout:", error);
      
      // Fallback for manual logout if Supabase authentication fails
      clearUserFromLocalStorage();
      setIsLoggedIn(false);
      setUser(null);
      setSession(null);
      setSubscription(null);
      navigate("/login");
    }
  }, [navigate, setIsLoggedIn, setUser, setSession, setSubscription]);

  return {
    logout
  };
};
