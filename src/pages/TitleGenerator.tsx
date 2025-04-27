
import React, { useState } from "react";
import Header from "@/components/Header";
import { useToast } from "@/hooks/use-toast";
import TitleGeneratorContainer from "@/components/title-generator/TitleGeneratorContainer";
import { useAuth } from "@/contexts/AuthContext";
import { 
  TitleData,
  extrairTitulosConcorrentes,
  simularExtrairTitulosConcorrentes 
} from '@/utils/titleAnalysis';
import { generateTitleVariations } from '@/utils/titleGeneration';

export interface TitleVariation {
  text: string;
  type: "dor" | "esperanca" | "curiosidade";
  saturation: "low" | "medium" | "high";
  language: "pt" | "es" | "en" | "fr";
  translations?: {
    text: string;
    language: "pt" | "es" | "en" | "fr";
  }[];
}

const TitleGenerator = () => {
  const [keyword, setKeyword] = useState("");
  const [variations, setVariations] = useState<TitleVariation[]>([]);
  const [titulosConcorrentes, setTitulosConcorrentes] = useState<TitleData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { youtubeApiKey } = useAuth();

  const handleGenerateTitles = async (
    keyword: string,
    language: string,
    emotion: string
  ) => {
    setIsLoading(true);
    setKeyword(keyword);

    try {
      const basicVariations = generateTitleVariations(keyword, language, emotion);
      setVariations(basicVariations);
      
      let titulos;
      if (youtubeApiKey) {
        titulos = await extrairTitulosConcorrentes(keyword, language, 30, youtubeApiKey);
      } else {
        titulos = simularExtrairTitulosConcorrentes(keyword, language, 30);
      }
      setTitulosConcorrentes(titulos);
      
      toast({
        title: "Títulos gerados com sucesso!",
        description: `${basicVariations.length} variações criadas baseadas em "${keyword}"`,
      });
    } catch (error) {
      console.error("Erro ao gerar títulos:", error);
      toast({
        title: "Erro na geração",
        description: "Não foi possível gerar os títulos. Tente novamente.",
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
        <TitleGeneratorContainer
          variations={variations}
          titulosConcorrentes={titulosConcorrentes}
          keyword={keyword}
          isLoading={isLoading}
          onGenerate={handleGenerateTitles}
          setVariations={setVariations}
        />
      </div>
    </div>
  );
};

export default TitleGenerator;
