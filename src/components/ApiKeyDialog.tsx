
import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { validateApiKey } from "@/services/youtube";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import BaseDialog from "./common/BaseDialog";
import ApiKeyInstructions from "./dialog/ApiKeyInstructions";
import ApiKeyInput from "./dialog/ApiKeyInput";
import ApiKeyAlerts from "./dialog/ApiKeyAlerts";
import RememberKeyCheckbox from "./dialog/RememberKeyCheckbox";

const ApiKeyDialog = () => {
  const { needsApiKey, setNeedsApiKey, youtubeApiKey, setYoutubeApiKey } = useAuth();
  const [apiKey, setApiKey] = useState("");
  const [rememberKey, setRememberKey] = useState(true);
  const [error, setError] = useState("");
  const [warning, setWarning] = useState("");
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
      setWarning("");
      
      const validationResult = await validateApiKey(apiKey.trim());
      console.log("Resultado da validação:", validationResult);
      
      if (!validationResult.valid) {
        setError(validationResult.message);
        return;
      }
      
      if (validationResult.quotaExceeded) {
        setWarning("Esta chave é válida, mas sua quota está excedida. Você poderá usá-la novamente quando a quota for renovada (geralmente a cada 24h).");
      }
      
      if (rememberKey) {
        localStorage.setItem("youtubeApiKey", apiKey.trim());
      }
      
      setYoutubeApiKey(apiKey.trim());
      setNeedsApiKey(false);
      
      toast({
        title: "Chave API salva",
        description: validationResult.quotaExceeded 
          ? "Sua chave API foi salva, mas a quota está excedida. Considere usar outra chave."
          : "Sua chave API do YouTube foi configurada com sucesso!",
      });
    } catch (error) {
      console.error("Erro ao validar chave:", error);
      setError(error instanceof Error ? error.message : "Erro ao validar a chave de API");
    } finally {
      setIsValidating(false);
    }
  };

  const handleForceValidation = async () => {
    try {
      setIsValidating(true);
      setError("");
      setWarning("");
      
      const testUrl = `https://www.googleapis.com/youtube/v3/videos?part=id&chart=mostPopular&maxResults=1&key=${apiKey.trim()}`;
      const testResponse = await fetch(testUrl);
      
      if (testResponse.ok) {
        if (rememberKey) {
          localStorage.setItem("youtubeApiKey", apiKey.trim());
        }
        
        setYoutubeApiKey(apiKey.trim());
        setNeedsApiKey(false);
        
        toast({
          title: "Chave API validada",
          description: "Sua chave API do YouTube foi configurada com sucesso!",
        });
      } else {
        const errorData = await testResponse.json();
        console.log("Segunda validação retornou:", errorData);
        
        if (errorData.error?.code === 403 && errorData.error?.errors?.some((e: any) => e.reason === "quotaExceeded")) {
          setWarning("Confirmado: Esta chave está com a quota diária excedida. Você pode usá-la mesmo assim ou tentar outra chave.");
        } else {
          setError(`Erro na validação: ${errorData.error?.message || testResponse.statusText}`);
        }
      }
    } catch (error) {
      console.error("Erro na validação alternativa:", error);
      setError(error instanceof Error ? error.message : "Erro na validação");
    } finally {
      setIsValidating(false);
    }
  };

  const handleApiKeyChange = (value: string) => {
    setApiKey(value);
    setError("");
    setWarning("");
  };

  return (
    <BaseDialog
      open={needsApiKey}
      onOpenChange={setNeedsApiKey}
      title="Configurar API do YouTube"
      description="Para usar o YTAnalyzer, você precisa configurar sua chave de API do YouTube Data v3."
      footer={
        <div className="flex flex-col sm:flex-row gap-2">
          <Button 
            onClick={handleValidateAndSaveApiKey} 
            disabled={isValidating}
            className="w-full"
          >
            {isValidating ? "Validando..." : "Validar e Salvar"}
          </Button>
          
          {warning && warning.includes("quota") && (
            <Button 
              onClick={handleForceValidation}
              disabled={isValidating}
              variant="outline"
              className="w-full"
            >
              Verificar novamente
            </Button>
          )}
        </div>
      }
    >
      <ApiKeyInstructions />
      
      <div className="space-y-2">
        <ApiKeyInput 
          apiKey={apiKey}
          isValidating={isValidating}
          onChange={handleApiKeyChange}
        />
        
        <ApiKeyAlerts error={error} warning={warning} />
      </div>

      <RememberKeyCheckbox 
        checked={rememberKey}
        onCheckedChange={setRememberKey}
      />
      
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription className="text-xs">
          <strong>Importante:</strong> Uma chave de API do YouTube válida é OBRIGATÓRIA para usar esta ferramenta. Não é possível prosseguir sem configurar uma chave válida.
        </AlertDescription>
      </Alert>
    </BaseDialog>
  );
};

export default ApiKeyDialog;
