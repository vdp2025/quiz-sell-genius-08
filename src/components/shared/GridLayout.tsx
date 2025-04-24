
import React from 'react';
import { cn } from '@/lib/utils';

interface GridLayoutProps {
  columns?: number;
  gap?: string;
  className?: string;
  children: React.ReactNode;
}

export const GridLayout: React.FC<GridLayoutProps> = ({
  columns = 1,
  gap = 'gap-4',
  className = '',
  children,
}) => (
  <div className={cn(`grid grid-cols-${columns}`, gap, className)}>
    {children}
  </div>
);

export default GridLayout;
