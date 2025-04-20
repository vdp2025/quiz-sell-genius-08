
import React from 'react';
import { StyleResult } from '@/types/quiz';
import OfferCard from './OfferCard';
import { Card } from '../ui/card';

interface OfferSectionProps {
  primaryStyle: StyleResult;
}

export const OfferSection: React.FC<OfferSectionProps> = ({
  primaryStyle
}) => {
  return (
    <Card className="p-6 bg-white mb-8">
      <h2 className="text-xl font-playfair text-center text-[#432818] mb-6">
        Transforme seu estilo em presença
      </h2>
      <OfferCard primaryStyle={primaryStyle} />
    </Card>
  );
};
