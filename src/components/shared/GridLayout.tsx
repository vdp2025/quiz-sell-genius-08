
import React from 'react';
import { cn } from '@/lib/utils';

interface GridLayoutProps {
  children: React.ReactNode;
  columns?: number;
  gap?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const GridLayout: React.FC<GridLayoutProps> = ({
  children,
  columns = 1,
  gap = 'md',
  className
}) => {
  const columnsClass = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  }[columns];

  const gapClass = {
    'none': 'gap-0',
    'sm': 'gap-2',
    'md': 'gap-4',
    'lg': 'gap-6',
    'xl': 'gap-8'
  }[gap];

  return (
    <div className={cn('grid', columnsClass, gapClass, className)}>
      {children}
    </div>
  );
};
