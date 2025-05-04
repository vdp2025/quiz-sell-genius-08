
import React from 'react';
import { Card } from '@/components/ui/card';
import { Check } from 'lucide-react';

const BonusSection: React.FC = () => {
  return (
    <Card className="p-6 mb-10 bg-white shadow-md border border-[#B89B7A]/20 card-elegant overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[#B89B7A]/5 rounded-full blur-3xl -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-[#aa6b5d]/5 rounded-full blur-3xl translate-y-1/2"></div>
      
      <div className="text-center max-w-2xl mx-auto relative z-10">
        <h2 className="text-2xl font-playfair text-[#aa6b5d] mb-4">
          Bônus Exclusivos
        </h2>
        <div className="elegant-divider w-32 mx-auto mb-6"></div>
        
        <div className="grid md:grid-cols-2 gap-8 text-left mb-8">
          <div className="bg-[#fff7f3] p-6 rounded-lg border border-[#B89B7A]/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-[#aa6b5d] text-white text-xs font-bold px-2 py-1">BÔNUS 1</div>
            <div className="mt-6">
              <h3 className="text-lg font-playfair text-[#aa6b5d] mb-2">Peças-chave para seu Estilo</h3>
              <p className="text-[#432818] text-sm mb-4">
                Um guia completo com as peças essenciais para seu tipo de estilo,
                para montar um guarda-roupa versátil e autêntico.
              </p>
              <div className="flex items-center gap-2 text-[#432818] text-sm">
                <Check className="text-[#B89B7A] h-4 w-4" />
                <span>Valor: R$ 79,00 (GRÁTIS)</span>
              </div>
            </div>
          </div>
          
          <div className="bg-[#f9f4ef] p-6 rounded-lg border border-[#B89B7A]/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-[#B89B7A] text-white text-xs font-bold px-2 py-1">BÔNUS 2</div>
            <div className="mt-6">
              <h3 className="text-lg font-playfair text-[#aa6b5d] mb-2">Visagismo Facial Estratégico</h3>
              <p className="text-[#432818] text-sm mb-4">
                Aprenda a valorizar seu formato de rosto com técnicas de visagismo
                para maquiagem, cabelo e acessórios.
              </p>
              <div className="flex items-center gap-2 text-[#432818] text-sm">
                <Check className="text-[#B89B7A] h-4 w-4" />
                <span>Valor: R$ 29,00 (GRÁTIS)</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-[#B89B7A]/10 hover:shadow-md transition-shadow">
            <div className="flex justify-center mb-4">
              <img 
                src="https://res.cloudinary.com/dqljyf76t/image/upload/v1744911668/C%C3%B3pia_de_Passo_5_Pe%C3%A7as_chaves_Documento_A4_lxmekf.webp" 
                alt="Bônus: Peças-chave do Guarda-roupa" 
                className="w-full max-w-[250px] h-auto rounded-lg shadow-sm hover:scale-105 transition-transform duration-300" 
                loading="lazy"
                srcSet="
                  https://res.cloudinary.com/dqljyf76t/image/upload/c_scale,w_200/v1744911668/C%C3%B3pia_de_Passo_5_Pe%C3%A7as_chaves_Documento_A4_lxmekf.webp 200w,
                  https://res.cloudinary.com/dqljyf76t/image/upload/c_scale,w_300/v1744911668/C%C3%B3pia_de_Passo_5_Pe%C3%A7as_chaves_Documento_A4_lxmekf.webp 300w,
                  https://res.cloudinary.com/dqljyf76t/image/upload/v1744911668/C%C3%B3pia_de_Passo_5_Pe%C3%A7as_chaves_Documento_A4_lxmekf.webp 400w
                "
                sizes="(max-width: 768px) 45vw, 250px"
              />
            </div>
            <h3 className="text-lg font-medium text-[#aa6b5d] mb-2">Peças-chave do Guarda-roupa</h3>
            <p className="text-[#432818] text-sm">Descubra as peças essenciais para seu estilo que maximizam suas combinações com investimento inteligente.</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm border border-[#B89B7A]/10 hover:shadow-md transition-shadow">
            <div className="flex justify-center mb-4">
              <img 
                src="https://res.cloudinary.com/dqljyf76t/image/upload/v1745515076/C%C3%B3pia_de_MOCKUPS_10_-_Copia_bvoccn.webp" 
                alt="Bônus: Visagismo Facial" 
                className="w-full max-w-[250px] h-auto rounded-lg shadow-sm hover:scale-105 transition-transform duration-300" 
                loading="lazy"
                srcSet="
                  https://res.cloudinary.com/dqljyf76t/image/upload/c_scale,w_200/v1745515076/C%C3%B3pia_de_MOCKUPS_10_-_Copia_bvoccn.webp 200w,
                  https://res.cloudinary.com/dqljyf76t/image/upload/c_scale,w_300/v1745515076/C%C3%B3pia_de_MOCKUPS_10_-_Copia_bvoccn.webp 300w,
                  https://res.cloudinary.com/dqljyf76t/image/upload/v1745515076/C%C3%B3pia_de_MOCKUPS_10_-_Copia_bvoccn.webp 400w
                "
                sizes="(max-width: 768px) 45vw, 250px"
              />
            </div>
            <h3 className="text-lg font-medium text-[#aa6b5d] mb-2">Visagismo Facial</h3>
            <p className="text-[#432818] text-sm">Aprenda a valorizar seus traços faciais com técnicas de maquiagem, cortes de cabelo e acessórios que harmonizam com seu rosto.</p>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <img 
            src="https://res.cloudinary.com/dqljyf76t/image/upload/v1744920677/Espanhol_Portugu%C3%AAs_6_jxqlxx.webp" 
            alt="Todos os produtos e bônus inclusos" 
            className="mx-auto rounded-lg shadow-lg max-w-md hover:scale-105 transition-transform duration-300" 
            loading="lazy"
          />
        </div>
      </div>
    </Card>
  );
};

export default BonusSection;
