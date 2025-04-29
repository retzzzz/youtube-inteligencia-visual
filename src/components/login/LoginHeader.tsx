
import React, { ReactNode } from "react";

interface LoginHeaderProps {
  title: ReactNode;
  subtitle: string;
}

export const LoginHeader: React.FC<LoginHeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="text-center mb-8">
      <h1 className="text-3xl font-bold text-white">
        {title}
      </h1>
      <p className="text-white/80 mt-2">
        {subtitle}
      </p>
    </div>
  );
};
