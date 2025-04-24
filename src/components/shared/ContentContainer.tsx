
import React from 'react';
import { cn } from '@/lib/utils';
import { sharedStyles } from '@/styles/sharedStyles';

interface ContentContainerProps {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const ContentContainer: React.FC<ContentContainerProps> = ({
  children,
  size = 'md',
  className
}) => {
  return (
    <div className={cn(
      'w-full mx-auto px-4 py-6',
      sharedStyles.containerSizes[size],
      className
    )}>
      {children}
    </div>
  );
};

