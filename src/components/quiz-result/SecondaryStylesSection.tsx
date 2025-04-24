
import React from 'react';
import { StyleResult } from '@/types/quiz';

interface SecondaryStylesSectionProps {
  secondaryStyles: StyleResult[];
}

const SecondaryStylesSection: React.FC<SecondaryStylesSectionProps> = ({ secondaryStyles }) => {
  // Pegue apenas os 3 primeiros estilos secundários
  const topStyles = secondaryStyles.slice(0, 3);

  return (
    <div className="space-y-3">
      {topStyles.map((style, index) => (
        <div key={index} className="flex justify-between items-center">
          <span className="text-[#432818] font-medium">{style.category}</span>
          <span className="text-[#B89B7A]">{Math.round(style.percentage)}%</span>
        </div>
      ))}
    </div>
  );
};

export default SecondaryStylesSection;
