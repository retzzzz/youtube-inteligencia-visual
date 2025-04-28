
import React from "react";
import MasterPrompt from "./MasterPrompt";
import ImagePromptCard from "./ImagePromptCard";
import { ProcessedScript } from "@/hooks/useScriptGenerator";

interface PromptsTabContentProps {
  script: ProcessedScript;
}

const PromptsTabContent: React.FC<PromptsTabContentProps> = ({ script }) => {
  return (
    <div className="mt-4">
      {script.masterPrompt ? (
        <div className="space-y-4">
          <MasterPrompt prompt={script.masterPrompt} id="master-tab" />
          
          {script.blocks.filter(block => block.imagePrompt).length > 0 ? (
            <div className="space-y-3">
              {script.blocks.map((block, index) => 
                block.imagePrompt ? (
                  <ImagePromptCard 
                    key={index} 
                    prompt={block.imagePrompt} 
                    index={index} 
                    blockNumber={index + 1}
                  />
                ) : null
              )}
            </div>
          ) : (
            <div className="text-center p-8 text-muted-foreground">
              A geração de prompts de imagem para blocos não foi selecionada na configuração.
            </div>
          )}
        </div>
      ) : (
        <div className="text-center p-8 text-muted-foreground">
          Nenhum prompt de imagem foi gerado. Volte às configurações para ativar essa funcionalidade.
        </div>
      )}
    </div>
  );
};

export default PromptsTabContent;
