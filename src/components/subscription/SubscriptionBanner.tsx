
import React, { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Clock, CreditCard, CheckCircle, AlertTriangle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { subscriptionService } from '@/services/subscription';
import { useLocation, useNavigate } from 'react-router-dom';

export const SubscriptionBanner: React.FC = () => {
  const { isLoggedIn, subscription, checkSubscription } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Log all parameters from location to debug
  console.log("Full location object:", location);
  
  // Ensure we have subscription data
  useEffect(() => {
    console.log("SubscriptionBanner mounted, current subscription:", subscription);
    
    if (isLoggedIn && !subscription) {
      console.log("No subscription data, checking subscription...");
      checkSubscription();
    }
  }, [isLoggedIn, subscription, checkSubscription]);
  
  // Always log the current subscription state for debugging
  console.log("SubscriptionBanner rendering with:", { 
    isLoggedIn, 
    subscription,
    subscriptionDetails: subscription ? {
      isActive: subscription.isActive,
      isTrialing: subscription.isTrialing,
      trialEnd: subscription.trialEnd,
      daysLeft: subscription.trialEnd ? subscriptionService.getDaysRemaining(subscription.trialEnd) : 'N/A'
    } : 'No subscription'
  });
  
  if (!isLoggedIn) {
    console.log("Not logged in, not showing banner");
    return null;
  }
  
  // Default trial information when subscription data is missing or loading
  if (!subscription) {
    console.log("No subscription data yet, showing default trial banner");
    
    const now = new Date();
    const defaultTrialEnd = new Date(now);
    defaultTrialEnd.setDate(now.getDate() + 7); // Default 7-day trial
    
    return (
      <Alert className="bg-blue-50 border-blue-200 mb-4">
        <Clock className="h-4 w-4 text-blue-500 mr-2" />
        <AlertDescription className="text-blue-700 flex items-center justify-between w-full">
          <span>
            Seu período de avaliação gratuita está ativo
          </span>
          <Button 
            className="ml-2" 
            onClick={() => navigate('/subscribe')}
          >
            <CreditCard className="h-4 w-4 mr-2" />
            Assinar Agora
          </Button>
        </AlertDescription>
      </Alert>
    );
  }
  
  // User is in trial period
  if (subscription.isTrialing) {
    const daysLeft = subscription.trialEnd 
      ? subscriptionService.getDaysRemaining(subscription.trialEnd)
      : 7; // Default value if trialEnd is missing
    
    const formattedDate = subscription.trialEnd 
      ? subscriptionService.formatEndDate(subscription.trialEnd) 
      : '';
    
    console.log("Trial info:", { daysLeft, formattedDate, trialEnd: subscription.trialEnd });
    
    // Show trial banner with days remaining
    return (
      <Alert className="bg-blue-50 border-blue-200 mb-4">
        <Clock className="h-4 w-4 text-blue-500 mr-2" />
        <AlertDescription className="text-blue-700 flex items-center justify-between w-full">
          <span>
            {daysLeft > 0 
              ? `Seu período de avaliação gratuita termina em ${daysLeft} ${daysLeft === 1 ? 'dia' : 'dias'} (${formattedDate})`
              : 'Seu período de avaliação gratuita terminou hoje'}
          </span>
          <Button 
            className="ml-2" 
            onClick={() => navigate('/subscribe')}
          >
            <CreditCard className="h-4 w-4 mr-2" />
            Assinar Agora
          </Button>
        </AlertDescription>
      </Alert>
    );
  }
  
  // Trial expired but still showing as trial
  if (subscription.isTrialing && subscription.trialEnd && 
      subscriptionService.getDaysRemaining(subscription.trialEnd) <= 0) {
    return (
      <Alert className="bg-red-50 border-red-200 mb-4">
        <AlertTriangle className="h-4 w-4 text-red-500 mr-2" />
        <AlertDescription className="text-red-700 flex items-center justify-between w-full">
          <span>Seu período de avaliação gratuita terminou. Assine agora para continuar tendo acesso.</span>
          <Button 
            className="ml-2"
            variant="destructive" 
            size="sm"
            onClick={() => navigate('/subscribe')}
          >
            Assinar Agora
          </Button>
        </AlertDescription>
      </Alert>
    );
  }
  
  // User has active paid subscription
  if (subscription.isActive && !subscription.isTrialing) {
    return (
      <Alert className="bg-green-50 border-green-200 mb-4">
        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
        <AlertDescription className="text-green-700 flex items-center justify-between w-full">
          <span>Sua assinatura está ativa</span>
          <Button 
            variant="outline" 
            size="sm" 
            className="border-green-500 text-green-700"
            onClick={() => navigate('/subscribe')}
          >
            Gerenciar Assinatura
          </Button>
        </AlertDescription>
      </Alert>
    );
  }
  
  return null;
};
