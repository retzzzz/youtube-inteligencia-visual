
import React, { useEffect } from "react";
import { AuthContext } from '@/contexts/AuthContext';
import { useAuthState } from '@/hooks/useAuthState';
import { useSubscription } from '@/hooks/useSubscription';
import { useApiKeyManagement } from '@/hooks/useApiKeyManagement';
import { useAuthenticationHandlers } from '@/hooks/useAuthenticationHandlers';
import { useAuthInitialization } from '@/hooks/useAuthInitialization';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const {
    isLoggedIn, setIsLoggedIn,
    user, setUser,
    session, setSession
  } = useAuthState();

  const {
    subscription, setSubscription, checkSubscription
  } = useSubscription();

  const {
    youtubeApiKey, setYoutubeApiKey,
    needsApiKey, setNeedsApiKey,
    initializeApiKeyState
  } = useApiKeyManagement();

  const { logout } = useAuthenticationHandlers(
    setIsLoggedIn,
    setUser,
    setSession,
    setSubscription
  );

  const { setupAuthListeners, initializeAuth } = useAuthInitialization(
    setIsLoggedIn,
    setUser,
    setSession,
    initializeApiKeyState,
    checkSubscription
  );

  // Handle authentication changes
  useEffect(() => {
    let authSubscription: { unsubscribe: () => void } = { unsubscribe: () => {} };

    // Set up auth state listener FIRST
    authSubscription = setupAuthListeners();

    // THEN check for existing session
    initializeAuth();

    return () => {
      if (authSubscription) {
        authSubscription.unsubscribe();
      }
    };
  }, [setupAuthListeners, initializeAuth]);

  const value = {
    isLoggedIn,
    youtubeApiKey,
    setYoutubeApiKey,
    logout,
    needsApiKey,
    setNeedsApiKey,
    user,
    session,
    subscription,
    checkSubscription: () => checkSubscription(isLoggedIn),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
