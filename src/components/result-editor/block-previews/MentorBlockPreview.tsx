
import React from 'react';

interface MentorBlockPreviewProps {
  content: {
    name?: string;
    title?: string;
    bio?: string;
    image?: string;
    style?: any;
  };
}

const MentorBlockPreview: React.FC<MentorBlockPreviewProps> = ({ content }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden" style={content.style}>
      <div className="p-6">
        <h2 className="text-2xl font-playfair font-bold text-[#aa6b5d] mb-6 text-center">
          {content.title || "Conheça sua Mentora"}
        </h2>
        
        <div className="md:flex items-center gap-8">
          <div className="md:w-1/3 mb-6 md:mb-0">
            <img 
              src={content.image || "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911667/WhatsApp_Image_2025-04-02_at_09.43.29_ubwaq9.webp"} 
              alt={content.name || "Gisele Galvão"} 
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>
          
          <div className="md:w-2/3">
            <h3 className="text-xl font-semibold text-[#432818] mb-3">
              {content.name || "Gisele Galvão"}
            </h3>
            
            <div className="prose text-[#666] max-w-none">
              {content.bio || (
                <>
                  <p>Consultora de Imagem e Estilo, Personal Branding, Estrategista de Marca pessoal e Especialista em coloração pessoal com Certificação internacional.</p>
                  
                  <p>Advogada de formação. Mãe da Victória, esposa do Fabrício.</p>
                  
                  <p>Apaixonada pela vida, pelos detalhes, viagens e tudo que me proporcione crescer como ser humano. Colérica, virginiana, paciente, pacificadora e muito empata.</p>
                  
                  <p>Amo receber, atos de serviços e tempo de qualidade são minha linguagem de amor. Amo vinho, chás e café. Meus maiores valores são minha família, justiça, honestidade, ética e liberdade.</p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorBlockPreview;
