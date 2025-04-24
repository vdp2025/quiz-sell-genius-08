
import React from 'react';
import SalesPageContainer from '@/components/sales-page/SalesPageContainer';
import { defaultSalesPageConfig } from '@/types/salesPageConfig';

const SalesPageDemo: React.FC = () => {
  return (
    <SalesPageContainer config={defaultSalesPageConfig} />
  );
};

export default SalesPageDemo;
