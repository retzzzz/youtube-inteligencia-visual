
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
import { ExternalLink, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";

const ApiKeyDialog = () => {
  const { needsApiKey, setNeedsApiKey, youtubeApiKey, setYoutubeApiKey } = useAuth();
  const [apiKey, setApiKey] = useState("");
  const [rememberKey, setRememberKey] = useState(true);
  const [error, setError] = useState("");
  const [isValidating, setIsValidating] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (youtubeApiKey) {
      setApiKey(youtubeApiKey);
    }
  }, [youtubeApiKey, needsApiKey]);

  const validateApiKey = async (key: string): Promise<boolean> => {
    if (!key.trim()) return false;
    
    try {
      setIsValidating(true);
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=test&key=${key}`
      );
      
      const data = await response.json();
      
      if (response.ok) {
        return true;
      } else if (data.error && data.error.errors) {
        if (data.error.errors.some((e: any) => e.reason === "quotaExceeded")) {
          setError("Aviso: A quota desta chave de API foi excedida para hoje. A chave é válida, mas você pode precisar esperar ou usar outra.");
          return true;
        } else if (data.error.errors.some((e: any) => e.reason === "keyInvalid")) {
          setError("Chave de API inválida. Verifique se foi copiada corretamente.");
          return false;
        }
      }
      
      setError("Não foi possível validar a chave de API. Verifique sua conexão de internet.");
      return false;
    } catch (error) {
      console.error("Erro ao validar chave de API:", error);
      setError("Erro ao validar a chave de API. Tente novamente mais tarde.");
      return false;
    } finally {
      setIsValidating(false);
    }
  };

  const handleSaveApiKey = async () => {
    if (!apiKey.trim()) {
      setError("Por favor, insira uma chave de API");
      return;
    }
    
    const isValid = await validateApiKey(apiKey.trim());
    
    if (isValid || error.includes("quota")) {
      if (rememberKey) {
        localStorage.setItem("youtubeApiKey", apiKey.trim());
      }
      
      setYoutubeApiKey(apiKey.trim());
      setNeedsApiKey(false);
      
      toast({
        title: "Chave API salva",
        description: "Sua chave API do YouTube foi configurada com sucesso!",
      });
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
            <Label htmlFor="api-key">Chave da API do YouTube</Label>
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
            onClick={handleSaveApiKey} 
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
