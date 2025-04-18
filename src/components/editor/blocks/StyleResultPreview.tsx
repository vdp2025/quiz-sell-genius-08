
import React from 'react';
import { Card } from '@/components/ui/card';
import { StyleResult } from '@/types/quiz';
import SecondaryStylesSection from '@/components/quiz-result/SecondaryStylesSection';
import { getStyleColor } from '@/utils/styleUtils';

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
  // Create mock secondary styles for preview
  const mockSecondaryStyles: StyleResult[] = [
    { category: 'Contemporâneo', score: 4, percentage: 30 },
    { category: 'Clássico', score: 3, percentage: 20 }
  ];

  return (
    <Card className="p-6 bg-white shadow-sm">
      <div className="space-y-6">
        {/* Primary Style Section */}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/2">
            <div className="mb-4">
              <div className="flex items-center justify-between mb-1">
                <h2 className="text-lg font-medium text-[#432818]">{primaryStyle.category}</h2>
                <span className="text-[#B89B7A] font-medium">{primaryStyle.percentage}%</span>
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
            
            <p className="text-[#432818]/80 leading-relaxed">
              {description || `Você possui ${primaryStyle.percentage}% de características do estilo ${primaryStyle.category}.`}
            </p>
          </div>

          <div className="w-full md:w-1/2">
            <img 
              src={customImage || `https://res.cloudinary.com/dqljyf76t/image/upload/v1744735317/2_ziffwx.webp`}
              alt={`Estilo ${primaryStyle.category}`}
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
        </div>

        {/* Secondary Styles Section */}
        <div className="mt-6 bg-[#FAF9F7] p-4 rounded-lg">
          <SecondaryStylesSection secondaryStyles={mockSecondaryStyles} />
        </div>
      </div>
    </Card>
  );
};
