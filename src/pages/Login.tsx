
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoginContainer } from "@/components/login/LoginContainer";
import { LoginHeader } from "@/components/login/LoginHeader";
import { LoginForm } from "@/components/login/LoginForm";
import { SignupForm } from "@/components/login/SignupForm";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const { toast } = useToast();

  // Function to handle login with Gmail
  const handleGoogleLogin = () => {
    // Em um ambiente real, isso seria implementado com OAuth
    toast({
      title: "Login com Google",
      description: "Implementação de OAuth do Google seria integrada aqui.",
    });
    
    // Simulando login bem-sucedido
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userName", "Usuário Google");
    window.location.href = "/";
  };

  return (
    <LoginContainer>
      <LoginHeader 
        title={<>YT<span className="text-primary">Optimizer</span></>}
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
