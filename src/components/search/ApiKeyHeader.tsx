
import { Key, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

interface ApiKeyHeaderProps {
  onRetry: () => void;
  isLoading: boolean;
  hasSearchParams: boolean;
}

const ApiKeyHeader = ({ onRetry, isLoading, hasSearchParams }: ApiKeyHeaderProps) => {
  const { youtubeApiKey, setNeedsApiKey } = useAuth();

  if (!youtubeApiKey) return null;

  return (
    <div className="flex justify-between items-center mt-4">
      <div className="text-sm text-muted-foreground">
        Usando chave API: {youtubeApiKey.substring(0, 5)}...{youtubeApiKey.substring(youtubeApiKey.length - 4)}
      </div>
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="text-xs" 
          onClick={onRetry}
          disabled={isLoading || !hasSearchParams}
        >
          <RefreshCw className="h-3 w-3 mr-1" /> Tentar novamente
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="text-xs" 
          onClick={() => setNeedsApiKey(true)}
        >
          <Key className="h-3 w-3 mr-1" /> Alterar chave API
        </Button>
      </div>
    </div>
  );
};

export default ApiKeyHeader;
