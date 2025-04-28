
import { Sparkles } from 'lucide-react';

const WelcomeMessage = () => {
  return (
    <div className="text-center py-16 px-4 relative font-sora">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6 inline-flex items-center justify-center p-4 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-full">
          <Sparkles className="h-8 w-8 text-blue-400" />
        </div>
        
        <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400 tracking-tight leading-tight">
          Ferramentas de Análise do YouTube
        </h2>
        
        <p className="text-blue-100/70 text-lg max-w-2xl mx-auto leading-relaxed font-light">
          Acelere seu crescimento no YouTube com nossas ferramentas avançadas de análise e otimização de conteúdo.
        </p>
      </div>
    </div>
  );
};

export default WelcomeMessage;
