
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const LoadingState: React.FC = () => {
  return (
    <div className="space-y-3">
      {Array(5).fill(0).map((_, i) => (
        <div key={i} className="flex items-center space-x-2">
          <Skeleton className="h-6 w-6 rounded-full" />
          <Skeleton className="h-4 w-full" />
        </div>
      ))}
    </div>
  );
};

export default LoadingState;
