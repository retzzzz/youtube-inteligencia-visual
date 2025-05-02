
import { supabase } from '@/lib/supabase';

export interface CodeAnalysisRequest {
  code: string;
  error?: string;
  language?: string;
}

export interface CodeAnalysisResponse {
  correctedCode?: string;
  explanation: string;
  success: boolean;
  error?: string;
}

/**
 * Analisa e corrige erros no código usando IA
 * @param request Dados do código com erro
 */
export const analyzeAndFixCode = async (request: CodeAnalysisRequest): Promise<CodeAnalysisResponse> => {
  try {
    // Verificar se o código foi fornecido
    if (!request.code || request.code.trim() === '') {
      return {
        success: false,
        explanation: 'Código não fornecido',
        error: 'Nenhum código foi fornecido para análise'
      };
    }

    // Usando fetch diretamente para chamar a edge function
    const response = await fetch(`${process.env.VITE_SUPABASE_URL || 'https://idhtutcjkniszcsoyyrj.supabase.co'}/functions/v1/code-assistant`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${supabase.auth.session()?.access_token || ''}`,
      },
      body: JSON.stringify(request)
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Erro ao chamar serviço de IA para correção de código:', errorData);
      
      return {
        success: false,
        explanation: 'Não foi possível processar a análise do código',
        error: errorData.message || 'Erro na requisição'
      };
    }

    const data = await response.json();

    if (data.error) {
      return {
        success: false,
        explanation: 'Erro ao analisar código',
        error: data.error
      };
    }

    return {
      success: true,
      correctedCode: data.correctedCode,
      explanation: data.explanation
    };
  } catch (error) {
    console.error('Erro na análise de código:', error);
    return {
      success: false,
      explanation: 'Ocorreu um erro ao processar sua solicitação',
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    };
  }
};
