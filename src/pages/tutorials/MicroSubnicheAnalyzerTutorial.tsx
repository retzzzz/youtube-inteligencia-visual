
import React from 'react';
import TutorialPage from '@/components/tutorial/TutorialPage';

const MicroSubnicheAnalyzerTutorial = () => {
  const steps = [
    {
      number: 1,
      title: "O que é o Analisador de Micro-Subnichos?",
      description: "Descobrindo os temas super específicos que funcionam",
      content: (
        <div className="space-y-2">
          <p>O Analisador de Micro-Subnichos é como um super-zoom que foca em temas muito específicos 
          dentro de um subnicho. Enquanto o Validador de Subnichos encontra temas como "receitas veganas", 
          o Analisador de Micro-Subnichos vai mais fundo e encontra temas ultraprecisos como "receitas veganas 
          para café da manhã com apenas 5 ingredientes".</p>
          
          <p>Esta ferramenta poderosa te ajuda a:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Encontrar temas super específicos onde quase ninguém está fazendo vídeos</li>
            <li>Descobrir oportunidades escondidas que seus concorrentes não viram</li>
            <li>Planejar uma série de vídeos sobre micro-temas relacionados</li>
            <li>Criar um calendário de publicações baseado nos melhores micro-subnichos</li>
          </ul>
        </div>
      )
    },
    {
      number: 2,
      title: "O Processo dos 5 Passos",
      description: "Como o analisador trabalha para você",
      content: (
        <div className="space-y-2">
          <p>O Analisador de Micro-Subnichos trabalha em 5 etapas importantes:</p>
          
          <div className="space-y-3 mt-3">
            <div className="p-2 bg-blue-50 rounded-md border-l-4 border-blue-400">
              <strong>1. Extrair</strong>
              <p className="text-sm">Encontra micro-subnichos baseados em um canal ou tema principal que você escolher.</p>
            </div>
            
            <div className="p-2 bg-purple-50 rounded-md border-l-4 border-purple-400">
              <strong>2. Avaliar</strong>
              <p className="text-sm">Analisa cada micro-subnicho para ver como está performando (em alta, estável, em queda).</p>
            </div>
            
            <div className="p-2 bg-green-50 rounded-md border-l-4 border-green-400">
              <strong>3. Recomendar</strong>
              <p className="text-sm">Classifica os micro-subnichos do melhor para o pior com base no potencial.</p>
            </div>
            
            <div className="p-2 bg-amber-50 rounded-md border-l-4 border-amber-400">
              <strong>4. Gerar Títulos</strong>
              <p className="text-sm">Cria sugestões de títulos otimizados para os micro-subnichos recomendados.</p>
            </div>
            
            <div className="p-2 bg-rose-50 rounded-md border-l-4 border-rose-400">
              <strong>5. Planejar Ciclo</strong>
              <p className="text-sm">Organiza um calendário de publicações baseado nos micro-subnichos escolhidos.</p>
            </div>
          </div>
          
          <p className="mt-3">Cada etapa tem sua própria aba na ferramenta, então você pode seguir o processo passo a passo.</p>
        </div>
      )
    },
    {
      number: 3,
      title: "Como Usar - Primeiros Passos",
      description: "Começando sua jornada de micro-nichos",
      content: (
        <div className="space-y-2">
          <p>Vamos começar a usar a ferramenta:</p>
          
          <ol className="list-decimal pl-6 space-y-2">
            <li>
              <strong>Vá para a aba "1. Extrair"</strong> na página do Analisador de Micro-Subnichos.
            </li>
            <li>
              <strong>Digite um ID de canal ou nome de canal</strong> que você admira ou que está no nicho que te interessa.
              <p className="text-xs text-muted-foreground ml-6">O ID de canal é a parte que vem depois de "channel/" em uma URL do YouTube.</p>
            </li>
            <li>
              <strong>Defina o subnicho principal</strong> que você quer explorar (ex: "maquiagem natural", "jogos indie", etc.).
            </li>
            <li>
              <strong>Escolha o número máximo de vídeos</strong> para analisar (mais vídeos = análise mais completa, mas mais demorada).
            </li>
            <li>
              <strong>Clique em "Extrair Micro-Subnichos"</strong> e espere a ferramenta trabalhar!
            </li>
          </ol>
          
          <p className="mt-3">Após a extração, você verá uma lista de micro-subnichos identificados a partir do canal escolhido.</p>
        </div>
      )
    },
    {
      number: 4,
      title: "Avaliando e Selecionando os Melhores",
      description: "Separando o joio do trigo",
      content: (
        <div className="space-y-2">
          <p>Com os micro-subnichos extraídos, vamos avaliar e identificar os melhores:</p>
          
          <ol className="list-decimal pl-6 space-y-2">
            <li>
              <strong>Vá para a aba "2. Avaliar"</strong> após completar a extração.
            </li>
            <li>
              <strong>Defina o período de dias</strong> para análise (ex: últimos 7 dias, 30 dias, etc.).
            </li>
            <li>
              <strong>Clique em "Avaliar Micro-Subnichos"</strong> para que a ferramenta analise cada um.
            </li>
            <li>
              <strong>Observe os resultados</strong>, prestando atenção especial ao:
              <ul className="list-disc pl-6 mt-1">
                <li><strong>Status:</strong> Em Alta 🔥 (ótimo), Estável ⚖️ (bom) ou Em Queda 📉 (evite)</li>
                <li><strong>Pontuação:</strong> De 0-100, quanto maior melhor</li>
                <li><strong>Tendência:</strong> Se o interesse está crescendo ou diminuindo</li>
              </ul>
            </li>
            <li>
              <strong>Vá para a aba "3. Recomendar"</strong> depois de completar a avaliação.
            </li>
            <li>
              <strong>Escolha quantos micro-subnichos</strong> você quer recomendar (normalmente 3-5 é um bom número).
            </li>
            <li>
              <strong>Clique em "Recomendar Micro-Subnichos"</strong> para obter a lista dos melhores.
            </li>
          </ol>
        </div>
      )
    },
    {
      number: 5,
      title: "Planejando o Conteúdo",
      description: "Transformando análises em um plano de ação",
      content: (
        <div className="space-y-2">
          <p>Agora que você tem os melhores micro-subnichos, é hora de planejar o conteúdo:</p>
          
          <ol className="list-decimal pl-6 space-y-2">
            <li>
              <strong>Vá para a aba "4. Gerar Títulos"</strong> e trabalhe com os micro-subnichos recomendados.
            </li>
            <li>
              <strong>Digite um título base</strong> que você quer usar como modelo.
            </li>
            <li>
              <strong>Escolha quantas variações</strong> você quer gerar para cada micro-subnicho.
            </li>
            <li>
              <strong>Clique em "Gerar Títulos"</strong> e veja as sugestões criadas especialmente para cada micro-subnicho.
            </li>
            <li>
              <strong>Vá para a aba "5. Planejar Ciclo"</strong> para criar seu calendário de publicações.
            </li>
            <li>
              <strong>Escolha a frequência</strong> de publicação (diária, semanal, quinzenal, etc.).
            </li>
            <li>
              <strong>Defina quantos ciclos</strong> você deseja planejar.
            </li>
            <li>
              <strong>Clique em "Planejar Ciclo"</strong> para criar um calendário completo de publicações baseado nos micro-subnichos recomendados.
            </li>
          </ol>
          
          <p className="mt-4 p-3 bg-indigo-50 rounded-md text-indigo-800">
            <strong>Conselho de especialista:</strong> Comece com um plano de 4-8 semanas focado nos 3 melhores micro-subnichos. Publique de forma consistente e observe quais temas performam melhor antes de planejar o próximo ciclo!
          </p>
        </div>
      )
    }
  ];

  return (
    <TutorialPage
      title="Tutorial do Analisador de Micro-Subnichos"
      description="Aprenda a encontrar oportunidades ultraprecisas que seus concorrentes não conhecem e a criar um plano de conteúdo otimizado para crescimento."
      steps={steps}
    />
  );
};

export default MicroSubnicheAnalyzerTutorial;
