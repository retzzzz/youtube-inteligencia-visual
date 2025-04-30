
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoginContainer } from "@/components/login/LoginContainer";
import { LoginHeader } from "@/components/login/LoginHeader";
import { LoginForm } from "@/components/login/LoginForm";
import { SignupForm } from "@/components/login/SignupForm";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle } from "lucide-react";

const Login = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn } = useAuth();
  const [showEmailConfirmed, setShowEmailConfirmed] = useState(false);
  
  // Verificar se o usuário está vindo de uma confirmação de email
  useEffect(() => {
    const checkEmailConfirmation = () => {
      // Verificar a URL para parâmetros específicos de confirmação
      const urlParams = new URLSearchParams(location.search);
      const type = urlParams.get('type');
      
      if (type === 'signup') {
        setShowEmailConfirmed(true);
        // Mostrar a mensagem de sucesso por 5 segundos
        setTimeout(() => {
          setShowEmailConfirmed(false);
        }, 5000);
      }
    };
    
    checkEmailConfirmation();
  }, [location]);
  
  // Redirect to dashboard if already logged in
  useEffect(() => {
    if (isLoggedIn) {
      const from = location.state?.from || "/dashboard";
      navigate(from, { replace: true });
    }
  }, [isLoggedIn, navigate, location.state]);

  // Function to handle login with Google
  const handleGoogleLogin = async () => {
    try {
      // Make sure to include redirectTo with the correct origin
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/dashboard`
        }
      });
      
      if (error) {
        console.error("OAuth error:", error);
        toast({
          title: "Erro no login com Google",
          description: "Não foi possível fazer login com o Google. Tente novamente.",
          variant: "destructive",
        });
      }
      
      // Redirection is handled by Supabase
    } catch (error) {
      console.error("Google login error:", error);
      toast({
        title: "Erro no login",
        description: "Ocorreu um erro durante o processo de login. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  return (
    <LoginContainer>
      <LoginHeader 
        title={<>YT<span className="text-primary">AnalyzerPro</span></>}
        subtitle="Ferramenta de análise de vídeos"
      />

      {showEmailConfirmed && (
        <Alert className="mb-4 bg-green-50 border-green-300 text-green-700">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription>
            Email verificado com sucesso! Agora você pode fazer login.
          </AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="login" className="w-full">
        <TabsList className="grid grid-cols-2 w-full mb-6">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Cadastro</TabsTrigger>
        </TabsList>
        
        <TabsContent value="login" className="space-y-4">
          <LoginForm onGoogleLogin={handleGoogleLogin} />
        </TabsContent>
        
        <TabsContent value="signup" className="space-y-4">
          <SignupForm />
        </TabsContent>
      </Tabs>
    </LoginContainer>
  );
};

export default Login;
