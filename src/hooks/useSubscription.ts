
import { useState, useCallback } from 'react';
import { SubscriptionDetails, subscriptionService } from '@/services/subscription';

export const useSubscription = () => {
  const [subscription, setSubscription] = useState<SubscriptionDetails | null>(null);

  // Function to check subscription status
  const checkSubscription = useCallback(async (isLoggedIn: boolean) => {
    if (!isLoggedIn) return null;
    
    try {
      console.log("Checking subscription status...");
      const subscriptionDetails = await subscriptionService.getCurrentSubscription();
      console.log("Subscription details retrieved:", subscriptionDetails);
      
      setSubscription(subscriptionDetails);
      
      // If no subscription data, create a default trial
      if (!subscriptionDetails) {
        console.log("No subscription found, creating default trial");
        const now = new Date();
        const trialEnd = new Date(now);
        trialEnd.setDate(now.getDate() + 7); // 7 days trial
        
        const defaultTrial = {
          isActive: true,
          isTrialing: true,
          trialEnd: trialEnd,
          subscriptionEnd: null,
          planName: "Trial",
          price: 0,
          trialStartDate: now
        };
        
        setSubscription(defaultTrial);
        return defaultTrial;
      }
      
      return subscriptionDetails;
    } catch (error) {
      console.error("Error checking subscription:", error);
      
      // Set default trial state even in case of error
      console.log("Setting default trial subscription due to error");
      const now = new Date();
      const trialEnd = new Date(now);
      trialEnd.setDate(now.getDate() + 7);
      
      const defaultTrial = {
        isActive: true,
        isTrialing: true,
        trialEnd: trialEnd,
        subscriptionEnd: null,
        planName: "Trial",
        price: 0,
        trialStartDate: now
      };
      
      setSubscription(defaultTrial);
      return defaultTrial;
    }
  }, []);

  return {
    subscription,
    setSubscription,
    checkSubscription
  };
};
