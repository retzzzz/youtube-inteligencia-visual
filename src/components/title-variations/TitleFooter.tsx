
import React from 'react';
import { Button } from '@/components/ui/button';

interface TitleFooterProps {
  variationsCount: number;
  totalCount: number;
  onGenerateMore: () => void;
}

const TitleFooter = ({ variationsCount, totalCount, onGenerateMore }: TitleFooterProps) => {
  if (variationsCount === 0) return null;
  
  return (
    <div className="mt-6 text-center">
      <Button onClick={onGenerateMore} variant="outline">
        Gerar mais 10 variações
      </Button>
      <p className="text-sm text-muted-foreground mt-2">
        Total: {totalCount} títulos gerados
      </p>
    </div>
  );
};

export default TitleFooter;
