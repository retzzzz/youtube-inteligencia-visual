
import { subscriptionService } from '@/services/subscription';
import { supabase } from '@/lib/supabase';
import { User } from '@/types/auth';

/**
 * Save user data to local storage
 */
export const saveUserToLocalStorage = (userId: string, userName: string) => {
  localStorage.setItem("userId", userId);
  localStorage.setItem("isLoggedIn", "true");
  localStorage.setItem("userName", userName);
};

/**
 * Remove user data from local storage
 */
export const clearUserFromLocalStorage = () => {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("userName");
  localStorage.removeItem("userId");
};

/**
 * Get YouTube API key from local storage
 */
export const getStoredApiKey = (): string | null => {
  return localStorage.getItem("youtubeApiKey");
};

/**
 * Save YouTube API key to local storage
 */
export const saveApiKeyToLocalStorage = (key: string): void => {
  localStorage.setItem("youtubeApiKey", key);
};

/**
 * Check user's subscription status
 */
export const fetchSubscriptionDetails = async () => {
  try {
    return await subscriptionService.getCurrentSubscription();
  } catch (error) {
    console.error("Error checking subscription:", error);
    return null;
  }
};

/**
 * Create a user object from Supabase session
 */
export const createUserFromSession = (session: Session | null): User | null => {
  if (!session) return null;

  const userName = session.user.user_metadata?.name || "Usuário";
  return {
    name: userName,
    id: session.user.id
  };
};
