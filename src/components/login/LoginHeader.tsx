
import React from "react";

interface LoginHeaderProps {
  title: string;
  subtitle: string;
}

export const LoginHeader: React.FC<LoginHeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="text-center mb-8">
      <h1 className="text-3xl font-bold">
        {title}
      </h1>
      <p className="text-muted-foreground mt-2">
        {subtitle}
      </p>
    </div>
  );
};
