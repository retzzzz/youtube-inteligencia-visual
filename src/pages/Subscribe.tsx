
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, CheckCircle, CreditCard, AlertTriangle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { subscriptionService } from '@/services/subscription';
import { Alert, AlertDescription } from "@/components/ui/alert";

const Subscribe = () => {
  const { subscription, isLoggedIn } = useAuth();
  
  // Verificar se o período de teste expirou
  const trialExpired = subscription?.isTrialing && 
    subscription?.trialEnd && 
    subscriptionService.getDaysRemaining(subscription.trialEnd) === 0;
  
  const handleSubscribe = async () => {
    try {
      const { url } = await subscriptionService.startSubscription();
      window.location.href = url;
    } catch (error) {
      console.error("Error starting subscription:", error);
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow w-full px-4 md:px-8 py-6 mb-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-4 text-center">Plano de Assinatura</h1>
          
          {trialExpired && (
            <Alert className="mb-8 border-red-300 bg-red-50">
              <div className="flex items-center">
                <AlertTriangle className="h-6 w-6 text-red-500 mr-3" />
                <div>
                  <h3 className="font-bold text-red-700">Seu período de avaliação gratuita terminou</h3>
                  <AlertDescription className="text-red-600">
                    Assine agora para continuar tendo acesso completo a todas as funcionalidades do YTAnalyzerPro.
                  </AlertDescription>
                </div>
              </div>
            </Alert>
          )}
          
          {isLoggedIn && subscription?.isTrialing && !trialExpired && (
            <Card className="mb-8 border-blue-200 bg-blue-50">
              <CardHeader>
                <CardTitle className="flex items-center text-blue-700">
                  <Clock className="mr-2 h-5 w-5" />
                  Período de Avaliação
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-blue-600">
                  Você está no período de avaliação gratuita de 7 dias.
                  {subscription.trialEnd && (
                    <> Seu período termina em {subscriptionService.getDaysRemaining(subscription.trialEnd)} dias 
                    ({subscriptionService.formatEndDate(subscription.trialEnd)}).</>
                  )}
                </p>
              </CardContent>
            </Card>
          )}
          
          <Card className="border shadow-lg">
            <CardHeader className="bg-gradient-to-r from-primary/20 to-primary/5 border-b">
              <CardTitle>Plano Mensal</CardTitle>
              <CardDescription>Acesso completo a todas as ferramentas</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex items-baseline mb-4">
                <span className="text-3xl font-bold">R$ 69,99</span>
                <span className="text-muted-foreground ml-1">/mês</span>
              </div>
              
              <ul className="space-y-2 mb-6">
                {[
                  "Análise de vídeos ilimitada",
                  "Geração de títulos otimizados",
                  "Validação de subnichos",
                  "Geração de roteiros",
                  "Analisador de microsubnichos",
                  "Suporte prioritário"
                ].map((feature, i) => (
                  <li key={i} className="flex">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="flex justify-center border-t pt-6">
              <Button 
                size="lg" 
                onClick={handleSubscribe} 
                className="w-full md:w-auto"
              >
                <CreditCard className="mr-2 h-4 w-4" />
                {subscription?.isTrialing && !trialExpired
                  ? "Assinar Agora" 
                  : trialExpired 
                    ? "Iniciar Assinatura - R$ 69,99/mês"
                    : "Iniciar Assinatura - R$ 69,99/mês"}
              </Button>
            </CardFooter>
          </Card>
          
          <p className="text-center text-muted-foreground mt-6">
            Cancele a qualquer momento. Sem compromisso.
          </p>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Subscribe;
