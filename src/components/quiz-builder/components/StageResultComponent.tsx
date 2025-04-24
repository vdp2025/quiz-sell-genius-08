
import React from 'react';
import { cn } from '@/lib/utils';

interface StageResultComponentProps {
  data: {
    stageTitle?: string;
    title?: string;
    subtitle?: string;
    primaryStyleTitle?: string;
    secondaryStylesTitle?: string;
    showPercentages?: boolean;
    showDescriptions?: boolean;
    callToActionText?: string;
    callToActionUrl?: string;
    offerImageUrl?: string;
    authorImageUrl?: string;
    accentColor?: string;
    [key: string]: any;
  };
  style?: {
    backgroundColor?: string;
    textColor?: string;
    [key: string]: any;
  };
  isSelected?: boolean;
}

const StageResultComponent: React.FC<StageResultComponentProps> = ({ data, style, isSelected }) => {
  // Dados de exemplo para visualização
  const examplePrimaryStyle = {
    category: 'Elegante',
    percentage: 65
  };
  
  const exampleSecondaryStyles = [
    { category: 'Contemporâneo', percentage: 20 },
    { category: 'Clássico', percentage: 15 }
  ];

  const getStyleDescription = (styleType: string) => {
    const descriptions: Record<string, string> = {
      'Natural': 'Você valoriza o conforto e a praticidade. Seu estilo é descontraído e casual.',
      'Clássico': 'Você aprecia roupas atemporais e elegantes. Seu estilo é refinado e tradicional.',
      'Contemporâneo': 'Você gosta de estar atualizado. Seu estilo é moderno e versátil.',
      'Elegante': 'Você valoriza a sofisticação. Seu estilo é polido e imponente.',
      'Romântico': 'Você aprecia detalhes delicados e femininos. Seu estilo é suave e gracioso.',
      'Sexy': 'Você gosta de valorizar suas curvas. Seu estilo é sensual e marcante.',
      'Dramático': 'Você busca impactar e chamar atenção. Seu estilo é arrojado e marcante.',
      'Criativo': 'Você adora expressar sua individualidade. Seu estilo é único e original.'
    };
    
    return descriptions[styleType] || 'Descrição do estilo não disponível.';
  };
  
  return (
    <div 
      className={cn(
        "py-8 px-4",
        isSelected && "outline-dashed outline-2 outline-[#B89B7A]"
      )}
      style={{
        backgroundColor: style?.backgroundColor || '#FAF9F7',
        color: style?.textColor || '#432818',
      }}
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-playfair mb-3">
          {data.title || 'Seu Resultado de Estilo Pessoal'}
        </h2>
        <p className="mb-6 max-w-2xl mx-auto">
          {data.subtitle || 'Baseado nas suas escolhas, calculamos seu estilo predominante'}
        </p>
      </div>
      
      {/* Resultado Principal */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8 max-w-2xl mx-auto">
        <h3 className="text-xl font-medium mb-4" style={{ color: data.accentColor || '#B89B7A' }}>
          {data.primaryStyleTitle || 'Seu Estilo Predominante'}
        </h3>
        
        <div className="flex items-center mb-4">
          <div 
            className="w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold mr-4"
            style={{ backgroundColor: data.accentColor || '#B89B7A' }}
          >
            {examplePrimaryStyle.percentage}%
          </div>
          
          <div>
            <h4 className="text-lg font-playfair">{examplePrimaryStyle.category}</h4>
            {data.showDescriptions && (
              <p className="text-sm text-gray-700 mt-1">
                {getStyleDescription(examplePrimaryStyle.category)}
              </p>
            )}
          </div>
        </div>
        
        {/* Imagens */}
        <div className="grid md:grid-cols-2 gap-4 mt-6">
          {data.offerImageUrl && (
            <div>
              <img 
                src={data.offerImageUrl} 
                alt="Estilo visual" 
                className="w-full h-auto rounded-md"
              />
            </div>
          )}
          
          {data.authorImageUrl && (
            <div>
              <img 
                src={data.authorImageUrl} 
                alt="Autor" 
                className="w-full h-auto rounded-md"
              />
            </div>
          )}
        </div>
      </div>
      
      {/* Estilos Secundários */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8 max-w-2xl mx-auto">
        <h3 className="text-xl font-medium mb-4" style={{ color: data.accentColor || '#B89B7A' }}>
          {data.secondaryStylesTitle || 'Seus Estilos Complementares'}
        </h3>
        
        <div className="grid grid-cols-2 gap-4">
          {exampleSecondaryStyles.map((style, index) => (
            <div key={index} className="border rounded-md p-4">
              <div className="flex items-center">
                {data.showPercentages && (
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3"
                    style={{ backgroundColor: data.accentColor || '#B89B7A' }}
                  >
                    {style.percentage}%
                  </div>
                )}
                
                <div>
                  <h4 className="font-medium">{style.category}</h4>
                  {data.showDescriptions && (
                    <p className="text-xs text-gray-700 mt-1">
                      {getStyleDescription(style.category).substring(0, 60)}...
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* CTA */}
      {data.callToActionText && (
        <div className="text-center mt-8">
          <a 
            href={data.callToActionUrl || '#'} 
            className="inline-block px-8 py-3 rounded-md text-white text-lg transition-colors"
            style={{ backgroundColor: data.accentColor || '#B89B7A' }}
          >
            {data.callToActionText}
          </a>
        </div>
      )}
    </div>
  );
};

export default StageResultComponent;
