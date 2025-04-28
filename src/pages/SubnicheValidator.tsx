
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
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Clock, RefreshCw, Key } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
  const [error, setError] = useState<string | null>(null);
  const [isNewKey, setIsNewKey] = useState<boolean>(false);
  
  const { toast } = useToast();
  const { youtubeApiKey, setNeedsApiKey } = useAuth();

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
      setNeedsApiKey(true);
      return;
    }

    setIsLoading(true);
    setError(null);
    setIsNewKey(false);
    
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
      
      let errorMessage = "Não foi possível completar a análise de subnichos.";
      
      if (error instanceof Error) {
        errorMessage = error.message;
        
        // Verificar se é um erro relacionado a chaves API novas
        if (errorMessage.includes("chave foi criada recentemente") || 
            errorMessage.includes("minutos para") || 
            errorMessage.includes("nova")) {
          setIsNewKey(true);
        }
      }
      
      setError(errorMessage);
      
      toast({
        title: "Erro na análise",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangeApiKey = () => {
    setNeedsApiKey(true);
  };

  const handleRetry = () => {
    handleValidateSubniches();
  };

  return (
    <div className="min-h-screen w-full px-4 md:px-8 py-6">
      <Header />
      
      {youtubeApiKey && (
        <div className="flex justify-between items-center mt-4 mb-4">
          <div className="text-sm text-muted-foreground">
            Usando chave API: {youtubeApiKey.substring(0, 5)}...{youtubeApiKey.substring(youtubeApiKey.length - 4)}
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleChangeApiKey}
            >
              <Key className="h-3 w-3 mr-1" /> Alterar chave API
            </Button>
          </div>
        </div>
      )}
      
      {isNewKey && (
        <Alert className="mt-2 mb-4 bg-blue-50 border-blue-300">
          <Clock className="h-4 w-4 text-blue-500" />
          <AlertDescription className="text-blue-700">
            <strong>Chave API recém-criada detectada!</strong> As chaves do Google Cloud podem levar alguns minutos para ativação completa. 
            Aguarde 5-15 minutos e tente novamente.
          </AlertDescription>
        </Alert>
      )}
      
      {error && (
        <Alert variant="destructive" className="mt-2 mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="flex justify-between items-center w-full">
            <div>
              <span>{error}</span>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleRetry}
                className="ml-2 whitespace-nowrap"
              >
                <RefreshCw className="h-3 w-3 mr-1" />
                Tentar novamente
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleChangeApiKey}
                className="ml-2 whitespace-nowrap"
              >
                Configurar nova chave
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}
      
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
