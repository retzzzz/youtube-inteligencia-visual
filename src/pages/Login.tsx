
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Lock, User, LogIn } from "lucide-react";

// Esquema de validação para o login
const loginSchema = z.object({
  username: z.string().min(1, "Nome de usuário é obrigatório"),
  password: z.string().min(1, "Senha é obrigatória"),
});

// Esquema de validação para o cadastro
const signupSchema = z.object({
  username: z.string().min(3, "Nome de usuário deve ter pelo menos 3 caracteres"),
  email: z.string().email("Email inválido"),
  confirmEmail: z.string().email("Email inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
}).refine((data) => data.email === data.confirmEmail, {
  message: "Os emails não correspondem",
  path: ["confirmEmail"],
});

type LoginFormValues = z.infer<typeof loginSchema>;
type SignupFormValues = z.infer<typeof signupSchema>;

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  // Formulário de login
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // Formulário de cadastro
  const signupForm = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: "",
      email: "",
      confirmEmail: "",
      password: "",
    },
  });

  // Função para lidar com o login
  const handleLogin = (values: LoginFormValues) => {
    if (values.username === "admin" && values.password === "admin") {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userName", values.username);
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

  // Função para lidar com o cadastro
  const handleSignup = (values: SignupFormValues) => {
    // Simulando o envio de email (em um ambiente real, isso seria feito no backend)
    console.log(`Enviando email para ${values.email} com dados de cadastro`);
    
    // Salvando os dados do usuário (em um ambiente real, isso seria armazenado em um banco de dados)
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userName", values.username);
    
    toast({
      title: "Cadastro bem-sucedido",
      description: `Um email de confirmação foi enviado para ${values.email}`,
    });
    
    navigate("/");
  };

  // Função para lidar com o login com Gmail
  const handleGoogleLogin = () => {
    // Em um ambiente real, isso seria implementado com OAuth
    toast({
      title: "Login com Google",
      description: "Implementação de OAuth do Google seria integrada aqui.",
    });
    
    // Simulando login bem-sucedido
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userName", "Usuário Google");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 w-full">
      <Card className="w-full max-w-md p-8 space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">
            YT<span className="text-primary">Optimizer</span>
          </h1>
          <p className="text-muted-foreground mt-2">
            Ferramenta de análise de vídeos
          </p>
        </div>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid grid-cols-2 w-full mb-6">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Cadastro</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login" className="space-y-4">
            <Form {...loginForm}>
              <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
                <FormField
                  control={loginForm.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Usuário</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input 
                            className="pl-10" 
                            placeholder="Digite seu usuário" 
                            {...field} 
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={loginForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Senha</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input 
                            className="pl-10" 
                            type="password" 
                            placeholder="Digite sua senha" 
                            {...field} 
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-2">
                  <Button type="submit" className="w-full flex items-center gap-2">
                    <LogIn className="h-4 w-4" /> Entrar
                  </Button>
                  
                  <div className="relative my-4">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-muted"></span>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">
                        ou continue com
                      </span>
                    </div>
                  </div>
                  
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="w-full"
                    onClick={handleGoogleLogin}
                  >
                    <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
                      <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                        <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z" />
                        <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z" />
                        <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z" />
                        <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z" />
                      </g>
                    </svg>
                    Entrar com Google
                  </Button>
                </div>
              </form>
            </Form>
          </TabsContent>
          
          <TabsContent value="signup" className="space-y-4">
            <Form {...signupForm}>
              <form onSubmit={signupForm.handleSubmit(handleSignup)} className="space-y-4">
                <FormField
                  control={signupForm.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Usuário</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input 
                            className="pl-10" 
                            placeholder="Digite seu usuário" 
                            {...field} 
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={signupForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input 
                            className="pl-10" 
                            type="email" 
                            placeholder="Digite seu email" 
                            {...field} 
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={signupForm.control}
                  name="confirmEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirmação de Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input 
                            className="pl-10" 
                            type="email" 
                            placeholder="Confirme seu email" 
                            {...field} 
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={signupForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Senha</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input 
                            className="pl-10" 
                            type="password" 
                            placeholder="Digite sua senha" 
                            {...field} 
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full">Cadastrar</Button>
              </form>
            </Form>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default Login;
