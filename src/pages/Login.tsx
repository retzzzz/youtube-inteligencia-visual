
import React from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoginContainer } from "@/components/login/LoginContainer";
import { LoginHeader } from "@/components/login/LoginHeader";
import { LoginForm } from "@/components/login/LoginForm";
import { SignupForm } from "@/components/login/SignupForm";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";

const Login = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  // Function to handle login with Google
  const handleGoogleLogin = async () => {
    try {
      // Obter a URL atual com a porta correta
      const currentUrl = window.location.origin;
      console.log("Redirecionando para:", currentUrl);
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: currentUrl,
          queryParams: {
            // Informações confidenciais, certifique-se de que estão configuradas no Supabase
            // Estas credenciais são gerenciadas pelo Supabase, não precisamos incluí-las aqui
            // access_type: 'offline',
            // prompt: 'consent',
          }
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
      
      // O redirecionamento será manipulado pelo próprio Supabase
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
