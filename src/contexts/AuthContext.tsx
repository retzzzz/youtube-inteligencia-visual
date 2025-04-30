
import React, { createContext, useContext } from "react";
import { AuthContextType } from "@/types/auth";
import { AuthProvider } from "@/providers/AuthProvider";

// Create context with undefined default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook for accessing the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Re-export the AuthProvider
export { AuthContext, AuthProvider };
