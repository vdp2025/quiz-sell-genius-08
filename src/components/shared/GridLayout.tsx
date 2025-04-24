import React from 'react';

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
  <div className={grid grid-cols-  }>
    {children}
  </div>
);

export default GridLayout;
