
import React from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle, Gift } from 'lucide-react';
import { EditableContent } from '@/types/editor';

interface OfferBlockPreviewProps {
  content: EditableContent;
  styleType?: string;
}

const OfferBlockPreview: React.FC<OfferBlockPreviewProps> = ({ content, styleType = 'Natural' }) => {
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

  const benefits = content.benefits || [];
  const bonuses = content.bonuses || [];

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6 md:p-8">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6" style={{ color: styleColor }}>
          {content.title || 'Guia de Estilo e Imagem'}
        </h2>
        
        <p className="text-gray-700 text-center mb-8 max-w-2xl mx-auto">
          {content.subtitle || 'Descubra como expressar seu estilo autêntico e transformar sua imagem'}
        </p>
        
        {content.productImage && (
          <div className="flex justify-center mb-8">
            <img 
              src={content.productImage} 
              alt="Produto" 
              className="max-w-full rounded-lg shadow-lg"
              style={{ maxHeight: '300px' }}
            />
          </div>
        )}
        
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-4">Benefícios:</h3>
            <ul className="space-y-3">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" style={{ color: styleColor }} />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-4">Bônus Exclusivos:</h3>
            <ul className="space-y-3">
              {bonuses.map((bonus, index) => (
                <li key={index} className="flex items-start">
                  <Gift className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" style={{ color: styleColor }} />
                  <span>{bonus}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="text-center mb-8">
          <p className="text-gray-500 line-through text-lg mb-1">
            De R$ {content.regularPrice || '175,00'}
          </p>
          <p className="text-3xl md:text-4xl font-bold mb-2" style={{ color: styleColor }}>
            Por apenas R$ {content.price || '39,00'}
          </p>
          <p className="text-gray-600 text-sm">
            Pagamento único e seguro
          </p>
        </div>
        
        <div className="flex justify-center">
          <Button
            className="px-8 py-6 text-lg rounded-lg"
            style={{ background: styleColor }}
          >
            {content.ctaText || 'Quero Transformar Meu Estilo'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OfferBlockPreview;
