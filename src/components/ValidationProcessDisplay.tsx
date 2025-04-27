
import React from 'react';
import ValidationProcess from './ValidationProcess';
import { Card } from './ui/card';

interface ValidationProcessDisplayProps {
  currentStep: number;
}

const ValidationProcessDisplay: React.FC<ValidationProcessDisplayProps> = ({ currentStep }) => {
  return (
    <div className="md:col-span-1">
      <Card className="p-4">
        <h3 className="text-lg font-bold mb-3">Progresso da Validação</h3>
        <ValidationProcess currentStep={currentStep} />
      </Card>
    </div>
  );
};

export default ValidationProcessDisplay;
