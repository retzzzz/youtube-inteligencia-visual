
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface TitleBadgesProps {
  type?: "dor" | "esperanca" | "curiosidade";
  saturation?: "low" | "medium" | "high";
  language?: "pt" | "en" | "es" | "fr";
}

const TitleBadges = ({ type, saturation, language }: TitleBadgesProps) => {
  return (
    <div className="flex flex-wrap items-center gap-2 mb-1.5">
      {type === "dor" && (
        <Badge variant="outline" className="bg-red-50 text-red-800 border-red-200">
          Dor
        </Badge>
      )}
      {type === "esperanca" && (
        <Badge variant="outline" className="bg-green-50 text-green-800 border-green-200">
          Esperança
        </Badge>
      )}
      {type === "curiosidade" && (
        <Badge variant="outline" className="bg-blue-50 text-blue-800 border-blue-200">
          Curiosidade
        </Badge>
      )}
      
      {saturation === "low" && (
        <Badge className="bg-green-100 text-green-800">
          Baixa Saturação
        </Badge>
      )}
      {saturation === "medium" && (
        <Badge className="bg-yellow-100 text-yellow-800">
          Média Saturação
        </Badge>
      )}
      {saturation === "high" && (
        <Badge className="bg-red-100 text-red-800">
          Alta Saturação
        </Badge>
      )}
      
      {language === "pt" && (
        <Badge variant="secondary" className="text-xs">
          Português
        </Badge>
      )}
      {language === "en" && (
        <Badge variant="secondary" className="text-xs">
          Inglês
        </Badge>
      )}
      {language === "es" && (
        <Badge variant="secondary" className="text-xs">
          Espanhol
        </Badge>
      )}
      {language === "fr" && (
        <Badge variant="secondary" className="text-xs">
          Francês
        </Badge>
      )}
    </div>
  );
};

export default TitleBadges;
