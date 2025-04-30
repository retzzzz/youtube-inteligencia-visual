
import React from 'react';
import TutorialPage from '@/components/tutorial/TutorialPage';
import { ArrowRight, CheckCircle, Info } from 'lucide-react';

const MicroSubnicheAnalyzerTutorial = () => {
  const steps = [
    {
      number: 1,
      title: "O que é o Analisador de Micro-Subnichos?",
      description: "Descobrindo os temas super específicos que funcionam",
      content: (
        <div className="space-y-4">
          <p>O Analisador de Micro-Subnichos é como um super-zoom que foca em temas muito específicos 
          dentro de um subnicho. Enquanto o Validador de Subnichos encontra temas como "receitas veganas", 
          o Analisador de Micro-Subnichos vai mais fundo e encontra temas ultraprecisos como "receitas veganas 
          para café da manhã com apenas 5 ingredientes".</p>
          
          <div className="p-4 bg-blue-900/20 border border-blue-700/30 rounded-lg">
            <h4 className="font-medium mb-2 text-blue-300">Esta ferramenta te ajuda a:</h4>
            <ul className="space-y-1.5">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <span>Encontrar temas super específicos onde quase ninguém está fazendo vídeos</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <span>Descobrir oportunidades escondidas que seus concorrentes não viram</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <span>Planejar uma série de vídeos sobre micro-temas relacionados</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <span>Criar um calendário de publicações baseado nos melhores micro-subnichos</span>
              </li>
            </ul>
          </div>
        </div>
      )
    },
    {
      number: 2,
      title: "O Processo dos 5 Passos",
      description: "Como o analisador trabalha para você",
      content: (
        <div className="space-y-4">
          <p>O Analisador de Micro-Subnichos trabalha em 5 etapas importantes:</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="p-4 rounded-lg border-l-4 border-blue-500 bg-gradient-to-r from-blue-900/30 to-blue-900/10">
              <h4 className="font-medium text-blue-300 mb-1">1. Extrair</h4>
              <p>Encontra micro-subnichos baseados em um canal ou tema principal que você escolher.</p>
            </div>
            
            <div className="p-4 rounded-lg border-l-4 border-purple-500 bg-gradient-to-r from-purple-900/30 to-purple-900/10">
              <h4 className="font-medium text-purple-300 mb-1">2. Avaliar</h4>
              <p>Analisa cada micro-subnicho para ver como está performando (em alta, estável, em queda).</p>
            </div>
            
            <div className="p-4 rounded-lg border-l-4 border-green-500 bg-gradient-to-r from-green-900/30 to-green-900/10">
              <h4 className="font-medium text-green-300 mb-1">3. Recomendar</h4>
              <p>Classifica os micro-subnichos do melhor para o pior com base no potencial.</p>
            </div>
            
            <div className="p-4 rounded-lg border-l-4 border-amber-500 bg-gradient-to-r from-amber-900/30 to-amber-900/10">
              <h4 className="font-medium text-amber-300 mb-1">4. Gerar Títulos</h4>
              <p>Cria sugestões de títulos otimizados para os micro-subnichos recomendados.</p>
            </div>
          </div>
          
          <div className="p-4 rounded-lg border-l-4 border-rose-500 bg-gradient-to-r from-rose-900/30 to-rose-900/10">
            <h4 className="font-medium text-rose-300 mb-1">5. Planejar Ciclo</h4>
            <p>Organiza um calendário de publicações baseado nos micro-subnichos escolhidos.</p>
          </div>
          
          <div className="flex items-center gap-2 text-blue-300 mt-2">
            <Info className="h-4 w-4" />
            <span className="text-sm">Cada etapa tem sua própria aba na ferramenta, permitindo seguir o processo passo a passo.</span>
          </div>
        </div>
      )
    },
    {
      number: 3,
      title: "Como Usar - Primeiros Passos",
      description: "Começando sua jornada de micro-nichos",
      content: (
        <div className="space-y-4">
          <p>Vamos começar a usar a ferramenta:</p>
          
          <div className="space-y-4">
            <div className="flex gap-3 items-start">
              <div className="bg-blue-900/40 text-blue-300 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5">1</div>
              <div>
                <p className="font-medium">Vá para a aba "1. Extrair" na página do Analisador de Micro-Subnichos.</p>
              </div>
            </div>
            
            <div className="flex gap-3 items-start">
              <div className="bg-blue-900/40 text-blue-300 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5">2</div>
              <div>
                <p className="font-medium">Digite um ID de canal ou nome de canal que você admira ou que está no nicho que te interessa.</p>
                <p className="text-sm text-muted-foreground mt-1">O ID de canal é a parte que vem depois de "channel/" em uma URL do YouTube.</p>
              </div>
            </div>
            
            <div className="flex gap-3 items-start">
              <div className="bg-blue-900/40 text-blue-300 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5">3</div>
              <div>
                <p className="font-medium">Defina o subnicho principal que você quer explorar.</p>
                <p className="text-sm text-muted-foreground mt-1">Exemplos: "maquiagem natural", "jogos indie", "receitas low carb"</p>
              </div>
            </div>
            
            <div className="flex gap-3 items-start">
              <div className="bg-blue-900/40 text-blue-300 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5">4</div>
              <div>
                <p className="font-medium">Escolha o número máximo de vídeos para analisar.</p>
                <p className="text-sm text-muted-foreground mt-1">Mais vídeos = análise mais completa, mas mais demorada. Comece com 20-30.</p>
              </div>
            </div>
            
            <div className="flex gap-3 items-start">
              <div className="bg-blue-900/40 text-blue-300 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5">5</div>
              <div>
                <p className="font-medium">Clique em "Extrair Micro-Subnichos" e espere a ferramenta trabalhar!</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 p-3 border border-dashed border-blue-500/30 rounded-lg bg-blue-500/5 text-blue-300">
            <ArrowRight className="h-5 w-5" />
            <span>Após a extração, você verá uma lista de micro-subnichos identificados a partir do canal escolhido.</span>
          </div>
        </div>
      )
    },
    {
      number: 4,
      title: "Avaliando e Selecionando os Melhores",
      description: "Separando o joio do trigo",
      content: (
        <div className="space-y-4">
          <p>Com os micro-subnichos extraídos, vamos avaliar e identificar os melhores:</p>
          
          <div className="space-y-4">
            <div className="flex gap-3 items-start">
              <div className="bg-purple-900/40 text-purple-300 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5">1</div>
              <div>
                <p className="font-medium">Vá para a aba "2. Avaliar" após completar a extração.</p>
              </div>
            </div>
            
            <div className="flex gap-3 items-start">
              <div className="bg-purple-900/40 text-purple-300 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5">2</div>
              <div>
                <p className="font-medium">Defina o período de dias para análise.</p>
                <p className="text-sm text-muted-foreground mt-1">Recomendamos analisar os últimos 30 dias para ter uma visão completa.</p>
              </div>
            </div>
            
            <div className="flex gap-3 items-start">
              <div className="bg-purple-900/40 text-purple-300 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5">3</div>
              <div>
                <p className="font-medium">Clique em "Avaliar Micro-Subnichos" para que a ferramenta analise cada um.</p>
              </div>
            </div>
            
            <div className="flex gap-3 items-start">
              <div className="bg-purple-900/40 text-purple-300 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5">4</div>
              <div>
                <p className="font-medium">Observe os resultados, prestando atenção especial ao:</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2">
                  <div className="p-3 rounded-lg bg-gradient-to-br from-green-900/20 to-transparent border border-green-600/30">
                    <div className="font-medium text-green-400">Status</div>
                    <div className="text-sm">
                      Em Alta 🔥 (ótimo)<br/>
                      Estável ⚖️ (bom)<br/>
                      Em Queda 📉 (evite)
                    </div>
                  </div>
                  
                  <div className="p-3 rounded-lg bg-gradient-to-br from-blue-900/20 to-transparent border border-blue-600/30">
                    <div className="font-medium text-blue-400">Pontuação</div>
                    <div className="text-sm">
                      De 0-100, quanto maior melhor<br/>
                      Acima de 70 é excelente
                    </div>
                  </div>
                  
                  <div className="p-3 rounded-lg bg-gradient-to-br from-amber-900/20 to-transparent border border-amber-600/30">
                    <div className="font-medium text-amber-400">Tendência</div>
                    <div className="text-sm">
                      Se o interesse está crescendo ou diminuindo ao longo do tempo
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3 items-start">
              <div className="bg-purple-900/40 text-purple-300 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5">5</div>
              <div>
                <p className="font-medium">Vá para a aba "3. Recomendar" depois de completar a avaliação.</p>
              </div>
            </div>
            
            <div className="flex gap-3 items-start">
              <div className="bg-purple-900/40 text-purple-300 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5">6</div>
              <div>
                <p className="font-medium">Escolha quantos micro-subnichos você quer recomendar e clique em "Recomendar Micro-Subnichos".</p>
                <p className="text-sm text-muted-foreground mt-1">Normalmente 3-5 é um bom número para começar um plano de conteúdo.</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      number: 5,
      title: "Planejando o Conteúdo",
      description: "Transformando análises em um plano de ação",
      content: (
        <div className="space-y-4">
          <p>Agora que você tem os melhores micro-subnichos, é hora de planejar o conteúdo:</p>
          
          <div className="space-y-4 mb-4">
            <div className="flex gap-3 items-start">
              <div className="bg-amber-900/40 text-amber-300 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5">1</div>
              <div>
                <p className="font-medium">Vá para a aba "4. Gerar Títulos" e trabalhe com os micro-subnichos recomendados.</p>
              </div>
            </div>
            
            <div className="flex gap-3 items-start">
              <div className="bg-amber-900/40 text-amber-300 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5">2</div>
              <div>
                <p className="font-medium">Digite um título base que você quer usar como modelo.</p>
                <p className="text-sm text-muted-foreground mt-1">Exemplo: "Como fazer [micro-subnicho] em casa"</p>
              </div>
            </div>
            
            <div className="flex gap-3 items-start">
              <div className="bg-amber-900/40 text-amber-300 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5">3</div>
              <div>
                <p className="font-medium">Escolha quantas variações você quer gerar para cada micro-subnicho.</p>
                <p className="text-sm text-muted-foreground mt-1">Recomendamos 5-10 variações para ter boas opções.</p>
              </div>
            </div>
            
            <div className="flex gap-3 items-start">
              <div className="bg-amber-900/40 text-amber-300 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5">4</div>
              <div>
                <p className="font-medium">Clique em "Gerar Títulos" e veja as sugestões criadas.</p>
              </div>
            </div>
            
            <div className="flex gap-3 items-start">
              <div className="bg-amber-900/40 text-amber-300 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5">5</div>
              <div>
                <p className="font-medium">Vá para a aba "5. Planejar Ciclo" para criar seu calendário de publicações.</p>
              </div>
            </div>
            
            <div className="flex gap-3 items-start">
              <div className="bg-amber-900/40 text-amber-300 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5">6</div>
              <div>
                <p className="font-medium">Escolha a frequência de publicação e quantos ciclos você deseja planejar.</p>
                <p className="text-sm text-muted-foreground mt-1">Opções comuns: diária, 3x por semana, semanal</p>
              </div>
            </div>
            
            <div className="flex gap-3 items-start">
              <div className="bg-amber-900/40 text-amber-300 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5">7</div>
              <div>
                <p className="font-medium">Clique em "Planejar Ciclo" para criar um calendário completo de publicações.</p>
              </div>
            </div>
          </div>
          
          <div className="p-4 rounded-lg bg-gradient-to-br from-indigo-900/30 to-purple-900/10 border border-indigo-500/30">
            <h4 className="text-lg font-medium text-indigo-300 mb-2">Conselho de especialista:</h4>
            <p className="text-indigo-100">
              Comece com um plano de 4-8 semanas focado nos 3 melhores micro-subnichos. Publique de forma consistente e observe quais temas performam melhor antes de planejar o próximo ciclo!
            </p>
            
            <div className="mt-3 p-3 bg-indigo-500/10 border border-indigo-500/20 rounded">
              <h5 className="font-medium text-indigo-300">Fórmula para sucesso:</h5>
              <ul className="mt-2 space-y-1">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-indigo-400 flex-shrink-0 mt-0.5" />
                  <span>Escolha 3 micro-subnichos com pontuação acima de 65</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-indigo-400 flex-shrink-0 mt-0.5" />
                  <span>Gere pelo menos 2-3 vídeos para cada micro-subnicho</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-indigo-400 flex-shrink-0 mt-0.5" />
                  <span>Publique em intervalos regulares (mesmo dia/hora)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-indigo-400 flex-shrink-0 mt-0.5" />
                  <span>Após 4 semanas, analise os resultados e ajuste sua estratégia</span>
                </li>
              </ul>
            </div>
          </div>
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
