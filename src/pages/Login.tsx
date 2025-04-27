
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (username === "admin" && password === "admin") {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userName", username);
      toast({
        title: "Login bem-sucedido",
        description: "Bem-vindo ao YTOptimizer!",
      });
      navigate("/");
    } else {
      toast({
        title: "Erro de login",
        description: "Nome de usuário ou senha incorretos.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md p-8 space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">
            YT<span className="text-primary">Optimizer</span>
          </h1>
          <p className="text-muted-foreground mt-2">
            Faça login para acessar a ferramenta de análise de vídeos
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Usuário</Label>
            <Input 
              id="username" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input 
              id="password" 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="w-full">Entrar</Button>
        </form>
      </Card>
    </div>
  );
};

export default Login;
