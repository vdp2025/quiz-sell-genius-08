
import React from 'react';

interface ContentContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const ContentContainer: React.FC<ContentContainerProps> = ({ 
  children, 
  className = '' 
}) => {
  return (
    <div className={`max-w-4xl mx-auto px-4 ${className}`}>
      {children}
    </div>
  );
};
