
import { Youtube } from 'lucide-react';

const TutorialHeader = () => {
  return (
    <div className="space-y-4 text-center mb-12 animate-fade-in">
      <div className="inline-flex items-center justify-center p-3 bg-youtube-red/10 rounded-full mb-4">
        <Youtube className="h-8 w-8 text-youtube-red" />
      </div>
      <h1 className="text-4xl font-bold tracking-tight">
        Como Criar um Canal Dark no YouTube
      </h1>
      <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
        Um passo-a-passo completo para você configurar seu canal dark do zero e partir direto 
        para a aplicação das estratégias que aprendeu.
      </p>
    </div>
  );
};

export default TutorialHeader;
