
import { YoutubeSearchParams } from "@/types/youtube-types";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface BasicSearchFieldsProps {
  params: YoutubeSearchParams;
  onParamChange: (name: keyof YoutubeSearchParams, value: any) => void;
}

const BasicSearchFields = ({ params, onParamChange }: BasicSearchFieldsProps) => {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="keywords">Palavras-chave</Label>
        <Input
          id="keywords"
          placeholder="Ex: marketing digital, SEO, etc."
          value={params.keywords}
          onChange={(e) => onParamChange("keywords", e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="searchType">Tipo de busca</Label>
        <Select
          value={params.searchType}
          onValueChange={(value) => onParamChange("searchType", value)}
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

      <div className="space-y-2">
        <Label htmlFor="language">Idioma</Label>
        <Select
          value={params.language}
          onValueChange={(value) => onParamChange("language", value)}
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

      <div className="space-y-2">
        <Label htmlFor="period">Período</Label>
        <Select
          value={params.period}
          onValueChange={(value) => onParamChange("period", value)}
        >
          <SelectTrigger id="period">
            <SelectValue placeholder="Selecione o período" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="24h">Últimas 24 horas</SelectItem>
            <SelectItem value="48h">Últimas 48 horas</SelectItem>
            <SelectItem value="72h">Últimas 72 horas</SelectItem>
            <SelectItem value="7d">Última semana</SelectItem>
            <SelectItem value="30d">Último mês</SelectItem>
            <SelectItem value="90d">Últimos 3 meses</SelectItem>
            <SelectItem value="180d">Últimos 6 meses</SelectItem>
            <SelectItem value="all">Todos os tempos</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </>
  );
};

export default BasicSearchFields;
