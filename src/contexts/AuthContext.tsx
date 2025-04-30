
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { User as SupabaseUser, Session } from '@supabase/supabase-js';
import { subscriptionService, SubscriptionDetails } from '@/services/subscription';

// Define user type
type User = {
  name: string;
  id: string;
};

type AuthContextType = {
  isLoggedIn: boolean;
  youtubeApiKey: string | null;
  setYoutubeApiKey: (key: string) => void;
  logout: () => void;
  needsApiKey: boolean;
  setNeedsApiKey: (value: boolean) => void;
  user: User | null;
  session: Session | null;
  subscription: SubscriptionDetails | null;
  checkSubscription: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [youtubeApiKey, setYoutubeApiKey] = useState<string | null>(null);
  const [needsApiKey, setNeedsApiKey] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [subscription, setSubscription] = useState<SubscriptionDetails | null>(null);
  const navigate = useNavigate();

  // Function to check subscription status
  const checkSubscription = async () => {
    if (!isLoggedIn) return;
    
    try {
      const subscriptionDetails = await subscriptionService.getCurrentSubscription();
      if (subscriptionDetails) {
        setSubscription(subscriptionDetails);
      }
    } catch (error) {
      console.error("Error checking subscription:", error);
    }
  };

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, sessionData) => {
        console.log("Auth state changed:", event);
        
        if (event === 'SIGNED_IN' && sessionData) {
          // User signed in
          const userId = sessionData.user.id;
          localStorage.setItem("userId", userId);
          localStorage.setItem("isLoggedIn", "true");
          
          // Get user details from Supabase if needed
          const userName = sessionData.user.user_metadata?.name || "Usuário";
          localStorage.setItem("userName", userName);
          
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
          } else {
            setNeedsApiKey(true);
          }
        } else if (event === 'SIGNED_OUT') {
          // User signed out
          localStorage.removeItem("isLoggedIn");
          localStorage.removeItem("userName");
          localStorage.removeItem("userId");
          setIsLoggedIn(false);
          setUser(null);
          setSession(null);
          setSubscription(null);
        }
      }
    );

    // THEN check for existing session
    const initializeAuth = async () => {
      try {
        // Check if user has an existing session
        const { data: { session: existingSession } } = await supabase.auth.getSession();
        
        if (existingSession) {
          setSession(existingSession);
          setIsLoggedIn(true);
          
          setUser({ 
            name: existingSession.user.user_metadata?.name || "Usuário",
            id: existingSession.user.id 
          });
          
          // Check for API key in local storage
          const savedApiKey = localStorage.getItem("youtubeApiKey");
          if (savedApiKey) {
            setYoutubeApiKey(savedApiKey);
          } else {
            setNeedsApiKey(true);
          }
          
          // Check subscription
          await checkSubscription();
        } else {
          // Not logged in, check current route
          const isPublicRoute = 
            window.location.pathname === '/landing' || 
            window.location.pathname === '/login' || 
            window.location.pathname === '/' ||
            window.location.pathname === '/subscribe';
            
          // Redirect to login if not on a public route and not logged in
          if (!isPublicRoute) {
            navigate('/login');
          }
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
      }
    };

    initializeAuth();

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  const handleSetYoutubeApiKey = (key: string) => {
    setYoutubeApiKey(key);
    localStorage.setItem("youtubeApiKey", key);
    setNeedsApiKey(false);
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("userName");
      localStorage.removeItem("userId");
      setIsLoggedIn(false);
      setUser(null);
      setSession(null);
      setSubscription(null);
      navigate("/login");
    } catch (error) {
      console.error("Error during logout:", error);
      
      // Fallback manual logout if Supabase auth fails
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("userName");
      localStorage.removeItem("userId");
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

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
