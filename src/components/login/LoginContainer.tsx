
import React from "react";
import { Card } from "@/components/ui/card";
import { FloatingEffect } from "@/components/ui/floating-effect";

interface LoginContainerProps {
  children: React.ReactNode;
}

export const LoginContainer: React.FC<LoginContainerProps> = ({ children }) => {
  return (
    <div 
      className="min-h-screen flex items-center justify-center w-full bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/lovable-uploads/2f60fdb4-67a4-40ec-a1c6-cfdb7b4b81c4.png')",
      }}
    >
      <FloatingEffect intensity={5} className="w-full max-w-md px-4">
        <Card className="p-8 space-y-6 backdrop-blur-xl bg-white/10 border border-white/20 shadow-lg rounded-xl">
          {children}
        </Card>
      </FloatingEffect>
    </div>
  );
};
