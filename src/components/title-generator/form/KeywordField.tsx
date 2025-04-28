
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";

interface KeywordFieldProps {
  control: Control<any>;
  disabled: boolean;
}

const KeywordField = ({ control, disabled }: KeywordFieldProps) => {
  return (
    <FormField
      control={control}
      name="keyword"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Palavra-chave ou Ideia Principal</FormLabel>
          <FormControl>
            <Input 
              placeholder="Ex: meditação, ansiedade, desenvolvimento pessoal..." 
              {...field} 
              disabled={disabled}
            />
          </FormControl>
          <FormDescription>
            Digite a ideia principal para gerar variações de títulos
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default KeywordField;
