
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase"; // Make sure you've set up this file

// Define user type
type User = {
  name: string;
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
  user: User | null; // Add user property to context type
  subscription: SubscriptionStatus | null;
  checkSubscription: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [youtubeApiKey, setYoutubeApiKey] = useState<string | null>(null);
  const [needsApiKey, setNeedsApiKey] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null); // Add user state
  const [subscription, setSubscription] = useState<SubscriptionStatus | null>(null);
  const navigate = useNavigate();

  // Function to check subscription status
  const checkSubscription = async () => {
    if (!isLoggedIn) return;
    
    try {
      // Query the subscriptions table
      const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user?.id)
        .single();
      
      if (error) {
        console.error("Error fetching subscription:", error);
        return;
      }
      
      if (data) {
        const now = new Date();
        const trialEnd = data.trial_end ? new Date(data.trial_end) : null;
        const subscriptionEnd = data.subscription_end ? new Date(data.subscription_end) : null;
        
        // Check if in trial period
        const isTrialing = trialEnd ? now < trialEnd : false;
        
        // Check if subscription is active
        const isActive = subscriptionEnd ? now < subscriptionEnd : false;
        
        setSubscription({
          isActive: isActive || isTrialing,
          isTrialing,
          trialEnd,
          subscriptionEnd
        });
      } else {
        // User has no subscription record yet
        setSubscription({
          isActive: false,
          isTrialing: false,
          trialEnd: null,
          subscriptionEnd: null
        });
      }
    } catch (error) {
      console.error("Error checking subscription:", error);
    }
  };

  useEffect(() => {
    const loginStatus = localStorage.getItem("isLoggedIn");
    const savedApiKey = localStorage.getItem("youtubeApiKey");
    const savedUserName = localStorage.getItem("userName");
    
    if (loginStatus === "true") {
      setIsLoggedIn(true);
      
      // Set user info if available
      if (savedUserName) {
        setUser({ name: savedUserName });
      } else {
        setUser({ name: "Usuário" }); // Default name if none saved
      }
      
      if (savedApiKey) {
        setYoutubeApiKey(savedApiKey);
      } else {
        setNeedsApiKey(true);
      }
      
      // Check subscription status on initial load
      checkSubscription();
    } else {
      // Only redirect to login if not on the landing page
      if (window.location.pathname !== '/landing') {
        navigate("/login");
      }
    }
  }, [navigate]);

  const handleSetYoutubeApiKey = (key: string) => {
    setYoutubeApiKey(key);
    localStorage.setItem("youtubeApiKey", key);
    setNeedsApiKey(false);
  };

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("youtubeApiKey");
    setIsLoggedIn(false);
    setYoutubeApiKey(null);
    setUser(null);
    setSubscription(null);
    navigate("/login");
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
