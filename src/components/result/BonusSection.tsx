
import React from 'react';
import { Card } from '@/components/ui/card';

const BonusSection: React.FC = () => {
  return (
    <div className="py-10">
      <h2 className="text-2xl md:text-3xl font-playfair text-[#aa6b5d] text-center mb-2">
        Bônus Exclusivos para Você
      </h2>
      <p className="text-center text-[#3a3a3a] mb-6 max-w-md mx-auto">
        Além do guia principal, você receberá estes recursos complementares
      </p>
      <div className="elegant-divider w-32 mx-auto mt-0 mb-6"></div>

      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-[#B89B7A]/10 hover:shadow-md transition-shadow relative">
            <div className="absolute -top-3 -right-3 bg-[#aa6b5d] text-white px-3 py-1 rounded-full text-xs font-bold transform rotate-12 shadow-md">
              Valor: R$ 79,00
            </div>
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
          
          <div className="bg-white p-4 rounded-lg shadow-sm border border-[#B89B7A]/10 hover:shadow-md transition-shadow relative">
            <div className="absolute -top-3 -right-3 bg-[#aa6b5d] text-white px-3 py-1 rounded-full text-xs font-bold transform rotate-12 shadow-md">
              Valor: R$ 29,00
            </div>
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
      </div>
    </div>
  );
};

export default BonusSection;
