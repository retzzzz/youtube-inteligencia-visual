
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Control } from "react-hook-form";

interface LanguageSelectProps {
  control: Control<any>;
  disabled: boolean;
}

const LanguageSelect = ({ control, disabled }: LanguageSelectProps) => {
  return (
    <FormField
      control={control}
      name="language"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Idioma Principal</FormLabel>
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value}
            disabled={disabled}
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
  );
};

export default LanguageSelect;
