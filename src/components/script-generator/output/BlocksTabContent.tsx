
import React from "react";
import { Accordion } from "@/components/ui/accordion";
import MasterPrompt from "./MasterPrompt";
import ScriptBlock from "./ScriptBlock";
import ScriptDisclaimer from "./ScriptDisclaimer";
import { ProcessedScript } from "@/hooks/useScriptGenerator";

interface BlocksTabContentProps {
  script: ProcessedScript;
}

const BlocksTabContent: React.FC<BlocksTabContentProps> = ({ script }) => {
  return (
    <div className="space-y-4 mt-4">
      {script.masterPrompt && (
        <MasterPrompt prompt={script.masterPrompt} id="master" />
      )}
      
      <Accordion type="single" collapsible className="w-full">
        {script.blocks.map((block, index) => (
          <ScriptBlock key={index} block={block} index={index} />
        ))}
      </Accordion>
      
      <ScriptDisclaimer />
    </div>
  );
};

export default BlocksTabContent;
