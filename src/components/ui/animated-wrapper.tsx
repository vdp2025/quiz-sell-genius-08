
import React from 'react';
import { cn } from '@/lib/utils';

interface AnimatedWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export const AnimatedWrapper: React.FC<AnimatedWrapperProps> = ({
  children,
  className
}) => {
  return (
    <div 
      className={cn(
        "animate-fadeIn transition-opacity",
        className
      )}
    >
      {children}
    </div>
  );
};
