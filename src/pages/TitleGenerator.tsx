
import React, { useState } from "react";
import Header from "@/components/Header";
import TitleGeneratorForm from "@/components/TitleGeneratorForm";
import TitleVariationsList from "@/components/TitleVariationsList";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";

export interface TitleVariation {
  text: string;
  type: "dor" | "esperanca" | "curiosidade";
  saturation: "low" | "medium" | "high";
  language: "pt" | "es" | "en" | "fr";
}

const TitleGenerator = () => {
  const [variations, setVariations] = useState<TitleVariation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [keyword, setKeyword] = useState("");
  const { toast } = useToast();

  const handleGenerateTitles = async (
    keyword: string,
    language: string,
    emotion: string
  ) => {
    setIsLoading(true);
    setKeyword(keyword);

    try {
      // Simulamos o tempo de processamento
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate title variations
      const generatedTitles = generateTitleVariations(keyword, language, emotion);
      setVariations(generatedTitles);
      
      toast({
        title: "Títulos gerados com sucesso!",
        description: `${generatedTitles.length} variações criadas baseadas em "${keyword}"`,
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

  const generateMoreVariations = () => {
    const newVariations = generateTitleVariations(keyword, "auto", "mix", 10);
    setVariations([...variations, ...newVariations]);
    
    toast({
      title: "Mais títulos gerados!",
      description: "10 novas variações de título foram adicionadas.",
    });
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <Header />
      
      <div className="grid gap-6 mt-6">
        <Card className="p-6">
          <h1 className="text-2xl font-bold mb-2">Gerador de Títulos Estratégicos</h1>
          <p className="text-muted-foreground mb-6">
            Crie títulos criativos, emocionais e com alto potencial de engajamento para seus vídeos em diferentes idiomas.
          </p>
          
          <Alert className="mb-6">
            <Info className="h-4 w-4" />
            <AlertTitle>Como funciona</AlertTitle>
            <AlertDescription>
              Digite uma palavra-chave ou ideia, escolha o idioma principal e o tipo de emoção desejada. 
              O sistema gerará automaticamente variações de títulos aplicando diferentes estratégias.
            </AlertDescription>
          </Alert>
          
          <TitleGeneratorForm onGenerate={handleGenerateTitles} isLoading={isLoading} />
        </Card>
        
        {variations.length > 0 && (
          <TitleVariationsList 
            variations={variations} 
            onGenerateMore={generateMoreVariations} 
            totalCount={variations.length}
          />
        )}
      </div>
    </div>
  );
};

// Função que simula a geração de títulos com base em palavra-chave, idioma e emoção
const generateTitleVariations = (
  keyword: string, 
  language: string, 
  emotion: string,
  count: number = 15
): TitleVariation[] => {
  const painTitles = [
    `A verdade dolorosa sobre ${keyword} que ninguém quer admitir`,
    `Por que ${keyword} pode estar destruindo sua vida sem você perceber`,
    `A angústia silenciosa de quem convive com ${keyword} diariamente`,
    `O lado sombrio de ${keyword} que todos ignoram`,
    `Como ${keyword} arruinou minha vida e o que aprendi com isso`,
  ];
  
  const hopeTitles = [
    `7 maneiras de transformar ${keyword} em oportunidade de crescimento`,
    `Como superei os desafios de ${keyword} e você também pode`,
    `O poder transformador de ${keyword} na sua jornada pessoal`,
    `O milagre inesperado que ${keyword} trouxe para minha vida`,
    `Como encontrei esperança em meio ao caos de ${keyword}`,
  ];
  
  const curiosityTitles = [
    `O segredo oculto por trás de ${keyword} que ninguém conta`,
    `Você sabia destes 5 fatos surpreendentes sobre ${keyword}?`,
    `A verdade chocante sobre ${keyword} revelada após 10 anos`,
    `O mistério não resolvido de ${keyword} que intriga especialistas`,
    `O que ${keyword} esconde que poucos conseguem enxergar`,
  ];
  
  // Traduções dos títulos para inglês, espanhol e francês
  const translatedTitles = [
    `[English] The hidden truth about ${keyword} no one talks about`,
    `[Español] El secreto detrás de ${keyword} que nadie te cuenta`,
    `[Français] La vérité cachée sur ${keyword} dont personne ne parle`,
    `[English] 7 ways ${keyword} can change your life forever`,
    `[Español] 7 formas en que ${keyword} puede transformar tu vida`,
  ];

  // Combinamos todos os títulos
  let allTitles: TitleVariation[] = [];
  
  // Adicionamos títulos baseados na emoção selecionada ou misturamos
  if (emotion === "dor" || emotion === "mix") {
    allTitles.push(...painTitles.map(text => ({
      text,
      type: "dor",
      saturation: getRandomSaturation(),
      language: language === "pt" ? "pt" : (language === "en" ? "en" : (language === "es" ? "es" : (language === "fr" ? "fr" : "pt")))
    })));
  }
  
  if (emotion === "esperanca" || emotion === "mix") {
    allTitles.push(...hopeTitles.map(text => ({
      text,
      type: "esperanca",
      saturation: getRandomSaturation(),
      language: language === "pt" ? "pt" : (language === "en" ? "en" : (language === "es" ? "es" : (language === "fr" ? "fr" : "pt")))
    })));
  }
  
  if (emotion === "curiosidade" || emotion === "mix") {
    allTitles.push(...curiosityTitles.map(text => ({
      text,
      type: "curiosidade",
      saturation: getRandomSaturation(),
      language: language === "pt" ? "pt" : (language === "en" ? "en" : (language === "es" ? "es" : (language === "fr" ? "fr" : "pt")))
    })));
  }
  
  // Adicionamos traduções se o idioma não for especificado ou for "auto"
  if (language === "auto") {
    allTitles.push(...translatedTitles.map(text => {
      let lang: "pt" | "es" | "en" | "fr" = "pt";
      if (text.startsWith("[English]")) lang = "en";
      else if (text.startsWith("[Español]")) lang = "es";
      else if (text.startsWith("[Français]")) lang = "fr";
      
      return {
        text,
        type: Math.random() > 0.5 ? "curiosidade" : (Math.random() > 0.5 ? "esperanca" : "dor"),
        saturation: getRandomSaturation(),
        language: lang
      };
    }));
  }
  
  // Embaralha e limita ao número solicitado
  return shuffleArray(allTitles).slice(0, count);
};

const getRandomSaturation = (): "low" | "medium" | "high" => {
  const rand = Math.random();
  if (rand < 0.5) return "low";
  if (rand < 0.8) return "medium";
  return "high";
};

const shuffleArray = <T,>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export default TitleGenerator;
