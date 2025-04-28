
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

interface TitleInputFormProps {
  onGenerate: (titleData: TitleInputData) => void;
  isLoading: boolean;
}

export interface TitleInputData {
  originalTitle: string;
  language: string;
  emotion: string;
  strategies: {
    structureVariations: boolean;
    keywordSubniche: boolean;
    totalInnovation: boolean;
  };
}

const formSchema = z.object({
  originalTitle: z.string().min(10, {
    message: "O título deve ter pelo menos 10 caracteres",
  }),
  language: z.string(),
  emotion: z.string(),
  structureVariations: z.boolean().default(true),
  keywordSubniche: z.boolean().default(false),
  totalInnovation: z.boolean().default(false),
});

const TitleInputForm = ({ onGenerate, isLoading }: TitleInputFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      originalTitle: "",
      language: "pt",
      emotion: "curiosidade",
      structureVariations: true,
      keywordSubniche: false,
      totalInnovation: false,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const titleData: TitleInputData = {
      originalTitle: values.originalTitle,
      language: values.language,
      emotion: values.emotion,
      strategies: {
        structureVariations: values.structureVariations,
        keywordSubniche: values.keywordSubniche,
        totalInnovation: values.totalInnovation,
      }
    };
    
    onGenerate(titleData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="originalTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Título Original</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Ex: Milionário aposta tudo em um jogo — o que aconteceu vai te chocar" 
                    {...field} 
                    disabled={isLoading}
                    className="h-12"
                  />
                </FormControl>
                <FormDescription>
                  Digite o título completo que deseja remodelar ou usar como base
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="language"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Idioma</FormLabel>
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
                  <FormLabel>Emoção Desejada</FormLabel>
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
                      <SelectItem value="medo">Medo</SelectItem>
                      <SelectItem value="curiosidade">Curiosidade</SelectItem>
                      <SelectItem value="inspiracao">Inspiração</SelectItem>
                      <SelectItem value="compaixao">Compaixão</SelectItem>
                      <SelectItem value="misto">Misto</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div className="space-y-2">
            <FormLabel>Estratégias de Remodelagem</FormLabel>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <FormField
                control={form.control}
                name="structureVariations"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="font-medium">🅐 Variações da estrutura</FormLabel>
                      <FormDescription>
                        Mantém a estrutura, varia palavras/expressões
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="keywordSubniche"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="font-medium">🅑 Subniche do termo-chave</FormLabel>
                      <FormDescription>
                        Substituir termos por subnichos específicos
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="totalInnovation"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="font-medium">🅒 Inovação total</FormLabel>
                      <FormDescription>
                        Título do zero mantendo a promessa central
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        <Button 
          type="submit" 
          disabled={isLoading}
          className="w-full md:w-auto"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Gerando variações...
            </>
          ) : (
            "Gerar Variações de Título"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default TitleInputForm;
