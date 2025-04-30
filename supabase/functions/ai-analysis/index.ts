
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
    const geminiApiKey = Deno.env.get('GEMINI_API_KEY');
    
    if (!geminiApiKey) {
      return new Response(
        JSON.stringify({ error: 'Chave API do Gemini não configurada' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    const { searchTerms, results } = await req.json();

    if (!searchTerms || !results || !Array.isArray(results)) {
      return new Response(
        JSON.stringify({ error: 'Parâmetros inválidos' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Prepare context for AI analysis with more focus on growth trends
    const titulos = results.map(v => v.title).slice(0, 10).join("\n- ");
    const channels = results.map(v => v.channelTitle).slice(0, 10).join("\n- ");
    const termos = searchTerms;
    
    // Create improved prompt for analysis with focus on finding growing trends
    const prompt = `
      Analise estes títulos de vídeos e canais relacionados à busca por "${termos}":
      
      Títulos:
      - ${titulos}
      
      Canais:
      - ${channels}
      
      Forneça:
      1. Padrões observados nestes títulos (palavras-chave comuns, estrutura)
      2. Ganchos emocionais presentes (curiosidade, medo, etc)
      3. Estruturas de títulos mais eficazes e específicas para este nicho
      4. Sugestões para novos títulos baseados em padrões virais, focando em temas em crescimento
      5. Categorização de nichos e subnichos presentes com foco em identificar micronichos em crescimento
      
      IMPORTANTE: Foque especificamente em identificar oportunidades para novos criadores, destacando:
      - Micronichos emergentes com pouca competição
      - Temas em crescimento rápido mas ainda não saturados
      - Ângulos diferentes para abordar temas populares
      - Estruturas de título específicas que estão gerando mais engajamento
      
      Formate sua análise com subtítulos claramente definidos usando marcação ** em torno dos títulos de seção. Use estrutura de lista com marcadores para facilitar a leitura. Responda em português do Brasil.
    `;

    // Call Gemini API
    console.log('Enviando requisição para Gemini API');
    
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`, {
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
      
      // Verificar erros específicos do Gemini
      if (errorData.error && errorData.error.status === 'PERMISSION_DENIED') {
        return new Response(
          JSON.stringify({ error: 'Erro de autenticação na API Gemini. Verifique sua chave API.' }),
          { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      if (errorData.error && errorData.error.status === 'RESOURCE_EXHAUSTED') {
        return new Response(
          JSON.stringify({ error: 'Cota da API Gemini excedida. Verifique seu plano de uso.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      return new Response(
        JSON.stringify({ error: 'Erro ao processar análise de IA com Gemini', details: errorData }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    let analysis = '';
    
    // Extrair o texto da resposta do Gemini (estrutura diferente da OpenAI)
    if (data.candidates && data.candidates[0] && data.candidates[0].content) {
      const content = data.candidates[0].content;
      if (content.parts && content.parts[0] && content.parts[0].text) {
        analysis = content.parts[0].text;
      }
    }
    
    if (!analysis) {
      return new Response(
        JSON.stringify({ error: 'Resposta vazia da API Gemini' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Extract specific sections for structured return
    const patternMatch = analysis.match(/Padrões[\s\S]*?(?=Ganchos|$)/i);
    const hooksMatch = analysis.match(/Ganchos[\s\S]*?(?=Estruturas|$)/i);
    const structureMatch = analysis.match(/Estruturas[\s\S]*?(?=Sugestões|$)/i);
    const suggestionsMatch = analysis.match(/Sugestões[\s\S]*?(?=Categorização|$)/i);
    const nicheMatch = analysis.match(/Categorização[\s\S]*?(?=$)/i);

    const structured = {
      fullAnalysis: analysis,
      patterns: patternMatch ? patternMatch[0] : '',
      emotionalHooks: hooksMatch ? hooksMatch[0] : '',
      titleStructures: structureMatch ? structureMatch[0] : '',
      titleSuggestions: suggestionsMatch ? suggestionsMatch[0] : '',
      niches: nicheMatch ? nicheMatch[0] : '',
    };

    console.log('Análise de IA com Gemini concluída com sucesso');
    
    return new Response(
      JSON.stringify(structured),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Erro no serviço de análise de IA:', error);
    return new Response(
      JSON.stringify({ error: 'Erro no serviço de análise de IA', details: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
