
import React from 'react';
import { Card } from "@/components/ui/card";
import Header from "@/components/Header";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQ = () => {
  return (
    <div className="min-h-screen w-full px-4 md:px-8 py-6">
      <Header />
      <Card className="p-6 mt-8 w-full">
        <h1 className="text-3xl font-bold mb-6">Perguntas Frequentes (FAQ)</h1>
        
        <Accordion type="single" collapsible className="space-y-4 w-full">
          <AccordionItem value="language-behavior">
            <AccordionTrigger className="text-lg">
              Comportamento variável por idioma
            </AccordionTrigger>
            <AccordionContent className="space-y-2 text-muted-foreground">
              <p>Canais em inglês geralmente recebem recomendações desde os primeiros vídeos e mantêm sequências de impressões estáveis.</p>
              <p>Em espanhol há um "pico inicial" de recomendações que pode oscilar até "estourar" um vídeo de alta performance.</p>
              <p>Outros idiomas (francês, português etc.) têm dinâmicas próprias de alcance e devem ser levados em conta na sua estratégia.</p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="video-formats">
            <AccordionTrigger className="text-lg">
              Diferença entre formatos de vídeo
            </AccordionTrigger>
            <AccordionContent className="space-y-2 text-muted-foreground">
              <p>Vídeos "imagem + IA + legenda" têm entrada muito rápida, mas saturam e não mantêm o crescimento a longo prazo.</p>
              <p>Vídeos no formato tradicional (clips nativos, edição completa) exigem mais trabalho, mas tendem a sustentar melhor a performance.</p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="minimum-videos">
            <AccordionTrigger className="text-lg">
              Volume mínimo de vídeos para avaliação
            </AccordionTrigger>
            <AccordionContent className="space-y-2 text-muted-foreground">
              <p>Se você publicar até 15 vídeos e nenhum passar de mil visualizações, é sinal de que algo está errado (subnicho, títulos, micro-subnicho, concorrência).</p>
              <p>Publicar menos que isso sem resultado não dá base para julgar a viabilidade do canal.</p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="test-pivot">
            <AccordionTrigger className="text-lg">
              Estratégia de "testar e pivotar"
            </AccordionTrigger>
            <AccordionContent className="space-y-2 text-muted-foreground">
              <p>Se um subnicho não funcionar após o mínimo de vídeos, mude imediatamente para outro; não se apegue a um canal que não engrena.</p>
              <p>Canais bem-sucedidos chegam a 300–500k views/mês nos primeiros 15 vídeos quando aplicam corretamente títulos, subnichagem e micro-subnichos.</p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="not-shadowban">
            <AccordionTrigger className="text-lg">
              Não é "Shadowban"
            </AccordionTrigger>
            <AccordionContent className="space-y-2 text-muted-foreground">
              <p>Queda de alcance quase sempre decorre de strikes, de ter entrado num nicho saturado ou de falhas na aplicação das estratégias explicadas—e não de penalização oculta pelo YouTube.</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Card>
    </div>
  );
};

export default FAQ;
