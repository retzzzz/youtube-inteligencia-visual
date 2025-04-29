
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProcessedScript } from "@/hooks/useScriptGenerator";
import BlocksTabContent from "./script-generator/output/BlocksTabContent";
import PromptsTabContent from "./script-generator/output/PromptsTabContent";
import DownloadButtons from "./script-generator/output/DownloadButtons";
import RemodeledScriptContent from "./script-generator/output/RemodeledScriptContent";

interface ScriptOutputProps {
  script: ProcessedScript;
}

const ScriptOutput = ({ script }: ScriptOutputProps) => {
  // Definir tabs com base no tipo de processamento
  const isRemodeled = !!script.remodeled;
  
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4 justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">Roteiro {isRemodeled ? "Remodelado" : "Processado"}</h3>
          <p className="text-sm text-muted-foreground">
            {script.blocks.length} blocos, {script.stats.words} palavras
          </p>
        </div>
        
        <DownloadButtons 
          blocks={script.blocks} 
          srtContent={script.srtContent}
          remodeledScript={script.remodeled}
        />
      </div>
      
      <Tabs defaultValue={isRemodeled ? "remodeled" : "blocks"} className="w-full">
        <TabsList className="grid grid-cols-3">
          {isRemodeled && <TabsTrigger value="remodeled">Roteiro Remodelado</TabsTrigger>}
          <TabsTrigger value="blocks">Blocos de Roteiro</TabsTrigger>
          <TabsTrigger value="prompts">Prompts para Imagens</TabsTrigger>
        </TabsList>
        
        {isRemodeled && (
          <TabsContent value="remodeled">
            <RemodeledScriptContent script={script} />
          </TabsContent>
        )}
        
        <TabsContent value="blocks">
          <BlocksTabContent script={script} />
        </TabsContent>
        
        <TabsContent value="prompts">
          <PromptsTabContent script={script} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ScriptOutput;
