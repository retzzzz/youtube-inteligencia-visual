
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LogIn, Key, Mail } from "lucide-react";
import { UsernameField } from "@/components/login/form-fields/UsernameField";
import { PasswordField } from "@/components/login/form-fields/PasswordField";
import { FormDivider } from "@/components/login/form-fields/FormDivider";
import { SocialLoginButton } from "@/components/login/form-fields/SocialLoginButton";
import { supabase } from "@/lib/supabase";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

// Schema for login form validation
const loginSchema = z.object({
  username: z.string().min(1, "Nome de usuário é obrigatório"),
  password: z.string().min(1, "Senha é obrigatória"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onGoogleLogin: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onGoogleLogin }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form setup
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // Handle login submission
  const onSubmit = async (values: LoginFormValues) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: values.username, // assuming username is email
        password: values.password,
      });
      
      if (error) {
        toast({
          title: "Erro de login",
          description: error.message || "Nome de usuário ou senha incorretos.",
          variant: "destructive",
        });
        return;
      }
      
      if (data && data.user) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userName", data.user.user_metadata?.name || values.username);
        localStorage.setItem("userId", data.user.id);
        
        toast({
          title: "Login bem-sucedido",
          description: "Bem-vindo ao YTOptimizer!",
        });
        
        navigate("/");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Erro de login",
        description: "Ocorreu um erro durante o login. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  // Handle forgot password
  const handleForgotPassword = async () => {
    if (!resetEmail) {
      toast({
        title: "Email necessário",
        description: "Por favor, digite seu email para recuperar sua senha.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(resetEmail, {
        redirectTo: `${window.location.origin}/login`,
      });
      
      if (error) {
        toast({
          title: "Erro ao recuperar senha",
          description: error.message || "Não foi possível enviar o email de recuperação.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Email enviado",
          description: "Verifique seu email para instruções de recuperação de senha.",
        });
        setForgotPasswordOpen(false);
      }
    } catch (error) {
      console.error("Password reset error:", error);
      toast({
        title: "Erro na recuperação",
        description: "Ocorreu um erro ao processar sua solicitação.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <UsernameField control={form.control} />
          <div className="space-y-1">
            <PasswordField control={form.control} />
            <div className="text-right">
              <Button 
                variant="link" 
                className="p-0 h-auto text-xs text-primary"
                type="button"
                onClick={() => setForgotPasswordOpen(true)}
              >
                Esqueci minha senha
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Button type="submit" className="w-full flex items-center gap-2">
              <LogIn className="h-4 w-4" /> Entrar
            </Button>
            
            <FormDivider text="ou continue com" />
            
            <SocialLoginButton 
              provider="Google"
              onClick={onGoogleLogin}
            />
          </div>
        </form>
      </Form>

      <Dialog open={forgotPasswordOpen} onOpenChange={setForgotPasswordOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Recuperar senha</DialogTitle>
            <DialogDescription>
              Digite seu email para receber um link de recuperação de senha.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  className="pl-10"
                  placeholder="Seu email"
                  type="email" 
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setForgotPasswordOpen(false)}>
              Cancelar
            </Button>
            <Button 
              onClick={handleForgotPassword} 
              disabled={isSubmitting}
              className="flex items-center gap-2"
            >
              <Key className="h-4 w-4" />
              {isSubmitting ? "Enviando..." : "Enviar link"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
