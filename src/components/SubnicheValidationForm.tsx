
import React from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';
import { useToast } from './ui/use-toast';

interface ValidationFormProps {
  nicho: string;
  setNicho: (value: string) => void;
  idioma: string;
  setIdioma: (value: string) => void;
  maxCanais: number;
  setMaxCanais: (value: number) => void;
  minTaxaCrescimento: number;
  setMinTaxaCrescimento: (value: number) => void;
  minMediaVisualizacoes: number;
  setMinMediaVisualizacoes: (value: number) => void;
  maxIdadeMediaCanais: number;
  setMaxIdadeMediaCanais: (value: number) => void;
  onValidate: () => void;
  isLoading: boolean;
}

const idadeOptions = [
  { value: "7", label: "7 dias" },
  { value: "14", label: "14 dias" },
  { value: "30", label: "30 dias" },
  { value: "60", label: "60 dias" },
  { value: "90", label: "90 dias" },
  { value: "180", label: "180 dias" },
  { value: "365", label: "1 ano" }
];

const SubnicheValidationForm: React.FC<ValidationFormProps> = ({
  nicho,
  setNicho,
  idioma,
  setIdioma,
  maxCanais,
  setMaxCanais,
  minTaxaCrescimento,
  setMinTaxaCrescimento,
  minMediaVisualizacoes,
  setMinMediaVisualizacoes,
  maxIdadeMediaCanais,
  setMaxIdadeMediaCanais,
  onValidate,
  isLoading
}) => {
  return (
    <Card className="p-6">
      <h1 className="text-2xl font-bold mb-4">Validador de Subnichos</h1>
      
      <p className="mb-6 text-muted-foreground">
        Descubra os melhores subnichos para criar um canal no YouTube, com análise de saturação, 
        crescimento e potencial de monetização.
      </p>
      
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <Label htmlFor="nicho">Nicho Principal</Label>
            <Input
              id="nicho"
              placeholder="Ex: religioso cristão, finanças pessoais, tecnologia"
              value={nicho}
              onChange={(e) => setNicho(e.target.value)}
            />
          </div>
          
          <div className="space-y-3">
            <Label htmlFor="idioma">Idioma</Label>
            <Select value={idioma} onValueChange={setIdioma}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="português">Português</SelectItem>
                <SelectItem value="inglês">Inglês</SelectItem>
                <SelectItem value="espanhol">Espanhol</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="space-y-3">
          <Label htmlFor="maxCanais">Número máximo de canais ({maxCanais})</Label>
          <Slider
            id="maxCanais"
            value={[maxCanais]}
            min={10}
            max={100}
            step={5}
            onValueChange={(value) => setMaxCanais(value[0])}
          />
        </div>
        
        <div className="border-t pt-4">
          <h3 className="font-medium mb-3">Critérios de Validação</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <Label htmlFor="minCrescimento">
                Taxa mínima de crescimento: {minTaxaCrescimento}%
              </Label>
              <Slider
                id="minCrescimento"
                value={[minTaxaCrescimento]}
                min={0}
                max={30}
                step={1}
                onValueChange={(value) => setMinTaxaCrescimento(value[0])}
              />
            </div>
            
            <div className="space-y-3">
              <Label htmlFor="minVisualizacoes">
                Mínimo de visualizações: {minMediaVisualizacoes.toLocaleString()}
              </Label>
              <Slider
                id="minVisualizacoes"
                value={[minMediaVisualizacoes]}
                min={1000}
                max={20000}
                step={500}
                onValueChange={(value) => setMinMediaVisualizacoes(value[0])}
              />
            </div>
            
            <div className="space-y-3">
              <Label htmlFor="maxIdade">Idade máxima dos canais</Label>
              <Select 
                value={maxIdadeMediaCanais.toString()} 
                onValueChange={(value) => setMaxIdadeMediaCanais(Number(value))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {idadeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button
            onClick={onValidate}
            disabled={isLoading}
          >
            {isLoading ? "Analisando..." : "Validar Subnichos"}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default SubnicheValidationForm;
