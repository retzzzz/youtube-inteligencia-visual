
import React, { useState } from 'react';
import Header from '@/components/Header';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import SubnicheValidationForm from '@/components/SubnicheValidationForm';
import ValidationProcessDisplay from '@/components/ValidationProcessDisplay';
import SubnicheValidationResults from '@/components/SubnicheValidationResults';
import {
  extrairSubnichos,
  calcularMetricasSubnicho,
  validarSubnicho,
  priorizarSubniches,
  CriteriosValidacao
} from '@/utils/subnicho-analysis';

const SubnicheValidator = () => {
  const [nicho, setNicho] = useState<string>('');
  const [idioma, setIdioma] = useState<string>('português');
  const [maxCanais, setMaxCanais] = useState<number>(20);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [subnichesPriorizados, setSubnichesPriorizados] = useState([]);
  const [minTaxaCrescimento, setMinTaxaCrescimento] = useState<number>(10);
  const [minMediaVisualizacoes, setMinMediaVisualizacoes] = useState<number>(5000);
  const [maxIdadeMediaCanais, setMaxIdadeMediaCanais] = useState<number>(30);
  const [currentStep, setCurrentStep] = useState<number>(0);
  
  const { toast } = useToast();
  const { youtubeApiKey } = useAuth();

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
      const canaisPromissores = await extrairSubnichos(nicho, idioma, maxCanais, youtubeApiKey);
      
      setCurrentStep(1);
      const subnichos = canaisPromissores;
      
      setCurrentStep(2);
      const criterios: CriteriosValidacao = {
        min_taxa_crescimento: minTaxaCrescimento,
        min_media_visualizacoes: minMediaVisualizacoes,
        max_idade_media_canais: maxIdadeMediaCanais
      };
      
      const subnichos_validados = validarSubnicho(calcularMetricasSubnicho(subnichos), criterios);
      
      setCurrentStep(3);
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

  return (
    <div className="container mx-auto px-4 py-6 max-w-[1400px]">
      <Header />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <SubnicheValidationForm
            nicho={nicho}
            setNicho={setNicho}
            idioma={idioma}
            setIdioma={setIdioma}
            maxCanais={maxCanais}
            setMaxCanais={setMaxCanais}
            minTaxaCrescimento={minTaxaCrescimento}
            setMinTaxaCrescimento={setMinTaxaCrescimento}
            minMediaVisualizacoes={minMediaVisualizacoes}
            setMinMediaVisualizacoes={setMinMediaVisualizacoes}
            maxIdadeMediaCanais={maxIdadeMediaCanais}
            setMaxIdadeMediaCanais={setMaxIdadeMediaCanais}
            onValidate={handleValidateSubniches}
            isLoading={isLoading}
          />
        </div>
        
        <ValidationProcessDisplay currentStep={currentStep} />
      </div>

      {subnichesPriorizados.length > 0 && (
        <SubnicheValidationResults subnichesPriorizados={subnichesPriorizados} />
      )}
    </div>
  );
};

export default SubnicheValidator;
