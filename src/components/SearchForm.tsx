
import { useState } from "react";
import { YoutubeSearchParams } from "@/types/youtube-types";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Search } from "lucide-react";

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
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
              <SelectItem value="channels">Canais</SelectItem>
              <SelectItem value="playlists">Playlists</SelectItem>
            </SelectContent>
          </Select>
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
              <SelectItem value="7d">Últimos 7 dias</SelectItem>
              <SelectItem value="30d">Últimos 30 dias</SelectItem>
              <SelectItem value="1y">Último ano</SelectItem>
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

        {/* Máximo de resultados */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="maxResults">Máximo de resultados: {params.maxResults}</Label>
          </div>
          <Slider
            id="maxResults"
            min={10}
            max={100}
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
