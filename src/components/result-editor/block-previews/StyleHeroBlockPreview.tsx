
import React, { useEffect, useState } from 'react';
import { StyleResult } from '@/types/quiz';
import { getStyleConfig } from '@/utils/styleUtils';

interface StyleHeroBlockPreviewProps {
  content: {
    title?: string;
    subtitle?: string;
    description?: string;
    mainImage?: string;
    styleType?: string;
    style?: any;
  };
  styleType?: string;
}

const StyleHeroBlockPreview: React.FC<StyleHeroBlockPreviewProps> = ({ content, styleType }) => {
  const [userPrimaryStyle, setUserPrimaryStyle] = useState<StyleResult | null>(null);
  
  // Carregar o estilo do usuário do localStorage
  useEffect(() => {
    const savedResult = localStorage.getItem('quizResult');
    if (savedResult) {
      try {
        const result = JSON.parse(savedResult);
        if (result.primaryStyle) {
          setUserPrimaryStyle(result.primaryStyle);
        }
      } catch (error) {
        console.error('Erro ao carregar estilo do usuário:', error);
      }
    }
  }, []);
  
  // Usar o estilo do quiz se disponível, senão usar styleType ou conteúdo
  const displayStyle = userPrimaryStyle?.category || styleType || content.styleType || 'Natural';
  const styleInfo = getStyleConfig(displayStyle as any);

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-[#fff7f3] to-white rounded-2xl p-8" style={content.style}>
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#aa6b5d]/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
      
      <div className="relative max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-[#aa6b5d] mb-4">
            {content.title || `DESCUBRA SEU ESTILO ${displayStyle.toUpperCase()}`}
          </h2>
          
          <p className="text-xl text-[#1A1818]/80 max-w-2xl mx-auto">
            {content.subtitle || 'Transforme sua imagem e expresse sua verdadeira essência'}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-2xl font-medium text-[#aa6b5d] mb-4">{displayStyle}</h3>
            <p className="text-[#1A1818]/80 mb-6">
              {content.description || styleInfo.description}
            </p>
            <div className="bg-white p-4 rounded-lg inline-block shadow-sm">
              <div className="flex items-center text-[#aa6b5d]">
                <span className="font-semibold mr-2">Conheça seu estilo único</span>
                <span className="text-sm bg-[#aa6b5d] text-white px-2 py-1 rounded">
                  {userPrimaryStyle ? `${userPrimaryStyle.percentage}%` : '100%'}
                </span>
              </div>
            </div>
          </div>
          
          <div className="relative">
            {content.mainImage ? (
              <img
                src={content.mainImage}
                alt={displayStyle}
                className="w-full h-auto rounded-lg shadow-lg"
              />
            ) : (
              <img
                src={styleInfo.image}
                alt={displayStyle}
                className="w-full h-auto rounded-lg shadow-lg"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StyleHeroBlockPreview;
