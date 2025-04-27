
// Tipos para análise de audiência
export interface AudienceProfile {
  top_paises: string[];
  top_faixa_etaria: string;
  genero_majoritario: string;
  retencao_por_segmento: Record<string, number>;
}

export interface MicroSubnicho {
  microsubnicho: string;
  pais: string;
  faixa_etaria: string;
  justificativa: string;
}

export interface PublicationSchedule {
  data_publicacao: string;
  microsubnicho: string;
  titulo_sugerido: string;
}

/**
 * Extrai o perfil da audiência de um canal do YouTube
 * @param canal_id ID do canal do YouTube
 * @param apiKey Chave da API do YouTube
 * @returns Perfil da audiência
 */
export const extrairPerfilAudiencia = async (
  canal_id: string,
  apiKey: string
): Promise<AudienceProfile> => {
  // Em um ambiente real, aqui chamaríamos a API do YouTube
  // Por agora, vamos simular os dados
  console.log(`Extraindo perfil de audiência do canal ${canal_id} com a API key ${apiKey}`);
  
  // Dados simulados para fins de demonstração
  return {
    top_paises: ["Brasil", "México", "Estados Unidos"],
    top_faixa_etaria: "35-44",
    genero_majoritario: "masculino",
    retencao_por_segmento: {
      "18-24": 0.45,
      "25-34": 0.62,
      "35-44": 0.78,
      "45-54": 0.64,
      "55+": 0.41
    }
  };
};

/**
 * Gera micro-subnichos baseados no perfil da audiência
 * @param perfil_audiencia Perfil da audiência
 * @param nicho_principal Nicho principal
 * @param subnicho_atual Subnicho atual
 * @returns Lista de micro-subnichos
 */
export const gerarMicroSubnichosPorAudiencia = (
  perfil_audiencia: AudienceProfile,
  nicho_principal: string,
  subnicho_atual: string
): MicroSubnicho[] => {
  const { top_paises, top_faixa_etaria } = perfil_audiencia;
  
  // Lógica para gerar micro-subnichos
  const microsubnichos: MicroSubnicho[] = [];
  
  // Gerar micro-subnichos para cada país
  for (const pais of top_paises.slice(0, 2)) {
    // Gerar 2-3 micro-subnichos por país
    const temasPorPais = gerarTemasPorPais(pais, nicho_principal, top_faixa_etaria);
    
    for (const tema of temasPorPais) {
      microsubnichos.push({
        microsubnicho: tema.titulo,
        pais,
        faixa_etaria: top_faixa_etaria,
        justificativa: tema.justificativa
      });
    }
  }
  
  return microsubnichos;
};

/**
 * Adapta títulos para focar na audiência
 * @param titulo_base Título base
 * @param top_paises Top países da audiência
 * @param top_faixa_etaria Top faixa etária da audiência
 * @returns Lista de títulos adaptados
 */
export const adaptarTitulosPorAudiencia = (
  titulo_base: string,
  top_paises: string[],
  top_faixa_etaria: string
): string[] => {
  const titulos: string[] = [];
  
  // Adaptar para cada país
  for (const pais of top_paises) {
    // Termos específicos por país
    const termosDoPais = getTermosPorPais(pais);
    
    // Criar 2-3 variações por país
    titulos.push(`${titulo_base} ${termosDoPais[0]} ${pais}`);
    titulos.push(`${termosDoPais[1]} ${titulo_base} - Perfeito para ${pais}`);
    
    // Adicionar variação específica para faixa etária
    titulos.push(`${titulo_base}: Ideal para ${top_faixa_etaria} em ${pais}`);
  }
  
  // Limitar o tamanho dos títulos a 100 caracteres
  return titulos.map(titulo => 
    titulo.length > 100 ? titulo.substring(0, 97) + '...' : titulo
  );
};

/**
 * Planeja um cronograma de publicação baseado em micro-subnichos
 * @param microsubnichos Lista de micro-subnichos
 * @param periodo Período em semanas
 * @param frequencia Frequência de publicação
 * @returns Cronograma de publicação
 */
export const planejarCronogramaPorAudiencia = (
  microsubnichos: MicroSubnicho[],
  periodo: number,
  frequencia: string
): PublicationSchedule[] => {
  const cronograma: PublicationSchedule[] = [];
  const hoje = new Date();
  
  // Calcular intervalo baseado na frequência
  let intervalo = 7; // padrão: semanal
  switch (frequencia) {
    case 'diária':
      intervalo = 1;
      break;
    case 'quinzenal':
      intervalo = 14;
      break;
    case 'mensal':
      intervalo = 30;
      break;
  }
  
  // Distribuir micro-subnichos ao longo do período
  for (let i = 0; i < periodo; i++) {
    for (const microsubnicho of microsubnichos) {
      const dataPublicacao = new Date(hoje);
      dataPublicacao.setDate(hoje.getDate() + i * intervalo);
      
      // Gerar título sugerido
      const tituloSugerido = `${microsubnicho.microsubnicho} - Para ${microsubnicho.pais}`;
      
      cronograma.push({
        data_publicacao: dataPublicacao.toISOString(),
        microsubnicho: microsubnicho.microsubnicho,
        titulo_sugerido: tituloSugerido
      });
    }
  }
  
  return cronograma;
};

// Funções auxiliares

/**
 * Gera temas específicos por país
 */
function gerarTemasPorPais(pais: string, nichoPrincipal: string, faixaEtaria: string): {titulo: string, justificativa: string}[] {
  const temas: {titulo: string, justificativa: string}[] = [];
  
  switch (pais) {
    case "Brasil":
      temas.push({
        titulo: `Segredos do ${nichoPrincipal} que só brasileiros conhecem`,
        justificativa: `Ressonância cultural específica com elementos brasileiros que atraem a faixa ${faixaEtaria}`
      });
      temas.push({
        titulo: `Como ${nichoPrincipal} está revolucionando o Brasil`,
        justificativa: `Foco em tendências locais que interessam especificamente ao público brasileiro na faixa ${faixaEtaria}`
      });
      break;
    case "México":
      temas.push({
        titulo: `${nichoPrincipal} ao estilo mexicano: técnicas exclusivas`,
        justificativa: `Adaptação cultural que cria conexão com o público mexicano na faixa ${faixaEtaria}`
      });
      temas.push({
        titulo: `O segredo mexicano para dominar ${nichoPrincipal}`,
        justificativa: `Apela ao orgulho cultural mexicano, especialmente efetivo para a faixa ${faixaEtaria}`
      });
      break;
    case "Estados Unidos":
      temas.push({
        titulo: `${nichoPrincipal} como os americanos fazem`,
        justificativa: `Utiliza a percepção de inovação americana, atraente para a faixa ${faixaEtaria}`
      });
      temas.push({
        titulo: `Técnicas avançadas de ${nichoPrincipal} dos EUA`,
        justificativa: `Posiciona o conteúdo como avançado e exclusivo, atraente para público americano na faixa ${faixaEtaria}`
      });
      break;
    default:
      temas.push({
        titulo: `${nichoPrincipal} adaptado para ${pais}`,
        justificativa: `Conteúdo geograficamente relevante para o público de ${pais} na faixa ${faixaEtaria}`
      });
  }
  
  return temas;
}

/**
 * Retorna termos culturais específicos por país
 */
function getTermosPorPais(pais: string): string[] {
  switch (pais) {
    case "Brasil":
      return ["exclusivo para", "descubra agora no", "segredo revelado para"];
    case "México":
      return ["especial para", "descubre ahora en", "secreto revelado para"];
    case "Estados Unidos":
      return ["exclusive for", "discover now in", "secret revealed for"];
    default:
      return ["para", "descubra em", "exclusivo para"];
  }
}
