
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

interface TitleGeneratorFormProps {
  onGenerate: (keyword: string, language: string, emotion: string) => void;
  isLoading: boolean;
}

const formSchema = z.object({
  keyword: z.string().min(3, {
    message: "Palavra-chave deve ter pelo menos 3 caracteres",
  }),
  language: z.string(),
  emotion: z.string(),
});

const TitleGeneratorForm = ({ onGenerate, isLoading }: TitleGeneratorFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      keyword: "",
      language: "pt",
      emotion: "mix",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    onGenerate(values.keyword, values.language, values.emotion);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <FormField
              control={form.control}
              name="keyword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Palavra-chave ou Ideia Principal</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Ex: meditação, ansiedade, desenvolvimento pessoal..." 
                      {...field} 
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormDescription>
                    Digite a ideia principal para gerar variações de títulos
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-4">
            <FormField
              control={form.control}
              name="language"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Idioma Principal</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={isLoading}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o idioma" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="pt">Português</SelectItem>
                      <SelectItem value="en">Inglês</SelectItem>
                      <SelectItem value="es">Espanhol</SelectItem>
                      <SelectItem value="fr">Francês</SelectItem>
                      <SelectItem value="auto">Múltiplos idiomas</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="emotion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de Emoção</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={isLoading}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a emoção" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="mix">Misto (Todos os tipos)</SelectItem>
                      <SelectItem value="dor">Dor (perda, solidão)</SelectItem>
                      <SelectItem value="esperanca">Esperança (superação)</SelectItem>
                      <SelectItem value="curiosidade">Curiosidade (mistério)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Button 
          type="submit" 
          disabled={isLoading}
          className="w-full sm:w-auto"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Gerando títulos...
            </>
          ) : (
            "Gerar Títulos Estratégicos"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default TitleGeneratorForm;
