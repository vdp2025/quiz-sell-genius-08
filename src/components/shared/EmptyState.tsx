
import React from 'react';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  children,
  icon,
  className
}) => {
  return (
    <div className={cn("flex flex-col items-center justify-center text-center p-6", className)}>
      {icon && <div className="mb-4 text-[#B89B7A]">{icon}</div>}
      
      <h3 className="text-lg font-medium text-[#432818]">{title}</h3>
      
      {description && (
        <p className="mt-2 text-sm text-[#8F7A6A] max-w-md">{description}</p>
      )}
      
      {children && <div className="mt-4">{children}</div>}
    </div>
  );
};
