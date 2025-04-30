
import { supabase } from '@/integrations/supabase/client';
import { VideoResult } from '@/types/youtube-types';
import { toast } from "@/components/ui/use-toast";

export interface AIAnalysis {
  fullAnalysis: string;
  patterns: string;
  emotionalHooks: string;
  titleStructures: string;
  titleSuggestions: string;
  niches: string;
  isLoading?: boolean;
  error?: string;
}

export const analyzeSearchResults = async (
  searchTerms: string,
  results: VideoResult[]
): Promise<AIAnalysis> => {
  try {
    // Verificar se há resultados para analisar
    if (!results || results.length === 0) {
      return {
        fullAnalysis: '',
        patterns: 'Sem dados suficientes para análise',
        emotionalHooks: '',
        titleStructures: '',
        titleSuggestions: '',
        niches: '',
      };
    }

    // Chamar a função edge do Supabase
    const { data, error } = await supabase.functions.invoke('ai-analysis', {
      body: { searchTerms, results },
    });

    if (error) {
      console.error('Erro ao chamar serviço de IA:', error);
      
      let errorMessage = "Não foi possível processar os insights de IA para esta pesquisa.";
      
      // Verificar se é um erro específico de cota
      if (error.message && error.message.includes("402")) {
        errorMessage = "Cota da API OpenAI excedida. Por favor, verifique sua assinatura ou use outra chave API.";
      }
      
      toast({
        title: "Erro na análise de IA",
        description: errorMessage,
        variant: "destructive",
      });
      
      return {
        fullAnalysis: '',
        patterns: '',
        emotionalHooks: '',
        titleStructures: '',
        titleSuggestions: '',
        niches: '',
        error: errorMessage
      };
    }

    // Verificar erro específico de cota no corpo da resposta
    if (data && data.error === 'Erro de cota da OpenAI') {
      const quotaErrorMsg = data.message || "Cota da API OpenAI excedida. Por favor, verifique sua assinatura ou use outra chave API.";
      
      toast({
        title: "Erro na análise de IA",
        description: quotaErrorMsg,
        variant: "destructive",
      });
      
      return {
        fullAnalysis: '',
        patterns: '',
        emotionalHooks: '',
        titleStructures: '',
        titleSuggestions: '',
        niches: '',
        error: quotaErrorMsg
      };
    }

    return data;
  } catch (error) {
    console.error('Erro na análise de IA:', error);
    return {
      fullAnalysis: '',
      patterns: '',
      emotionalHooks: '',
      titleStructures: '',
      titleSuggestions: '',
      niches: '',
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    };
  }
};
