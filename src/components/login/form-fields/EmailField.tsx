
import React from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";
import { Control } from "react-hook-form";

interface EmailFieldProps {
  control: Control<any>;
  name: string;
  label: string;
}

export const EmailField: React.FC<EmailFieldProps> = ({ control, name, label }) => {
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
                placeholder={`Digite seu ${name === 'email' ? 'email' : 'email novamente'}`} 
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
