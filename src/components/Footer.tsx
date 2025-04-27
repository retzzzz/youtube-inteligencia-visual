
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t mt-16 bg-gradient-to-b from-transparent to-muted/30">
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col space-y-6">
          <div className="text-muted-foreground text-sm text-center flex items-center justify-center gap-2">
            <span>© 2025 YTAnalyzer.</span> 
            <span className="hidden md:inline">Desenvolvido com</span>
            <Heart className="h-4 w-4 text-red-500 fill-red-500" /> 
            <span className="hidden md:inline">para criadores de conteúdo.</span>
          </div>
          
          <div className="grid grid-cols-1 gap-4 text-center">
            <Link 
              to="/important-links" 
              className="text-sm text-muted-foreground hover:text-primary transition-colors underline-offset-4 hover:underline"
            >
              LINKS IMPORTANTES
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
