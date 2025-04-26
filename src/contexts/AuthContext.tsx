
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

type AuthContextType = {
  isLoggedIn: boolean;
  youtubeApiKey: string | null;
  setYoutubeApiKey: (key: string) => void;
  logout: () => void;
  needsApiKey: boolean;
  setNeedsApiKey: (value: boolean) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [youtubeApiKey, setYoutubeApiKey] = useState<string | null>(null);
  const [needsApiKey, setNeedsApiKey] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loginStatus = localStorage.getItem("isLoggedIn");
    const savedApiKey = localStorage.getItem("youtubeApiKey");
    
    if (loginStatus === "true") {
      setIsLoggedIn(true);
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
    setIsLoggedIn(false);
    navigate("/login");
  };

  const value = {
    isLoggedIn,
    youtubeApiKey,
    setYoutubeApiKey: handleSetYoutubeApiKey,
    logout,
    needsApiKey,
    setNeedsApiKey
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
