
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserPlus } from "lucide-react";
import { EmailField } from "./form-fields/EmailField";
import { ConfirmEmailField } from "./form-fields/ConfirmEmailField";
import { PasswordField } from "./form-fields/PasswordField";
import { supabase } from "@/lib/supabase";

// Schema for signup form validation
const signupSchema = z.object({
  email: z.string().email("Digite um email válido").min(1, "Email é obrigatório"),
  confirmEmail: z.string().email("Digite um email válido").min(1, "Confirmação de email é obrigatória"),
  password: z.string()
    .min(8, "A senha deve ter pelo menos 8 caracteres")
    .max(100, "A senha não pode ter mais de 100 caracteres")
}).refine((data) => data.email === data.confirmEmail, {
  message: "Os emails não coincidem",
  path: ["confirmEmail"],
});

export type SignupFormValues = z.infer<typeof signupSchema>;

export const SignupForm: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  // Form setup
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      confirmEmail: "",
      password: "",
    },
  });

  // Handle signup submission
  const onSubmit = async (values: SignupFormValues) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            name: values.email.split('@')[0], // Usar a parte do email antes do @ como nome
          },
          emailRedirectTo: `${window.location.origin}/login`
        }
      });

      if (error) {
        toast({
          title: "Erro no cadastro",
          description: error.message || "Não foi possível criar sua conta.",
          variant: "destructive",
        });
        return;
      }
      
      if (data) {
        toast({
          title: "Cadastro realizado",
          description: "Sua conta foi criada com sucesso! Verifique seu email para confirmação.",
        });
        
        // Redirecionamos o usuário para a página de login após o cadastro
        navigate("/login");
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast({
        title: "Erro no cadastro",
        description: "Ocorreu um erro durante o cadastro. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <EmailField control={form.control} name="email" label="Email" />
        <ConfirmEmailField control={form.control} name="confirmEmail" label="Confirma Email" />
        <PasswordField control={form.control} />

        <Button type="submit" className="w-full flex items-center gap-2">
          <UserPlus className="h-4 w-4" /> Cadastrar
        </Button>
      </form>
    </Form>
  );
};
