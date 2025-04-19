
import React from 'react';
import { Card } from '@/components/ui/card';
import { StyleResult } from '@/types/quiz';
import SecondaryStylesSection from '@/components/quiz-result/SecondaryStylesSection';
import { getStyleColor } from '@/utils/styleUtils';
import { styleConfig } from '@/config/styleConfig';

interface StyleResultPreviewProps {
  primaryStyle: StyleResult;
  description?: string;
  customImage?: string;
}

export const StyleResultPreview: React.FC<StyleResultPreviewProps> = ({
  primaryStyle,
  description,
  customImage
}) => {
  const mockSecondaryStyles: StyleResult[] = [
    { category: 'Contemporâneo', score: 4, percentage: 30 },
    { category: 'Clássico', score: 3, percentage: 20 }
  ];

  const styleName = primaryStyle.category;

  return (
    <Card className="p-6 bg-white shadow-sm">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/2">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-semibold text-[#432818] pr-4 break-words">{styleName}</h2>
                <span className="text-[#B89B7A] font-medium whitespace-nowrap ml-2">{primaryStyle.percentage}%</span>
              </div>
              <div className="w-full bg-[#F3E8E6] rounded-full h-2">
                <div 
                  className="h-2 rounded-full transition-all duration-300 ease-in-out" 
                  style={{ 
                    width: `${primaryStyle.percentage}%`,
                    backgroundColor: getStyleColor(primaryStyle.category)
                  }} 
                />
              </div>
            </div>
            
            <div className="prose max-w-none">
              <p className="text-[#432818]/80 leading-relaxed whitespace-pre-wrap">
                {description || styleConfig[primaryStyle.category]?.description || ''}
              </p>
            </div>
          </div>

          <div className="w-full md:w-1/2">
            <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden bg-[#FAF9F7]">
              <img 
                src={customImage || styleConfig[primaryStyle.category]?.image}
                alt={`Estilo ${styleName}`}
                className="w-full h-full object-cover rounded-lg"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        <div className="mt-6 bg-[#FAF9F7] p-4 rounded-lg">
          <SecondaryStylesSection secondaryStyles={mockSecondaryStyles} />
        </div>
      </div>
    </Card>
  );
};
