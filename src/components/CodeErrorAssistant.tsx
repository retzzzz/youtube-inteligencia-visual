
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { analyzeAndFixCode } from '@/services/ai-code-assistant';
import { Loader2 } from 'lucide-react';

const CodeErrorAssistant = () => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<{correctedCode?: string; explanation?: string} | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!code.trim()) {
      toast({
        title: "Código obrigatório",
        description: "Por favor, insira o código que deseja analisar",
        variant: "destructive",
      });
      return;
    }
    
    setIsAnalyzing(true);
    setResult(null);
    
    try {
      const response = await analyzeAndFixCode({ 
        code, 
        error: error.trim() || undefined
      });
      
      if (!response.success) {
        toast({
          title: "Erro na análise",
          description: response.error || "Não foi possível analisar o código",
          variant: "destructive",
        });
        return;
      }
      
      setResult({
        correctedCode: response.correctedCode,
        explanation: response.explanation
      });
      
      toast({
        title: "Análise concluída",
        description: "Código analisado com sucesso!",
      });
    } catch (err) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao analisar o código",
        variant: "destructive",
      });
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="container mx-auto py-6">
      <h2 className="text-2xl font-bold mb-6">Assistente de Correção de Código</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Código com Erro</CardTitle>
            <CardDescription>
              Cole seu código e a mensagem de erro para análise
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Código
                  </label>
                  <Textarea
                    placeholder="Cole seu código aqui..."
                    className="min-h-[200px] font-mono"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Mensagem de Erro (opcional)
                  </label>
                  <Textarea
                    placeholder="Cole a mensagem de erro aqui (opcional)..."
                    className="min-h-[80px]"
                    value={error}
                    onChange={(e) => setError(e.target.value)}
                  />
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="mt-4 w-full"
                disabled={isAnalyzing || !code.trim()}
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analisando...
                  </>
                ) : "Analisar e Corrigir"}
              </Button>
            </form>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Resultado</CardTitle>
            <CardDescription>
              Código corrigido e explicação
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isAnalyzing ? (
              <div className="flex flex-col items-center justify-center py-12">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <p className="mt-4 text-sm text-muted-foreground">
                  Analisando seu código...
                </p>
              </div>
            ) : result ? (
              <div className="space-y-4">
                {result.correctedCode && (
                  <div>
                    <h3 className="font-medium mb-2">Código Corrigido:</h3>
                    <pre className="bg-muted p-4 rounded-md overflow-x-auto font-mono text-sm">
                      {result.correctedCode}
                    </pre>
                  </div>
                )}
                
                {result.explanation && (
                  <div>
                    <h3 className="font-medium mb-2">Explicação:</h3>
                    <div className="prose prose-sm max-w-none">
                      {result.explanation}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                Os resultados serão exibidos aqui após a análise
              </div>
            )}
          </CardContent>
          {result && (
            <CardFooter>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => {
                  if (result.correctedCode) {
                    navigator.clipboard.writeText(result.correctedCode);
                    toast({
                      title: "Código copiado",
                      description: "O código corrigido foi copiado para a área de transferência"
                    });
                  }
                }}
                disabled={!result.correctedCode}
              >
                Copiar Código Corrigido
              </Button>
            </CardFooter>
          )}
        </Card>
      </div>
    </div>
  );
};

export default CodeErrorAssistant;
