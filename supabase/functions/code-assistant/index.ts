
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get('GEMINI_API_KEY');
    
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: 'Chave API do Gemini não configurada' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    const { code, error, language = 'typescript' } = await req.json();

    if (!code) {
      return new Response(
        JSON.stringify({ error: 'Código não fornecido' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Cria um prompt detalhado para análise de código
    const prompt = `
      Analise o seguinte código ${language} e corrija quaisquer erros:
      
      \`\`\`${language}
      ${code}
      \`\`\`
      
      ${error ? `O seguinte erro foi relatado:\n${error}\n\n` : ''}
      
      Por favor:
      1. Identifique o problema no código
      2. Forneça o código corrigido
      3. Explique a causa do erro e a solução implementada
      
      Responda em português do Brasil com uma explicação clara e fácil de entender.
    `;

    // Chamada para a API do Gemini
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ],
            role: "user"
          }
        ],
        generationConfig: {
          temperature: 0.2,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        }
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Erro na requisição Gemini:', errorData);
      
      return new Response(
        JSON.stringify({ error: 'Erro ao processar análise de código com Gemini', details: errorData }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    let analysisText = '';
    
    // Extrair o texto da resposta do Gemini
    if (data.candidates && data.candidates[0] && data.candidates[0].content) {
      const content = data.candidates[0].content;
      if (content.parts && content.parts[0] && content.parts[0].text) {
        analysisText = content.parts[0].text;
      }
    }
    
    if (!analysisText) {
      return new Response(
        JSON.stringify({ error: 'Resposta vazia da API Gemini' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Extrair o código corrigido (geralmente estará entre blocos de código markdown)
    let correctedCode = '';
    const codeBlockMatch = analysisText.match(/```(?:typescript|javascript|tsx|jsx|ts|js)?\n([\s\S]*?)```/);
    if (codeBlockMatch && codeBlockMatch[1]) {
      correctedCode = codeBlockMatch[1].trim();
    }

    return new Response(
      JSON.stringify({
        correctedCode,
        explanation: analysisText,
        success: true
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Erro no serviço de análise de código:', error);
    return new Response(
      JSON.stringify({ error: 'Erro no serviço de análise de código', details: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
