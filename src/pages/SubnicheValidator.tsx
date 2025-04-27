
import React, { useState } from 'react';
import Header from '@/components/Header';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Slider } from '@/components/ui/slider';
import SubnicheValidationResults from '@/components/SubnicheValidationResults';
import {
  extrairSubnichos,
  calcularMetricasSubnicho,
  validarSubnicho,
  priorizarSubniches,
  Subnicho,
  MetricasSubnicho,
  SubnichoValidado,
  SubnichoPriorizado,
  CriteriosValidacao
} from '@/utils/subnicheValidation';

const SubnicheValidator = () => {
  const [nicho, setNicho] = useState<string>('');
  const [idioma, setIdioma] = useState<string>('português');
  const [maxCanais, setMaxCanais] = useState<number>(20);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [subnichesPriorizados, setSubnichesPriorizados] = useState<SubnichoPriorizado[]>([]);
  
  // Critérios de validação
  const [minTaxaCrescimento, setMinTaxaCrescimento] = useState<number>(10);
  const [minMediaVisualizacoes, setMinMediaVisualizacoes] = useState<number>(5000);
  const [maxIdadeMediaCanais, setMaxIdadeMediaCanais] = useState<number>(12);
  
  const { toast } = useToast();

  const handleValidateSubniches = async () => {
    if (!nicho) {
      toast({
        title: "Nicho obrigatório",
        description: "Por favor, informe o nicho principal.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Etapa 1: Extrair subnichos
      const subnichos: Subnicho[] = await extrairSubnichos(nicho, idioma, maxCanais);
      
      if (subnichos.length === 0) {
        toast({
          title: "Nenhum subnicho encontrado",
          description: "Não foi possível encontrar subnichos para o nicho informado.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }
      
      // Etapa 2: Calcular métricas
      const metricas: MetricasSubnicho[] = calcularMetricasSubnicho(subnichos);
      
      // Etapa 3: Validar subnichos
      const criterios: CriteriosValidacao = {
        min_taxa_crescimento: minTaxaCrescimento,
        min_media_visualizacoes: minMediaVisualizacoes,
        max_idade_media_canais: maxIdadeMediaCanais
      };
      
      const subnichos_validados: SubnichoValidado[] = validarSubnicho(metricas, criterios);
      
      // Etapa 4: Priorizar subnichos
      const priorizados: SubnichoPriorizado[] = priorizarSubniches(subnichos_validados);
      
      setSubnichesPriorizados(priorizados);
      
      toast({
        title: "Análise concluída!",
        description: `Foram analisados ${subnichos.length} subnichos e identificados ${priorizados.length} com potencial.`,
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

  return (
    <div className="container mx-auto px-4 py-6 max-w-[1400px]">
      <Header />
      
      <div className="grid grid-cols-1 gap-6 mb-8">
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
                <Input
                  id="idioma"
                  placeholder="Ex: português, inglês, espanhol"
                  value={idioma}
                  onChange={(e) => setIdioma(e.target.value)}
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
                  <Label htmlFor="maxIdade">
                    Idade máxima (meses): {maxIdadeMediaCanais}
                  </Label>
                  <Slider
                    id="maxIdade"
                    value={[maxIdadeMediaCanais]}
                    min={3}
                    max={36}
                    step={1}
                    onValueChange={(value) => setMaxIdadeMediaCanais(value[0])}
                  />
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

      {subnichesPriorizados.length > 0 && (
        <SubnicheValidationResults subnichesPriorizados={subnichesPriorizados} />
      )}
    </div>
  );
};

export default SubnicheValidator;
