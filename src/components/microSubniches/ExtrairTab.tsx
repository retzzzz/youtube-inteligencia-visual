
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { MicroSubnicho } from '@/utils/microSubnicheAnalysis';

interface ExtrairTabProps {
  canalId: string;
  setCanalId: (value: string) => void;
  subnichoFrincipal: string;
  setSubnichoFrincipal: (value: string) => void;
  maxVideos: number;
  setMaxVideos: (value: number) => void;
  microSubnichos: MicroSubnicho[];
  isLoading: boolean;
  handleExtrairMicroSubnichos: () => Promise<void>;
}

const ExtrairTab = ({
  canalId,
  setCanalId,
  subnichoFrincipal,
  setSubnichoFrincipal,
  maxVideos,
  setMaxVideos,
  microSubnichos,
  isLoading,
  handleExtrairMicroSubnichos
}: ExtrairTabProps) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="canalId">ID do Canal</Label>
          <Input
            id="canalId"
            placeholder="Ex: UCxxxxxxxYYY"
            value={canalId}
            onChange={(e) => setCanalId(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="subnichoFrincipal">Subnicho Principal</Label>
          <Input
            id="subnichoFrincipal"
            placeholder="Ex: finanças pessoais"
            value={subnichoFrincipal}
            onChange={(e) => setSubnichoFrincipal(e.target.value)}
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="maxVideos">Número máximo de vídeos: {maxVideos}</Label>
        <input
          type="range"
          id="maxVideos"
          min="5"
          max="50"
          step="5"
          value={maxVideos}
          onChange={(e) => setMaxVideos(parseInt(e.target.value))}
          className="w-full"
        />
      </div>
      
      <div className="flex justify-end">
        <Button 
          onClick={handleExtrairMicroSubnichos}
          disabled={isLoading}
        >
          {isLoading ? "Extraindo..." : "Extrair Micro-Subnichos"}
        </Button>
      </div>
      
      {microSubnichos.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-2">Micro-Subnichos Encontrados</h3>
          <div className="space-y-4">
            {microSubnichos.map((subnicho, index) => (
              <Accordion 
                key={`subnicho-${index}`}
                type="single" 
                collapsible
                className="border rounded-md"
              >
                <AccordionItem value={`item-${index}`}>
                  <AccordionTrigger className="px-4">
                    <div className="flex items-center justify-between w-full">
                      <span className="font-medium">{subnicho.microsubnicho}</span>
                      <span className="text-sm text-muted-foreground">{subnicho.ocorrencias} ocorrências</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4">
                    <h4 className="text-sm font-medium mb-2">Exemplos de Títulos:</h4>
                    <ul className="list-disc list-inside space-y-1">
                      {subnicho.titulos_exemplo.map((titulo, tIndex) => (
                        <li key={`titulo-${index}-${tIndex}`} className="text-sm text-muted-foreground">
                          {titulo}
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ExtrairTab;
