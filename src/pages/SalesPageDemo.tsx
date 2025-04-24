
import React from 'react';
import SalesPageContainer from '@/components/sales-page/SalesPageContainer';
import { defaultSalesPageConfig } from '@/types/salesPageConfig';

const SalesPageDemo: React.FC = () => {
  // We can use the default config or create a custom one
  return (
    <SalesPageContainer config={defaultSalesPageConfig} />
  );
};

export default SalesPageDemo;
