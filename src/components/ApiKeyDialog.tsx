
import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ExternalLink, AlertCircle, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { validateApiKey } from "@/services/youtube/api-validator";

const ApiKeyDialog = () => {
  const { needsApiKey, setNeedsApiKey, youtubeApiKey, setYoutubeApiKey } = useAuth();
  const [apiKey, setApiKey] = useState("");
  const [rememberKey, setRememberKey] = useState(true);
  const [error, setError] = useState("");
  const [isValidating, setIsValidating] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (youtubeApiKey && needsApiKey) {
      setApiKey(youtubeApiKey);
    }
  }, [youtubeApiKey, needsApiKey]);

  const handleValidateAndSaveApiKey = async () => {
    if (!apiKey.trim()) {
      setError("Por favor, insira uma chave de API");
      return;
    }
    
    try {
      setIsValidating(true);
      setError("");
      
      // Usar o serviço de validação
      await validateApiKey(apiKey.trim());
      
      // Se chegou aqui, a chave é válida ou tem quota excedida mas é válida
      if (rememberKey) {
        localStorage.setItem("youtubeApiKey", apiKey.trim());
      }
      
      setYoutubeApiKey(apiKey.trim());
      setNeedsApiKey(false);
      
      toast({
        title: "Chave API salva",
        description: "Sua chave API do YouTube foi configurada com sucesso!",
      });
    } catch (error) {
      console.error("Erro ao validar chave:", error);
      setError(error instanceof Error ? error.message : "Erro ao validar a chave de API");
    } finally {
      setIsValidating(false);
    }
  };

  return (
    <Dialog open={needsApiKey} onOpenChange={setNeedsApiKey}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Configurar API do YouTube</DialogTitle>
          <DialogDescription>
            Para usar o YTAnalyzer, você precisa configurar sua chave de API do YouTube Data v3.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground font-medium">
              Como obter sua chave de API:
            </p>
            <ol className="list-decimal pl-5 text-sm space-y-1">
              <li>Acesse o <a 
                href="https://console.developers.google.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary underline inline-flex items-center"
              >
                Console de Desenvolvedores do Google <ExternalLink className="h-3 w-3 ml-1" />
              </a></li>
              <li>Crie um novo projeto ou selecione um existente</li>
              <li>No menu lateral, clique em "APIs e Serviços" &gt; "Biblioteca"</li>
              <li>Pesquise por "YouTube Data API v3" e ative-a</li>
              <li>Vá para "Credenciais" e crie uma credencial do tipo "Chave de API"</li>
              <li>Copie a chave e cole abaixo</li>
            </ol>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="api-key" className="flex items-center justify-between">
              Chave da API do YouTube
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-7 w-7 p-0" 
                onClick={() => setApiKey("")}
                disabled={isValidating || !apiKey}
                title="Limpar"
              >
                <RefreshCw className="h-4 w-4" />
                <span className="sr-only">Limpar</span>
              </Button>
            </Label>
            <Input 
              id="api-key" 
              value={apiKey} 
              onChange={(e) => {
                setApiKey(e.target.value);
                setError("");
              }} 
              placeholder="AIzaSyC..."
              disabled={isValidating}
            />
            {error && (
              <Alert variant="destructive" className="py-2">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="text-xs">
                  {error}
                </AlertDescription>
              </Alert>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox 
              id="remember" 
              checked={rememberKey} 
              onCheckedChange={(checked) => setRememberKey(checked as boolean)} 
            />
            <Label 
              htmlFor="remember" 
              className="text-sm cursor-pointer"
            >
              Lembrar minha chave API neste dispositivo
            </Label>
          </div>
          
          <Alert variant="destructive">
            <AlertDescription className="text-xs">
              <strong>Importante:</strong> Uma chave de API do YouTube válida é OBRIGATÓRIA para usar esta ferramenta. Não é possível prosseguir sem configurar uma chave válida.
            </AlertDescription>
          </Alert>
        </div>
        <DialogFooter>
          <Button 
            onClick={handleValidateAndSaveApiKey} 
            disabled={isValidating}
            className="w-full"
          >
            {isValidating ? "Validando..." : "Salvar e Continuar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ApiKeyDialog;
