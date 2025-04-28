
import React, { useState } from "react";
import Header from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import Footer from "@/components/Footer";
import TitleInputForm, { TitleInputData } from "@/components/title-generator/TitleInputForm";
import TitleProcessingResults, { ProcessedTitleData } from "@/components/title-generator/TitleProcessingResults";
import TitleExampleWalkthrough from "@/components/title-generator/TitleExampleWalkthrough";
import { processTitleInput } from "@/utils/titleProcessor";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";

const TitleGenerator = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [processedData, setProcessedData] = useState<ProcessedTitleData | null>(null);
  const { toast } = useToast();
  const { youtubeApiKey } = useAuth();
  const [activeTab, setActiveTab] = useState<string>("input");

  const handleGenerateTitles = async (inputData: TitleInputData) => {
    setIsLoading(true);
    
    try {
      // Verificar se pelo menos uma estratégia foi selecionada
      const hasStrategy = 
        inputData.strategies.structureVariations ||
        inputData.strategies.keywordSubniche ||
        inputData.strategies.totalInnovation;
        
      if (!hasStrategy) {
        toast({
          title: "Selecione pelo menos uma estratégia",
          description: "Você precisa marcar pelo menos uma estratégia de remodelagem.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }
      
      const data = await processTitleInput(inputData, youtubeApiKey);
      setProcessedData(data);
      
      // Mudar para a aba de resultados
      setActiveTab("results");
      
      toast({
        title: "Títulos gerados com sucesso!",
        description: "Variações de título foram geradas com base na sua entrada.",
      });
    } catch (error) {
      console.error("Erro ao processar título:", error);
      toast({
        title: "Erro na geração",
        description: "Não foi possível processar o título. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow w-full px-4 md:px-8 py-6 mb-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">Gerador e Analisador de Títulos</h1>
            <p className="text-muted-foreground">
              Reestruture seus títulos com estratégias profissionais de copywriting. 
              Aprenda e aplique variações estruturais, subnichos e inovação total.
            </p>
          </div>
          
          <Card className="mb-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-1 md:grid-cols-3">
                <TabsTrigger value="input">1. Entrada</TabsTrigger>
                <TabsTrigger value="results" disabled={!processedData}>2. Resultados</TabsTrigger>
                <TabsTrigger value="examples">Exemplos</TabsTrigger>
              </TabsList>
              
              <TabsContent value="input" className="p-6">
                <Alert className="mb-6">
                  <Info className="h-4 w-4" />
                  <AlertTitle>Como funciona</AlertTitle>
                  <AlertDescription>
                    Insira um título original, selecione o idioma, emoção desejada e estratégias de remodelagem.
                    O sistema analisará e gerará variações otimizadas para cada estratégia selecionada.
                  </AlertDescription>
                </Alert>
                
                <TitleInputForm 
                  onGenerate={handleGenerateTitles} 
                  isLoading={isLoading} 
                />
              </TabsContent>
              
              <TabsContent value="results" className="p-6">
                {processedData && <TitleProcessingResults data={processedData} />}
              </TabsContent>
              
              <TabsContent value="examples" className="p-6">
                <TitleExampleWalkthrough />
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TitleGenerator;
