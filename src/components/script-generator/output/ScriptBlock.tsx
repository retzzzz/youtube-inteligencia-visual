
import React from "react";
import { AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import CopyableText from "./CopyableText";

interface ScriptBlockProps {
  block: {
    text: string;
    imagePrompt?: string;
  };
  index: number;
}

const ScriptBlock: React.FC<ScriptBlockProps> = ({ block, index }) => {
  return (
    <AccordionItem key={index} value={`block-${index}`}>
      <AccordionTrigger className="hover:bg-muted/50 px-4">
        <div className="flex items-center">
          <Badge className="mr-2 bg-primary/20 text-primary hover:bg-primary/30">
            Bloco {index + 1}
          </Badge>
          <span className="text-sm font-normal truncate max-w-[500px]">
            {block.text.substring(0, 60)}...
          </span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="bg-muted/20">
        <div className="p-4 space-y-4">
          <div className="flex justify-between items-start gap-2">
            <p className="text-sm whitespace-pre-wrap">{block.text}</p>
            <CopyableText text={block.text} id={`block-${index}`} />
          </div>
          
          {block.imagePrompt && (
            <div className="mt-2 pt-2 border-t">
              <p className="text-xs text-muted-foreground mb-1">Prompt para imagem:</p>
              <div className="flex justify-between items-start gap-2">
                <p className="text-xs bg-muted p-2 rounded">{block.imagePrompt}</p>
                <CopyableText text={block.imagePrompt} id={`prompt-${index}`} />
              </div>
            </div>
          )}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default ScriptBlock;
