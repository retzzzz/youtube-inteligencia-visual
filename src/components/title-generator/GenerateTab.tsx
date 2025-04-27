
import React from 'react';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";
import TitleGeneratorForm from "@/components/TitleGeneratorForm";
import TitleVariationsList from "@/components/TitleVariationsList";
import { TitleVariation } from '@/pages/TitleGenerator';
import { useToast } from '@/hooks/use-toast';

interface GenerateTabProps {
  variations: TitleVariation[];
  keyword: string;
  isLoading: boolean;
  onGenerate: (keyword: string, language: string, emotion: string) => void;
  setVariations: (variations: TitleVariation[]) => void;
}

const GenerateTab = ({ 
  variations, 
  keyword, 
  isLoading, 
  onGenerate, 
  setVariations 
}: GenerateTabProps) => {
  return (
    <div className="space-y-4">
      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Como funciona</AlertTitle>
        <AlertDescription>
          Digite uma palavra-chave ou ideia, escolha o idioma principal e o tipo de emoção desejada.
          O sistema gerará automaticamente variações de títulos aplicando diferentes estratégias.
        </AlertDescription>
      </Alert>
      
      <TitleGeneratorForm onGenerate={onGenerate} isLoading={isLoading} />
      
      {variations.length > 0 && (
        <TitleVariationsList 
          variations={variations}
          onGenerateMore={() => {
            // This function should be moved to the parent component
            const newVariations = variations.slice(0, 10).map(v => ({...v}));
            setVariations([...variations, ...newVariations]);
          }}
          totalCount={variations.length}
          setVariations={setVariations}
          keyword={keyword}
        />
      )}
    </div>
  );
};

export default GenerateTab;
