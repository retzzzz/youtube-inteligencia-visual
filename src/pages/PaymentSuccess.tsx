
import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const navigate = useNavigate();
  
  useEffect(() => {
    // Aqui você poderia verificar o status da sessão com o Stripe
    // e atualizar o banco de dados se necessário
    console.log('Sessão de pagamento bem-sucedida:', sessionId);
    
    // Normalmente, esta verificação seria feita por um webhook do Stripe
    // Este código é apenas para demonstração
  }, [sessionId]);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow w-full px-4 md:px-8 py-12">
        <div className="max-w-md mx-auto">
          <Card className="border-green-200 bg-green-50">
            <CardHeader className="pb-4">
              <div className="mx-auto bg-green-100 p-3 rounded-full mb-4">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>
              <CardTitle className="text-center text-2xl text-green-800">Pagamento Confirmado!</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center mb-6 text-green-700">
                Sua assinatura foi ativada com sucesso. Agora você tem acesso a todos os recursos premium do YTAnalyzerPro.
              </p>
              
              <div className="flex flex-col space-y-3">
                <Button onClick={() => navigate('/dashboard')} className="w-full">
                  Ir para o Dashboard
                </Button>
                <Button variant="outline" onClick={() => navigate('/video-analyzer')} className="w-full">
                  Começar a analisar vídeos
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PaymentSuccess;
