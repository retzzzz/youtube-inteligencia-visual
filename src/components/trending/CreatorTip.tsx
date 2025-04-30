
import React from 'react';
import { Sparkles } from 'lucide-react';

const CreatorTip: React.FC = () => {
  return (
    <div className="p-3 bg-blue-950/40 rounded-lg border border-blue-800/30">
      <h3 className="text-sm font-medium flex items-center gap-2 mb-2">
        <Sparkles className="h-3.5 w-3.5 text-blue-400" />
        Dica de Criador
      </h3>
      <p className="text-sm text-blue-200/80">
        Crie conteúdo sobre temas em alta para aumentar suas chances de alcançar novos espectadores. 
        Clique em um tópico para ver vídeos relacionados ou pesquisar mais sobre o tema.
      </p>
    </div>
  );
};

export default CreatorTip;
