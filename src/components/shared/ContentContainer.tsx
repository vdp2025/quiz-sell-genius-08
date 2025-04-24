import React from 'react';

interface ContentContainerProps {
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const ContentContainer: React.FC<ContentContainerProps> = ({
  size = 'md',
  children,
}) => {
  const maxWidth = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
  }[size];

  return (
    <div className={w-full  mx-auto}>
      {children}
    </div>
  );
};

export default ContentContainer;
