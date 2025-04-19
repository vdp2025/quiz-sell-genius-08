
import React from 'react';

interface BenefitsBlockPreviewProps {
  content: {
    title?: string;
    subtitle?: string;
    items?: string[];
    style?: any;
  };
}

const BenefitsBlockPreview: React.FC<BenefitsBlockPreviewProps> = ({ content }) => {
  const defaultBenefits = [
    "Como montar looks com intenção (e não no improviso)",
    "Como usar suas cores, modelagens e tecidos a seu favor",
    "Como alinhar sua imagem com seus valores e objetivos",
    "Como parar de comprar por impulso e montar um guarda-roupa funcional"
  ];

  const benefits = content.items || defaultBenefits;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden" style={content.style}>
      <div className="p-6">
        <h2 className="text-2xl font-playfair font-bold text-[#aa6b5d] mb-3 text-center">
          {content.title || "O Guia de Estilo e Imagem + Bônus Exclusivos"}
        </h2>
        
        {content.subtitle && (
          <p className="text-[#666] mb-6 text-center">
            {content.subtitle || "Criado para mulheres que querem muito mais do que "saber seu estilo". Esse guia é pra quem está pronta pra viver seu estilo na prática — com consciência, direção e autenticidade."}
          </p>
        )}
        
        <h3 className="font-semibold text-[#432818] mb-4">Você vai aprender:</h3>
        
        <ul className="space-y-3">
          {benefits.map((benefit, index) => (
            <li key={index} className="flex items-start">
              <span className="text-[#aa6b5d] mr-2 mt-1">✔️</span>
              <span className="text-[#666]">{benefit}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BenefitsBlockPreview;
