
import React from 'react';
import { StyleResult } from '@/types/quiz';
import { styleConfig } from '@/config/styleConfig';
import { Card } from '../ui/card';

interface MainContentSectionProps {
  primaryStyle: StyleResult;
}

export const MainContentSection: React.FC<MainContentSectionProps> = ({
  primaryStyle
}) => {
  const styleData = styleConfig[primaryStyle.category];
  
  return (
    <Card className="p-6 bg-white mb-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <p className="text-[#432818] leading-relaxed">
            {styleData?.description || 'Descrição do estilo não encontrada.'}
          </p>
        </div>
        <div className="order-first md:order-last">
          <img 
            src={styleData?.image || ''} 
            alt={`Estilo ${primaryStyle.category}`} 
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>
    </Card>
  );
};
