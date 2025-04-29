
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { VideoAnalysis } from '@/types/youtube-types';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import SaturationIndicator from './SaturationIndicator';
import VideoBasicInfo from './VideoBasicInfo';
import TitleVariations from './TitleVariations';
import ScriptIdeas from './ScriptIdeas';
import ImagePrompts from './ImagePrompts';
import SubNicheIdeas from './SubNicheIdeas';
import TitleStructureAnalysis from './title-analyzer/TitleStructureAnalysis';
import TitleVariationsLevels from './title-analyzer/TitleVariationsLevels';
import { analyzeTitleStructure } from '@/utils/titleStructuralAnalysis';
import { generateAllVariationLevels } from '@/utils/titleVariations';

interface VideoAnalysisResultsProps {
  analysis: VideoAnalysis;
}

const VideoAnalysisResults = ({ analysis }: VideoAnalysisResultsProps) => {
  // Determine content language from video info
  const contentLanguage = analysis.basicInfo.language || 'pt';
  
  // Analisar estrutura do título
  const titleStructure = analyzeTitleStructure(analysis.basicInfo.title);
  
  // Gerar variações de título em três níveis, baseadas no idioma original
  const titleVariations = generateAllVariationLevels(
    analysis.basicInfo.title, 
    titleStructure, 
    contentLanguage
  );

  return (
    <div className="space-y-6 mb-10 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold">Análise Completa</h2>
          <p className="text-muted-foreground">Resultados da análise para seu vídeo</p>
        </div>
        
        {analysis.saturation && (
          <SaturationIndicator
            status={analysis.saturation.status}
            message={analysis.saturation.message}
            count={analysis.saturation.count}
            keyword={analysis.basicInfo.title}
          />
        )}
      </div>

      <Tabs defaultValue="basic-info" className="w-full">
        <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-4">
          <TabsTrigger value="basic-info">🔎 Dados Básicos</TabsTrigger>
          <TabsTrigger value="title-variations">🎯 Variações de Título</TabsTrigger>
          <TabsTrigger value="script-ideas">📝 Ideias de Roteiro</TabsTrigger>
          <TabsTrigger value="image-prompts">🎨 Thumbnails</TabsTrigger>
          <TabsTrigger value="sub-niches">📊 Subnichos</TabsTrigger>
          <TabsTrigger value="saturation">⚡ Saturação</TabsTrigger>
        </TabsList>
        
        <TabsContent value="basic-info">
          <VideoBasicInfo basicInfo={analysis.basicInfo} />
        </TabsContent>
        
        <TabsContent value="title-variations">
          <div className="space-y-6">
            <TitleStructureAnalysis 
              originalTitle={analysis.basicInfo.title}
              structure={{
                hasNumber: titleStructure.hasNumber,
                character: titleStructure.character,
                action: titleStructure.action,
                hook: titleStructure.hook
              }}
            />
            
            <TitleVariationsLevels variations={titleVariations} />
          </div>
        </TabsContent>
        
        <TabsContent value="script-ideas">
          <ScriptIdeas 
            ideas={analysis.scriptIdeas}
            language={contentLanguage} 
          />
        </TabsContent>
        
        <TabsContent value="image-prompts">
          <ImagePrompts 
            thumbnailPrompts={analysis.thumbnailPrompts} 
            supportPrompts={analysis.supportImagePrompts} 
          />
        </TabsContent>
        
        <TabsContent value="sub-niches">
          <SubNicheIdeas subNiches={analysis.subNicheIdeas} />
        </TabsContent>
        
        <TabsContent value="saturation">
          <Card className="p-6">
            <h3 className="text-lg font-bold mb-4">Análise de Saturação</h3>
            {analysis.saturation ? (
              <div className="space-y-4">
                <p>A análise de saturação para vídeos similares a este nos últimos 30 dias mostra:</p>
                
                <div className="p-4 rounded-md bg-muted/50 border">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className={
                      analysis.saturation.status === 'high' ? 'bg-red-100 text-red-800' :
                      analysis.saturation.status === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }>
                      {analysis.saturation.count} vídeos
                    </Badge>
                    <span className="font-medium">{analysis.saturation.message}</span>
                  </div>
                  
                  <p className="text-sm text-muted-foreground">
                    {analysis.saturation.status === 'high' ? 
                      'Considere abordar um ângulo diferente ou subnicho mais específico.' :
                      analysis.saturation.status === 'medium' ? 
                      'Há espaço para conteúdo de qualidade, mas diferencie-se com ângulos únicos.' :
                      'Excelente oportunidade! Este tema tem pouca concorrência recente.'
                    }
                  </p>
                </div>
              </div>
            ) : (
              <p>Análise de saturação não disponível para este vídeo.</p>
            )}
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default VideoAnalysisResults;
