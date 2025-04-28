
import React from 'react';
import { Card } from '@/components/ui/card';

interface TitleStructureProps {
  originalTitle: string;
  structure: {
    hasNumber: boolean;
    character: string;
    action: string;
    hook: string;
  };
}

const TitleStructureAnalysis: React.FC<TitleStructureProps> = ({ originalTitle, structure }) => {
  return (
    <Card className="p-6 mb-6">
      <h3 className="text-lg font-semibold mb-4">Título original extraído: "{originalTitle}"</h3>
      
      <div className="space-y-2">
        <h4 className="text-md font-medium">Análise da "espinha" do título:</h4>
        
        <div className="grid grid-cols-1 gap-2 pl-4 text-muted-foreground">
          <div className="flex items-baseline">
            <span className="font-medium w-32">• Número:</span> 
            <span>{structure.hasNumber ? "Sim" : "—"}</span>
          </div>
          
          <div className="flex items-baseline">
            <span className="font-medium w-32">• Personagem:</span> 
            <span>"{structure.character}"</span>
          </div>
          
          <div className="flex items-baseline">
            <span className="font-medium w-32">• Ação:</span> 
            <span>"{structure.action}"</span>
          </div>
          
          <div className="flex items-baseline">
            <span className="font-medium w-32">• Gancho:</span> 
            <span>"{structure.hook}"</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TitleStructureAnalysis;
