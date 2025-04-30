
import { useState } from 'react';
import { Session } from '@supabase/supabase-js';
import { User } from '@/types/auth';
import { SubscriptionDetails } from '@/services/subscription';
import { getStoredApiKey } from '@/utils/authUtils';

export const useAuthState = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [youtubeApiKey, setYoutubeApiKey] = useState<string | null>(getStoredApiKey());
  const [needsApiKey, setNeedsApiKey] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [subscription, setSubscription] = useState<SubscriptionDetails | null>(null);

  return {
    // State
    isLoggedIn,
    setIsLoggedIn,
    youtubeApiKey,
    setYoutubeApiKey,
    needsApiKey,
    setNeedsApiKey,
    user,
    setUser,
    session,
    setSession,
    subscription,
    setSubscription
  };
};
