
import React from 'react';
import { StyleResult } from '@/types/quiz';

interface StyleResultBlockPreviewProps {
  content: {
    description?: string;
    customImage?: string;
    style?: any;
  };
  primaryStyle: StyleResult;
}

const StyleResultBlockPreview: React.FC<StyleResultBlockPreviewProps> = ({ content, primaryStyle }) => {
  return (
    <div className="space-y-6" style={content.style}>
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="w-full md:w-1/3">
          {content.customImage ? (
            <img
              src={content.customImage}
              alt={`Estilo ${primaryStyle.category}`}
              className="w-full h-auto rounded-lg"
            />
          ) : (
            <div className="bg-[#ffefec] h-48 flex items-center justify-center rounded-lg">
              <p className="text-[#aa6b5d] font-playfair text-xl">{primaryStyle.category}</p>
            </div>
          )}
        </div>
        
        <div className="w-full md:w-2/3">
          <h2 className="text-xl md:text-2xl font-bold text-[#aa6b5d] mb-4">
            Seu estilo predominante é <span className="font-playfair">{primaryStyle.category}</span>
          </h2>
          
          <p className="text-[#1A1818]/80">
            {content.description || `Você possui ${primaryStyle.percentage}% de características do estilo ${primaryStyle.category}.`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StyleResultBlockPreview;
