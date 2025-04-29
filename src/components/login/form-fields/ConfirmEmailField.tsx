
import React from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";
import { Control } from "react-hook-form";

interface ConfirmEmailFieldProps {
  control: Control<any>;
  name: string;
  label: string;
}

export const ConfirmEmailField: React.FC<ConfirmEmailFieldProps> = ({ control, name, label }) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                className="pl-10" 
                placeholder="Confirme seu email"
                type="email"
                {...field} 
              />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
