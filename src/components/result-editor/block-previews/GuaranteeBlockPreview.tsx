
import React from 'react';
import { EditableContent } from '@/types/editor';

interface GuaranteeBlockPreviewProps {
  content: EditableContent;
  styleType?: string;
}

const GuaranteeBlockPreview: React.FC<GuaranteeBlockPreviewProps> = ({ content, styleType = 'Natural' }) => {
  const getStyleColor = () => {
    const styleColors: Record<string, string> = {
      'Natural': '#B89B7A',
      'Clássico': '#9F9B9D',
      'Contemporâneo': '#3E4152',
      'Elegante': '#9B7A6D',
      'Romântico': '#D69BCD',
      'Sexy': '#DF5461',
      'Dramático': '#465362',
      'Criativo': '#E9742B'
    };
    
    return styleColors[styleType] || '#B89B7A';
  };
  
  const styleColor = getStyleColor();

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="md:w-1/3 flex justify-center">
          <img 
            src={content.image || 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745076124/garantia-7-dias_b4wd8c.png'} 
            alt="Garantia" 
            className="max-w-full"
            style={{ maxHeight: '160px' }}
          />
        </div>
        
        <div className="md:w-2/3">
          <h3 className="text-2xl font-bold mb-4" style={{ color: styleColor }}>
            {content.title || `Garantia de ${content.days || 7} dias`}
          </h3>
          
          <p className="text-gray-700">
            {content.text || `Se você não ficar 100% satisfeita com o conteúdo nos primeiros ${content.days || 7} dias, devolvemos seu dinheiro integralmente, sem burocracia.`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default GuaranteeBlockPreview;
