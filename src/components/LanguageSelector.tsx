
import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface LanguageInfo {
  value: string;
  label: string;
  description: string;
}

const languages: LanguageInfo[] = [
  {
    value: 'inglês',
    label: 'Inglês',
    description: 'O maior mercado. Enorme público, mas também muito mais competitivo. CPM (ganho por mil views) alto em países como EUA, Canadá, Reino Unido e Austrália.',
  },
  {
    value: 'espanhol',
    label: 'Espanhol',
    description: 'Excelente mercado, especialmente para América Latina e Espanha. Menos competição que inglês. CPM médio/alto.',
  },
  {
    value: 'português',
    label: 'Português (Brasil)',
    description: 'Forte crescimento de canais Dark nos últimos anos. CPM médio, mas excelente volume de público. Fácil viralizar.',
  },
  {
    value: 'alemão',
    label: 'Alemão',
    description: 'Público fiel e CPM muito alto, mas produção de conteúdo pode ser mais difícil por questões de idioma e cultura.',
  },
  {
    value: 'francês',
    label: 'Francês',
    description: 'Mercado sólido (França, Canadá, Bélgica, Suíça). CPM razoável, com menos competição que o inglês.',
  },
  {
    value: 'italiano',
    label: 'Italiano',
    description: 'Nicho mais compacto, mas menos saturado. CPM médio/baixo, mas boa audiência em temas emocionais e místicos.',
  },
  {
    value: 'hindi',
    label: 'Hindi (Índia)',
    description: 'Gigantesco número de pessoas, mas CPM muito baixo. Ótimo para viralizar, ruim para faturar.',
  },
  {
    value: 'árabe',
    label: 'Árabe',
    description: 'Mercado emergente. Baixa concorrência em certos temas (mistério, espiritualidade), mas CPM ainda baixo/médio.',
  },
  {
    value: 'japonês',
    label: 'Japonês',
    description: 'Alta qualidade exigida. Difícil de entrar se você não domina cultura e idioma. CPM bom.',
  },
  {
    value: 'russo',
    label: 'Russo',
    description: 'Público grande, mas CPM despencou muito nos últimos anos por questões políticas. Ainda há espaço para canais dark regionais.',
  },
];

interface LanguageSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const LanguageSelector = ({ value, onChange }: LanguageSelectorProps) => {
  return (
    <TooltipProvider>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder="Selecione o idioma" />
        </SelectTrigger>
        <SelectContent>
          {languages.map((lang) => (
            <Tooltip key={lang.value}>
              <TooltipTrigger asChild>
                <SelectItem value={lang.value}>{lang.label}</SelectItem>
              </TooltipTrigger>
              <TooltipContent side="right" className="w-80">
                <p>{lang.description}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </SelectContent>
      </Select>
    </TooltipProvider>
  );
};

export default LanguageSelector;
