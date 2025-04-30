
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
    // Não precisamos de API key para este endpoint público do HuggingFace
    
    const { searchTerms, results } = await req.json();

    if (!searchTerms || !results || !Array.isArray(results)) {
      return new Response(
        JSON.stringify({ error: 'Parâmetros inválidos' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Prepare context for AI analysis
    const titulos = results.map(v => v.title).slice(0, 10).join("\n- ");
    const termos = searchTerms;
    
    // Create prompt for analysis
    const prompt = `
      Analise estes títulos de vídeos relacionados à busca por "${termos}":
      
      - ${titulos}
      
      Forneça:
      1. Padrões observados nestes títulos (palavras-chave comuns, estrutura)
      2. Ganchos emocionais presentes (curiosidade, medo, etc)
      3. Estruturas de títulos mais eficazes
      4. Sugestões para novos títulos baseados em padrões virais
      5. Categorização de nichos e subnichos presentes
      
      Responda em formato estruturado em português do Brasil.
    `;

    // Call Hugging Face API usando seu endpoint público
    console.log('Enviando requisição para HuggingFace Inference API');
    
    // Endpoint público gratuito do HuggingFace Inference
    const response = await fetch('https://api-inference.huggingface.co/models/meta-llama/Meta-Llama-3-8B-Instruct', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          max_new_tokens: 1024,
          temperature: 0.3,
          return_full_text: false
        }
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Erro na requisição HuggingFace:', errorData);
      
      return new Response(
        JSON.stringify({ error: 'Erro ao processar análise de IA', details: errorData }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    const analysis = data[0]?.generated_text || '';

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

    console.log('Análise de IA concluída com sucesso');
    
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
