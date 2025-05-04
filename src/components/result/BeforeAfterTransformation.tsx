
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '../ui/button';
import { ShoppingCart, CheckCircle } from 'lucide-react';
import { trackButtonClick } from '@/utils/analytics';

const BeforeAfterTransformation: React.FC = () => {
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = "https://res.cloudinary.com/dqljyf76t/image/upload/v1745521117/Captura_de_tela_2025-03-31_034324_qxvdho.webp";
    img.onload = () => setImagesLoaded(true);
  }, []);

  const handleCTAClick = () => {
    trackButtonClick('transformation_cta', 'Transformação CTA', 'results_page');
    window.location.href = 'https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912';
  };

  return (
    <div className="py-10">
      <h2 className="text-2xl md:text-3xl font-playfair text-[#aa6b5d] text-center mb-2">
        Veja como outras mulheres transformaram seu estilo com nosso guia
      </h2>
      <div className="elegant-divider w-32 mx-auto mt-0 mb-6"></div>

      <div className="max-w-2xl mx-auto">
        <Card className="p-6 card-elegant overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              {!imagesLoaded && (
                <div className="h-auto w-full flex items-center justify-center bg-[#f9f4ef] p-8">
                  <div className="w-12 h-12 border-4 border-[#aa6b5d] border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
              
              <div className={`relative w-full mb-4 ${imagesLoaded ? '' : 'hidden'}`}>
                <div className="w-full">
                  <img 
                    src="https://res.cloudinary.com/dqljyf76t/image/upload/v1745521117/Captura_de_tela_2025-03-31_034324_qxvdho.webp" 
                    alt="Resultados Reais - Antes e Depois" 
                    className="w-full h-auto object-cover rounded-lg shadow-md" 
                    loading="eager"
                    fetchPriority="high"
                    srcSet="
                      https://res.cloudinary.com/dqljyf76t/image/upload/c_scale,w_400/v1745521117/Captura_de_tela_2025-03-31_034324_qxvdho.webp 400w,
                      https://res.cloudinary.com/dqljyf76t/image/upload/c_scale,w_600/v1745521117/Captura_de_tela_2025-03-31_034324_qxvdho.webp 600w,
                      https://res.cloudinary.com/dqljyf76t/image/upload/v1745521117/Captura_de_tela_2025-03-31_034324_qxvdho.webp 800w
                    "
                    sizes="(max-width: 768px) 90vw, (max-width: 1024px) 45vw, 500px"
                  />
                  <div className="absolute top-2 left-2 bg-[#aa6b5d] text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                    Resultados Reais
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-medium text-[#aa6b5d]">
                Descubra o poder da imagem intencional
              </h3>
              
              <p className="text-[#3a3a3a]">
                Seu estilo não é apenas sobre roupas — é sobre comunicar quem você é e onde quer chegar.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-[#4CAF50] flex-shrink-0 mt-1" size={20} />
                  <span>Looks com intenção e identidade</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-[#4CAF50] flex-shrink-0 mt-1" size={20} />
                  <span>Cores, modelagens e tecidos a seu favor</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-[#4CAF50] flex-shrink-0 mt-1" size={20} />
                  <span>Imagem alinhada aos seus objetivos</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-[#4CAF50] flex-shrink-0 mt-1" size={20} />
                  <span>Guarda-roupa funcional, sem compras por impulso</span>
                </div>
              </div>
              
              <Button 
                className="btn-cta-green w-full py-3 text-lg font-medium"
                onClick={handleCTAClick}
                style={{
                  background: "linear-gradient(to right, #4CAF50, #45a049)",
                  boxShadow: "0 4px 14px rgba(76, 175, 80, 0.4)"
                }}
              >
                <ShoppingCart className="mr-2" />
                <span>Quero Meu Guia de Estilo</span>
              </Button>
              
              <p className="text-xs text-center text-[#aa6b5d]">
                Oferta por tempo limitado
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default BeforeAfterTransformation;
