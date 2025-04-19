
import React from 'react';
import { EditableContent } from '@/types/editor';

interface TwoColumnBlockPreviewProps {
  content: EditableContent;
  styleType?: string;
}

const TwoColumnBlockPreview: React.FC<TwoColumnBlockPreviewProps> = ({ content, styleType = 'Natural' }) => {
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
  const leftColumn = content.leftColumn || {};
  const rightColumn = content.rightColumn || {};
  const columnGap = content.columnGap || '24px';

  const renderColumn = (column: any, side: 'left' | 'right') => {
    if (column.type === 'image') {
      return (
        <img 
          src={column.imageUrl || 'https://placehold.co/600x400?text=Imagem'} 
          alt={`Imagem ${side}`}
          className="w-full h-auto rounded-lg"
        />
      );
    } else if (column.type === 'text') {
      return (
        <div>
          <h3 className="text-xl font-bold mb-3" style={{ color: styleColor }}>
            {column.title || `Título da coluna ${side}`}
          </h3>
          <p className="text-gray-700">
            {column.text || `Conteúdo de texto para a coluna ${side}. Edite este texto no editor de blocos.`}
          </p>
        </div>
      );
    }
    
    return null;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <div 
        className="flex flex-col md:flex-row items-center"
        style={{ gap: columnGap }}
      >
        <div className="md:w-1/2 mb-6 md:mb-0">
          {renderColumn(leftColumn, 'left')}
        </div>
        
        <div className="md:w-1/2">
          {renderColumn(rightColumn, 'right')}
        </div>
      </div>
    </div>
  );
};

export default TwoColumnBlockPreview;
