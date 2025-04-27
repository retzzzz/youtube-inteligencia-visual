
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Card } from "./ui/card";

interface AudienceAnalysisFormProps {
  onAnalyze: (canalId: string, nichoPrincipal: string, subnicho: string) => void;
  isLoading: boolean;
}

const formSchema = z.object({
  canalId: z.string().min(3, {
    message: "ID do canal deve ter pelo menos 3 caracteres",
  }),
  nichoPrincipal: z.string().min(2, {
    message: "Nicho principal deve ter pelo menos 2 caracteres",
  }),
  subnicho: z.string().min(2, {
    message: "Subnicho deve ter pelo menos 2 caracteres",
  }),
  frequencia: z.string(),
  periodo: z.number().min(1).max(12),
});

const AudienceAnalysisForm = ({ onAnalyze, isLoading }: AudienceAnalysisFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      canalId: "",
      nichoPrincipal: "",
      subnicho: "",
      frequencia: "semanal",
      periodo: 4,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    onAnalyze(values.canalId, values.nichoPrincipal, values.subnicho);
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold mb-4">Análise de Audiência</h2>
      <p className="text-muted-foreground mb-6">
        Identifique o perfil da sua audiência, gere micro-subnichos personalizados e adapte seus títulos para maximizar o engajamento.
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="canalId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ID do Canal</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Ex: UCxxxxxxxxxxxxxx" 
                      {...field} 
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormDescription>
                    ID do seu canal do YouTube
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="nichoPrincipal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nicho Principal</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Ex: desenvolvimento pessoal" 
                      {...field} 
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormDescription>
                    Tema principal do seu canal
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="subnicho"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subnicho Atual</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Ex: meditação para iniciantes" 
                      {...field} 
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormDescription>
                    Subnicho específico que deseja explorar
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="frequencia"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Frequência</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={isLoading}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Frequência" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="diária">Diária</SelectItem>
                        <SelectItem value="semanal">Semanal</SelectItem>
                        <SelectItem value="quinzenal">Quinzenal</SelectItem>
                        <SelectItem value="mensal">Mensal</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="periodo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Período (Semanas)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min={1} 
                        max={12} 
                        {...field} 
                        onChange={e => field.onChange(parseInt(e.target.value))}
                        disabled={isLoading}
                      />
                    </FormControl>
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
                Analisando...
              </>
            ) : (
              "Analisar Audiência e Gerar Micro-Subnichos"
            )}
          </Button>
        </form>
      </Form>
    </Card>
  );
};

export default AudienceAnalysisForm;
