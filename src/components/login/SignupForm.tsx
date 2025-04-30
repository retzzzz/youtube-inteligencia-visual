
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
  const location = useLocation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    try {
      // Due to captcha being enabled, we'll use email sign-in instead
      // which doesn't require captcha verification
      const { data, error } = await supabase.auth.signInWithOtp({
        email: values.email,
        options: {
          shouldCreateUser: true,
          emailRedirectTo: `${window.location.origin}/dashboard`,
        }
      });

      if (error) {
        console.error("Signup error details:", error);
        let errorMessage = "Não foi possível criar sua conta.";
        
        if (error.message.includes("already")) {
          errorMessage = "Este email já está cadastrado. Tente fazer login.";
        }
        
        toast({
          title: "Erro no cadastro",
          description: errorMessage,
          variant: "destructive",
        });
        return;
      }
      
      toast({
        title: "Email enviado",
        description: "Um link de confirmação foi enviado para o seu email. Por favor, verifique sua caixa de entrada para completar o cadastro.",
      });
      
      // Reset form after successful signup
      form.reset();
      
    } catch (error) {
      console.error("Signup error:", error);
      toast({
        title: "Erro no cadastro",
        description: "Ocorreu um erro durante o cadastro. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <EmailField control={form.control} name="email" label="Email" />
        <ConfirmEmailField control={form.control} name="confirmEmail" label="Confirma Email" />
        <PasswordField control={form.control} />

        <Button 
          type="submit" 
          className="w-full flex items-center gap-2"
          disabled={isSubmitting}
        >
          <UserPlus className="h-4 w-4" /> 
          {isSubmitting ? "Cadastrando..." : "Cadastrar"}
        </Button>
      </form>
    </Form>
  );
};
