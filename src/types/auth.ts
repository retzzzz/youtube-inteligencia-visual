
import { Session } from '@supabase/supabase-js';
import { SubscriptionDetails } from '@/services/subscription';

// Define user type
export type User = {
  name: string;
  id: string;
};

export type AuthContextType = {
  isLoggedIn: boolean;
  youtubeApiKey: string | null;
  setYoutubeApiKey: (key: string) => void;
  logout: () => void;
  needsApiKey: boolean;
  setNeedsApiKey: (value: boolean) => void;
  user: User | null;
  session: Session | null;
  subscription: SubscriptionDetails | null;
  checkSubscription: () => Promise<SubscriptionDetails | null>;
};
