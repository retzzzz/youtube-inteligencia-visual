
import React, { useState, useRef, ChangeEvent } from "react";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2, Upload, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ScriptInputProps {
  onScriptSubmit: (text: string) => void;
}

const ScriptInput = ({ onScriptSubmit }: ScriptInputProps) => {
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleSubmit = () => {
    if (!text.trim()) {
      toast({
        title: "Campo vazio",
        description: "Por favor, insira algum texto antes de continuar.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    setTimeout(() => {
      onScriptSubmit(text);
      setIsLoading(false);
    }, 500);
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (!file) return;
    
    if (file.type !== "text/plain") {
      toast({
        title: "Formato inválido",
        description: "Por favor, selecione um arquivo .txt",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    const reader = new FileReader();
    
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setText(content);
      toast({
        title: "Arquivo carregado",
        description: `Arquivo ${file.name} carregado com sucesso.`,
      });
      setIsLoading(false);
    };
    
    reader.onerror = () => {
      toast({
        title: "Erro ao ler arquivo",
        description: "Não foi possível ler o arquivo selecionado.",
        variant: "destructive",
      });
      setIsLoading(false);
    };
    
    reader.readAsText(file);
  };

  const handleClickUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <Card className="p-4 flex flex-col items-center justify-center border-dashed border-2 hover:border-primary/50 cursor-pointer transition-colors" onClick={handleClickUpload}>
          <input
            type="file"
            accept=".txt"
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileUpload}
          />
          <Upload className="h-10 w-10 text-muted-foreground mb-2" />
          <h3 className="text-lg font-medium">Upload de Arquivo</h3>
          <p className="text-sm text-muted-foreground text-center">
            Clique para fazer upload de um arquivo .txt contendo seu roteiro
          </p>
        </Card>
        
        <Card className="p-4 flex flex-col items-center justify-center">
          <FileText className="h-10 w-10 text-muted-foreground mb-2" />
          <h3 className="text-lg font-medium">Cole seu Roteiro</h3>
          <p className="text-sm text-muted-foreground text-center">
            Cole o texto diretamente na área de texto abaixo
          </p>
        </Card>
      </div>

      <Textarea 
        placeholder="Cole seu roteiro aqui ou faça upload de um arquivo .txt"
        value={text}
        onChange={handleTextChange}
        className="min-h-[300px] text-sm"
      />
      
      <div className="flex justify-end">
        <Button 
          onClick={handleSubmit} 
          disabled={isLoading || !text.trim()} 
          className="w-full sm:w-auto"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processando...
            </>
          ) : "Continuar para Configurações"}
        </Button>
      </div>
    </div>
  );
};

export default ScriptInput;
