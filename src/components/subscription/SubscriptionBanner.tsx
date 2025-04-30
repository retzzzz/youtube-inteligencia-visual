
import React from 'react';
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Clock, CreditCard, CheckCircle, AlertTriangle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { subscriptionService } from '@/services/subscription';
import { useLocation, useNavigate } from 'react-router-dom';

export const SubscriptionBanner: React.FC = () => {
  const { isLoggedIn, subscription } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
  if (!isLoggedIn || !subscription) {
    return null;
  }
  
  // Trial expired - show banner
  if (subscription.isTrialing && subscription.trialEnd && 
      subscriptionService.getDaysRemaining(subscription.trialEnd) === 0) {
    return (
      <Alert className="bg-red-50 border-red-200 mb-4">
        <AlertTriangle className="h-4 w-4 text-red-500 mr-2" />
        <AlertDescription className="text-red-700">
          <span>Seu período de avaliação gratuita terminou. Assine agora para continuar tendo acesso completo a todas as funcionalidades.</span>
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
  
  // User has an active paid subscription
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
  
  // User is in trial period with days remaining
  if (subscription.isTrialing && subscription.trialEnd) {
    const daysLeft = subscriptionService.getDaysRemaining(subscription.trialEnd);
    
    if (daysLeft > 0) {
      return (
        <Alert className="bg-blue-50 border-blue-200 mb-4">
          <Clock className="h-4 w-4 text-blue-500 mr-2" />
          <AlertDescription className="text-blue-700 flex items-center justify-between w-full">
            <span>
              Seu período de avaliação gratuita termina em {daysLeft} {daysLeft === 1 ? 'dia' : 'dias'} 
              ({subscriptionService.formatEndDate(subscription.trialEnd)})
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
  }
  
  return null;
};
