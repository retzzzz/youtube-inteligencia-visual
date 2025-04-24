
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { YoutubeSearchParams } from "@/types/youtube-types";
import { useToast } from "@/components/ui/use-toast";

interface ZapierIntegrationProps {
  currentSearch: YoutubeSearchParams | null;
}

const ZapierIntegration = ({ currentSearch }: ZapierIntegrationProps) => {
  const [webhookUrl, setWebhookUrl] = useState<string>(() => {
    return localStorage.getItem("zapier_webhook_url") || "";
  });
  const [email, setEmail] = useState<string>(() => {
    return localStorage.getItem("notification_email") || "";
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSaveWebhook = () => {
    localStorage.setItem("zapier_webhook_url", webhookUrl);
    localStorage.setItem("notification_email", email);
    
    toast({
      title: "Configurações salvas",
      description: "Suas configurações de integração foram salvas com sucesso.",
    });
  };

  const handleTriggerZapier = async () => {
    if (!webhookUrl) {
      toast({
        title: "URL não configurada",
        description: "Por favor, configure a URL do webhook do Zapier primeiro.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors", // Para evitar problemas de CORS
        body: JSON.stringify({
          email,
          searchParams: currentSearch,
          timestamp: new Date().toISOString(),
          message: "Alerta de resultado da pesquisa YouTube",
        }),
      });

      toast({
        title: "Alerta enviado",
        description: "Sua solicitação foi enviada ao Zapier com sucesso.",
      });
    } catch (error) {
      console.error("Erro ao enviar para o Zapier:", error);
      toast({
        title: "Erro",
        description: "Não foi possível enviar o alerta para o Zapier. Verifique a URL.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4 p-4 bg-card rounded-lg border border-border">
      <h2 className="text-xl font-bold mb-2">Alertas por Email (Zapier)</h2>
      
      <div className="space-y-3">
        <div className="space-y-2">
          <Label htmlFor="webhook-url">URL do Webhook do Zapier</Label>
          <Input
            id="webhook-url"
            value={webhookUrl}
            onChange={(e) => setWebhookUrl(e.target.value)}
            placeholder="https://hooks.zapier.com/hooks/catch/..."
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email para notificações</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seu@email.com"
          />
        </div>
        
        <div className="flex flex-wrap gap-3">
          <Button onClick={handleSaveWebhook} variant="outline">
            Salvar Configurações
          </Button>
          
          <Button 
            onClick={handleTriggerZapier}
            disabled={isLoading || !currentSearch}
          >
            {isLoading ? "Enviando..." : "Enviar Alerta Agora"}
          </Button>
        </div>
        
        <p className="text-sm text-muted-foreground">
          Configure um webhook no Zapier para receber alertas automáticos de suas pesquisas.
          {!currentSearch && " Realize uma pesquisa primeiro para habilitar o envio de alertas."}
        </p>
      </div>
    </div>
  );
};

export default ZapierIntegration;
