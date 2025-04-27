
import { Card } from './ui/card';

const steps = [
  {
    number: 1,
    title: "Escolher e validar o nome do canal",
    description: "O primeiro passo é definir seu subnicho e criar um nome único",
    content: [
      "Defina seu subnicho (ex.: \"histórias bíblicas\", \"curiosidades históricas\")",
      "Faça um brainstorm de nomes usando sinônimos e termos emocionais",
      "Verifique a disponibilidade no YouTube e Google",
      "Acerte o idioma conforme seu público-alvo"
    ]
  },
  {
    number: 2,
    title: "Criar a conta e configurar preferências",
    description: "Configure sua conta do YouTube adequadamente",
    content: [
      "Crie um novo Gmail dedicado ao canal",
      "No YouTube, clique em \"Seu canal\" → \"Criar novo canal\"",
      "Defina país de residência como \"Brasil\"",
      "Faça a verificação por telefone para liberar recursos"
    ]
  },
  {
    number: 3,
    title: "Redigir a descrição do canal",
    description: "Crie uma descrição clara e atrativa",
    content: [
      "Boas-vindas e nome do canal",
      "Subnicho e benefício ao público",
      "Call-to-action: \"Inscreva-se\" ou \"Ative o sininho\"",
      "Exemplo: \"Bem-vindo ao Vozes da Escritura! Aqui você encontra as histórias mais inspiradoras da Bíblia...\""
    ]
  },
  // ... outros passos
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
