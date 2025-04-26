
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

const Header = () => {
  const location = useLocation();
  
  return (
    <header className="flex flex-col sm:flex-row justify-between items-center mb-8">
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
      
      <nav className="flex gap-3">
        <NavLink to="/" currentPath={location.pathname}>
          Pesquisar
        </NavLink>
        <NavLink to="/video-analyzer" currentPath={location.pathname}>
          Analisar Vídeo
        </NavLink>
      </nav>
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
