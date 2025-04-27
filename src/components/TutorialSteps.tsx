
import { Card } from './ui/card';

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
      "Varie apenas o micro-subnicho no título (aula 10), mantendo a mesma linha editorial",
      "Monitore o YouTube Analytics: impressões, CTR e recomendações; ajuste títulos conforme o público"
    ]
  },
  {
    number: 7,
    title: "Próximos passos",
    description: "Continue evoluindo seu canal",
    content: [
      "Roteiro e edição: nas próximas aulas você aprenderá técnicas para enriquecer seus vídeos (são responsáveis por ≤10% do resultado)",
      "Micro-subnicho e recorrência: implemente variações internas ao subnicho para fidelizar audiência (revisite a aula #10)",
      "Planejamento e testes: mantenha o ritmo e pivote conforme dados de visualização",
      "Resumo: criar um canal dark é simples, mas configuração não faz o canal bombar — o segredo está em títulos subnichados, micro-subnichos e boa estratégia de conteúdo"
    ]
  }
];

const TutorialSteps = () => {
  return (
    <div className="space-y-8">
      {steps.map((step) => (
        <Card key={step.number} className="p-6 transition-all hover:shadow-md">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-xl font-bold text-primary">{step.number}</span>
            </div>
            <div className="flex-1 space-y-4">
              <div>
                <h3 className="text-xl font-semibold tracking-tight">{step.title}</h3>
                <p className="text-muted-foreground mt-1">{step.description}</p>
              </div>
              <ul className="space-y-2">
                {step.content.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-primary/60 mt-2" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default TutorialSteps;
