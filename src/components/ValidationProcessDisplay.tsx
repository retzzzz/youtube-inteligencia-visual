
import React from 'react';
import ValidationProcess from './ValidationProcess';

interface ValidationProcessDisplayProps {
  currentStep: number;
}

const ValidationProcessDisplay: React.FC<ValidationProcessDisplayProps> = ({ currentStep }) => {
  return (
    <div className="md:col-span-1">
      <ValidationProcess currentStep={currentStep} />
    </div>
  );
};

export default ValidationProcessDisplay;
