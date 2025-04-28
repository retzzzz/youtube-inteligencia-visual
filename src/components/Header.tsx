
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { LogOut, Youtube } from 'lucide-react';

const Header = () => {
  const location = useLocation();
  const { logout, user } = useAuth();
  
  return (
    <header className="relative z-10">
      <div className="p-4 rounded-xl bg-[#141832]/50 backdrop-blur-xl border border-white/10 shadow-xl mb-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="p-2 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg shadow-lg">
                <Youtube className="h-6 w-6 text-white" />
              </div>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
                YTOptimizer
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
              className="flex items-center gap-2 bg-blue-950/20 hover:bg-blue-900/30 text-blue-100/90 transition-all duration-300"
            >
              <LogOut className="h-4 w-4" />
              Sair
            </Button>
          </div>
        </div>
        
        <nav className="flex gap-2 flex-wrap mt-4">
          <NavLink to="/" currentPath={location.pathname}>
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
        </nav>
      </div>
    </header>
  );
};

interface NavLinkProps {
  to: string;
  currentPath: string;
  children: React.ReactNode;
}

const NavLink = ({ to, currentPath, children }: NavLinkProps) => {
  const isActive = to === '/' ? currentPath === '/' : currentPath.startsWith(to);
  
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
