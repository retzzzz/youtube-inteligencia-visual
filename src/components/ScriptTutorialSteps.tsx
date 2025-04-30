
import { Card } from './ui/card';
import { CheckCircle, Info } from 'lucide-react';

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
      <div className="space-y-4 mb-8">
        <h1 className="text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
          Como Criar um Roteiro para seu Canal Dark
        </h1>
        <p className="text-muted-foreground text-lg">
          95% do sucesso vem de nicho, subnicho e títulos bem pensados; o roteiro é apenas 5%, mas bem feito garante mais vídeos entregues e mais engajamento.
        </p>
      </div>

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
              
              {step.number === 3 && (
                <div className="mt-2 p-4 rounded-lg bg-gradient-to-br from-blue-900/20 to-purple-900/10 border border-blue-500/30 ml-6">
                  <div className="flex items-start gap-2">
                    <Info className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <p className="text-blue-300">
                      <strong>Dica:</strong> A introdução é crucial! Os primeiros 15 segundos decidem se o espectador continuará assistindo. Use um gatilho emocional forte relacionado ao tema.
                    </p>
                  </div>
                </div>
              )}
              
              {step.number === 6 && (
                <div className="mt-2 p-4 rounded-lg bg-gradient-to-br from-green-900/20 to-blue-900/10 border border-green-500/30 ml-6">
                  <div className="flex items-start gap-2">
                    <Info className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <p className="text-green-300">
                      <strong>Conselho profissional:</strong> Antes de finalizar, sempre inclua uma call-to-action forte no fechamento do roteiro. Algo como "Se esse vídeo te ajudou, deixe seu like e se inscreva para mais conteúdo sobre [tema]".
                    </p>
                  </div>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ScriptTutorialSteps;
