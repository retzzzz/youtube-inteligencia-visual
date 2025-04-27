
import { Card } from './ui/card';

const steps = [
  {
    number: 1,
    title: "Comece pelo Título",
    description: "Defina estrutura e crie variações",
    content: [
      "Defina um título claro e subnichado, ex.:",
      "\"Jesus explica como deves orar\"",
      "Crie variações que mantenham a mesma estrutura e significado, mas sejam únicas."
    ]
  },
  {
    number: 2,
    title: "Gere os Tópicos Principais",
    description: "Use IA para criar estrutura base",
    content: [
      "No ChatGPT, peça algo como:",
      "\"Liste 10–15 tópicos para um vídeo sobre 'Jesus explica como deves orar'.\"",
      "Esses tópicos serão os capítulos do seu roteiro."
    ]
  },
  {
    number: 3,
    title: "Crie uma Introdução com Chamada de Engajamento",
    description: "Engaje desde o primeiro segundo",
    content: [
      "Logo após o título, inclua uma introdução curta que:",
      "Conecte com a dor/interesse (\"Já se perguntou se ora do jeito certo?\")",
      "Peça um comentário (\"Comente ▪️ se você sente paz ao orar\")",
      "Isso estimula o engajamento desde o primeiro segundo."
    ]
  },
  {
    number: 4,
    title: "Desenvolva Cada Seção",
    description: "Expanda o conteúdo com IA",
    content: [
      "Para cada tópico:",
      "Peça ao AI:",
      "\"Escreva um parágrafo explicando [tópico X] e convide a audiência a reagir nos comentários.\"",
      "Ajuste o tom: mais emocional para nichos religiosos, mais direto para curiosidades, etc."
    ]
  },
  {
    number: 5,
    title: "Controle a Duração",
    description: "Mantenha o tempo ideal",
    content: [
      "Conte caracteres ou use ferramenta de voz (ex.: ElevenLabs) para estimar minutos.",
      "Quando atingir sua meta (5 min, 20 min…), pare de gerar novas seções."
    ]
  },
  {
    number: 6,
    title: "Revise e Exporte",
    description: "Finalize e organize o conteúdo",
    content: [
      "Remova numeração interna, ajuste emojis ou bullet points.",
      "Agrupe tudo numa sequência lógica: título → intro → seções → encerramento com CTA."
    ]
  }
];

const ScriptTutorialSteps = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl font-bold tracking-tight">
          Como Criar um Roteiro para seu Canal Dark
        </h1>
        <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
          95% do sucesso vem de nicho, subnicho e títulos bem pensados; o roteiro é apenas 5%, mas bem feito garante mais vídeos entregues e mais engajamento.
        </p>
      </div>

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
    </div>
  );
};

export default ScriptTutorialSteps;
