import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { LogOut } from 'lucide-react';

const Header = () => {
  const location = useLocation();
  const { logout, user } = useAuth();
  
  return (
    <header className="flex flex-col sm:flex-row justify-between items-center mb-16 relative">
      <div className="mb-4 sm:mb-0">
        <h1 className="text-3xl font-bold tracking-tight">
          <Link to="/">
            YT<span className="text-primary">Analyzer</span>
          </Link>
        </h1>
        <p className="text-muted-foreground mt-1">
          Ferramenta de pesquisa e análise de YouTube
        </p>
      </div>
      
      <nav className="flex gap-3 flex-wrap">
        <NavLink to="/" currentPath={location.pathname}>
          Pesquisar
        </NavLink>
        <NavLink to="/video-analyzer" currentPath={location.pathname}>
          Analisar Vídeo
        </NavLink>
        <NavLink to="/title-generator" currentPath={location.pathname}>
          Gerar Títulos
        </NavLink>
        <NavLink to="/script-generator" currentPath={location.pathname}>
          Roteirizador Automático
        </NavLink>
      </nav>

      <div className="absolute top-[-100px] right-0 flex items-center space-x-4">
        <span className="text-muted-foreground text-sm">
          Bem vindo, {user?.name || 'Usuário'}
        </span>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={logout}
          className="flex items-center gap-2"
        >
          <LogOut className="h-4 w-4" />
          Sair
        </Button>
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
        "transition-all",
        isActive ? "shadow-md" : "hover:bg-muted"
      )}
    >
      <Link to={to}>{children}</Link>
    </Button>
  );
};

export default Header;
