
import React from 'react';
import TutorialPage from '@/components/tutorial/TutorialPage';

const SearchTutorial = () => {
  const steps = [
    {
      number: 1,
      title: "O que é o Pesquisador?",
      description: "Sua lupa mágica para o YouTube",
      content: (
        <div className="space-y-2">
          <p>O Pesquisador é como um super microscópio para o YouTube! Ele te ajuda a encontrar 
          vídeos específicos e a entender por que eles estão funcionando bem. Ao invés de apenas 
          pesquisar normalmente no YouTube, esta ferramenta mostra informações especiais que 
          normalmente ficam escondidas.</p>
          
          <p>Com o Pesquisador você pode:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Encontrar vídeos sobre qualquer assunto</li>
            <li>Ver estatísticas secretas sobre cada vídeo</li>
            <li>Descobrir padrões de sucesso</li>
            <li>Salvar suas pesquisas favoritas para consultar depois</li>
          </ul>
        </div>
      )
    },
    {
      number: 2,
      title: "Como Fazer uma Pesquisa Básica",
      description: "Primeiros passos para encontrar tesouros",
      content: (
        <div className="space-y-2">
          <p>Fazer uma pesquisa básica é muito fácil:</p>
          
          <ol className="list-decimal pl-6 space-y-2">
            <li>
              <strong>Vá para a página de Pesquisa:</strong> Clique em "Pesquisar" no menu superior.
            </li>
            <li>
              <strong>Digite uma palavra-chave:</strong> Escreva o tema que você quer pesquisar (ex: "receitas veganas", "minecraft mods").
            </li>
            <li>
              <strong>Selecione o idioma:</strong> Escolha em qual idioma você quer ver os resultados.
            </li>
            <li>
              <strong>Escolha a data:</strong> Decida se quer ver vídeos de qualquer época ou de um período específico.
            </li>
            <li>
              <strong>Clique em "Pesquisar":</strong> E pronto! A ferramenta vai encontrar vídeos que correspondem ao que você procura.
            </li>
          </ol>
          
          <p className="mt-3 p-3 bg-blue-50 rounded-md text-blue-800">
            <strong>Boa dica:</strong> Comece com pesquisas simples de 1-2 palavras para ver mais resultados, depois vá refinando para temas mais específicos!
          </p>
        </div>
      )
    },
    {
      number: 3,
      title: "Pesquisa Avançada",
      description: "Para quem quer resultados super específicos",
      content: (
        <div className="space-y-2">
          <p>Se você quer encontrar vídeos muito específicos, use as opções avançadas:</p>
          
          <div className="space-y-3 mt-3">
            <div className="p-2 bg-slate-50 rounded-md border-l-4 border-slate-400">
              <strong className="text-black">Filtrar por Duração</strong>
              <p className="text-sm text-black">Escolha se quer ver vídeos curtos (menos de 4 minutos), médios (4-10 minutos) ou longos (mais de 10 minutos).</p>
            </div>
            
            <div className="p-2 bg-slate-50 rounded-md border-l-4 border-slate-400">
              <strong className="text-black">Ordenar por</strong>
              <p className="text-sm text-black">Decida se quer ver primeiro os vídeos mais populares, mais recentes ou mais relevantes.</p>
            </div>
            
            <div className="p-2 bg-slate-50 rounded-md border-l-4 border-slate-400">
              <strong className="text-black">Número máximo de resultados</strong>
              <p className="text-sm text-black">Escolha quantos vídeos quer ver (5, 10, 25 ou 50).</p>
            </div>
            
            <div className="p-2 bg-slate-50 rounded-md border-l-4 border-slate-400">
              <strong className="text-black">Filtros de Popularidade</strong>
              <p className="text-sm text-black">Defina um mínimo de visualizações, likes ou comentários para filtrar só os vídeos mais populares.</p>
            </div>
          </div>
        </div>
      )
    },
    {
      number: 4,
      title: "Entendendo os Resultados",
      description: "As informações secretas que você pode ver",
      content: (
        <div className="space-y-2">
          <p>Quando os resultados aparecem, você verá informações super interessantes sobre cada vídeo:</p>
          
          <ul className="list-disc pl-6 space-y-3">
            <li>
              <strong>Título e Thumb:</strong> Como aparece no YouTube.
            </li>
            <li>
              <strong>Taxa de Engajamento:</strong> Um número que mostra o quanto as pessoas interagem com o vídeo (quanto maior, melhor).
            </li>
            <li>
              <strong>Estatísticas:</strong> Visualizações, likes, comentários, tempo desde a publicação.
            </li>
            <li>
              <strong>CPM Estimado:</strong> Uma estimativa de quanto dinheiro esse vídeo pode ganhar por mil visualizações.
            </li>
            <li>
              <strong>Potencial de Crescimento:</strong> Indica se o vídeo tem potencial "Explosivo", "Emergente" ou "Latente".
            </li>
            <li>
              <strong>Nicho Principal:</strong> Em qual categoria o vídeo se encaixa melhor.
            </li>
          </ul>
          
          <p className="mt-4">Você também pode clicar em um vídeo para ver ainda mais detalhes sobre ele!</p>
        </div>
      )
    },
    {
      number: 5,
      title: "Recursos Especiais do Pesquisador",
      description: "Ferramentas extras que fazem a diferença",
      content: (
        <div className="space-y-2">
          <p>O Pesquisador tem recursos especiais que tornam sua pesquisa ainda mais poderosa:</p>
          
          <ul className="list-disc pl-6 space-y-3">
            <li>
              <strong>Salvar Pesquisas:</strong> Guarde suas pesquisas favoritas para consultar novamente no futuro.
            </li>
            <li>
              <strong>Exportar para CSV:</strong> Baixe os resultados em um arquivo que pode ser aberto no Excel ou Google Planilhas.
            </li>
            <li>
              <strong>Exportar para PDF:</strong> Crie um relatório bonito com os resultados da sua pesquisa.
            </li>
            <li>
              <strong>Análise de Audiência:</strong> Veja dados sobre o público que assiste esses vídeos (idade, país, etc).
            </li>
            <li>
              <strong>Sugestões de Canal:</strong> Receba recomendações de tipos de canal que poderiam dar certo com base nos resultados.
            </li>
          </ul>
          
          <p className="mt-3 p-3 bg-purple-50 rounded-md text-purple-800">
            <strong>Super dica:</strong> Faça pesquisas regulares sobre o mesmo tema para acompanhar tendências! O que é popular hoje pode mudar amanhã.
          </p>
        </div>
      )
    }
  ];

  return (
    <TutorialPage
      title="Tutorial do Pesquisador"
      description="Aprenda a usar a ferramenta de pesquisa avançada do YTAnalyzerPro para descobrir os segredos dos vídeos mais populares do YouTube."
      steps={steps}
    />
  );
};

export default SearchTutorial;
