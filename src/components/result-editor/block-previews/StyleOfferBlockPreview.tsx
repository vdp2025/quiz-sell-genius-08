
import React from 'react';

interface StyleOfferBlockPreviewProps {
  content: {
    title?: string;
    subtitle?: string;
    description?: string;
    price?: string;
    regularPrice?: string;
    ctaText?: string;
    ctaUrl?: string;
    productImage?: string;
    benefits?: string[];
    style?: any;
  };
}

const StyleOfferBlockPreview: React.FC<StyleOfferBlockPreviewProps> = ({ content }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md" style={content.style}>
      <div className="bg-gradient-to-r from-[#B89B7A]/20 to-[#F9EFE6] p-8 text-center">
        <h2 className="text-2xl md:text-3xl font-playfair font-bold text-[#432818] mb-4">
          {content.title || "Transforme Seu Guarda-Roupa com Seu Estilo Único"}
        </h2>
        <p className="text-[#8F7A6A] max-w-2xl mx-auto mb-6">
          {content.subtitle || "Descubra como aplicar seu estilo único e criar looks que expressam quem você realmente é"}
        </p>
        
        {content.productImage ? (
          <img 
            src={content.productImage} 
            alt="Produto" 
            className="max-w-xs mx-auto rounded-lg shadow-lg mb-6" 
          />
        ) : (
          <div className="bg-[#FAF9F7] p-4 rounded-lg max-w-xs mx-auto mb-6 flex items-center justify-center h-48">
            <p className="text-[#8F7A6A]">Imagem do Produto</p>
          </div>
        )}
      </div>
      
      <div className="p-8">
        <div className="mb-8">
          <h3 className="text-xl font-medium text-[#432818] mb-4">
            {content.description || "O que você vai receber:"}
          </h3>
          <ul className="space-y-2">
            {content.benefits ? (
              content.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-[#B89B7A] mr-2">✓</span>
                  <span className="text-[#432818]">{benefit}</span>
                </li>
              ))
            ) : (
              <>
                <li className="flex items-start">
                  <span className="text-[#B89B7A] mr-2">✓</span>
                  <span className="text-[#432818]">Guia completo do seu estilo predominante</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#B89B7A] mr-2">✓</span>
                  <span className="text-[#432818]">Paleta de cores personalizada</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#B89B7A] mr-2">✓</span>
                  <span className="text-[#432818]">Dicas de combinações para criar looks incríveis</span>
                </li>
              </>
            )}
          </ul>
        </div>
        
        <div className="text-center space-y-4">
          <div className="flex justify-center items-center gap-3">
            {content.regularPrice && (
              <span className="text-[#8F7A6A] line-through">{content.regularPrice}</span>
            )}
            <span className="text-2xl font-bold text-[#432818]">{content.price || "R$ 39,90"}</span>
          </div>
          
          <a 
            href={content.ctaUrl || "#"} 
            className="inline-block bg-[#B89B7A] hover:bg-[#A38A69] text-white font-medium py-3 px-6 rounded-md transition-colors w-full md:w-auto md:min-w-[200px]"
          >
            {content.ctaText || "QUERO MEU GUIA AGORA"}
          </a>
        </div>
      </div>
    </div>
  );
};

export default StyleOfferBlockPreview;
