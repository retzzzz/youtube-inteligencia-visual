
import React from 'react';
import { Card } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';

const ScriptGeneratorIntro: React.FC = () => {
  return (
    <Card className="p-6">
      <h1 className="text-2xl font-bold mb-2">Roteirizador Automático</h1>
      <p className="text-muted-foreground mb-6">
        Crie roteiros estruturados e otimizados para alta retenção e engajamento no YouTube,
        com base em técnicas profissionais de storytelling.
      </p>
      
      <Alert className="mb-6 bg-gradient-to-br from-blue-900/40 to-purple-900/30 border border-blue-500/30">
        <Info className="h-4 w-4 text-blue-300" />
        <AlertTitle className="text-blue-200">Como funciona</AlertTitle>
        <AlertDescription className="text-blue-100">
          Cole seu texto ou faça upload de um arquivo .txt, configure as opções do roteiro 
          e receba um roteiro estruturado com blocos otimizados e prompts para imagens.
        </AlertDescription>
      </Alert>
    </Card>
  );
};

export default ScriptGeneratorIntro;
