
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

export interface TitleInputData {
  originalTitle: string;
  emotion: string;
  language: string;
  strategies: {
    structureVariations: boolean;
    keywordSubniche: boolean;
    totalInnovation: boolean;
  };
}

interface TitleInputFormProps {
  onGenerate: (data: TitleInputData) => void;
  isLoading?: boolean;
}

const TitleInputForm: React.FC<TitleInputFormProps> = ({ onGenerate, isLoading = false }) => {
  const [formData, setFormData] = React.useState<TitleInputData>({
    originalTitle: '',
    emotion: 'curiosidade',
    language: 'pt',
    strategies: {
      structureVariations: true,
      keywordSubniche: true,
      totalInnovation: true
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="original-title">Título Original</Label>
        <Input
          id="original-title"
          placeholder="Digite o título que deseja analisar ou otimizar"
          value={formData.originalTitle}
          onChange={(e) => setFormData({...formData, originalTitle: e.target.value})}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="emotion">Emoção Principal</Label>
          <Select
            value={formData.emotion}
            onValueChange={(value) => setFormData({...formData, emotion: value})}
          >
            <SelectTrigger id="emotion">
              <SelectValue placeholder="Selecione a emoção" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="curiosidade">Curiosidade</SelectItem>
              <SelectItem value="dor">Dor/Problema</SelectItem>
              <SelectItem value="esperanca">Esperança/Solução</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="language">Idioma</Label>
          <Select
            value={formData.language}
            onValueChange={(value) => setFormData({...formData, language: value})}
          >
            <SelectTrigger id="language">
              <SelectValue placeholder="Selecione o idioma" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pt">Português</SelectItem>
              <SelectItem value="es">Espanhol</SelectItem>
              <SelectItem value="en">Inglês</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-4 pt-2">
        <Label>Estratégias a aplicar</Label>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="structure-variations"
              checked={formData.strategies.structureVariations}
              onCheckedChange={(checked) => setFormData({
                ...formData, 
                strategies: {...formData.strategies, structureVariations: !!checked}
              })}
            />
            <Label htmlFor="structure-variations">Variações com mesma estrutura</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="keyword-subniche"
              checked={formData.strategies.keywordSubniche}
              onCheckedChange={(checked) => setFormData({
                ...formData, 
                strategies: {...formData.strategies, keywordSubniche: !!checked}
              })}
            />
            <Label htmlFor="keyword-subniche">Subnichos baseados em palavras-chave</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="total-innovation"
              checked={formData.strategies.totalInnovation}
              onCheckedChange={(checked) => setFormData({
                ...formData, 
                strategies: {...formData.strategies, totalInnovation: !!checked}
              })}
            />
            <Label htmlFor="total-innovation">Inovação total do título</Label>
          </div>
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Processando..." : "Analisar e Otimizar"}
      </Button>
    </form>
  );
};

export default TitleInputForm;
