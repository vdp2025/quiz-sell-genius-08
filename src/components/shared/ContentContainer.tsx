import React from 'react';

interface ContentContainerProps {
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const sizeClassMap: Record<'sm' | 'md' | 'lg', string> = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
};

export const ContentContainer: React.FC<ContentContainerProps> = ({
  size = 'md',
  children,
}) => {
  const maxWidthClass = sizeClassMap[size] || 'max-w-md';
  return (
    <div className={`w-full ${maxWidthClass} mx-auto`}>
      {children}
    </div>
  );
};

export default ContentContainer;
