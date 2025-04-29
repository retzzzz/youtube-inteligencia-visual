
import React from "react";
import { Card } from "@/components/ui/card";

interface LoginContainerProps {
  children: React.ReactNode;
}

export const LoginContainer: React.FC<LoginContainerProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 w-full">
      <Card className="w-full max-w-md p-8 space-y-6">
        {children}
      </Card>
    </div>
  );
};
