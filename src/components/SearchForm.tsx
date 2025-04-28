
import { useState, useEffect } from "react";
import { YoutubeSearchParams } from "@/types/youtube-types";
import { AlertCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import BasicSearchFields from "./search/BasicSearchFields";
import AdvancedSearchOptions from "./search/AdvancedSearchOptions";
import SearchFormHeader from "./search/SearchFormHeader";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface SearchFormProps {
  onSearch: (params: YoutubeSearchParams) => void;
  isLoading: boolean;
}

const SearchForm = ({ onSearch, isLoading }: SearchFormProps) => {
  const { youtubeApiKey, needsApiKey, setNeedsApiKey } = useAuth();
  const { toast } = useToast();
  const [params, setParams] = useState<YoutubeSearchParams>({
    keywords: "",
    searchType: "videos",
    language: "any",
    minViews: 1000,
    maxViews: null,
    minSubscribers: null,
    maxSubscribers: null,
    period: "30d",
    maxResults: 50,
    apiKey: youtubeApiKey || "",
    excludeMusic: true,
    excludeKeywords: ""
  });

  useEffect(() => {
    if (youtubeApiKey) {
      setParams(prev => ({ ...prev, apiKey: youtubeApiKey }));
    }
  }, [youtubeApiKey]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!params.apiKey || params.apiKey.trim() === "") {
      setNeedsApiKey(true);
      toast({
        title: "Chave de API necessária",
        description: "Por favor, configure uma chave de API do YouTube para continuar.",
        variant: "destructive"
      });
      return;
    }
    
    // Verificar se as palavras-chave foram fornecidas
    if (!params.keywords.trim()) {
      toast({
        title: "Palavras-chave obrigatórias",
        description: "Por favor, insira pelo menos uma palavra-chave para pesquisar.",
        variant: "destructive"
      });
      return;
    }
    
    onSearch(params);
  };

  const handleChange = (name: keyof YoutubeSearchParams, value: any) => {
    setParams((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4 p-4 bg-card rounded-lg border border-border backdrop-blur-sm bg-opacity-90">
      {!youtubeApiKey && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Você precisa configurar uma chave de API do YouTube para obter resultados reais.
            <button 
              type="button" 
              className="ml-2 underline font-medium" 
              onClick={() => setNeedsApiKey(true)}
            >
              Configurar API
            </button>
          </AlertDescription>
        </Alert>
      )}
      
      <SearchFormHeader isLoading={isLoading} onSubmit={handleSubmit} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <BasicSearchFields params={params} onParamChange={handleChange} />
        <AdvancedSearchOptions params={params} onParamChange={handleChange} />

        <div className="space-y-2">
          <Label htmlFor="excludeKeywords">Excluir palavras-chave</Label>
          <Input
            id="excludeKeywords"
            placeholder="Ex: tutorial, lyrics, official video"
            value={params.excludeKeywords || ""}
            onChange={(e) => handleChange("excludeKeywords", e.target.value)}
          />
          <p className="text-xs text-muted-foreground">Separe múltiplas palavras-chave por vírgulas</p>
        </div>

        <div className="space-y-2 md:col-span-2">
          <div className="flex justify-between">
            <Label htmlFor="maxResults">Máximo de resultados: {params.maxResults}</Label>
          </div>
          <Slider
            id="maxResults"
            min={10}
            max={200}
            step={10}
            value={[params.maxResults]}
            onValueChange={(value) => handleChange("maxResults", value[0])}
            className="py-4"
          />
        </div>
      </div>
    </form>
  );
};

export default SearchForm;
