
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { CompleteScript, ScriptGenerationParams, generateCompleteScript } from "@/services/youtube-analyzer";
import { useToast } from "@/hooks/use-toast";

const CompleteScriptGenerator: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [script, setScript] = useState<CompleteScript | null>(null);
  const { toast } = useToast();
  
  const [params, setParams] = useState<ScriptGenerationParams>({
    niche: "",
    subniche: "",
    microSubniche: "",
    blocksCount: 5,
    charsPerBlock: 400
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setParams(prev => ({
      ...prev,
      [name]: name === "blocksCount" || name === "charsPerBlock" ? Number(value) : value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação dos campos
    if (!params.niche || !params.subniche || !params.microSubniche) {
      toast({
        title: "Campos incompletos",
        description: "Preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }
    
    if (params.blocksCount < 3 || params.blocksCount > 7) {
      toast({
        title: "Número de blocos inválido",
        description: "O número de blocos deve estar entre 3 e 7.",
        variant: "destructive"
      });
      return;
    }
    
    if (params.charsPerBlock < 300 || params.charsPerBlock > 800) {
      toast({
        title: "Caracteres por bloco inválidos",
        description: "O número de caracteres por bloco deve estar entre 300 e 800.",
        variant: "destructive"
      });
      return;
    }
    
    setIsGenerating(true);
    
    try {
      // Gerar roteiro
      const generatedScript = generateCompleteScript(params);
      setScript(generatedScript);
      
      toast({
        title: "Roteiro gerado com sucesso!",
        description: `${generatedScript.stats.palavras} palavras, duração estimada de ${generatedScript.stats.duracao_min} minutos.`
      });
    } catch (error) {
      toast({
        title: "Erro ao gerar roteiro",
        description: "Ocorreu um erro ao gerar o roteiro. Tente novamente.",
        variant: "destructive"
      });
      console.error("Erro ao gerar roteiro:", error);
    } finally {
      setIsGenerating(false);
    }
  };
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copiado!",
      description: "O roteiro foi copiado para a área de transferência."
    });
  };
  
  const copyFullScriptAsJSON = () => {
    if (script) {
      const scriptJson = JSON.stringify(script, null, 2);
      copyToClipboard(scriptJson);
    }
  };
  
  const copyFullScriptAsText = () => {
    if (script) {
      let fullText = `TÍTULO: ${script.titulo}\n\n`;
      fullText += `HOOK: ${script.hook}\n\n`;
      fullText += `INTRODUÇÃO: ${script.introducao}\n\n`;
      
      script.blocos.forEach((bloco, index) => {
        fullText += `BLOCO ${index + 1}:\n${bloco.texto}\n${bloco.mini_cta}\n\n`;
      });
      
      fullText += `CONCLUSÃO: ${script.conclusao}\n\n`;
      fullText += `ESTATÍSTICAS:\n`;
      fullText += `- Caracteres (com espaços): ${script.stats.caracteres_com_espacos}\n`;
      fullText += `- Caracteres (sem espaços): ${script.stats.caracteres_sem_espacos}\n`;
      fullText += `- Palavras: ${script.stats.palavras}\n`;
      fullText += `- Duração estimada: ${script.stats.duracao_min} minutos\n`;
      
      copyToClipboard(fullText);
    }
  };
  
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-xl font-bold mb-4">Criar Roteiro Completo</h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="niche">Nicho</Label>
              <Input
                id="niche"
                name="niche"
                placeholder="Ex: Desenvolvimento Pessoal"
                value={params.niche}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="subniche">Subnicho</Label>
              <Input
                id="subniche"
                name="subniche"
                placeholder="Ex: Produtividade"
                value={params.subniche}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="microSubniche">Micro-subnicho</Label>
              <Input
                id="microSubniche"
                name="microSubniche"
                placeholder="Ex: Método Pomodoro para Ansiedade"
                value={params.microSubniche}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="blocksCount">Número de blocos (3-7)</Label>
              <Input
                id="blocksCount"
                name="blocksCount"
                type="number"
                min={3}
                max={7}
                value={params.blocksCount}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="charsPerBlock">Caracteres por bloco (300-800)</Label>
              <Input
                id="charsPerBlock"
                name="charsPerBlock"
                type="number"
                min={300}
                max={800}
                value={params.charsPerBlock}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          
          <Button 
            type="submit" 
            disabled={isGenerating}
            className="w-full"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Gerando roteiro...
              </>
            ) : "Gerar Roteiro Completo"}
          </Button>
        </form>
      </Card>
      
      {script && (
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">Roteiro Gerado</h3>
            <div className="space-x-2">
              <Button variant="outline" size="sm" onClick={copyFullScriptAsText}>
                Copiar como Texto
              </Button>
              <Button variant="outline" size="sm" onClick={copyFullScriptAsJSON}>
                Copiar como JSON
              </Button>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="font-medium">Título</Label>
              <Card className="p-3 bg-muted/30">
                <p>{script.titulo}</p>
              </Card>
            </div>
            
            <div className="space-y-2">
              <Label className="font-medium">Hook (0-15s)</Label>
              <Card className="p-3 bg-muted/30">
                <p>{script.hook}</p>
              </Card>
            </div>
            
            <div className="space-y-2">
              <Label className="font-medium">Introdução + CTA leve</Label>
              <Card className="p-3 bg-muted/30">
                <p>{script.introducao}</p>
              </Card>
            </div>
            
            <div className="space-y-2">
              <Label className="font-medium">Blocos temáticos</Label>
              {script.blocos.map((bloco, index) => (
                <Card key={index} className="p-3 bg-muted/30">
                  <p className="font-medium text-sm text-muted-foreground mb-2">
                    Bloco {index + 1}
                  </p>
                  <p className="mb-2">{bloco.texto}</p>
                  <p className="italic text-sm">{bloco.mini_cta}</p>
                </Card>
              ))}
            </div>
            
            <div className="space-y-2">
              <Label className="font-medium">Conclusão + CTA forte</Label>
              <Card className="p-3 bg-muted/30">
                <p>{script.conclusao}</p>
              </Card>
            </div>
            
            <div className="mt-4 p-4 border rounded-md">
              <h4 className="font-medium mb-2">Estatísticas do Roteiro</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Caracteres (com espaços)</p>
                  <p className="font-semibold">{script.stats.caracteres_com_espacos}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Caracteres (sem espaços)</p>
                  <p className="font-semibold">{script.stats.caracteres_sem_espacos}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Palavras</p>
                  <p className="font-semibold">{script.stats.palavras}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Duração estimada</p>
                  <p className="font-semibold">{script.stats.duracao_min} minutos</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default CompleteScriptGenerator;
