
import React from 'react';
import { Card } from '@/components/ui/card';
import { TitleVariation } from '@/components/title-generator/TitleVariationDisplay';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Copy } from 'lucide-react';

interface TitleVariationsLevelsProps {
  variations: {
    light: TitleVariation[];
    medium: TitleVariation[];
    bold: TitleVariation[];
  };
}

const TitleVariationsLevels: React.FC<TitleVariationsLevelsProps> = ({ variations }) => {
  const { toast } = useToast();
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copiado!",
      description: "Título copiado para a área de transferência."
    });
  };
  
  const renderVariationSection = (title: string, variations: TitleVariation[], description: string) => (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground mb-4">{description}</p>
      
      <div className="space-y-4">
        {variations.map((variation, index) => (
          <div 
            key={`${title}-${index}`}
            className="p-4 border rounded-md hover:bg-muted/50 transition-all"
          >
            <div className="flex justify-between items-start gap-2">
              <div>
                <p className="font-medium">{variation.title}</p>
                <p className="text-sm text-muted-foreground mt-1">{variation.explanation}</p>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => copyToClipboard(variation.title)}
                title="Copiar título"
              >
                <Copy size={16} />
              </Button>
            </div>
            
            <div className="flex gap-4 mt-3 text-xs">
              <div className="flex items-center">
                <span className="text-muted-foreground">Competição:</span>
                <span className={`ml-1 font-medium ${
                  variation.competitionLevel === 'baixa' ? 'text-green-600' : 
                  variation.competitionLevel === 'média' ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {variation.competitionLevel}
                </span>
              </div>
              
              <div className="flex items-center">
                <span className="text-muted-foreground">Potencial viral:</span>
                <span className="ml-1 font-medium">
                  {variation.viralPotential}/100
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  
  return (
    <Card className="p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">Variações de Título em 3 Camadas</h2>
        <p className="text-muted-foreground">
          Use estas variações para testar diferentes abordagens para o mesmo conteúdo.
        </p>
      </div>
      
      {renderVariationSection(
        "Variações Leves", 
        variations.light,
        "Trocas sutis mantendo a estrutura básica do título com sinônimos e pequenas alterações."
      )}
      
      <Separator className="my-6" />
      
      {renderVariationSection(
        "Variações Médias", 
        variations.medium,
        "Reorganização da estrutura, adição de números ou transformação em perguntas."
      )}
      
      <Separator className="my-6" />
      
      {renderVariationSection(
        "Variações Ousadas / Subinichadas", 
        variations.bold,
        "Inovações significativas com subnichos específicos, mantendo o gancho emocional do título."
      )}
      
      <div className="mt-8 p-4 bg-muted/50 rounded-md">
        <h4 className="font-medium mb-2">Orientações de uso:</h4>
        <ul className="space-y-2 text-sm">
          <li>• Modificar o título é a <strong>etapa #1</strong> na remodelagem de qualquer vídeo.</li>
          <li>• Teste cada variação com o analisador de concorrência/CTR da ferramenta para verificar seu desempenho.</li>
          <li>• Comece com variações leves para testes iniciais, avançando para as mais ousadas conforme necessário.</li>
        </ul>
      </div>
    </Card>
  );
};

export default TitleVariationsLevels;
