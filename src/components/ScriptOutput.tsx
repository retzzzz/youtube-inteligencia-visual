
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Copy, Check, Download, Text } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ProcessedScript } from "@/hooks/useScriptGenerator";

interface ScriptOutputProps {
  script: ProcessedScript;
}

const ScriptOutput = ({ script }: ScriptOutputProps) => {
  const { toast } = useToast();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast({
      title: "Copiado!",
      description: "Conteúdo copiado para a área de transferência."
    });
    
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  const downloadSrt = () => {
    if (!script.srtContent) return;
    
    const blob = new Blob([script.srtContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "roteiro.srt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Download iniciado",
      description: "O arquivo SRT foi baixado com sucesso."
    });
  };

  const downloadAsText = () => {
    const fullText = script.blocks.map(block => block.text).join("\n\n");
    const blob = new Blob([fullText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "roteiro.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Download iniciado",
      description: "O arquivo de texto foi baixado com sucesso."
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4 justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">Roteiro Processado</h3>
          <p className="text-sm text-muted-foreground">
            {script.blocks.length} blocos, {script.stats.words} palavras
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={downloadAsText}
          >
            <Text className="mr-2 h-4 w-4" />
            Baixar TXT
          </Button>
          
          {script.srtContent && (
            <Button
              variant="outline"
              size="sm"
              onClick={downloadSrt}
            >
              <Download className="mr-2 h-4 w-4" />
              Baixar SRT
            </Button>
          )}
        </div>
      </div>
      
      <Tabs defaultValue="blocks" className="w-full">
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="blocks">Blocos de Roteiro</TabsTrigger>
          <TabsTrigger value="prompts">Prompts para Imagens</TabsTrigger>
        </TabsList>
        
        <TabsContent value="blocks" className="space-y-4 mt-4">
          {script.masterPrompt && (
            <Card className="p-4 bg-blue-50 border-blue-200">
              <div className="flex flex-wrap justify-between items-start gap-2">
                <div>
                  <h4 className="font-medium text-blue-900 mb-1">Prompt Mestre para Ambientação Visual</h4>
                  <p className="text-sm text-blue-800">{script.masterPrompt}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(script.masterPrompt, "master")}
                  className="h-8"
                >
                  {copiedId === "master" ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </Card>
          )}
          
          <Accordion type="single" collapsible className="w-full">
            {script.blocks.map((block, index) => (
              <AccordionItem key={index} value={`block-${index}`}>
                <AccordionTrigger className="hover:bg-muted/50 px-4">
                  <div className="flex items-center">
                    <Badge className="mr-2 bg-primary/20 text-primary hover:bg-primary/30">
                      Bloco {index + 1}
                    </Badge>
                    <span className="text-sm font-normal truncate max-w-[500px]">{block.text.substring(0, 60)}...</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="bg-muted/20">
                  <div className="p-4 space-y-4">
                    <div className="flex justify-between items-start gap-2">
                      <p className="text-sm whitespace-pre-wrap">{block.text}</p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(block.text, `block-${index}`)}
                        className="h-8"
                      >
                        {copiedId === `block-${index}` ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    
                    {block.imagePrompt && (
                      <div className="mt-2 pt-2 border-t">
                        <p className="text-xs text-muted-foreground mb-1">Prompt para imagem:</p>
                        <div className="flex justify-between items-start gap-2">
                          <p className="text-xs bg-muted p-2 rounded">{block.imagePrompt}</p>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(block.imagePrompt!, `prompt-${index}`)}
                            className="h-8"
                          >
                            {copiedId === `prompt-${index}` ? (
                              <Check className="h-4 w-4 text-green-500" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          
          <div className="p-3 bg-amber-50 border border-amber-200 rounded text-sm text-amber-800">
            <p className="font-medium mb-1">Disclaimer:</p>
            <p>
              Este roteiro foi estruturado para otimizar sua produção. Recomendamos revisar e aprimorar 
              conforme sua preferência pessoal. Para um refinamento ainda mais avançado, sugerimos 
              utilizar ferramentas como Claude.ai.
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="prompts" className="mt-4">
          {script.masterPrompt ? (
            <div className="space-y-4">
              <Card className="p-4 bg-blue-50 border-blue-200">
                <div className="flex flex-wrap justify-between items-start gap-2">
                  <div>
                    <h4 className="font-medium text-blue-900 mb-1">Prompt Mestre para Ambientação Visual</h4>
                    <p className="text-sm text-blue-800">{script.masterPrompt}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(script.masterPrompt!, "master-tab")}
                  >
                    {copiedId === "master-tab" ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </Card>
              
              {script.blocks.filter(block => block.imagePrompt).length > 0 ? (
                <div className="space-y-3">
                  {script.blocks.map((block, index) => 
                    block.imagePrompt ? (
                      <Card key={index} className="p-4">
                        <div className="flex justify-between items-start gap-2">
                          <div>
                            <h4 className="font-medium text-sm mb-1">Bloco {index + 1}</h4>
                            <p className="text-sm">{block.imagePrompt}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(block.imagePrompt!, `prompt-tab-${index}`)}
                          >
                            {copiedId === `prompt-tab-${index}` ? (
                              <Check className="h-4 w-4 text-green-500" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </Card>
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
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ScriptOutput;
