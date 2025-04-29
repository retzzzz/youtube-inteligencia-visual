
import React, { useRef } from 'react';
import { cn } from '@/lib/utils';

interface FloatingEffectProps extends React.HTMLAttributes<HTMLDivElement> {
  intensity?: number;
  children: React.ReactNode;
}

export function FloatingEffect({
  intensity = 20,
  className,
  children,
  ...props
}: FloatingEffectProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    
    const rotateY = x * intensity;
    const rotateX = -y * intensity;
    
    containerRef.current.style.transform = 
      `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };
  
  const handleMouseLeave = () => {
    if (!containerRef.current) return;
    
    containerRef.current.style.transform = 
      'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    containerRef.current.style.transition = 'transform 0.5s ease';
  };
  
  const handleMouseEnter = () => {
    if (!containerRef.current) return;
    containerRef.current.style.transition = 'transform 0.1s';
  };

  return (
    <div
      ref={containerRef}
      className={cn("transition-transform duration-300", className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      {...props}
    >
      {children}
    </div>
  );
}
