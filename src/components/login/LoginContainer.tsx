
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
        backgroundImage: "url('/lovable-uploads/db9d57dc-23a8-4269-b7e4-294eb0a8b7eb.png')",
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
