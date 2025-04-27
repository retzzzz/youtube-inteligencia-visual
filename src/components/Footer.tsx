
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const links = [
    { name: 'Tutorial Canal Dark', path: '/tutorial' },
    { name: 'Tutorial Roteiros', path: '/script-tutorial' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Micro-Subnichos', path: '/micro-subnicho-analyzer' },
    { name: 'Pesquisar', path: '/search' },
    { name: 'Analisador de Vídeos', path: '/video-analyzer' },
    { name: 'Gerador de Títulos', path: '/title-generator' },
    { name: 'Gerador de Roteiros', path: '/script-generator' },
    { name: 'Validador de Subnichos', path: '/subnicho-validator' }
  ];

  return (
    <footer className="border-t mt-16">
      <div className="container mx-auto py-6 px-4">
        <div className="flex flex-col space-y-6">
          <div className="text-muted-foreground text-sm text-center">
            © {new Date().getFullYear()} YTAnalyzer. Todos os direitos reservados.
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {links.map((link) => (
              <Link 
                key={link.path}
                to={link.path} 
                className="text-sm text-muted-foreground hover:text-primary transition-colors text-center"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
