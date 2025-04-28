
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Control } from "react-hook-form";

interface EmotionSelectProps {
  control: Control<any>;
  disabled: boolean;
}

const EmotionSelect = ({ control, disabled }: EmotionSelectProps) => {
  return (
    <FormField
      control={control}
      name="emotion"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Tipo de Emoção</FormLabel>
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value}
            disabled={disabled}
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
  );
};

export default EmotionSelect;
