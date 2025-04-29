
import { supabase } from '../lib/supabase';

export interface SubscriptionDetails {
  isActive: boolean;
  isTrialing: boolean;
  trialEnd: Date | null;
  subscriptionEnd: Date | null;
  planName: string;
  price: number;
}

export const subscriptionService = {
  /**
   * Fetch the current user's subscription details
   */
  async getCurrentSubscription(): Promise<SubscriptionDetails | null> {
    const { data: sessionData } = await supabase.auth.getSession();
    
    if (!sessionData.session) {
      return null;
    }
    
    const userId = sessionData.session.user.id;
    const { data, error } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', userId)
      .single();
    
    if (error || !data) {
      console.error("Error fetching subscription:", error);
      return null;
    }
    
    const now = new Date();
    const trialEnd = data.trial_end ? new Date(data.trial_end) : null;
    const subscriptionEnd = data.subscription_end ? new Date(data.subscription_end) : null;
    
    // Check if in trial period
    const isTrialing = trialEnd ? now < trialEnd : false;
    
    // Check if subscription is active
    const isActive = isTrialing || (subscriptionEnd ? now < subscriptionEnd : false);
    
    return {
      isActive,
      isTrialing,
      trialEnd,
      subscriptionEnd,
      planName: data.plan_name,
      price: data.price
    };
  },
  
  /**
   * Start the subscription process
   * This would typically redirect to a payment provider
   */
  async startSubscription() {
    // In a real implementation, this would redirect to a payment processor
    // For now, we'll just log a message
    console.log("Redirecting to payment processor for R$ 69,99/month subscription");
    
    // Return a mock subscription URL
    return {
      url: '/subscribe/checkout'
    };
  },
  
  /**
   * Calculate days remaining in trial or subscription
   */
  getDaysRemaining(endDate: Date | null): number {
    if (!endDate) return 0;
    
    const now = new Date();
    const diffTime = endDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return Math.max(0, diffDays);
  },
  
  /**
   * Format end date to a readable string
   */
  formatEndDate(date: Date | null): string {
    if (!date) return '';
    
    return new Intl.DateTimeFormat('pt-BR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date);
  }
};
