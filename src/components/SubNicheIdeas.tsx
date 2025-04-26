
import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Copy, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SubNicheIdeasProps {
  subNiches: {
    name: string;
    description: string;
    examples: string[];
  }[];
}

const SubNicheIdeas = ({ subNiches }: SubNicheIdeasProps) => {
  const { toast } = useToast();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast({
      title: "Copiado!",
      description: "Informação copiada para área de transferência."
    });
    
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-bold mb-4">Oportunidades de Subnicho</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Subnichos relacionados ao tema do vídeo que podem ser explorados.
      </p>
      
      <div className="space-y-6">
        {subNiches.map((subNiche, index) => {
          const nicheId = `niche-${index}`;
          const isNicheCopied = copiedId === nicheId;
          
          return (
            <div key={nicheId} className="space-y-3">
              <div className="flex justify-between items-start">
                <h4 className="font-medium">{subNiche.name}</h4>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(`${subNiche.name}: ${subNiche.description}`, nicheId)}
                  className="h-8 w-8 p-0"
                >
                  {isNicheCopied ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
              
              <p className="text-sm">{subNiche.description}</p>
              
              <div>
                <h5 className="text-sm font-medium mb-2">Exemplos de tópicos:</h5>
                <div className="space-y-2">
                  {subNiche.examples.map((example, exIndex) => {
                    const exampleId = `${nicheId}-ex-${exIndex}`;
                    const isExampleCopied = copiedId === exampleId;
                    
                    return (
                      <div 
                        key={exampleId}
                        className="flex justify-between items-center p-2 rounded-md bg-muted/50"
                      >
                        <p className="text-sm flex-1">{example}</p>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(example, exampleId)}
                          className="h-7 w-7 p-0"
                        >
                          {isExampleCopied ? (
                            <Check className="h-3 w-3 text-green-500" />
                          ) : (
                            <Copy className="h-3 w-3" />
                          )}
                        </Button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default SubNicheIdeas;
