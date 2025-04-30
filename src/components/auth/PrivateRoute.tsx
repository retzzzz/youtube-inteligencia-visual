
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
    // Se não estiver logado, redirecionar para login
    if (!isLoggedIn) {
      navigate('/login', { state: { from: location.pathname }, replace: true });
    }
  }, [isLoggedIn, navigate, location.pathname]);

  // Não logado
  if (!isLoggedIn) {
    // Retornar null enquanto o efeito de redirecionamento acontece
    return null;
  }
  
  // Se não precisar de assinatura, permitir acesso
  if (!requireSubscription) {
    return <Outlet />;
  }
  
  // Verificar se o usuário tem assinatura ou está em período de teste
  const trialDaysLeft = subscription?.isTrialing && subscription?.trialEnd
    ? subscriptionService.getDaysRemaining(subscription.trialEnd)
    : null;
  
  // Qualquer usuário em período de teste (independente dos dias restantes) 
  // ou com assinatura ativa deve ter acesso
  const hasActiveAccess = 
    (subscription?.isActive && !subscription.isTrialing) || // Assinatura paga ativa
    (subscription?.isTrialing === true); // Em período de teste (mesmo que seja 0 dias)

  // Página requer assinatura/teste mas usuário não tem acesso ativo
  if (requireSubscription && !hasActiveAccess) {
    return <Navigate to="/subscribe" replace />;
  }
  
  // Usuário está autenticado e tem o nível de assinatura necessário ou teste válido
  return <Outlet />;
};
