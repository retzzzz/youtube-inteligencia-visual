
import React from "react";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import KeywordField from "@/components/title-generator/form/KeywordField";
import LanguageSelect from "@/components/title-generator/form/LanguageSelect";
import EmotionSelect from "@/components/title-generator/form/EmotionSelect";
import SubmitButton from "@/components/title-generator/form/SubmitButton";
import { titleGeneratorSchema, TitleGeneratorFormValues, defaultFormValues } from "@/components/title-generator/form/TitleGeneratorSchema";

interface TitleGeneratorFormProps {
  onGenerate: (keyword: string, language: string, emotion: string) => void;
  isLoading: boolean;
}

const TitleGeneratorForm = ({ onGenerate, isLoading }: TitleGeneratorFormProps) => {
  const form = useForm<TitleGeneratorFormValues>({
    resolver: zodResolver(titleGeneratorSchema),
    defaultValues: defaultFormValues,
  });

  const onSubmit = (values: TitleGeneratorFormValues) => {
    onGenerate(values.keyword, values.language, values.emotion);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <KeywordField control={form.control} disabled={isLoading} />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-4">
            <LanguageSelect control={form.control} disabled={isLoading} />
            <EmotionSelect control={form.control} disabled={isLoading} />
          </div>
        </div>

        <SubmitButton isLoading={isLoading} />
      </form>
    </Form>
  );
};

export default TitleGeneratorForm;
