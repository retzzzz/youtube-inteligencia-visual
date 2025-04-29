
import React from 'react';
import TutorialPage from '@/components/tutorial/TutorialPage';

const TitleGeneratorTutorial = () => {
  const steps = [
    {
      number: 1,
      title: "O que é o Gerador de Títulos?",
      description: "A ferramenta que cria títulos mágicos",
      content: (
        <div className="space-y-2">
          <p>O Gerador de Títulos é como uma máquina de criar nomes super legais para seus vídeos! 
          Você coloca algumas palavras sobre o tema do seu vídeo, e a ferramenta cria vários títulos 
          diferentes que podem fazer mais pessoas quererem assistir.</p>
          
          <p>Esta ferramenta te ajuda com:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Criação de títulos que chamam atenção</li>
            <li>Diferentes versões do mesmo título para você escolher</li>
            <li>Ideias novas quando você não sabe o que escrever</li>
            <li>Tradução para outros idiomas</li>
          </ul>
        </div>
      )
    },
    {
      number: 2,
      title: "Como Usar o Gerador",
      description: "Criando títulos incríveis em poucos cliques",
      content: (
        <div className="space-y-2">
          <p>Usar o Gerador de Títulos é muito simples:</p>
          
          <ol className="list-decimal pl-6 space-y-2">
            <li>
              <strong>Vá para a página do Gerador:</strong> Clique em "Títulos" no menu superior.
            </li>
            <li>
              <strong>Digite seu título original:</strong> Escreva um título básico ou algumas palavras-chave sobre seu vídeo.
            </li>
            <li>
              <strong>Escolha o idioma:</strong> Selecione em qual idioma você quer os títulos.
            </li>
            <li>
              <strong>Selecione a emoção:</strong> Escolha se quer títulos que causem curiosidade, esperança ou que falem sobre problemas.
            </li>
            <li>
              <strong>Escolha as estratégias:</strong> Marque quais tipos de variações você deseja.
            </li>
            <li>
              <strong>Clique em "Gerar Títulos":</strong> Aperte o botão e espere a mágica acontecer!
            </li>
          </ol>
        </div>
      )
    },
    {
      number: 3,
      title: "Tipos de Variações",
      description: "Entendendo as diferentes estratégias",
      content: (
        <div className="space-y-2">
          <p>O Gerador oferece diferentes maneiras de criar novos títulos:</p>
          
          <ul className="list-disc pl-6 space-y-3">
            <li>
              <strong>Variações de Estrutura:</strong> Mantém as mesmas palavras-chave, mas reorganiza o título de formas diferentes.
              <p className="text-sm text-muted-foreground">Ex: "Como fazer um bolo" → "Um bolo incrível: aprenda como fazer"</p>
            </li>
            <li>
              <strong>Palavras-chave com Subnicho:</strong> Adiciona palavras específicas para um público mais direcionado.
              <p className="text-sm text-muted-foreground">Ex: "Como fazer um bolo" → "Como fazer um bolo para festas infantis"</p>
            </li>
            <li>
              <strong>Inovação Total:</strong> Cria títulos completamente novos mantendo apenas a ideia principal.
              <p className="text-sm text-muted-foreground">Ex: "Como fazer um bolo" → "Segredos de confeitaria: o bolo perfeito em 5 passos"</p>
            </li>
          </ul>
        </div>
      )
    },
    {
      number: 4,
      title: "Escolhendo o Melhor Título",
      description: "Como encontrar a pérola entre tantas opções",
      content: (
        <div className="space-y-2">
          <p>Quando o gerador terminar, você verá muitos títulos diferentes. Para escolher o melhor:</p>
          
          <ul className="list-disc pl-6 space-y-2">
            <li>Veja quais títulos têm a <strong>marcação de potencial viral</strong> mais alta</li>
            <li>Observe a <strong>competição</strong> para cada título (baixa competição é melhor para começar)</li>
            <li>Leia em voz alta e veja qual soa mais natural e interessante</li>
            <li>Pense em qual título faria <strong>você</strong> querer clicar</li>
          </ul>
          
          <p className="mt-4 p-3 bg-blue-50 rounded-md text-blue-800">
            <strong>Dica importante:</strong> Os melhores títulos geralmente são aqueles que despertam curiosidade ou prometem resolver um problema!
          </p>
        </div>
      )
    },
    {
      number: 5,
      title: "Experimentos e Ajustes",
      description: "Refinando seus títulos para máximo resultado",
      content: (
        <div className="space-y-2">
          <p>Para se tornar um mestre dos títulos:</p>
          
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Teste diferentes emoções:</strong> Gere títulos com "curiosidade", depois com "dor" e compare</li>
            <li><strong>Combine ideias:</strong> Pegue partes de diferentes títulos gerados e crie seu próprio híbrido</li>
            <li><strong>Guarde os favoritos:</strong> Salve títulos que você gostou para inspiração futura</li>
            <li><strong>Analise os resultados:</strong> Depois de publicar vídeos, volte e veja quais títulos funcionaram melhor</li>
          </ul>
          
          <p className="mt-3">Lembre-se: O título perfeito é aquele que é honesto sobre o conteúdo, mas desperta interesse suficiente para as pessoas clicarem!</p>
        </div>
      )
    }
  ];

  return (
    <TutorialPage
      title="Tutorial do Gerador de Títulos"
      description="Aprenda a criar títulos irresistíveis para seus vídeos em poucos cliques com o Gerador de Títulos do YTAnalyzerPro."
      steps={steps}
    />
  );
};

export default TitleGeneratorTutorial;
