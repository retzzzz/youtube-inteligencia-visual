
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="border-t mt-16">
      <div className="container mx-auto py-6 px-4">
        <div className="flex flex-col space-y-6">
          <div className="text-muted-foreground text-sm text-center">
            © 2025 YTAnalyzer. Todos os direitos reservados.
          </div>
          
          <div className="grid grid-cols-1 gap-4 text-center">
            <Link 
              to="/important-links" 
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
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

