
import React from "react";
import { Card } from "@/components/ui/card";
import CopyableText from "./CopyableText";

interface MasterPromptProps {
  prompt: string;
  id: string;
}

const MasterPrompt: React.FC<MasterPromptProps> = ({ prompt, id }) => {
  return (
    <Card className="p-4 bg-blue-50 border-blue-200 w-full">
      <div className="flex flex-wrap justify-between items-start gap-2">
        <div>
          <h4 className="font-medium text-blue-900 mb-1">Prompt Mestre para Ambientação Visual</h4>
          <p className="text-sm text-blue-800">{prompt}</p>
        </div>
        <CopyableText text={prompt} id={id} />
      </div>
    </Card>
  );
};

export default MasterPrompt;
