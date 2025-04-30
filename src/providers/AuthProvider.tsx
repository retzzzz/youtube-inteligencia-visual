
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { AuthContext } from '@/contexts/AuthContext';
import { useAuthState } from '@/hooks/useAuthState';
import { 
  saveUserToLocalStorage, 
  clearUserFromLocalStorage, 
  saveApiKeyToLocalStorage, 
  fetchSubscriptionDetails,
  createUserFromSession
} from '@/utils/authUtils';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const {
    isLoggedIn, setIsLoggedIn,
    youtubeApiKey, setYoutubeApiKey,
    needsApiKey, setNeedsApiKey,
    user, setUser,
    session, setSession,
    subscription, setSubscription
  } = useAuthState();

  // Function to check subscription status
  const checkSubscription = async () => {
    if (!isLoggedIn) return;
    
    const subscriptionDetails = await fetchSubscriptionDetails();
    if (subscriptionDetails) {
      setSubscription(subscriptionDetails);
    }
  };

  // Handle authentication changes
  useEffect(() => {
    let authSubscription: { unsubscribe: () => void } = { unsubscribe: () => {} };

    // Set up auth state listener FIRST
    try {
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (event, sessionData) => {
          console.log("Auth state changed:", event);
          
          if (sessionData) {
            // User signed in or session updated
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
            await checkSubscription().catch(console.error);
            
            // Get API key from local storage if available
            const savedApiKey = localStorage.getItem("youtubeApiKey");
            if (savedApiKey) {
              setYoutubeApiKey(savedApiKey);
              setNeedsApiKey(false);
            } else {
              setNeedsApiKey(true);
            }

            // Only redirect to dashboard from login page
            if (window.location.pathname === '/login' || window.location.pathname === '/') {
              if (savedApiKey) {
                navigate('/dashboard');
              }
              // Se não tem API key salva, o ApiKeyDialog será mostrado
              // e cuidará do redirecionamento após a definição da chave
            }
          } else if (event === 'SIGNED_OUT') {
            // User signed out
            clearUserFromLocalStorage();
            setIsLoggedIn(false);
            setUser(null);
            setSession(null);
            setSubscription(null);
            
            // Redirect to login page when signed out
            navigate("/login");
          }
        }
      );
      authSubscription = subscription;
    } catch (error) {
      console.error("Error setting up auth state change listener:", error);
    }

    // THEN check for existing session
    const initializeAuth = async () => {
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
          
          // Check for API key in local storage
          const savedApiKey = localStorage.getItem("youtubeApiKey");
          if (savedApiKey) {
            setYoutubeApiKey(savedApiKey);
            setNeedsApiKey(false);
          } else {
            setNeedsApiKey(true);
          }
          
          // Check subscription
          await checkSubscription();
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
      }
    };

    initializeAuth();

    return () => {
      if (authSubscription) {
        authSubscription.unsubscribe();
      }
    };
  }, [navigate, setIsLoggedIn, setNeedsApiKey, setSession, setSubscription, setUser, setYoutubeApiKey]);

  const handleSetYoutubeApiKey = (key: string) => {
    setYoutubeApiKey(key);
    saveApiKeyToLocalStorage(key);
    setNeedsApiKey(false);
  };

  const logout = async () => {
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
      
      // Fallback manual logout if Supabase auth fails
      clearUserFromLocalStorage();
      setIsLoggedIn(false);
      setUser(null);
      setSession(null);
      setSubscription(null);
      navigate("/login");
    }
  };

  const value = {
    isLoggedIn,
    youtubeApiKey,
    setYoutubeApiKey: handleSetYoutubeApiKey,
    logout,
    needsApiKey,
    setNeedsApiKey,
    user,
    session,
    subscription,
    checkSubscription,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
