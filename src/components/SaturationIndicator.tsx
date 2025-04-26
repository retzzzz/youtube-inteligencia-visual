
import React from 'react';
import { CircleCheck, CircleAlert, CircleX } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from './ui/alert';
import { Badge } from './ui/badge';

interface SaturationIndicatorProps {
  status: 'low' | 'medium' | 'high';
  message: string;
  count: number;
  keyword: string;
}

const SaturationIndicator = ({ status, message, count, keyword }: SaturationIndicatorProps) => {
  const getIcon = () => {
    switch (status) {
      case 'low':
        return <CircleCheck className="h-5 w-5 text-green-500" />;
      case 'medium':
        return <CircleAlert className="h-5 w-5 text-yellow-500" />;
      case 'high':
        return <CircleX className="h-5 w-5 text-red-500" />;
    }
  };

  const getBadgeColor = () => {
    switch (status) {
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100';
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100';
    }
  };

  return (
    <Alert className="mt-4 backdrop-blur-sm bg-white/30 dark:bg-gray-900/30 border border-gray-200/50 dark:border-gray-700/50 shadow-lg animate-fade-in">
      <div className="flex items-center gap-2">
        {getIcon()}
        <AlertTitle className="mb-0">
          Análise de Saturação: "{keyword}"
        </AlertTitle>
        <Badge className={`ml-2 ${getBadgeColor()}`}>
          {count} vídeos
        </Badge>
      </div>
      <AlertDescription className="mt-2">
        {message}
      </AlertDescription>
    </Alert>
  );
};

export default SaturationIndicator;
