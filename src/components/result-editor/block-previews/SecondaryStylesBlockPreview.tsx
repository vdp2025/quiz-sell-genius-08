
import React, { useEffect, useState } from 'react';
import { StyleResult } from '@/types/quiz';
import { getStyleConfig } from '@/utils/styleUtils';

interface SecondaryStylesBlockPreviewProps {
  content: {
    title?: string;
    style?: any;
  };
}

const SecondaryStylesBlockPreview: React.FC<SecondaryStylesBlockPreviewProps> = ({ content }) => {
  const [secondaryStyles, setSecondaryStyles] = useState<StyleResult[]>([]);
  
  // Carregar os estilos secundários do localStorage
  useEffect(() => {
    const savedResult = localStorage.getItem('quizResult');
    if (savedResult) {
      try {
        const result = JSON.parse(savedResult);
        if (result.secondaryStyles && Array.isArray(result.secondaryStyles)) {
          setSecondaryStyles(result.secondaryStyles.slice(0, 2));
        }
      } catch (error) {
        console.error('Erro ao carregar estilos secundários:', error);
      }
    }
  }, []);

  return (
    <div style={content.style}>
      <h3 className="text-xl font-bold mb-4 text-[#aa6b5d] text-center">
        {content.title || 'Seus Estilos Complementares'}
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {secondaryStyles.length > 0 ? (
          secondaryStyles.map((style) => {
            const styleInfo = getStyleConfig(style.category);
            return (
              <div key={style.category} className="bg-[#fff7f3] p-4 rounded-lg">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="font-medium text-[#aa6b5d]">{style.category}</h4>
                  <span className="text-sm font-medium text-[#8F7A6A]">{style.percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5 mb-2">
                  <div 
                    className="bg-[#B89B7A] h-1.5 rounded-full" 
                    style={{ width: `${style.percentage}%` }}
                  />
                </div>
                <p className="text-[#1A1818]/80 text-sm">
                  {styleInfo.description.substring(0, 120)}...
                </p>
              </div>
            );
          })
        ) : (
          // Fallback se não houver estilos secundários
          <>
            <div className="bg-[#fff7f3] p-4 rounded-lg">
              <h4 className="font-medium text-[#aa6b5d] mb-2">Natural</h4>
              <p className="text-[#1A1818]/80 text-sm">
                Você valoriza o conforto e a praticidade. Seu estilo é descontraído e casual, com peças fáceis de usar no dia a dia.
              </p>
            </div>
            
            <div className="bg-[#fff7f3] p-4 rounded-lg">
              <h4 className="font-medium text-[#aa6b5d] mb-2">Contemporâneo</h4>
              <p className="text-[#1A1818]/80 text-sm">
                Você gosta de estar atualizado e seguir as tendências. Seu estilo é moderno e versátil, combinando o clássico com o atual.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SecondaryStylesBlockPreview;
