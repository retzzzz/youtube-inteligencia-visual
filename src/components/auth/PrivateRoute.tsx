
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
  
  // Os tutoriais e todas as ferramentas são acessíveis durante o período de teste
  // ou se o usuário tem assinatura ativa.
  // Durante o período de avaliação gratuita, todas as ferramentas são disponíveis.
  const hasTrialAccess = subscription?.isTrialing === true;
  const hasActiveSubscription = subscription?.isActive && !subscription.isTrialing;
  const hasAccess = hasTrialAccess || hasActiveSubscription;

  // Se o usuário está tentando acessar uma página de tutorial, sempre permitir acesso
  const isTutorialPage = location.pathname.includes('-tutorial');
  if (isTutorialPage) {
    return <Outlet />;
  }

  // Se o usuário não tem acesso e está tentando acessar uma ferramenta (não um tutorial),
  // redirecionar para a página de assinatura
  if (requireSubscription && !hasAccess) {
    return <Navigate to="/subscribe" replace />;
  }
  
  // Usuário está autenticado e tem acesso
  return <Outlet />;
};
