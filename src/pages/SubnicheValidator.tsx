
import React, { useState } from 'react';
import Header from '@/components/Header';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import SubnicheValidationResults from '@/components/SubnicheValidationResults';
import { useAuth } from '@/contexts/AuthContext';
import LanguageSelector from '@/components/LanguageSelector';
import ValidationProcess from '@/components/ValidationProcess';
import {
  extrairSubnichos,
  calcularMetricasSubnicho,
  validarSubnicho,
  priorizarSubniches,
  CriteriosValidacao
} from '@/utils/subnicheValidation';

const SubnicheValidator = () => {
  const [nicho, setNicho] = useState<string>('');
  const [idioma, setIdioma] = useState<string>('português');
  const [maxCanais, setMaxCanais] = useState<number>(20);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [subnichesPriorizados, setSubnichesPriorizados] = useState([]);
  
  const [minTaxaCrescimento, setMinTaxaCrescimento] = useState<number>(10);
  const [minMediaVisualizacoes, setMinMediaVisualizacoes] = useState<number>(5000);
  const [maxIdadeMediaCanais, setMaxIdadeMediaCanais] = useState<number>(30); // Padrão: 30 dias
  
  const { toast } = useToast();
  const { youtubeApiKey } = useAuth();

  const [currentStep, setCurrentStep] = useState<number>(0);

  const handleValidateSubniches = async () => {
    if (!nicho) {
      toast({
        title: "Nicho obrigatório",
        description: "Por favor, informe o nicho principal.",
        variant: "destructive",
      });
      return;
    }

    if (!youtubeApiKey) {
      toast({
        title: "API Key necessária",
        description: "Configure sua chave da API do YouTube nas configurações.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      setCurrentStep(0);
      // Etapa 1: Extrair canais promissores
      const canaisPromissores = await extrairSubnichos(nicho, idioma, maxCanais, youtubeApiKey);
      
      setCurrentStep(1);
      // Etapa 2: Identificar subnichos
      const subnichos = canaisPromissores;
      
      setCurrentStep(2);
      // Etapa 3: Avaliar saturação dos subnichos
      const criterios: CriteriosValidacao = {
        min_taxa_crescimento: minTaxaCrescimento,
        min_media_visualizacoes: minMediaVisualizacoes,
        max_idade_media_canais: maxIdadeMediaCanais
      };
      
      const subnichos_validados = validarSubnicho(calcularMetricasSubnicho(subnichos), criterios);
      
      setCurrentStep(3);
      // Etapa 4: Priorizar e recomendar subnichos
      const recomendacoes = priorizarSubniches(subnichos_validados);
      
      setSubnichesPriorizados(recomendacoes);
      
      toast({
        title: "Análise concluída!",
        description: `Foram analisados ${canaisPromissores.length} canais e identificados ${recomendacoes.length} subnichos promissores.`,
      });
    } catch (error) {
      console.error("Erro ao validar subnichos:", error);
      toast({
        title: "Erro na análise",
        description: "Não foi possível completar a análise de subnichos.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const idadeOptions = [
    { value: "7", label: "7 dias" },
    { value: "14", label: "14 dias" },
    { value: "30", label: "30 dias" },
    { value: "60", label: "60 dias" },
    { value: "90", label: "90 dias" },
    { value: "180", label: "180 dias" },
    { value: "365", label: "1 ano" }
  ];

  return (
    <div className="container mx-auto px-4 py-6 max-w-[1400px]">
      <Header />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
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
                  <LanguageSelector 
                    value={idioma}
                    onChange={setIdioma}
                  />
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
                        <SelectValue placeholder="Selecione a idade máxima" />
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
                  onClick={handleValidateSubniches}
                  disabled={isLoading}
                >
                  {isLoading ? "Analisando..." : "Validar Subnichos"}
                </Button>
              </div>
            </div>
          </Card>
        </div>
        
        <div className="md:col-span-1">
          <ValidationProcess currentStep={currentStep} />
        </div>
      </div>

      {subnichesPriorizados.length > 0 && (
        <SubnicheValidationResults subnichesPriorizados={subnichesPriorizados} />
      )}
    </div>
  );
};

export default SubnicheValidator;
