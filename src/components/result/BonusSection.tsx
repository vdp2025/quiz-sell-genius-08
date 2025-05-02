import React from 'react';
import { Card } from '@/components/ui/card';
import { Check } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
const BonusSection: React.FC = () => {
  return <Card className="p-6 mb-10 bg-white shadow-md border border-[#B89B7A]/20 card-elegant overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[#B89B7A]/5 rounded-full blur-3xl -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-[#aa6b5d]/5 rounded-full blur-3xl translate-y-1/2"></div>
      
      <div className="text-center max-w-2xl mx-auto relative z-10">
        <h2 className="text-2xl font-playfair text-[#aa6b5d] mb-4 font-normal">
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
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="overflow-hidden rounded-lg shadow-lg hover:scale-105 transition-transform duration-300">
            <AspectRatio ratio={16 / 9}>
              <img alt="Bônus Peças-chave para seu Estilo" className="w-full h-full object-cover" loading="lazy" width="600" height="338" srcSet="https://res.cloudinary.com/dqljyf76t/image/upload/v1744911668/C%C3%B3pia_de_Passo_5_Pe%C3%A7as_chaves_Documento_A4_lxmekf.webp 600w, 
                        https://res.cloudinary.com/dqljyf76t/image/upload/c_scale,w_1200/v1744911668/C%C3%B3pia_de_Passo_5_Pe%C3%A7as_chaves_Documento_A4_lxmekf.webp 1200w" sizes="(max-width: 768px) 100vw, 600px" src=" https://res.cloudinary.com/dqljyf76t/image/upload/v1744911668/C%C3%B3pia_de_Passo_5_Pe%C3%A7as_chaves_Documento_A4_lxmekf.webp" />
            </AspectRatio>
          </div>
          
          <div className="overflow-hidden rounded-lg shadow-lg hover:scale-105 transition-transform duration-300">
            <AspectRatio ratio={16 / 9}>
              <img src="https://res.cloudinary.com/dqljyf76t/image/upload/v1745515076/C%C3%B3pia_de_MOCKUPS_10_-_Copia_bvoccn.webp" alt="Bônus Visagismo Facial Estratégico" className="w-full h-full object-cover" loading="lazy" width="600" height="338" srcSet="https://res.cloudinary.com/dqljyf76t/image/upload/v1745515076/C%C3%B3pia_de_MOCKUPS_10_-_Copia_bvoccn.webp 600w,
                        https://res.cloudinary.com/dqljyf76t/image/upload/c_scale,w_1200/v1745515076/C%C3%B3pia_de_MOCKUPS_10_-_Copia_bvoccn.webp 1200w" sizes="(max-width: 768px) 100vw, 600px" />
            </AspectRatio>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <div className="max-w-md mx-auto overflow-hidden rounded-lg shadow-lg hover:scale-105 transition-transform duration-300">
            <AspectRatio ratio={4 / 3}>
              <img src="https://res.cloudinary.com/dqljyf76t/image/upload/v1744920677/Espanhol_Portugu%C3%AAs_6_jxqlxx.webp" alt="Todos os produtos e bônus inclusos" className="w-full h-full object-cover" loading="lazy" width="500" height="375" srcSet="https://res.cloudinary.com/dqljyf76t/image/upload/v1744920677/Espanhol_Portugu%C3%AAs_6_jxqlxx.webp 500w,
                        https://res.cloudinary.com/dqljyf76t/image/upload/c_scale,w_1000/v1744920677/Espanhol_Portugu%C3%AAs_6_jxqlxx.webp 1000w" sizes="(max-width: 768px) 100vw, 500px" />
            </AspectRatio>
          </div>
        </div>
      </div>
    </Card>;
};
export default BonusSection;