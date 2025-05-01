
import React from 'react';
import { Button } from '@/components/ui/button';

interface ErrorStateProps {
  error: string;
  onRetry: () => void;
}

const ErrorState: React.FC<ErrorStateProps> = ({ error, onRetry }) => {
  const handleRetryClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Retry button clicked");
    onRetry();
  };

  return (
    <div className="text-center py-8 z-10">
      <p className="text-blue-300/70 mb-3">{error}</p>
      <Button 
        variant="outline" 
        size="sm"
        onClick={handleRetryClick}
        type="button"
        className="cursor-pointer z-10"
      >
        Tentar Novamente
      </Button>
    </div>
  );
};

export default ErrorState;
