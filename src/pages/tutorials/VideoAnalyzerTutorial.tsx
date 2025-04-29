
import React from 'react';
import TutorialPage from '@/components/tutorial/TutorialPage';

const VideoAnalyzerTutorial = () => {
  const steps = [
    {
      number: 1,
      title: "O que é o Analisador de Vídeos?",
      description: "Conheça esta ferramenta poderosa",
      content: (
        <div className="space-y-2">
          <p>O Analisador de Vídeos é uma ferramenta mágica que observa vídeos do YouTube e descobre 
          segredos escondidos neles! Imagina que você é um detetive de vídeos e quer descobrir por 
          que alguns vídeos são super populares.</p>
          
          <p>Esta ferramenta te ajuda a entender:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>O que torna um vídeo interessante para as pessoas</li>
            <li>Quais palavras no título chamam mais atenção</li>
            <li>Como melhorar seus próprios vídeos</li>
          </ul>
        </div>
      )
    },
    {
      number: 2,
      title: "Como Usar o Analisador",
      description: "Passos simples para analisar qualquer vídeo",
      content: (
        <div className="space-y-2">
          <p>Usar o Analisador de Vídeos é super fácil! Siga estes passos:</p>
          
          <ol className="list-decimal pl-6 space-y-2">
            <li>
              <strong>Encontre um vídeo:</strong> Primeiro, vá ao YouTube e encontre um vídeo que você gosta ou quer analisar.
            </li>
            <li>
              <strong>Copie o link:</strong> Clique no botão "Compartilhar" embaixo do vídeo e copie o link.
            </li>
            <li>
              <strong>Cole o link:</strong> Volte para o YTAnalyzerPro, vá até a página do Analisador de Vídeos e cole o link no campo de texto.
            </li>
            <li>
              <strong>Clique em "Analisar":</strong> Aperte o botão azul e espere um pouquinho enquanto nossa ferramenta faz a mágica acontecer!
            </li>
          </ol>
        </div>
      )
    },
    {
      number: 3,
      title: "Entendendo os Resultados",
      description: "O que significam todas aquelas informações?",
      content: (
        <div className="space-y-2">
          <p>Depois que a análise terminar, você verá muitas informações interessantes:</p>
          
          <ul className="list-disc pl-6 space-y-3">
            <li>
              <strong>Informações Básicas:</strong> Mostra o título do vídeo, quem criou, quando foi postado e quantas pessoas assistiram.
            </li>
            <li>
              <strong>Métricas de Engajamento:</strong> São números que mostram quanto as pessoas gostaram do vídeo (likes, comentários, etc).
            </li>
            <li>
              <strong>Análise de Título:</strong> Explica por que o título do vídeo é bom (ou não) para atrair pessoas.
            </li>
            <li>
              <strong>Sugestões de Melhoria:</strong> Dá ideias de como fazer títulos ainda melhores para seus próprios vídeos.
            </li>
          </ul>
        </div>
      )
    },
    {
      number: 4,
      title: "Usando as Informações",
      description: "Como melhorar seus vídeos com o que aprendeu",
      content: (
        <div className="space-y-2">
          <p>Agora que você tem todas essas informações legais, é hora de usá-las:</p>
          
          <ul className="list-disc pl-6 space-y-2">
            <li>Observe quais tipos de títulos atraem mais pessoas</li>
            <li>Veja quais temas são mais populares no seu nicho</li>
            <li>Tente usar as sugestões de variações de título para seus próximos vídeos</li>
            <li>Compare vários vídeos para encontrar padrões de sucesso</li>
          </ul>
          
          <p className="mt-4 p-3 bg-blue-50 rounded-md text-blue-800">
            <strong>Dica de especialista:</strong> Analise pelo menos 5 vídeos diferentes do mesmo tema para encontrar padrões que funcionam bem!
          </p>
        </div>
      )
    },
    {
      number: 5,
      title: "Truques Avançados",
      description: "Para quem quer se tornar um mestre da análise",
      content: (
        <div className="space-y-2">
          <p>Aqui estão algumas ideias avançadas para usar o Analisador de Vídeos como um profissional:</p>
          
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Compare concorrentes:</strong> Analise vídeos de canais semelhantes ao seu para ver o que estão fazendo de bom</li>
            <li><strong>Teste antes de publicar:</strong> Escreva vários títulos e analise cada um para ver qual seria melhor</li>
            <li><strong>Observe tendências:</strong> Analise vídeos populares toda semana para descobrir novos temas em alta</li>
          </ul>
          
          <p className="mt-3">Lembre-se: Quanto mais você analisar, melhor ficará em criar conteúdos incríveis!</p>
        </div>
      )
    }
  ];

  return (
    <TutorialPage
      title="Tutorial do Analisador de Vídeos"
      description="Aprenda como usar o Analisador de Vídeos do YTAnalyzerPro para descobrir os segredos de vídeos populares e melhorar seus próprios conteúdos."
      steps={steps}
    />
  );
};

export default VideoAnalyzerTutorial;
