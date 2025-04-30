
import { Youtube } from 'lucide-react';

const TutorialHeader = () => {
  return (
    <div className="space-y-4 mb-12 animate-fade-in">
      <div className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-youtube-red/20 to-youtube-red/10 rounded-full border border-youtube-red/30 shadow-lg mb-4">
        <Youtube className="h-8 w-8 text-youtube-red" />
      </div>
      <h1 className="text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
        Como Criar um Canal Dark no YouTube
      </h1>
      <p className="text-muted-foreground text-lg">
        Um passo-a-passo completo para você configurar seu canal dark do zero e partir direto 
        para a aplicação das estratégias que aprendeu.
      </p>
    </div>
  );
};

export default TutorialHeader;
