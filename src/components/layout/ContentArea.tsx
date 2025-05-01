
import React from 'react';

interface ContentAreaProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

const ContentArea: React.FC<ContentAreaProps> = ({ children, title, description }) => {
  return (
    <main className="w-full max-w-7xl mx-auto" style={{ isolation: "isolate" }}>
      {title && (
        <div className="mb-6">
          <h2 className="text-2xl font-bold">{title}</h2>
          {description && <p className="text-muted-foreground mt-1">{description}</p>}
        </div>
      )}
      <div className="space-y-6">
        {children}
      </div>
    </main>
  );
};

export default ContentArea;
