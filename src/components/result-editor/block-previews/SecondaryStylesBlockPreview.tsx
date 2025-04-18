
import React from 'react';

interface SecondaryStylesBlockPreviewProps {
  content: {
    title?: string;
    style?: any;
  };
}

const SecondaryStylesBlockPreview: React.FC<SecondaryStylesBlockPreviewProps> = ({ 
  content
}) => {
  return (
    <div className="mt-4 md:mt-6 space-y-3" style={content.style}>
      <h3 className="text-base md:text-lg font-playfair text-[#432818]">
        {content.title || 'Seus Estilos Complementares'}
      </h3>
      <div className="grid grid-cols-1 gap-3">
        {[1, 2].map((index) => (
          <div key={index} className="flex gap-3 items-start bg-gray-50 p-2 md:p-3 rounded-lg">
            <div className="w-14 md:w-16 h-14 md:h-16 bg-gray-200 rounded"></div>
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <h4 className="font-playfair text-sm md:text-base text-[#432818]">
                  {index === 1 ? 'Natural' : 'Contemporâneo'}
                </h4>
                <span className="text-xs font-medium">{index === 1 ? '15%' : '10%'}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1">
                <div 
                  className="bg-[#B89B7A] h-1 rounded-full" 
                  style={{ width: index === 1 ? '15%' : '10%' }}
                />
              </div>
              <p className="text-xs md:text-sm text-[#1A1818]/70 mt-1">
                {index === 1 
                  ? 'Você valoriza o conforto e a praticidade. Seu estilo é descontraído e casual.'
                  : 'Você gosta de estar atualizado e seguir as tendências. Seu estilo é moderno e versátil.'
                }
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SecondaryStylesBlockPreview;
