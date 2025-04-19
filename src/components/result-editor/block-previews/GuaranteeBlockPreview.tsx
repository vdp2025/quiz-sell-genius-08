
import React from 'react';

interface GuaranteeBlockPreviewProps {
  content: {
    title?: string;
    description?: string;
    days?: number;
    image?: string;
    style?: any;
  };
}

const GuaranteeBlockPreview: React.FC<GuaranteeBlockPreviewProps> = ({ content }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden" style={content.style}>
      <div className="p-6">
        <div className="md:flex items-center gap-8">
          <div className="md:w-1/3 mb-6 md:mb-0">
            <img 
              src={content.image || "https://res.cloudinary.com/dqljyf76t/image/upload/v1744916216/C%C3%B3pia_de_01._P%C3%A1gina_-_Produto_de_Entrada_2_hamaox.webp"} 
              alt="Garantia" 
              className="w-full h-auto rounded-lg"
            />
          </div>
          
          <div className="md:w-2/3">
            <h2 className="text-2xl font-playfair font-bold text-[#aa6b5d] mb-3">
              {content.title || `Garantia de ${content.days || 7} dias`}
            </h2>
            
            <p className="text-[#666]">
              {content.description || 
                "Você tem uma semana para acessar o conteúdo completo, testar e aplicar. Se não fizer sentido pra você, devolvemos 100% do seu investimento. Sem burocracia."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuaranteeBlockPreview;
