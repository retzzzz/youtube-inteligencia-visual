
import React from 'react';
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Clock, CreditCard, CheckCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { subscriptionService } from '@/services/subscription';

export const SubscriptionBanner: React.FC = () => {
  const { isLoggedIn, subscription } = useAuth();
  
  if (!isLoggedIn || !subscription) {
    return null;
  }
  
  // User has an active paid subscription
  if (subscription.isActive && !subscription.isTrialing) {
    return (
      <Alert className="bg-green-50 border-green-200 mb-4">
        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
        <AlertDescription className="text-green-700 flex items-center justify-between w-full">
          <span>Sua assinatura está ativa</span>
          <Button variant="outline" size="sm" className="border-green-500 text-green-700">
            Gerenciar Assinatura
          </Button>
        </AlertDescription>
      </Alert>
    );
  }
  
  // User is in trial period
  if (subscription.isTrialing && subscription.trialEnd) {
    const daysLeft = subscriptionService.getDaysRemaining(subscription.trialEnd);
    return (
      <Alert className="bg-blue-50 border-blue-200 mb-4">
        <Clock className="h-4 w-4 text-blue-500 mr-2" />
        <AlertDescription className="text-blue-700 flex items-center justify-between w-full">
          <span>
            Seu período de avaliação gratuita termina em {daysLeft} {daysLeft === 1 ? 'dia' : 'dias'} 
            ({subscriptionService.formatEndDate(subscription.trialEnd)})
          </span>
          <Button className="ml-2" onClick={() => window.location.href = '/subscribe'}>
            <CreditCard className="h-4 w-4 mr-2" />
            Assinar Agora
          </Button>
        </AlertDescription>
      </Alert>
    );
  }
  
  // Trial expired or no subscription
  return (
    <Alert className="bg-amber-50 border-amber-200 mb-4">
      <AlertDescription className="text-amber-700 flex items-center justify-between w-full">
        <span>Seu período de avaliação terminou. Assine para continuar utilizando todos os recursos.</span>
        <Button className="ml-2" onClick={() => window.location.href = '/subscribe'}>
          <CreditCard className="h-4 w-4 mr-2" />
          Assinar por R$ 69,99/mês
        </Button>
      </AlertDescription>
    </Alert>
  );
};
