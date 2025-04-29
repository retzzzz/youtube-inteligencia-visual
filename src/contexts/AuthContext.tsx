
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { User as SupabaseUser } from '@supabase/supabase-js';
import { subscriptionService, SubscriptionDetails } from '@/services/subscription';

// Define user type
type User = {
  name: string;
  id: string;
  // Add other user properties as needed
};

type SubscriptionStatus = {
  isActive: boolean;
  isTrialing: boolean;
  trialEnd: Date | null;
  subscriptionEnd: Date | null;
};

type AuthContextType = {
  isLoggedIn: boolean;
  youtubeApiKey: string | null;
  setYoutubeApiKey: (key: string) => void;
  logout: () => void;
  needsApiKey: boolean;
  setNeedsApiKey: (value: boolean) => void;
  user: User | null;
  subscription: SubscriptionDetails | null;
  checkSubscription: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [youtubeApiKey, setYoutubeApiKey] = useState<string | null>(null);
  const [needsApiKey, setNeedsApiKey] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
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
    // Only setup auth related features if we're not on public routes
    const isPublicRoute = 
      window.location.pathname === '/landing' || 
      window.location.pathname === '/login' || 
      window.location.pathname === '/subscribe';
      
    const loginStatus = localStorage.getItem("isLoggedIn");
    const savedApiKey = localStorage.getItem("youtubeApiKey");
    const savedUserName = localStorage.getItem("userName");
    
    if (loginStatus === "true") {
      setIsLoggedIn(true);
      
      // Set user info if available
      if (savedUserName) {
        setUser({ 
          name: savedUserName,
          id: localStorage.getItem("userId") || "" 
        });
      } else {
        setUser({ 
          name: "Usuário",
          id: localStorage.getItem("userId") || "" 
        });
      }
      
      if (savedApiKey) {
        setYoutubeApiKey(savedApiKey);
      } else {
        setNeedsApiKey(true);
      }
      
      // Check subscription status on initial load
      checkSubscription().catch(err => {
        console.error("Failed to check subscription:", err);
      });
    } else if (!isPublicRoute) {
      // Only redirect to login if not on public routes
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    let authListener: { subscription?: { unsubscribe: () => void } } = {};

    try {
      // Set up auth state listener
      const { data } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          if (event === 'SIGNED_IN' && session) {
            // User signed in
            const userId = session.user.id;
            localStorage.setItem("userId", userId);
            localStorage.setItem("isLoggedIn", "true");
            
            // Get user details from Supabase if needed
            const userName = session.user.user_metadata?.name || "Usuário";
            localStorage.setItem("userName", userName);
            
            setUser({
              name: userName,
              id: userId
            });
            
            setIsLoggedIn(true);
            
            // Check subscription status after login
            await checkSubscription().catch(console.error);
          } else if (event === 'SIGNED_OUT') {
            // User signed out
            localStorage.removeItem("isLoggedIn");
            localStorage.removeItem("userName");
            localStorage.removeItem("userId");
            setIsLoggedIn(false);
            setUser(null);
            setSubscription(null);
          }
        }
      );

      authListener = data;

      return () => {
        // Only try to unsubscribe if authListener exists
        if (authListener && authListener.subscription) {
          authListener.subscription.unsubscribe();
        }
      };
    } catch (error) {
      console.error("Error setting up auth listener:", error);
      // Don't break the app if Supabase auth is not available
      return () => {};
    }
  }, []);

  const handleSetYoutubeApiKey = (key: string) => {
    setYoutubeApiKey(key);
    localStorage.setItem("youtubeApiKey", key);
    setNeedsApiKey(false);
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("youtubeApiKey");
      localStorage.removeItem("userName");
      localStorage.removeItem("userId");
      setIsLoggedIn(false);
      setYoutubeApiKey(null);
      setUser(null);
      setSubscription(null);
      navigate("/login");
    } catch (error) {
      console.error("Error during logout:", error);
      
      // Fallback manual logout if Supabase auth fails
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("youtubeApiKey");
      localStorage.removeItem("userName");
      localStorage.removeItem("userId");
      setIsLoggedIn(false);
      setYoutubeApiKey(null);
      setUser(null);
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
