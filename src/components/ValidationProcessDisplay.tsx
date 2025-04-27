
import React from 'react';
import ValidationProcess from './ValidationProcess';
import { Card } from './ui/card';

interface ValidationProcessDisplayProps {
  currentStep: number;
}

const ValidationProcessDisplay: React.FC<ValidationProcessDisplayProps> = ({ currentStep }) => {
  return (
    <div className="md:col-span-1">
      <Card className="p-4 bg-card border shadow-sm">
        <h3 className="text-lg font-bold mb-3">Progresso da Validação</h3>
        <ValidationProcess currentStep={currentStep} />
        <div className="mt-4 text-sm text-muted-foreground">
          <p>Passo {currentStep} de 4 concluído</p>
          {currentStep === 4 ? (
            <p className="text-green-600 font-medium mt-2">Validação concluída!</p>
          ) : (
            <p className="mt-2">Continue para completar a validação.</p>
          )}
        </div>
      </Card>
    </div>
  );
};

export default ValidationProcessDisplay;
