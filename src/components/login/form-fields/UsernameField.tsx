
import React from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { User } from "lucide-react";
import { Control } from "react-hook-form";
import { LoginFormValues } from "../LoginForm";

interface UsernameFieldProps {
  control: Control<LoginFormValues>;
}

export const UsernameField: React.FC<UsernameFieldProps> = ({ control }) => {
  return (
    <FormField
      control={control}
      name="username"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Usuário</FormLabel>
          <FormControl>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                className="pl-10" 
                placeholder="Digite seu usuário" 
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
