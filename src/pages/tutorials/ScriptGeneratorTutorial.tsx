
import React from 'react';
import TutorialPage from '@/components/tutorial/TutorialPage';
import { Info } from 'lucide-react';

const ScriptGeneratorTutorial = () => {
  const steps = [
    {
      number: 1,
      title: "O que é o Roteirizador?",
      description: "Sua ferramenta para criar roteiros incríveis",
      content: (
        <div className="space-y-2">
          <p>O Roteirizador é um assistente mágico que te ajuda a criar roteiros para seus vídeos! 
          É como ter um escritor profissional que organiza suas ideias de forma bonita e fácil de seguir.</p>
          
          <p>Com esta ferramenta você pode:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Transformar suas ideias bagunçadas em um roteiro organizado</li>
            <li>Dividir seu texto em blocos fáceis de ler durante a gravação</li>
            <li>Ajustar o tamanho do roteiro para caber no tempo do vídeo</li>
            <li>Criar roteiros totalmente novos a partir de um tema</li>
          </ul>
        </div>
      )
    },
    {
      number: 2,
      title: "Dois Modos Poderosos",
      description: "Escolha a melhor forma de trabalhar",
      content: (
        <div className="space-y-2">
          <p>O Roteirizador tem dois modos diferentes para você usar:</p>
          
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-gradient-to-br from-purple-900/40 to-blue-900/30 border border-purple-500/30">
              <h4 className="font-semibold">Modo 1: Processar Roteiro Existente</h4>
              <p>Use quando você já tem um texto e só quer organizá-lo melhor:</p>
              <ul className="list-disc pl-6">
                <li>Cole seu texto já escrito</li>
                <li>A ferramenta organiza em blocos</li>
                <li>Você pode ajustar tamanhos e formatos</li>
              </ul>
            </div>
            
            <div className="p-4 rounded-lg bg-gradient-to-br from-blue-900/40 to-indigo-900/30 border border-blue-500/30">
              <h4 className="font-semibold">Modo 2: Criar Roteiro Completo</h4>
              <p>Use quando quer criar um roteiro do zero:</p>
              <ul className="list-disc pl-6">
                <li>Informe apenas o tema ou título do vídeo</li>
                <li>A ferramenta cria um roteiro completo</li>
                <li>Você pode personalizar o tom e estilo</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      number: 3,
      title: "Processando um Roteiro Existente",
      description: "Como transformar seu texto em um roteiro perfeito",
      content: (
        <div className="space-y-2">
          <p>Para processar um roteiro que você já escreveu:</p>
          
          <ol className="list-decimal pl-6 space-y-2">
            <li>
              <strong>Selecione "Processar Roteiro Existente"</strong> na primeira tela.
            </li>
            <li>
              <strong>Cole seu texto</strong> na caixa de entrada.
            </li>
            <li>
              <strong>Clique em "Processar"</strong> para que a ferramenta analise seu texto.
            </li>
            <li>
              <strong>Configure as opções:</strong>
              <ul className="list-disc pl-6 mt-1">
                <li>Número de blocos (quanto mais blocos, menor cada parte)</li>
                <li>Caracteres por bloco (controla o tamanho de cada seção)</li>
                <li>Duração alvo (ajuda a calcular o tempo do vídeo)</li>
                <li>Estilo de CTA (chamada para ação)</li>
                <li>Tipo de processamento (simples ou completo)</li>
              </ul>
            </li>
            <li>
              <strong>Clique em "Aplicar"</strong> para gerar o roteiro formatado.
            </li>
            <li>
              <strong>Copie o resultado</strong> ou baixe para usar na gravação.
            </li>
          </ol>
        </div>
      )
    },
    {
      number: 4,
      title: "Criando um Roteiro do Zero",
      description: "Como gerar um roteiro completo com poucos cliques",
      content: (
        <div className="space-y-2">
          <p>Para criar um roteiro totalmente novo:</p>
          
          <ol className="list-decimal pl-6 space-y-2">
            <li>
              <strong>Selecione "Criar Roteiro Completo"</strong> na primeira tela.
            </li>
            <li>
              <strong>Preencha o formulário</strong> com:
              <ul className="list-disc pl-6 mt-1">
                <li>Título ou tema principal do vídeo</li>
                <li>Nicho ou categoria do conteúdo</li>
                <li>Tom de voz (informal, profissional, divertido, etc.)</li>
                <li>Duração desejada do vídeo</li>
                <li>Palavras-chave importantes a incluir</li>
              </ul>
            </li>
            <li>
              <strong>Clique em "Gerar Roteiro"</strong> e aguarde a mágica acontecer!
            </li>
            <li>
              <strong>Revise o roteiro gerado</strong> e faça ajustes se necessário.
            </li>
            <li>
              <strong>Copie ou baixe</strong> para usar na gravação.
            </li>
          </ol>
          
          <div className="mt-4 p-4 rounded-lg bg-gradient-to-br from-green-900/40 to-blue-900/30 border border-green-500/30">
            <div className="flex items-start gap-2">
              <Info className="h-5 w-5 text-green-300 flex-shrink-0 mt-0.5" />
              <p>
                <strong>Super dica:</strong> Mesmo quando a ferramenta gera um roteiro completo, releia e personalize um pouco para adicionar seu próprio estilo!
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      number: 5,
      title: "Recursos Especiais",
      description: "Ferramentas extras que deixam seu roteiro ainda melhor",
      content: (
        <div className="space-y-2">
          <p>O Roteirizador tem recursos extras incríveis:</p>
          
          <ul className="list-disc pl-6 space-y-3">
            <li>
              <strong>Gerador de Prompt-Mestre:</strong> Cria um prompt perfeito para sistemas de IA gerarem imagens ou outros conteúdos baseados no seu roteiro.
            </li>
            <li>
              <strong>Prompts de Imagem:</strong> Sugere descrições específicas para criar imagens para cada parte do seu roteiro.
            </li>
            <li>
              <strong>Conversor para SRT:</strong> Transforma seu roteiro em formato de legenda (útil para adicionar legendas ao vídeo).
            </li>
            <li>
              <strong>Remodelagem de Roteiro:</strong> Reescreve seu roteiro para ficar mais atraente mantendo as mesmas ideias.
            </li>
          </ul>
          
          <div className="mt-3 p-4 rounded-lg bg-gradient-to-br from-amber-900/40 to-red-900/30 border border-amber-500/30">
            <div className="flex items-start gap-2">
              <Info className="h-5 w-5 text-amber-300 flex-shrink-0 mt-0.5" />
              <p>
                <strong>Lembre-se:</strong> Experimente todos esses recursos para descobrir qual funciona melhor para seus vídeos!
              </p>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <TutorialPage
      title="Tutorial do Roteirizador"
      description="Aprenda a criar roteiros perfeitos para seus vídeos, seja organizando suas ideias ou gerando conteúdo completamente novo."
      steps={steps}
    />
  );
};

export default ScriptGeneratorTutorial;
