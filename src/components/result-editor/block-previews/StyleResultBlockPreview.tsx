
import React, { useEffect, useState } from 'react';
import { EditableContent } from '@/types/editor';
import { StyleResult } from '@/types/quiz';
import { getStyleConfig, StyleCategory } from '@/utils/styleUtils';

interface StyleResultBlockPreviewProps {
  content: EditableContent;
  primaryStyle?: StyleResult;
  styleType?: string;
}

const StyleResultBlockPreview: React.FC<StyleResultBlockPreviewProps> = ({
  content,
  primaryStyle,
  styleType
}) => {
  const [userPrimaryStyle, setUserPrimaryStyle] = useState<StyleResult | null>(null);
  
  // Carregar o resultado do quiz do localStorage
  useEffect(() => {
    const savedResult = localStorage.getItem('quizResult');
    if (savedResult) {
      try {
        const result = JSON.parse(savedResult);
        if (result.primaryStyle) {
          setUserPrimaryStyle(result.primaryStyle);
        }
      } catch (error) {
        console.error('Erro ao carregar resultado do quiz:', error);
      }
    }
  }, []);
  
  // Usar o estilo do quiz se disponível, senão usar styleType ou primaryStyle
  const displayStyle = userPrimaryStyle?.category || styleType || primaryStyle?.category || 'Natural';
  
  // Cast the displayStyle to StyleCategory to satisfy TypeScript
  const styleInfo = getStyleConfig(displayStyle as StyleCategory);

  return (
    <div className="p-6 bg-white rounded-lg border border-[#B89B7A]/20" style={content.style as React.CSSProperties}>
      <div className="flex flex-col md:flex-row items-center gap-6">
        {content.imageUrl ? (
          <img
            src={content.imageUrl}
            alt={displayStyle}
            className="w-full md:w-1/3 rounded-lg"
          />
        ) : (
          <img
            src={styleInfo.image}
            alt={displayStyle}
            className="w-full md:w-1/3 rounded-lg"
          />
        )}
        <div className="flex-1">
          <h2 className="text-xl font-playfair text-[#432818] mb-2">
            {content.title || `Seu estilo predominante é ${displayStyle}`}
          </h2>
          <p className="text-[#8F7A6A]">
            {content.description || styleInfo.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StyleResultBlockPreview;
