
import { Sparkles } from 'lucide-react';

const WelcomeMessage = () => {
  return (
    <div className="text-center py-16 px-4 relative">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6 inline-flex items-center justify-center p-4 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full">
          <Sparkles className="h-8 w-8 text-purple-500" />
        </div>
        
        <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500 tracking-tight">
          Ferramentas de Análise do YouTube
        </h2>
        
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
          Acelere seu crescimento no YouTube com nossas ferramentas avançadas de análise e otimização de conteúdo.
        </p>
      </div>
    </div>
  );
};

export default WelcomeMessage;
