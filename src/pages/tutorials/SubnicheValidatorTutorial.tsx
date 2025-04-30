import React from 'react';
import TutorialPage from '@/components/tutorial/TutorialPage';

const SubnicheValidatorTutorial = () => {
  const steps = [
    {
      number: 1,
      title: "O que é o Validador de Subnichos?",
      description: "Encontrando os melhores temas para seus vídeos",
      content: (
        <div className="space-y-2">
          <p>O Validador de Subnichos é como um detetive que descobre quais temas específicos 
          dentro de um assunto maior estão funcionando bem no YouTube. Por exemplo, se você 
          quer fazer vídeos sobre "culinária", o validador vai encontrar temas específicos como 
          "receitas sem glúten" ou "doces para festas infantis" que têm mais chance de sucesso.</p>
          
          <p>Esta ferramenta te ajuda a:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Descobrir temas específicos com menos concorrência</li>
            <li>Encontrar ideias que estão crescendo em popularidade</li>
            <li>Evitar temas que já estão muito disputados</li>
            <li>Escolher o melhor caminho para seu canal</li>
          </ul>
        </div>
      )
    },
    {
      number: 2,
      title: "Como Usar o Validador",
      description: "Encontrando ouro entre as pedras",
      content: (
        <div className="space-y-2">
          <p>Usar o Validador de Subnichos é fácil e divertido:</p>
          
          <ol className="list-decimal pl-6 space-y-2">
            <li>
              <strong>Vá para a página do Validador:</strong> Clique em "Validador" no menu superior.
            </li>
            <li>
              <strong>Digite o nicho principal:</strong> Escreva o tema geral que você deseja explorar (ex: "yoga", "games", "maquiagem").
            </li>
            <li>
              <strong>Escolha o idioma:</strong> Selecione em qual idioma você quer focar (português, inglês, espanhol, etc.).
            </li>
            <li>
              <strong>Defina o número máximo de canais:</strong> Decida quantos canais quer analisar (mais canais = análise mais completa, mas mais demorada).
            </li>
            <li>
              <strong>Configure os critérios:</strong> Ajuste os valores mínimos para taxa de crescimento, visualizações e idade dos canais.
            </li>
            <li>
              <strong>Clique em "Validar Subnichos":</strong> A ferramenta vai trabalhar para encontrar as melhores oportunidades!
            </li>
          </ol>
        </div>
      )
    },
    {
      number: 3,
      title: "As Etapas da Validação",
      description: "O que acontece por trás das cortinas",
      content: (
        <div className="space-y-2">
          <p>Quando você clica em "Validar", a ferramenta faz um trabalho em 4 etapas:</p>
          
          <div className="space-y-3 mt-3">
            <div className="p-2 bg-blue-50 rounded-md border-l-4 border-blue-400">
              <strong className="text-black">Etapa 1: Extração de Canais</strong>
              <p className="text-sm text-black">A ferramenta busca canais do YouTube relacionados ao seu nicho principal.</p>
            </div>
            
            <div className="p-2 bg-purple-50 rounded-md border-l-4 border-purple-400">
              <strong className="text-black">Etapa 2: Identificação de Subnichos</strong>
              <p className="text-sm text-black">Ela analisa esses canais para encontrar subnichos específicos dentro do tema.</p>
            </div>
            
            <div className="p-2 bg-green-50 rounded-md border-l-4 border-green-400">
              <strong className="text-black">Etapa 3: Validação com Métricas</strong>
              <p className="text-sm text-black">Cada subnicho é avaliado com base em visualizações, crescimento e outros fatores.</p>
            </div>
            
            <div className="p-2 bg-amber-50 rounded-md border-l-4 border-amber-400">
              <strong className="text-black">Etapa 4: Classificação de Oportunidades</strong>
              <p className="text-sm text-black">Os subnichos são ordenados do mais promissor ao menos interessante.</p>
            </div>
          </div>
          
          <p className="mt-3">Você pode acompanhar o progresso dessas etapas na barra lateral durante a validação.</p>
        </div>
      )
    },
    {
      number: 4,
      title: "Entendendo os Resultados",
      description: "Interpretando as descobertas do validador",
      content: (
        <div className="space-y-2">
          <p>Após a validação, você verá uma lista de subnichos com informações importantes:</p>
          
          <ul className="list-disc pl-6 space-y-3">
            <li>
              <strong>Nome do Subnicho:</strong> O tema específico que foi identificado.
            </li>
            <li>
              <strong>Pontuação:</strong> Um número de 0 a 100 que indica o potencial do subnicho (quanto maior, melhor).
            </li>
            <li>
              <strong>Status:</strong> Indica se o subnicho está "Em Alta", "Estável" ou "Em Queda".
            </li>
            <li>
              <strong>Taxa de Crescimento:</strong> Mostra se o interesse pelo tema está aumentando e quão rápido.
            </li>
            <li>
              <strong>Média de Visualizações:</strong> Quantas visualizações os vídeos deste tema costumam receber.
            </li>
            <li>
              <strong>Competição:</strong> Indica se há muitos ou poucos criadores já fazendo vídeos sobre o tema.
            </li>
          </ul>
          
          <p className="mt-4 p-3 bg-yellow-50 rounded-md text-yellow-800">
            <strong>Dica de ouro:</strong> Procure subnichos com pontuação alta, status "Em Alta" e competição "Baixa" - são as melhores oportunidades!
          </p>
        </div>
      )
    },
    {
      number: 5,
      title: "Usando os Insights para Crescer",
      description: "Transformando dados em sucesso no YouTube",
      content: (
        <div className="space-y-2">
          <p>Agora que você tem esses resultados valiosos, como usá-los?</p>
          
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Escolha 1-3 subnichos:</strong> Foque nos melhores resultados para começar.
            </li>
            <li>
              <strong>Crie uma série de vídeos:</strong> Planeje 3-5 vídeos sobre cada subnicho escolhido.
            </li>
            <li>
              <strong>Use o Gerador de Títulos:</strong> Crie títulos otimizados para cada subnicho.
            </li>
            <li>
              <strong>Monitore os resultados:</strong> Veja qual subnicho funciona melhor para seu canal.
            </li>
            <li>
              <strong>Repita o processo:</strong> A cada poucos meses, valide novamente para encontrar novas oportunidades.
            </li>
          </ul>
          
          <p className="mt-3">Lembre-se: O segredo para crescer no YouTube é encontrar um equilíbrio entre temas que você gosta e temas que têm potencial de crescimento!</p>
        </div>
      )
    }
  ];

  return (
    <TutorialPage
      title="Tutorial do Validador de Subnichos"
      description="Aprenda a descobrir os melhores temas específicos para seu canal do YouTube, encontrando oportunidades com alto potencial e baixa competição."
      steps={steps}
    />
  );
};

export default SubnicheValidatorTutorial;
