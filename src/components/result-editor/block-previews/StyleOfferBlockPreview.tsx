
import React, { useEffect, useState } from 'react';
import { StyleResult } from '@/types/quiz';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

interface StyleOfferBlockPreviewProps {
  content: {
    title?: string;
    subtitle?: string;
    price?: string;
    regularPrice?: string;
    ctaText?: string;
    ctaUrl?: string;
    productImage?: string;
    urgencyText?: string;
    features?: string[];
    bonuses?: string[];
    style?: any;
  };
}

const StyleOfferBlockPreview: React.FC<StyleOfferBlockPreviewProps> = ({ content }) => {
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
  
  const styleType = userPrimaryStyle?.category || 'Natural';

  return (
    <div className="bg-white rounded-xl shadow-xl overflow-hidden" style={content.style}>
      <div className="p-8 md:p-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-[#432818] mb-3">
            {content.title || `Transforme Seu Visual com o Poder do Estilo ${styleType}`}
          </h2>
          <p className="text-lg text-[#8F7A6A]">
            {content.subtitle || 'Descubra como expressar sua verdadeira essência através das roupas'}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 items-center mb-8">
          <div>
            <div className="bg-[#FAF9F7] p-6 rounded-xl mb-6">
              <div className="flex justify-between items-end mb-2">
                <div>
                  <span className="text-sm text-[#8F7A6A] line-through mb-1 block">
                    R$ {content.regularPrice || '197'}
                  </span>
                  <span className="text-3xl font-bold text-[#AA6B5D]">
                    R$ {content.price || '97'}
                  </span>
                </div>
                <span className="bg-[#aa6b5d]/10 text-[#aa6b5d] text-sm font-medium px-3 py-1 rounded">
                  Oferta exclusiva
                </span>
              </div>
              
              <Button className="w-full bg-[#AA6B5D] hover:bg-[#905c50] text-white py-6 rounded-lg text-lg mb-3">
                {content.ctaText || `Quero Meu Guia de Estilo ${styleType}`}
              </Button>
              
              <p className="text-center text-sm text-[#8F7A6A]">
                {content.urgencyText || 'Oferta por tempo limitado!'}
              </p>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-medium text-[#432818]">O que você vai receber:</h3>
              <ul className="space-y-2">
                {(content.features || [
                  `Guia completo do estilo ${styleType}`,
                  'Análise detalhada das suas características',
                  'Combinações perfeitas para seu tipo físico',
                  'Paleta de cores personalizada'
                ]).map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-[#AA6B5D] mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-[#432818]">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div>
            {content.productImage ? (
              <img 
                src={content.productImage} 
                alt="Guia de Estilo" 
                className="w-full rounded-lg shadow-md"
              />
            ) : (
              <div className="aspect-video bg-[#FAF9F7] rounded-lg flex items-center justify-center">
                <p className="text-[#8F7A6A]">Imagem do produto</p>
              </div>
            )}
            
            {(content.bonuses && content.bonuses.length > 0) && (
              <div className="mt-6">
                <h3 className="font-medium text-[#432818] mb-3">Bônus exclusivos:</h3>
                <ul className="space-y-2">
                  {content.bonuses.map((bonus, index) => (
                    <li key={index} className="flex items-start">
                      <span className="inline-block bg-[#AA6B5D] text-white rounded-full w-5 h-5 text-xs flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                        {index + 1}
                      </span>
                      <span className="text-[#432818]">{bonus}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StyleOfferBlockPreview;
