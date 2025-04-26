
import React from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { BasicVideoInfo } from '@/types/youtube-types';
import { formatLanguage } from '@/utils/formatters';

interface VideoBasicInfoProps {
  basicInfo: BasicVideoInfo;
}

const VideoBasicInfo = ({ basicInfo }: VideoBasicInfoProps) => {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-bold mb-4">Dados Básicos do Vídeo</h3>
      
      <div className="space-y-6">
        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-1">Título Original</h4>
          <p className="text-lg font-semibold">{basicInfo.title}</p>
        </div>
        
        <Separator />
        
        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-1">Descrição</h4>
          <div className="bg-muted/50 p-3 rounded-md text-sm whitespace-pre-wrap max-h-48 overflow-y-auto">
            {basicInfo.description}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-1">Visualizações</h4>
            <p>{basicInfo.views?.toLocaleString() || "Não disponível"}</p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-1">Data de Publicação</h4>
            <p>{basicInfo.publishDate || "Não disponível"}</p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-1">Duração</h4>
            <p>{basicInfo.duration || "Não disponível"}</p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-1">Idioma Detectado</h4>
            <p>{formatLanguage(basicInfo.language)}</p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-1">Categoria</h4>
            <p>{basicInfo.category || "Não categorizado"}</p>
          </div>
        </div>
        
        {basicInfo.tags && basicInfo.tags.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-2">Tags</h4>
            <div className="flex flex-wrap gap-2">
              {basicInfo.tags.map((tag, index) => (
                <Badge key={index} variant="outline">{tag}</Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default VideoBasicInfo;
