
import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  color = '#B89B7A',
  className = ''
}) => {
  const sizeMap = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const sizeClass = sizeMap[size];

  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div
        className={`${sizeClass} border-4 rounded-full animate-spin`}
        style={{
          borderColor: `${color} transparent transparent transparent`
        }}
      />
    </div>
  );
};
