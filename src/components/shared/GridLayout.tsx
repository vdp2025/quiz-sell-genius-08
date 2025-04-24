
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
}) => {
  // Create the grid columns class dynamically based on the columns prop
  let gridColsClass;
  switch (columns) {
    case 1:
      gridColsClass = 'grid-cols-1';
      break;
    case 2:
      gridColsClass = 'grid-cols-2';
      break;
    case 3:
      gridColsClass = 'grid-cols-3';
      break;
    case 4:
      gridColsClass = 'grid-cols-4';
      break;
    case 5:
      gridColsClass = 'grid-cols-5';
      break;
    case 6:
      gridColsClass = 'grid-cols-6';
      break;
    case 12:
      gridColsClass = 'grid-cols-12';
      break;
    default:
      gridColsClass = 'grid-cols-1';
  }

  return (
    <div className={cn('grid', gridColsClass, gap, className)}>
      {children}
    </div>
  );
};

export default GridLayout;
