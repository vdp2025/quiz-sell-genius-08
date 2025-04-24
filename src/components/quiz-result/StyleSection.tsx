
import React from 'react';
import { StyleResult } from '@/types/quiz';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { styleConfig } from '@/config/styleConfig';
import SecondaryStylesSection from './SecondaryStylesSection';

interface StyleSectionProps {
  primaryStyle: StyleResult;
  secondaryStyles: StyleResult[];
}

const StyleSection: React.FC<StyleSectionProps> = ({ primaryStyle, secondaryStyles }) => {
  const { category } = primaryStyle;
  const { description, image } = styleConfig[category];

  return (
    <Card className="p-6 bg-white border-[#B89B7A]/20">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-[#432818]">Compatibilidade</span>
              <span className="text-[#B89B7A] font-medium">{primaryStyle.percentage}%</span>
            </div>
            <Progress value={primaryStyle.percentage} className="h-2 bg-[#F3E8E6]" />
          </div>

          <h2 className="text-2xl font-playfair text-[#432818]">
            Seu estilo é {category}
          </h2>

          <p className="text-[#432818] leading-relaxed">
            {description}
          </p>

          <div className="bg-[#fffaf7] p-4 rounded-lg">
            <h3 className="text-lg font-medium text-[#432818] mb-3">
              Seus Estilos Complementares
            </h3>
            <SecondaryStylesSection secondaryStyles={secondaryStyles} />
          </div>
        </div>

        <div>
          <img
            src={image}
            alt={`Estilo ${category}`}
            className="w-full rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>
    </Card>
  );
};

export default StyleSection;
