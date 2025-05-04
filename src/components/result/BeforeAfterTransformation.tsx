
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';
import { trackButtonClick } from '@/utils/analytics';

const BeforeAfterTransformation: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  
  const transformations = [
    {
      id: 1,
      image: "https://res.cloudinary.com/dqljyf76t/image/upload/v1745519979/Captura_de_tela_2025-03-31_034324_pmdn8y.webp",
      name: "Transformação Real"
    },
    {
      id: 2,
      image: "https://res.cloudinary.com/dqljyf76t/image/upload/t_Antes%20e%20Depois%20-%20de%20Descobrir%20seu%20Estilo/v1745193438/5702e50d-7785-426a-a0c6-3c47af176523_p9acfp.webp",
      name: "Antes e Depois"
    },
    {
      id: 3,
      image: "https://res.cloudinary.com/dqljyf76t/image/upload/t_Antes%20e%20Depois%20-%20de%20Descobrir%20seu%20Estilo/v1745193438/6cceaaa9-9383-4890-95a4-da036f8421e3_u7tuaw.webp",
      name: "Resultado Transformador"
    }
  ];

  useEffect(() => {
    // Pré-carregar imagens
    const imagePromises = transformations.map(transformation => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = transformation.image;
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
      });
    });

    Promise.all(imagePromises).then(() => {
      setImagesLoaded(true);
    });

    // Configurar carrossel automático
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % transformations.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleCTAClick = () => {
    trackButtonClick('transformation_cta', 'Transformação CTA', 'results_page');
    window.location.href = 'https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912';
  };

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % transformations.length);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + transformations.length) % transformations.length);
  };

  return (
    <Card className="p-6 mb-10 bg-white shadow-md border border-[#B89B7A]/20 card-elegant overflow-hidden">
      <h2 className="text-2xl md:text-3xl font-playfair text-[#aa6b5d] text-center mb-4">
        Transformações Reais
      </h2>
      <div className="elegant-divider w-32 mx-auto mt-0 mb-6"></div>
      
      <div className="grid md:grid-cols-2 gap-8 items-center">
        {/* Texto e benefícios à esquerda */}
        <div className="space-y-4">
          <h3 className="text-xl font-medium text-[#aa6b5d] mb-2">
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
            className="btn-cta-green w-full py-3 text-lg font-medium mt-4"
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
        
        {/* Carrossel de imagens à direita */}
        <div className="relative">
          {!imagesLoaded && (
            <div className="h-64 w-full flex items-center justify-center bg-[#f9f4ef] rounded-lg">
              <div className="w-12 h-12 border-4 border-[#aa6b5d] border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          
          <div className={`relative overflow-hidden rounded-lg ${imagesLoaded ? '' : 'hidden'}`}>
            <div 
              className="flex transition-transform duration-500 ease-in-out" 
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {transformations.map((transformation, index) => (
                <div key={transformation.id} className="w-full flex-shrink-0 relative">
                  <img 
                    src={transformation.image} 
                    alt={`Transformação de estilo`}
                    className="w-full h-auto object-cover rounded-lg shadow-md" 
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                  
                  {/* Badges de Antes e Depois */}
                  <div className="absolute top-2 left-2 bg-[#aa6b5d] text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                    Antes
                  </div>
                  <div className="absolute top-2 right-2 bg-[#4CAF50] text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                    Depois
                  </div>
                </div>
              ))}
            </div>
            
            {/* Controles do carrossel */}
            <button 
              onClick={prevSlide}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1 shadow-md transition-all duration-300"
              aria-label="Slide anterior"
            >
              <ChevronLeft className="w-5 h-5 text-[#aa6b5d]" />
            </button>
            <button 
              onClick={nextSlide}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1 shadow-md transition-all duration-300"
              aria-label="Próximo slide"
            >
              <ChevronRight className="w-5 h-5 text-[#aa6b5d]" />
            </button>
            
            {/* Indicadores de slide */}
            <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2">
              {transformations.map((_, index) => (
                <button 
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    currentSlide === index ? 'bg-[#aa6b5d] w-4' : 'bg-white/70'
                  }`}
                  aria-label={`Ir para slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
          
          {/* Nome da pessoa */}
          <p className="text-center text-sm mt-2 font-medium text-[#432818]">
            {imagesLoaded && transformations[currentSlide].name}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default BeforeAfterTransformation;
