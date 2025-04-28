
import React from 'react';
import Header from '@/components/Header';
import ValidationProcessDisplay from '@/components/ValidationProcessDisplay';
import SubnicheValidationForm from '@/components/SubnicheValidationForm';
import SubnicheValidationResults from '@/components/SubnicheValidationResults';
import ApiKeySection from '@/components/subnicho/ApiKeySection';
import ErrorAlert from '@/components/subnicho/ErrorAlert';
import { useSubnicheValidator } from '@/hooks/useSubnicheValidator';
import Footer from '@/components/Footer';

const SubnicheValidator = () => {
  const {
    nicho,
    setNicho,
    idioma,
    setIdioma,
    maxCanais,
    setMaxCanais,
    isLoading,
    subnichesPriorizados,
    minTaxaCrescimento,
    setMinTaxaCrescimento,
    minMediaVisualizacoes,
    setMinMediaVisualizacoes,
    maxIdadeMediaCanais,
    setMaxIdadeMediaCanais,
    currentStep,
    error,
    isNewKey,
    youtubeApiKey,
    handleValidateSubniches,
    handleChangeApiKey,
    handleRetry
  } = useSubnicheValidator();

  return (
    <div className="min-h-screen flex flex-col w-full pb-32">
      <Header />
      
      <div className="w-full px-4 md:px-8 py-6">
        <ApiKeySection 
          youtubeApiKey={youtubeApiKey}
          isNewKey={isNewKey}
          onChangeApiKey={handleChangeApiKey}
        />
        
        <ErrorAlert 
          error={error}
          onRetry={handleRetry}
          onChangeApiKey={handleChangeApiKey}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
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
      
      <Footer />
    </div>
  );
};

export default SubnicheValidator;
