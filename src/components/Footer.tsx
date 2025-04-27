
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="border-t mt-16">
      <div className="container mx-auto py-6 px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-muted-foreground text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} YTAnalyzer. Todos os direitos reservados.
          </div>
          <nav className="flex gap-4">
            <Link 
              to="/faq" 
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              FAQ
            </Link>
            <Link 
              to="/micro-subnicho-analyzer" 
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Micro-Subnichos
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
