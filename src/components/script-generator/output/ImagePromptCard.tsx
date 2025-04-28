
import React from "react";
import { Card } from "@/components/ui/card";
import CopyableText from "./CopyableText";

interface ImagePromptCardProps {
  prompt: string;
  index: number;
  blockNumber: number;
}

const ImagePromptCard: React.FC<ImagePromptCardProps> = ({ prompt, index, blockNumber }) => {
  return (
    <Card className="p-4">
      <div className="flex justify-between items-start gap-2">
        <div>
          <h4 className="font-medium text-sm mb-1">Bloco {blockNumber}</h4>
          <p className="text-sm">{prompt}</p>
        </div>
        <CopyableText text={prompt} id={`prompt-tab-${index}`} />
      </div>
    </Card>
  );
};

export default ImagePromptCard;
