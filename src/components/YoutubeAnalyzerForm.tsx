
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Search } from 'lucide-react';

const formSchema = z.object({
  videoUrl: z.string()
    .min(1, "O URL do vídeo é obrigatório")
    .regex(/^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/, 
      "URL do YouTube inválido. Exemplo válido: https://www.youtube.com/watch?v=dQw4w9WgXcQ")
});

interface YoutubeAnalyzerFormProps {
  onAnalyzeVideo: (videoUrl: string) => void;
  isLoading: boolean;
}

const YoutubeAnalyzerForm = ({ onAnalyzeVideo, isLoading }: YoutubeAnalyzerFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      videoUrl: '',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    onAnalyzeVideo(values.videoUrl);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="videoUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL do Vídeo do YouTube</FormLabel>
              <div className="flex gap-2">
                <FormControl>
                  <Input 
                    placeholder="https://www.youtube.com/watch?v=..." 
                    {...field} 
                    className="flex-1"
                  />
                </FormControl>
                <Button 
                  type="submit" 
                  disabled={isLoading}
                  className="min-w-[120px]"
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="animate-spin mr-2 h-4 w-4 border-2 border-t-transparent border-white rounded-full"></div>
                      Analisando...
                    </div>
                  ) : (
                    <>
                      <Search className="h-4 w-4 mr-2" />
                      Analisar
                    </>
                  )}
                </Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default YoutubeAnalyzerForm;
