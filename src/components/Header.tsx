
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { LogOut, Youtube, Clock } from 'lucide-react';
import { SubscriptionBanner } from './subscription/SubscriptionBanner';
import { subscriptionService } from '@/services/subscription';

const Header = () => {
  const location = useLocation();
  const { logout, user, subscription } = useAuth();
  
  // Calcular dias restantes de teste
  const trialDaysLeft = subscription?.isTrialing && subscription?.trialEnd
    ? subscriptionService.getDaysRemaining(subscription.trialEnd)
    : 0;
  
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
              {subscription?.isTrialing && (
                <div className="hidden md:flex items-center gap-1 px-2 py-1 bg-blue-500/10 rounded-md text-blue-300">
                  <Clock className="h-3.5 w-3.5" />
                  <span className="text-xs">
                    {trialDaysLeft > 0 
                      ? `${trialDaysLeft} ${trialDaysLeft === 1 ? 'dia' : 'dias'} restantes` 
                      : 'Último dia de teste'}
                  </span>
                </div>
              )}
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
            <NavLink to="/video-analyzer" currentPath={location.pathname}>
              Analisar Vídeo
            </NavLink>
            <NavLink to="/title-generator" currentPath={location.pathname}>
              Títulos
            </NavLink>
            <NavLink to="/script-generator" currentPath={location.pathname}>
              Roteirizador
            </NavLink>
            <NavLink to="/subnicho-validator" currentPath={location.pathname}>
              Validador
            </NavLink>
            <NavLink to="/micro-subnicho-analyzer" currentPath={location.pathname}>
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
      <Link to={to}>{children}</Link>
    </Button>
  );
};

export default Header;
