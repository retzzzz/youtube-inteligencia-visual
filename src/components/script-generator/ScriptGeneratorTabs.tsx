
import React from 'react';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText } from 'lucide-react';

interface ScriptGeneratorTabsProps {
  currentStep: "input" | "config" | "output";
  hasScriptText: boolean;
  hasProcessedScript: boolean;
}

const ScriptGeneratorTabs: React.FC<ScriptGeneratorTabsProps> = ({ 
  currentStep, 
  hasScriptText,
  hasProcessedScript 
}) => {
  return (
    <TabsList className="grid grid-cols-3 mb-8">
      <TabsTrigger value="input" disabled={currentStep === "output"}>
        <FileText className="mr-2 h-4 w-4" />
        1. Inserir Texto
      </TabsTrigger>
      <TabsTrigger 
        value="config" 
        disabled={!hasScriptText || currentStep === "input"}
      >
        2. Configurar
      </TabsTrigger>
      <TabsTrigger 
        value="output" 
        disabled={!hasProcessedScript}
      >
        3. Resultado
      </TabsTrigger>
    </TabsList>
  );
};

export default ScriptGeneratorTabs;
