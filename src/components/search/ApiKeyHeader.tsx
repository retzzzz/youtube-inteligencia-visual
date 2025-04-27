
import { Key, RefreshCw, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

interface ApiKeyHeaderProps {
  onRetry: () => void;
  isLoading: boolean;
  hasSearchParams: boolean;
  isNewKey?: boolean;
}

const ApiKeyHeader = ({ onRetry, isLoading, hasSearchParams, isNewKey }: ApiKeyHeaderProps) => {
  const { youtubeApiKey, setNeedsApiKey } = useAuth();

  if (!youtubeApiKey) return null;

  return (
    <div className="flex justify-between items-center mt-4">
      <div className="text-sm text-muted-foreground flex items-center">
        <span>Usando chave API: {youtubeApiKey.substring(0, 5)}...{youtubeApiKey.substring(youtubeApiKey.length - 4)}</span>
        {isNewKey && (
          <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full flex items-center">
            <Clock className="h-3 w-3 mr-1" /> Nova
          </span>
        )}
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
