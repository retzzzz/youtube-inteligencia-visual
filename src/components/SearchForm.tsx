
import { useState } from "react";
import { YoutubeSearchParams } from "@/types/youtube-types";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Search, Key } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

interface SearchFormProps {
  onSearch: (params: YoutubeSearchParams) => void;
  isLoading: boolean;
}

const SearchForm = ({ onSearch, isLoading }: SearchFormProps) => {
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
    apiKey: localStorage.getItem("youtubeApiKey") || "",
    excludeMusic: true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save API key to localStorage
    if (params.apiKey) {
      localStorage.setItem("youtubeApiKey", params.apiKey);
    }
    
    onSearch(params);
  };

  const handleChange = (name: keyof YoutubeSearchParams, value: any) => {
    setParams((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-card rounded-lg border border-border">
      <h2 className="text-xl font-bold mb-4">Pesquisar Conteúdo</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Palavras-chave */}
        <div className="space-y-2">
          <Label htmlFor="keywords">Palavras-chave</Label>
          <Input
            id="keywords"
            placeholder="Ex: marketing digital, SEO, etc."
            value={params.keywords}
            onChange={(e) => handleChange("keywords", e.target.value)}
            required
          />
        </div>

        {/* Tipo de busca */}
        <div className="space-y-2">
          <Label htmlFor="searchType">Tipo de busca</Label>
          <Select
            value={params.searchType}
            onValueChange={(value) => handleChange("searchType", value)}
          >
            <SelectTrigger id="searchType">
              <SelectValue placeholder="Selecione o tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="videos">Vídeos</SelectItem>
              <SelectItem value="shorts">Shorts</SelectItem>
              <SelectItem value="channels">Canais</SelectItem>
              <SelectItem value="playlists">Playlists</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Chave API do YouTube */}
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="apiKey" className="flex items-center">
            <Key className="h-4 w-4 mr-1" /> Chave API do YouTube
          </Label>
          <Input
            id="apiKey"
            type="password"
            placeholder="Insira sua chave de API do YouTube"
            value={params.apiKey}
            onChange={(e) => handleChange("apiKey", e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            Necessário para buscar resultados reais. <a href="https://developers.google.com/youtube/v3/getting-started" target="_blank" rel="noopener noreferrer" className="underline">Saiba como obter sua chave API</a>
          </p>
        </div>

        {/* Idioma */}
        <div className="space-y-2">
          <Label htmlFor="language">Idioma</Label>
          <Select
            value={params.language}
            onValueChange={(value) => handleChange("language", value)}
          >
            <SelectTrigger id="language">
              <SelectValue placeholder="Todos os idiomas" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Todos os idiomas</SelectItem>
              <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
              <SelectItem value="en-US">Inglês (EUA)</SelectItem>
              <SelectItem value="es-ES">Espanhol</SelectItem>
              <SelectItem value="fr-FR">Francês</SelectItem>
              <SelectItem value="de-DE">Alemão</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Período */}
        <div className="space-y-2">
          <Label htmlFor="period">Período</Label>
          <Select
            value={params.period}
            onValueChange={(value) => handleChange("period", value as YoutubeSearchParams["period"])}
          >
            <SelectTrigger id="period">
              <SelectValue placeholder="Selecione o período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Últimas 24 horas</SelectItem>
              <SelectItem value="48h">Últimas 48 horas</SelectItem>
              <SelectItem value="72h">Últimas 72 horas</SelectItem>
              <SelectItem value="7d">Últimos 7 dias</SelectItem>
              <SelectItem value="30d">Últimos 30 dias</SelectItem>
              <SelectItem value="90d">Últimos 90 dias</SelectItem>
              <SelectItem value="180d">Últimos 180 dias</SelectItem>
              <SelectItem value="all">Todo o período</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Visualizações mínimas */}
        <div className="space-y-2">
          <Label htmlFor="minViews">Visualizações mínimas</Label>
          <Input
            id="minViews"
            type="number"
            min="0"
            value={params.minViews}
            onChange={(e) => handleChange("minViews", Number(e.target.value))}
          />
        </div>

        {/* Visualizações máximas */}
        <div className="space-y-2">
          <Label htmlFor="maxViews">Visualizações máximas</Label>
          <Input
            id="maxViews"
            type="number"
            min="0"
            value={params.maxViews || ""}
            onChange={(e) => handleChange("maxViews", e.target.value ? Number(e.target.value) : null)}
          />
        </div>

        {/* Inscritos mínimos */}
        <div className="space-y-2">
          <Label htmlFor="minSubs">Inscritos mínimos</Label>
          <Input
            id="minSubs"
            type="number"
            min="0"
            value={params.minSubscribers || ""}
            onChange={(e) => handleChange("minSubscribers", e.target.value ? Number(e.target.value) : null)}
          />
        </div>

        {/* Inscritos máximos */}
        <div className="space-y-2">
          <Label htmlFor="maxSubs">Inscritos máximos</Label>
          <Input
            id="maxSubs"
            type="number"
            min="0"
            value={params.maxSubscribers || ""}
            onChange={(e) => handleChange("maxSubscribers", e.target.value ? Number(e.target.value) : null)}
          />
        </div>

        {/* Excluir conteúdo musical */}
        <div className="space-y-2 flex items-center">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="excludeMusic" 
              checked={params.excludeMusic} 
              onCheckedChange={(checked) => 
                handleChange("excludeMusic", checked === "indeterminate" ? true : checked)
              }
            />
            <Label htmlFor="excludeMusic" className="text-sm font-medium">
              Excluir vídeos musicais
            </Label>
          </div>
        </div>

        {/* Máximo de resultados */}
        <div className="space-y-2">
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

      <div className="flex justify-end">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <>Pesquisando...</>
          ) : (
            <>
              <Search className="w-4 h-4 mr-2" />
              Pesquisar
            </>
          )}
        </Button>
      </div>
    </form>
  );
};

export default SearchForm;
