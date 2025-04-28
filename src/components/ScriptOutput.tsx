
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProcessedScript } from "@/hooks/useScriptGenerator";
import BlocksTabContent from "./script-generator/output/BlocksTabContent";
import PromptsTabContent from "./script-generator/output/PromptsTabContent";
import DownloadButtons from "./script-generator/output/DownloadButtons";

interface ScriptOutputProps {
  script: ProcessedScript;
}

const ScriptOutput = ({ script }: ScriptOutputProps) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4 justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">Roteiro Processado</h3>
          <p className="text-sm text-muted-foreground">
            {script.blocks.length} blocos, {script.stats.words} palavras
          </p>
        </div>
        
        <DownloadButtons 
          blocks={script.blocks} 
          srtContent={script.srtContent} 
        />
      </div>
      
      <Tabs defaultValue="blocks" className="w-full">
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="blocks">Blocos de Roteiro</TabsTrigger>
          <TabsTrigger value="prompts">Prompts para Imagens</TabsTrigger>
        </TabsList>
        
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
