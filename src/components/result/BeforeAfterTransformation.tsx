
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { trackButtonClick } from '@/utils/analytics';

interface TransformationItem {
  beforeImage: string;
  afterImage: string;
  name: string;
}

// Imagens otimizadas com melhor qualidade
const transformations: TransformationItem[] = [
  {
    beforeImage: "https://res.cloudinary.com/dqljyf76t/image/upload/q_auto:best,f_auto,w_800/v1745519979/Captura_de_tela_2025-03-31_034324_pmdn8y.webp",
    afterImage: "https://res.cloudinary.com/dqljyf76t/image/upload/q_auto:best,f_auto,w_800/v1745519979/Captura_de_tela_2025-03-31_034324_pmdn8y.webp",
    name: "Adriana"
  }, 
  {
    beforeImage: "https://res.cloudinary.com/dqljyf76t/image/upload/q_auto:best,f_auto,w_800/v1745522326/Captura_de_tela_2025-03-31_034324_cpugfj.webp",
    afterImage: "https://res.cloudinary.com/dqljyf76t/image/upload/q_auto:best,f_auto,w_800/v1745522326/Captura_de_tela_2025-03-31_034324_cpugfj.webp",
    name: "Mariangela"
  }
];

const BeforeAfterTransformation: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [imagesLoaded, setImagesLoaded] = useState<{
    before: boolean;
    after: boolean;
  }>({
    before: false,
    after: false
  });
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  
  const activeTransformation = transformations[activeIndex];

  // Preload images to ensure they display correctly
  useEffect(() => {
    // Precarregar todas as imagens para melhor experiência
    transformations.forEach((item) => {
      const beforeImg = new Image();
      const afterImg = new Image();
      beforeImg.src = item.beforeImage;
      afterImg.src = item.afterImage;
      
      if (item === activeTransformation) {
        beforeImg.onload = () => setImagesLoaded(prev => ({
          ...prev,
          before: true
        }));
        afterImg.onload = () => setImagesLoaded(prev => ({
          ...prev,
          after: true
        }));
      }
    });
    
    return () => {
      // Cleanup
    };
  }, [activeIndex, activeTransformation]);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPosition(Number(e.target.value));
  };

  const handleDotClick = (index: number) => {
    setActiveIndex(index);
    // Reset images loaded state when changing transformation
    setImagesLoaded({
      before: false,
      after: false
    });
  };
  
  const handleCTAClick = () => {
    // Track checkout initiation
    trackButtonClick('checkout_button', 'Iniciar Checkout', 'transformation_section');
    window.location.href = 'https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912';
  };

  const areImagesReady = imagesLoaded.before && imagesLoaded.after;

  return (
    <section id="transforme-seu-visual" class="py-10 px-4 text-center bg-white">
  <h2 class="text-3xl md:text-4xl font-playfair text-[#aa6b5d] mb-2">Transformações Reais</h2>
  <p class="text-center text-[#3a3a3a] mb-6 max-w-md mx-auto">
    Veja como o conhecimento do estilo pessoal transforma a imagem e a autoconfiança
  </p>
  <div class="elegant-divider w-32 mx-auto mt-0 mb-6"></div>

  <div class="max-w-2xl mx-auto">
    <div class="p-6 card-elegant overflow-hidden">
      <div class="h-[400px] md:h-[500px] w-full flex items-center justify-center bg-[#f9f4ef]">
        <div class="w-12 h-12 border-4 border-[#aa6b5d] border-t-transparent rounded-full animate-spin"></div>
      </div>

      <div class="relative h-[400px] md:h-[500px] w-full mb-4 hidden">
        <div class="absolute inset-0 w-full h-full">
          <img 
            src="https://res.cloudinary.com/dqljyf76t/image/upload/v1714755567/exemplo-transformacao.webp" 
            alt="Transformação de imagem pessoal" 
            class="w-full h-full object-cover" 
            loading="eager" 
            fetchPriority="high"
          />
        </div>

        <div class="absolute bottom-4 left-0 right-0 mx-auto bg-white/80 backdrop-blur-sm py-2 px-4 text-center rounded-lg max-w-xs">
          <p class="font-medium">Nome da Transformada</p>
        </div>
      </div>

      <div class="flex justify-center gap-2 mt-4">
        <button class="w-3 h-3 rounded-full bg-[#aa6b5d]" aria-label="Transformação 1"></button>
        <button class="w-3 h-3 rounded-full bg-[#aa6b5d]/30" aria-label="Transformação 2"></button>
        <button class="w-3 h-3 rounded-full bg-[#aa6b5d]/30" aria-label="Transformação 3"></button>
      </div>
    </div>

    <div class="mt-8 text-center">
      <a href="#valores-do-guia">
        <button 
          class="text-white py-4 px-6 rounded-md transition-all duration-300"
          style="background: linear-gradient(to right, #aa6b5d, #B89B7A); box-shadow: 0 4px 14px rgba(184, 155, 122, 0.4);"
        >
          <span class="flex items-center justify-center gap-2">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18 17.8832V16L23 19L18 22V19.9095C14.9224 19.4698 12.2513 17.4584 11.0029 14.5453L10.9971 14.5453C9.57893 17.8544 6.32508 20 2.72483 20H2V18H2.72483C5.52503 18 8.05579 16.3312 9.15885 13.7574L9.91203 12L9.15885 10.2426C8.05579 7.66878 5.52503 6 2.72483 6H2V4H2.72483C6.32508 4 9.57893 6.14557 10.9971 9.45473L11.0029 9.45473C12.2513 6.5416 14.9224 4.53022 18 4.09051V2L23 5L18 8V6.11684C15.7266 6.53763 13.7737 8.0667 12.8412 10.2426L12.088 12L12.8412 13.7574C13.7737 15.9333 15.7266 17.4624 18 17.8832Z"></path></svg>
            Quero Descobrir Meu Guia Completo
          </span>
        </button>
      </a>
      <p class="text-sm text-[#aa6b5d] mt-2">Oferta por tempo limitado - Acesso imediato</p>
    </div>
  </div>
</section>
export default BeforeAfterTransformation;
