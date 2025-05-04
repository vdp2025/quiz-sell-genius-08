import React from 'react';
import { useABTest } from '@/contexts/ABTestContext';

interface ABTestComponentProps {
  variantA: React.ReactNode;
  variantB: React.ReactNode;
}

export const ABTestComponent: React.FC<ABTestComponentProps> = ({ 
  variantA, 
  variantB 
}) => {
  const { variant } = useABTest();
  
  return (
    <>
      {variant === 'A' ? variantA : variantB}
    </>
  );
};