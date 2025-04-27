
import React from 'react';
import { Card } from './ui/card';
import { Check } from 'lucide-react';

interface ValidationProcessProps {
  currentStep: number;
}

const ValidationProcess: React.FC<ValidationProcessProps> = ({ currentStep }) => {
  const steps = [
    'Extraindo canais promissores',
    'Identificando subnichos',
    'Avaliando saturação',
    'Gerando recomendações'
  ];

  return (
    <Card className="p-4">
      <div className="space-y-4">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`flex items-center space-x-3 ${
              index <= currentStep ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            {index < currentStep ? (
              <Check className="h-5 w-5" />
            ) : (
              <div className="h-5 w-5 rounded-full border border-current" />
            )}
            <span>{step}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ValidationProcess;
