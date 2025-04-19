
import React from 'react';

interface StyleHeroBlockPreviewProps {
  content: {
    title?: string;
    subtitle?: string;
    description?: string;
    mainImage?: string;
    styleType?: string;
    style?: any;
  };
  styleType?: string;
}

const StyleHeroBlockPreview: React.FC<StyleHeroBlockPreviewProps> = ({ content, styleType = 'Natural' }) => {
  // Get the appropriate image based on style type
  const getStyleGuideImage = () => {
    const styleImages: Record<string, string> = {
      'Natural': 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071344/GUIA_NATURAL_fzp6fc.webp',
      'Clássico': 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071343/GUIA_CL%C3%81SSICO_ux1yhf.webp',
      'Contemporâneo': 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071343/GUIA_CONTEMPOR%C3%82NEO_vcklxe.webp',
      'Elegante': 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071342/GUIA_ELEGANTE_asez1q.webp',
      'Romântico': 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071343/GUIA_ROM%C3%82NTICO_ci4hgk.webp',
      'Sexy': 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071349/GUIA_SEXY_t5x2ov.webp',
      'Dramático': 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745073346/GUIA_DRAM%C3%81TICO_mpn60d.webp',
      'Criativo': 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071342/GUIA_CRIATIVO_ntbzph.webp'
    };
    
    return styleImages[styleType] || styleImages['Natural'];
  };

  return (
    <div style={content.style} className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-8 text-center">
        <h2 className="text-2xl md:text-3xl font-playfair font-bold text-[#aa6b5d] mb-4">
          {content.title || "Você já descobriu seu Estilo"}
        </h2>
        <p className="text-[#8F7A6A] mb-6 max-w-xl mx-auto">
          {content.subtitle || "Conhecimento é clareza. E clareza muda o jeito que você se vê, se escolhe, se posiciona."}
        </p>
        <p className="text-[#432818] mb-6 max-w-xl mx-auto">
          {content.description || "Mas é na ação que a verdadeira transformação acontece. É quando você aplica o que aprendeu… que o espelho começa a contar uma nova história."}
        </p>
        
        <div className="grid md:grid-cols-2 gap-8 mt-12">
          <img
            src={getStyleGuideImage()}
            alt={`Guia de Estilo ${styleType}`}
            className="w-full rounded-lg shadow-lg"
          />
          <img
            src={content.mainImage || "https://res.cloudinary.com/dqljyf76t/image/upload/v1745071347/MOCKUP_TABLETE_-_GUIA_DE_IMAGEM_E_ESTILO_ncctzi.webp"}
            alt="Guia de Estilo e Imagem"
            className="w-full rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default StyleHeroBlockPreview;
