
import React from 'react';
import { StyleResult } from '@/types/quiz';
import { Card } from '@/components/ui/card';
import SecondaryStylesSection from '@/components/quiz-result/SecondaryStylesSection';
import { useIsMobile } from '@/hooks/use-mobile';

interface StyleResultSectionProps {
  primaryStyle: StyleResult;
  description: string;
  image: string;
  secondaryStyles: StyleResult[];
}

export const StyleResultSection: React.FC<StyleResultSectionProps> = ({
  primaryStyle,
  description,
  image,
  secondaryStyles
}) => {
  const isMobile = useIsMobile();
  
  return (
    <Card className="p-4 bg-white shadow-sm border border-[#B89B7A]/20">
      <div className="w-full max-w-md mx-auto mb-4">
        <div className="w-full bg-[#F3E8E6] rounded-full h-2">
          <div 
            className="bg-[#B89B7A] h-2 rounded-full transition-all duration-300 ease-in-out" 
            style={{ width: `${primaryStyle.percentage}%` }} 
          />
        </div>
      </div>
      
      <div className="space-y-4">
        <p className="text-base text-[#432818] leading-relaxed">
          {description}
        </p>
        
        {isMobile ? (
          // Mobile layout - Complementary styles below the image
          <div className="space-y-4">
            <img 
              src={image} 
              alt={`Estilo ${primaryStyle.category}`}
              className="w-1/2 h-auto rounded-lg shadow-sm mx-auto" // Reduced to 50% width
            />
            <div className="bg-white rounded-lg p-3 shadow-sm border border-[#B89B7A]/10">
              <SecondaryStylesSection secondaryStyles={secondaryStyles} />
            </div>
          </div>
        ) : (
          // Desktop layout - Complementary styles overlay on image
          <div className="relative">
            <img 
              src={image} 
              alt={`Estilo ${primaryStyle.category}`}
              className="w-1/2 h-auto rounded-lg shadow-sm mx-auto" // Reduced to 50% width
            />
            <div className="absolute bottom-2 right-2 w-48 bg-white/90 rounded-lg p-2 shadow-md">
              <SecondaryStylesSection secondaryStyles={secondaryStyles} />
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

