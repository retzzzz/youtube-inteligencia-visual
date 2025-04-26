
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Define user type
type User = {
  name: string;
  // Add other user properties as needed
};

type AuthContextType = {
  isLoggedIn: boolean;
  youtubeApiKey: string | null;
  setYoutubeApiKey: (key: string) => void;
  logout: () => void;
  needsApiKey: boolean;
  setNeedsApiKey: (value: boolean) => void;
  user: User | null; // Add user property to context type
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [youtubeApiKey, setYoutubeApiKey] = useState<string | null>(null);
  const [needsApiKey, setNeedsApiKey] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null); // Add user state
  const navigate = useNavigate();

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
    } else {
      navigate("/login");
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
    navigate("/login");
  };

  const value = {
    isLoggedIn,
    youtubeApiKey,
    setYoutubeApiKey: handleSetYoutubeApiKey,
    logout,
    needsApiKey,
    setNeedsApiKey,
    user, // Add user to the context value
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
