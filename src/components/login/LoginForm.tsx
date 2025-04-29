
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LogIn } from "lucide-react";
import { UsernameField } from "@/components/login/form-fields/UsernameField";
import { PasswordField } from "@/components/login/form-fields/PasswordField";
import { FormDivider } from "@/components/login/form-fields/FormDivider";
import { SocialLoginButton } from "@/components/login/form-fields/SocialLoginButton";
import { supabase } from "@/lib/supabase";

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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <UsernameField control={form.control} />
        <PasswordField control={form.control} />

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
  );
};
