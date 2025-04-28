
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Lightbulb, ArrowRight } from "lucide-react";

const TitleExampleWalkthrough = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Exemplo Prático</CardTitle>
        <CardDescription>
          Veja como funciona o processo de geração de variações de título
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert>
          <Lightbulb className="h-4 w-4" />
          <AlertTitle>Exemplo de entrada</AlertTitle>
          <AlertDescription className="space-y-2">
            <p><strong>Título original:</strong> "El Campesino que hizo llorar al cielo"</p>
            <p><strong>Idioma:</strong> Espanhol</p>
            <p><strong>Emoção:</strong> Curiosidade</p>
            <p><strong>Estratégias:</strong> Variações da estrutura e Subniche do termo-chave</p>
          </AlertDescription>
        </Alert>

        <div className="py-4 flex justify-center">
          <ArrowRight className="h-6 w-6" />
        </div>

        <div className="space-y-6">
          <div className="border rounded-lg p-4">
            <h3 className="font-bold text-lg mb-2">1. Variações da estrutura</h3>
            <ul className="space-y-2">
              <li className="p-2 bg-muted/40 rounded">
                <p className="font-medium">"El humilde agricultor que conmovió al firmamento"</p>
                <p className="text-sm text-muted-foreground">Sinônimos mantendo a estrutura original</p>
              </li>
              <li className="p-2 bg-muted/40 rounded">
                <p className="font-medium">"El jornalero que arrancó suspiros al cielo"</p>
                <p className="text-sm text-muted-foreground">Alteração do verbo mantendo o impacto emocional</p>
              </li>
              <li className="p-2 bg-muted/40 rounded">
                <p className="font-medium">"Cómo un campesino logró emocionar a las nubes"</p>
                <p className="text-sm text-muted-foreground">Reformulação começando com "Como" para aumentar curiosidade</p>
              </li>
            </ul>
          </div>

          <div className="border rounded-lg p-4">
            <h3 className="font-bold text-lg mb-2">2. Subnichar o termo-chave</h3>
            <ul className="space-y-2">
              <li className="p-2 bg-muted/40 rounded">
                <p className="font-medium">"El apicultor que hizo llorar al cielo" (subnicho: apicultura)</p>
                <p className="text-sm text-muted-foreground">Substituição por profissão mais específica</p>
              </li>
              <li className="p-2 bg-muted/40 rounded">
                <p className="font-medium">"El viticultor que estremeció al firmamento" (subnicho: vinicultura)</p>
                <p className="text-sm text-muted-foreground">Direcionamento para público interessado em vinhos</p>
              </li>
              <li className="p-2 bg-muted/40 rounded">
                <p className="font-medium">"El pastor que conmovió a todo el valle" (subnicho: pastoreio)</p>
                <p className="text-sm text-muted-foreground">Subnicho com ajuste na segunda parte para manter coerência</p>
              </li>
            </ul>
          </div>

          <div className="border rounded-lg p-4">
            <h3 className="font-bold text-lg mb-2">Análise de resultados</h3>
            <div className="space-y-2">
              <div className="p-2 bg-muted/40 rounded">
                <p><strong>Nível de concorrência:</strong></p>
                <p className="text-sm text-muted-foreground">Baixa em espanhol / Média em inglês</p>
              </div>
              <div className="p-2 bg-muted/40 rounded">
                <p><strong>Título com maior potencial viral:</strong></p>
                <p className="text-sm text-muted-foreground">"Cómo un campesino logró emocionar a las nubes" (Curiosidade + verbo forte)</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TitleExampleWalkthrough;
