
import React, { useEffect } from 'react';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { subscriptionService } from '@/services/subscription';

interface PrivateRouteProps {
  requireSubscription?: boolean;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ requireSubscription = false }) => {
  const { isLoggedIn, subscription } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    // If we're not logged in, immediately redirect to login
    if (!isLoggedIn) {
      navigate('/login', { state: { from: location.pathname }, replace: true });
    }
  }, [isLoggedIn, navigate, location.pathname]);

  // Not logged in
  if (!isLoggedIn) {
    // Return null while the redirect effect takes place
    return null;
  }
  
  // Verificar se o usuário está no período de teste válido
  const trialDaysLeft = subscription?.isTrialing && subscription?.trialEnd
    ? subscriptionService.getDaysRemaining(subscription.trialEnd)
    : 0;
  
  // Verificar se o usuário tem uma assinatura ativa ou está em período de teste
  const hasActiveAccess = 
    (subscription?.isActive && !subscription.isTrialing) || // Assinatura paga ativa
    (subscription?.isTrialing && trialDaysLeft > 0); // Em período de teste válido
  
  // Page requires subscription but user doesn't have an active subscription or valid trial
  if (requireSubscription && !hasActiveAccess) {
    return <Navigate to="/subscribe" replace />;
  }
  
  // User is authenticated and has required subscription level or valid trial
  return <Outlet />;
};
