
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
    bonusImage?: string;
    benefits?: string[];
    bonusTitle?: string;
    bonuses?: string[];
    style?: any;
  };
}

const StyleOfferBlockPreview: React.FC<StyleOfferBlockPreviewProps> = ({ content }) => {
  const defaultBonuses = [
    "Peças-chave do Guarda-Roupa de Sucesso: Itens essenciais que descomplicam a rotina e valorizam o seu estilo pessoal.",
    "Mini Guia de Visagismo Facial: Para alinhar seu rosto, cabelo e maquiagem com a sua identidade visual."
  ];

  const bonuses = content.bonuses || defaultBonuses;
  const ctaUrl = content.ctaUrl || "https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912";

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md" style={content.style}>
      <div className="bg-gradient-to-r from-[#fff2ed] to-[#fff8f5] p-8 text-center">
        <h2 className="text-2xl md:text-3xl font-playfair font-bold text-[#aa6b5d] mb-4">
          {content.title || "Transforme Seu Estilo com o Guia Completo"}
        </h2>
        <p className="text-[#666] max-w-2xl mx-auto mb-6">
          {content.subtitle || "Simples. Prático. Estratégico. Para você transformar estilo em presença. E imagem em poder."}
        </p>
        
        <img 
          src={content.productImage || "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911682/C%C3%B3pia_de_MOCKUPS_13_znzbks.webp"} 
          alt="Guia Completo de Estilo e Imagem" 
          className="max-w-2xl mx-auto rounded-lg shadow-lg mb-6" 
        />
      </div>
      
      <div className="p-8">
        {content.bonusTitle && (
          <h3 className="text-xl font-medium text-[#aa6b5d] mb-4 text-center">
            {content.bonusTitle || "🎁 E ainda recebe 2 bônus poderosos:"}
          </h3>
        )}
        
        <ul className="space-y-3 mb-8">
          {bonuses.map((bonus, index) => (
            <li key={index} className="flex items-start">
              <span className="text-[#aa6b5d] mr-2 mt-1">🎁</span>
              <span className="text-[#666]">{bonus}</span>
            </li>
          ))}
        </ul>

        {content.bonusImage && (
          <div className="mb-8">
            <img 
              src={content.bonusImage || "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911677/C%C3%B3pia_de_MOCKUPS_15_-_Copia_grstwl.webp"} 
              alt="Bônus Exclusivos" 
              className="max-w-md mx-auto rounded-lg shadow-md" 
            />
          </div>
        )}
        
        <div className="text-center space-y-4 mb-8">
          <div className="flex justify-center items-center gap-3">
            {content.regularPrice && (
              <span className="text-[#888] line-through">R$ {content.regularPrice || "175,00"}</span>
            )}
            <span className="text-3xl font-bold text-[#aa6b5d]">R$ {content.price || "39,00"}</span>
          </div>
          
          <a 
            href={ctaUrl} 
            className="inline-block bg-[#aa6b5d] hover:bg-[#8f574a] text-white font-medium py-3 px-6 rounded-md transition-colors w-full md:w-auto md:min-w-[300px]"
            target="_blank"
            rel="noopener noreferrer"
          >
            {content.ctaText || "Quero meu Guia + Bônus por R$39,00"}
          </a>
        </div>
        
        <div className="text-center text-sm text-[#888]">
          <p>⏳ Oferta válida apenas nesta página</p>
          <p>Essa condição especial com os dois bônus é exclusiva para quem acabou de fazer o teste de estilo.</p>
        </div>
      </div>
    </div>
  );
};

export default StyleOfferBlockPreview;
