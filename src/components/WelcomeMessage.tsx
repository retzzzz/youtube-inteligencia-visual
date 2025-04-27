
import { Sparkles } from 'lucide-react';

const WelcomeMessage = () => {
  return (
    <div className="text-center py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6 inline-flex items-center justify-center p-4 bg-gradient-to-br from-red-500/10 to-amber-500/10 rounded-full">
          <Sparkles className="h-8 w-8 text-amber-500" />
        </div>
        
        <h2 className="text-3xl md:text-4xl font-bold mb-4 relative inline-block">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-youtube-red to-amber-500">
            Ferramentas de Análise do YouTube
          </span>
          <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-youtube-red to-amber-500 rounded-full opacity-70"></div>
        </h2>
        
        <p className="text-muted-foreground mb-6 text-lg max-w-2xl mx-auto">
          Selecionando uma ferramenta abaixo você poderá desbloquear todo o potencial do seu canal e conteúdo no YouTube.
        </p>
      </div>
    </div>
  );
};

export default WelcomeMessage;
