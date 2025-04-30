
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { LogOut, Youtube } from 'lucide-react';
import { SubscriptionBanner } from './subscription/SubscriptionBanner';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user, subscription } = useAuth();
  
  const requiresSubscription = [
    '/video-analyzer',
    '/title-generator',
    '/script-generator',
    '/subnicho-validator',
    '/micro-subnicho-analyzer'
  ];
  
  // Verificar se a rota atual requer assinatura
  const currentPathRequiresSubscription = requiresSubscription.some(path => 
    location.pathname.startsWith(path)
  );
  
  // Verificar se o usuário não tem uma assinatura ativa e está tentando acessar uma rota que requer assinatura
  const shouldRedirectToSubscribe = currentPathRequiresSubscription && 
    subscription && 
    !subscription.isActive && 
    !subscription.isTrialing;
  
  // Redirecionar para a página de assinatura se necessário
  React.useEffect(() => {
    if (shouldRedirectToSubscribe) {
      navigate('/subscribe');
    }
  }, [shouldRedirectToSubscribe, navigate]);
  
  return (
    <header className="relative z-10 mb-6">
      <div className="backdrop-blur-xl bg-white/5 py-4">
        <div className="px-4 md:px-8 w-full">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight flex items-center">
              <Link to="/dashboard" className="flex items-center gap-2">
                <div className="p-2 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg shadow-lg">
                  <Youtube className="h-6 w-6 text-white" />
                </div>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
                  YTAnalyzerPro
                </span>
              </Link>
            </h1>
            
            <div className="flex items-center gap-3">
              <span className="text-blue-100/70 text-sm hidden md:inline">
                Bem vindo, {user?.name || 'Usuário'}
              </span>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={logout}
                className="flex items-center gap-2 hover:bg-white/10 text-blue-100/90 transition-all duration-300"
              >
                <LogOut className="h-4 w-4" />
                Sair
              </Button>
            </div>
          </div>
          
          <nav className="flex gap-2 flex-wrap mt-4">
            <NavLink to="/dashboard" currentPath={location.pathname}>
              Início
            </NavLink>
            <NavLink to="/search" currentPath={location.pathname}>
              Pesquisar
            </NavLink>
            <NavLink to="/video-analyzer" currentPath={location.pathname} requiresSubscription>
              Analisar Vídeo
            </NavLink>
            <NavLink to="/title-generator" currentPath={location.pathname} requiresSubscription>
              Títulos
            </NavLink>
            <NavLink to="/script-generator" currentPath={location.pathname} requiresSubscription>
              Roteirizador
            </NavLink>
            <NavLink to="/subnicho-validator" currentPath={location.pathname} requiresSubscription>
              Validador
            </NavLink>
            <NavLink to="/micro-subnicho-analyzer" currentPath={location.pathname} requiresSubscription>
              Micro Subnichos
            </NavLink>
          </nav>
        </div>
      </div>
      
      {user && subscription && <div className="px-4 md:px-8 mt-4"><SubscriptionBanner /></div>}
    </header>
  );
};

interface NavLinkProps {
  to: string;
  currentPath: string;
  children: React.ReactNode;
  requiresSubscription?: boolean;
}

const NavLink = ({ to, currentPath, children, requiresSubscription }: NavLinkProps) => {
  const isActive = to === '/dashboard' ? currentPath === '/dashboard' : currentPath.startsWith(to);
  const { subscription } = useAuth();
  
  // Verificação simplificada do status da assinatura
  const hasActiveSubscription = subscription?.isActive || subscription?.isTrialing;
  
  // Se requer assinatura e o usuário não tem, redirecionar para a página de assinatura
  const actualTo = (requiresSubscription && !hasActiveSubscription) ? '/subscribe' : to;
  
  return (
    <Button
      asChild
      variant={isActive ? "default" : "outline"}
      className={cn(
        "transition-all duration-300",
        isActive 
          ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg hover:shadow-purple-500/25" 
          : "hover:bg-black/5 dark:hover:bg-white/5 backdrop-blur-sm bg-black/5 dark:bg-white/5 border-white/10"
      )}
    >
      <Link to={actualTo}>{children}</Link>
    </Button>
  );
};

export default Header;
