
import { ExternalLink } from "lucide-react";

const ApiKeyInstructions = () => {
  return (
    <div className="space-y-2">
      <p className="text-sm text-muted-foreground font-medium">
        Como obter sua chave de API:
      </p>
      <ol className="list-decimal pl-5 text-sm space-y-1">
        <li>
          Acesse o{" "}
          <a 
            href="https://console.developers.google.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary underline inline-flex items-center"
          >
            Console de Desenvolvedores do Google{" "}
            <ExternalLink className="h-3 w-3 ml-1" />
          </a>
        </li>
        <li>Crie um novo projeto ou selecione um existente</li>
        <li>No menu lateral, clique em "APIs e Serviços" &gt; "Biblioteca"</li>
        <li>Pesquise por "YouTube Data API v3" e ative-a</li>
        <li>Vá para "Credenciais" e crie uma credencial do tipo "Chave de API"</li>
        <li>Copie a chave e cole abaixo</li>
      </ol>
    </div>
  );
};

export default ApiKeyInstructions;
