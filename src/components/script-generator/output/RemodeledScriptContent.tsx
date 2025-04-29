
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clipboard, Check } from "lucide-react";
import { ProcessedScript } from "@/hooks/useScriptGenerator";
import { Badge } from "@/components/ui/badge";
import CopyableText from "./CopyableText";

interface RemodeledScriptContentProps {
  script: ProcessedScript;
}

const RemodeledScriptContent: React.FC<RemodeledScriptContentProps> = ({ script }) => {
  const [copied, setCopied] = useState(false);

  if (!script.remodeled) {
    return <p>Este roteiro não foi remodelado.</p>;
  }

  const { title, hook, introduction, conclusion } = script.remodeled;

  const handleCopyFull = () => {
    if (!script.remodeled) return;
    
    let fullText = `TÍTULO: ${title}\n\n`;
    fullText += `HOOK: ${hook}\n\n`;
    fullText += `INTRODUÇÃO: ${introduction}\n\n`;
    
    script.blocks.forEach((bloco, index) => {
      fullText += `BLOCO ${index + 1}:\n${bloco.text}\n`;
      if (bloco.mini_cta) {
        fullText += `MINI-CTA: ${bloco.mini_cta}\n`;
      }
      fullText += '\n';
    });
    
    fullText += `CONCLUSÃO: ${conclusion}\n\n`;
    fullText += `ESTATÍSTICAS:\n`;
    fullText += `- Caracteres (com espaços): ${script.stats.charactersWithSpaces}\n`;
    fullText += `- Caracteres (sem espaços): ${script.stats.charactersWithoutSpaces}\n`;
    fullText += `- Palavras: ${script.stats.words}\n`;
    fullText += `- Duração estimada: ${Math.round(script.stats.words / 150)} minutos\n`;
    
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyJSON = () => {
    if (!script.remodeled) return;
    
    const jsonData = {
      titulo: title,
      hook: hook,
      introducao: introduction,
      blocos: script.blocks.map((block) => ({
        texto: block.text,
        mini_cta: block.mini_cta || ""
      })),
      conclusao: conclusion,
      stats: {
        caracteres_com_espacos: script.stats.charactersWithSpaces,
        caracteres_sem_espacos: script.stats.charactersWithoutSpaces,
        palavras: script.stats.words,
        duracao_min: Math.round(script.stats.words / 150)
      }
    };
    
    navigator.clipboard.writeText(JSON.stringify(jsonData, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end space-x-3 mb-4">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleCopyFull}
          className="flex items-center"
        >
          {copied ? <Check className="h-4 w-4 mr-2" /> : <Clipboard className="h-4 w-4 mr-2" />}
          Copiar Tudo
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleCopyJSON}
          className="flex items-center"
        >
          {copied ? <Check className="h-4 w-4 mr-2" /> : <Clipboard className="h-4 w-4 mr-2" />}
          Copiar como JSON
        </Button>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <h3 className="text-lg font-semibold">Título</h3>
            <Badge>Principal</Badge>
          </div>
          <CopyableText text={title || ""} className="p-4 bg-muted/50 rounded-md" />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <h3 className="text-lg font-semibold">Hook (0-15s)</h3>
            <Badge>Atenção</Badge>
          </div>
          <CopyableText text={hook || ""} className="p-4 bg-muted/50 rounded-md" />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <h3 className="text-lg font-semibold">Introdução</h3>
            <Badge variant="outline">+ CTA leve</Badge>
          </div>
          <CopyableText text={introduction || ""} className="p-4 bg-muted/50 rounded-md" />
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Blocos Temáticos</h3>
          
          {script.blocks.map((block, index) => (
            <Card key={index} className="p-4 shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium">Bloco {index + 1}</h4>
                <Badge variant="outline">Bloco {index + 1}/{script.blocks.length}</Badge>
              </div>
              
              <CopyableText text={block.text} className="text-sm mb-3 bg-muted/30 p-3 rounded-md" />
              
              {block.mini_cta && (
                <div className="mt-2">
                  <div className="text-xs text-muted-foreground mb-1">Mini-CTA:</div>
                  <CopyableText text={block.mini_cta} className="text-sm italic bg-muted/20 p-2 rounded-md" />
                </div>
              )}
            </Card>
          ))}
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <h3 className="text-lg font-semibold">Conclusão</h3>
            <Badge variant="outline">+ CTA forte</Badge>
          </div>
          <CopyableText text={conclusion || ""} className="p-4 bg-muted/50 rounded-md" />
        </div>
        
        <Card className="p-4">
          <h3 className="text-lg font-semibold mb-3">Estatísticas do Roteiro</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Caracteres (com espaços)</p>
              <p className="font-semibold">{script.stats.charactersWithSpaces}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Caracteres (sem espaços)</p>
              <p className="font-semibold">{script.stats.charactersWithoutSpaces}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Palavras</p>
              <p className="font-semibold">{script.stats.words}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Duração estimada</p>
              <p className="font-semibold">{Math.round(script.stats.words / 150)} minutos</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default RemodeledScriptContent;
