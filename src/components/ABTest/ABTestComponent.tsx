import React from 'react';
import { useABTest } from '@/contexts/ABTestContext';

interface ABTestComponentProps {
  variantA: React.ReactNode;
  variantB: React.ReactNode;
  testId?: string;
}

export const ABTestComponent: React.FC<ABTestComponentProps> = ({
  variantA,
  variantB,
  testId = 'default'
}) => {
  const { variant } = useABTest();

  return (
    <div data-testid={`ab-test-${testId}`} data-variant={variant}>
      {variant === 'A' ? variantA : variantB}
    </div>
  );
};