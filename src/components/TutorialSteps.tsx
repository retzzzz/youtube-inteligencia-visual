
import { Card } from './ui/card';
import { CheckCircle, Info } from 'lucide-react';

const steps = [
  {
    number: 1,
    title: "Escolher e validar o nome do canal",
    description: "Defina seu subnicho e crie um nome único",
    content: [
      "Defina seu subnicho (ex.: \"histórias bíblicas\", \"curiosidades históricas\")",
      "Brainstorm de nomes: use sinônimos, termos emocionais e referências ao tema (ex.: \"Relatos Eternos\", \"Vozes da Escritura\")",
      "Verifique disponibilidade: no YouTube e no Google — seu nome não pode colidir com canais grandes já existentes",
      "Acerte o idioma: escreva em português, espanhol ou inglês conforme seu público-alvo"
    ]
  },
  {
    number: 2,
    title: "Criar a conta e configurar preferências básicas",
    description: "Configure sua conta corretamente desde o início",
    content: [
      "Acesse accounts.google.com e crie um novo Gmail dedicado ao canal",
      "No YouTube, clique em \"Seu canal\" → \"Criar novo canal\"",
      "País de residência: defina como \"Brasil\" (obrigatório para o Programa de Parcerias)",
      "Em Configurações → Canal → Status e recursos, faça a verificação por telefone para liberar uploads mais longos e monetização"
    ]
  },
  {
    number: 3,
    title: "Redigir a descrição do canal",
    description: "Objetivo: comunicar de cara o que o espectador vai encontrar",
    content: [
      "Estrutura sugerida (150–200 caracteres)",
      "Boas-vindas e nome do canal",
      "Subnicho e benefício ao público",
      "Call-to-action: \"Inscreva-se\" ou \"Ative o sininho\"",
      "Exemplo: \"Bem-vindo ao Vozes da Escritura! Aqui você encontra as histórias mais inspiradoras da Bíblia, narradas de forma clara e emocionante. Inscreva-se e ative as notificações!\""
    ]
  },
  {
    number: 4,
    title: "Gerar logo e banner com AI",
    description: "Use ferramentas de IA para criar sua identidade visual",
    content: [
      "Logo (800×800 px): \"Crie um logo minimalista para canal 'Vozes da Escritura', mostrando um livro aberto e uma cruz, em tons escuros e dourado, estilo vetorial.\"",
      "Banner (2560×1440 px): \"Banner YouTube com fundo de céu estrelado, pergaminho ao centro, com o logo 'Vozes da Escritura' e slogan 'Histórias que ecoam para sempre.'\"",
      "Dica: use o Canva para ajustar margens \"safe area\" antes de subir ao YouTube"
    ]
  },
  {
    number: 5,
    title: "Publicar o primeiro vídeo",
    description: "Configure corretamente seu primeiro conteúdo",
    content: [
      "Na área YouTube Studio → Conteúdo, clique em \"Criar → Enviar vídeo\"",
      "Título: seja claro e subniche seu conteúdo (ex.: \"5 Lições Eternas da História de Davi\") — o título é o seu principal gancho!",
      "Descrição do vídeo: breve resumo, links úteis e CTA para inscrever-se",
      "Tags e categorias: inclua palavras-chave do subnicho",
      "Miniatura: use imagem gerada por AI ou montagem simples destacando o tema principal"
    ]
  },
  {
    number: 6,
    title: "Rotina inicial de 15 vídeos",
    description: "Estabeleça uma base sólida antes de avaliar resultados",
    content: [
      "Meta: poste 15 vídeos focados no seu subnicho antes de avaliar performance",
      "Varie apenas o micro-subnicho no título, mantendo a mesma linha editorial",
      "Monitore o YouTube Analytics: impressões, CTR e recomendações; ajuste títulos conforme o público"
    ]
  },
  {
    number: 7,
    title: "Próximos passos",
    description: "Continue evoluindo seu canal",
    content: [
      "Roteiro e edição: nas próximas aulas você aprenderá técnicas para enriquecer seus vídeos (são responsáveis por ≤10% do resultado)",
      "Micro-subnicho e recorrência: implemente variações internas ao subnicho para fidelizar audiência",
      "Planejamento e testes: mantenha o ritmo e pivote conforme dados de visualização",
      "Resumo: criar um canal dark é simples, mas configuração não faz o canal bombar — o segredo está em títulos subnichados, micro-subnichos e boa estratégia de conteúdo. Agora é mão na massa!"
    ]
  }
];

const TutorialSteps = () => {
  return (
    <div className="space-y-8">
      {steps.map((step) => (
        <Card 
          key={step.number} 
          className="p-6 transition-all hover:shadow-lg border border-slate-700/50 bg-slate-800/30 backdrop-blur-sm"
        >
          <div className="space-y-4">
            <div className="border-b border-slate-700/50 pb-3">
              <div className="flex items-center gap-3">
                <div className="text-xl font-semibold text-primary">
                  {step.number}.
                </div>
                <div>
                  <h3 className="text-xl font-semibold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-300">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground mt-1">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-3 pl-6">
              {step.content.map((item, index) => (
                <div key={index} className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-400 flex-shrink-0 mt-1" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            
            {step.number === 1 && (
              <div className="mt-2 p-4 rounded-lg bg-gradient-to-br from-purple-900/20 to-blue-900/10 border border-purple-500/30 ml-6">
                <div className="flex items-start gap-2">
                  <Info className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                  <p className="text-black">
                    <strong>Dica de especialista:</strong> Ao escolher seu subnicho, procure temas com baixa concorrência mas alta demanda. Use o Validador de Subnichos para encontrar essas oportunidades!
                  </p>
                </div>
              </div>
            )}
            
            {step.number === 5 && (
              <div className="mt-2 p-4 rounded-lg bg-gradient-to-br from-amber-900/20 to-red-900/10 border border-amber-500/30 ml-6">
                <div className="flex items-start gap-2">
                  <Info className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <p className="text-black">
                    <strong>Importante:</strong> Seu título e miniatura são responsáveis por mais de 80% dos cliques! Invista tempo para criar combinações impactantes usando o Gerador de Títulos.
                  </p>
                </div>
              </div>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
};

export default TutorialSteps;
