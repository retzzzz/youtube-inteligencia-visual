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
  translations?: {
    text: string;
    language: "pt" | "es" | "en" | "fr";
  }[];
}

const TitleGenerator = () => {
  const [variations, setVariations] = useState<TitleVariation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [keyword, setKeyword] = useState("");
  const { toast } = useToast();

  const generateTitleVariations = (
    keyword: string, 
    language: string, 
    emotion: string,
    count: number = 15
  ): TitleVariation[] => {
    const painTitles = language === "en" ? [
      `The painful truth about ${keyword} that no one wants to admit`,
      `Why ${keyword} might be destroying your life without you knowing`,
      `The silent struggle of living with ${keyword} daily`,
    ] : language === "es" ? [
      `La verdad dolorosa sobre ${keyword} que nadie quiere admitir`,
      `Por qué ${keyword} puede estar destruyendo tu vida sin que lo sepas`,
      `La lucha silenciosa de vivir con ${keyword} diariamente`,
    ] : language === "fr" ? [
      `La vérité douloureuse sur ${keyword} que personne ne veut admettre`,
      `Pourquoi ${keyword} pourrait détruire votre vie sans que vous le sachiez`,
      `La lutte silencieuse de vivre avec ${keyword} quotidiennement`,
    ] : [
      `A verdade dolorosa sobre ${keyword} que ninguém quer admitir`,
      `Por que ${keyword} pode estar destruindo sua vida sem você perceber`,
      `A luta silenciosa de viver com ${keyword} diariamente`,
    ];
    
    const hopeTitles = language === "en" ? [
      `7 ways to transform ${keyword} into growth opportunities`,
      `How I overcame ${keyword} and you can too`,
      `The transformative power of ${keyword} in your journey`,
    ] : language === "es" ? [
      `7 formas de transformar ${keyword} en oportunidades de crecimiento`,
      `Cómo superé ${keyword} y tú también puedes`,
      `El poder transformador de ${keyword} en tu camino`,
    ] : language === "fr" ? [
      `7 façons de transformer ${keyword} en opportunités de croissance`,
      `Comment j'ai surmonté ${keyword} et vous pouvez aussi`,
      `Le pouvoir transformateur de ${keyword} dans votre voyage`,
    ] : [
      `7 maneiras de transformar ${keyword} em oportunidades de crescimento`,
      `Como superei ${keyword} e você também pode`,
      `O poder transformador de ${keyword} na sua jornada`,
    ];
    
    const curiosityTitles = language === "en" ? [
      `The hidden secret behind ${keyword} that no one tells`,
      `Did you know these 5 surprising facts about ${keyword}?`,
      `The unsolved mystery of ${keyword} that experts can't explain`,
    ] : language === "es" ? [
      `El secreto oculto detrás de ${keyword} que nadie cuenta`,
      `¿Conocías estos 5 datos sorprendentes sobre ${keyword}?`,
      `El misterio sin resolver de ${keyword} que los expertos no pueden explicar`,
    ] : language === "fr" ? [
      `Le secret caché derrière ${keyword} que personne ne dit`,
      `Connaissez-vous ces 5 faits surprenants sur ${keyword}?`,
      `Le mystère non résolu de ${keyword} que les experts ne peuvent expliquer`,
    ] : [
      `O segredo oculto por trás de ${keyword} que ninguém conta`,
      `Você sabia destes 5 fatos surpreendentes sobre ${keyword}?`,
      `O mistério não resolvido de ${keyword} que os especialistas não conseguem explicar`,
    ];

    let allTitles: TitleVariation[] = [];
    const selectedLanguage = language as "pt" | "es" | "en" | "fr";
    
    if (emotion === "dor" || emotion === "mix") {
      allTitles.push(...painTitles.map(text => ({
        text,
        type: "dor" as const,
        saturation: getRandomSaturation(),
        language: selectedLanguage
      })));
    }
    
    if (emotion === "esperanca" || emotion === "mix") {
      allTitles.push(...hopeTitles.map(text => ({
        text,
        type: "esperanca" as const,
        saturation: getRandomSaturation(),
        language: selectedLanguage
      })));
    }
    
    if (emotion === "curiosidade" || emotion === "mix") {
      allTitles.push(...curiosityTitles.map(text => ({
        text,
        type: "curiosidade" as const,
        saturation: getRandomSaturation(),
        language: selectedLanguage
      })));
    }
    
    return shuffleArray(allTitles).slice(0, count);
  };

  const handleGenerateTitles = async (
    keyword: string,
    language: string,
    emotion: string
  ) => {
    setIsLoading(true);
    setKeyword(keyword);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
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
            onGenerateMore={() => {
              const newVariations = generateTitleVariations(keyword, "auto", "mix", 10);
              setVariations([...variations, ...newVariations]);
              toast({
                title: "Mais títulos gerados!",
                description: "10 novas variações de título foram adicionadas.",
              });
            }}
            totalCount={variations.length}
            setVariations={setVariations}
            keyword={keyword}
          />
        )}
      </div>
    </div>
  );
};

export default TitleGenerator;
