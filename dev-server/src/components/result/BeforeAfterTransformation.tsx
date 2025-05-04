
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
// TODO: Import analytics tracking once utils/analytics module is created

// Define your transformations data
const transformations = [
  {
    beforeImage: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744967537/before_image_1_wf5cgp.jpg',
    afterImage: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744967537/after_image_1_dyryph.jpg',
    name: 'Transformação 1'
  },
  {
    beforeImage: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744967537/before_image_2_hovqqh.jpg',
    afterImage: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744967537/after_image_2_xcl4fy.jpg',
    name: 'Transformação 2'
  }
];

const BeforeAfterTransformation: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState({ before: false, after: false });
  const [showBefore, setShowBefore] = useState(false);
  const activeTransformation = transformations[activeIndex];

  useEffect(() => {
    const beforeImg = new Image();
    const afterImg = new Image();
    beforeImg.src = activeTransformation.beforeImage;
    afterImg.src = activeTransformation.afterImage;

    setImagesLoaded({ before: false, after: false });

    beforeImg.onload = () => setImagesLoaded(prev => ({ ...prev, before: true }));
    afterImg.onload = () => setImagesLoaded(prev => ({ ...prev, after: true }));
  }, [activeTransformation]);

  const areImagesReady = imagesLoaded.before && imagesLoaded.after;

  const handleToggle = () => {
    setShowBefore(!showBefore);
  };

  const nextTransformation = () => {
    setActiveIndex((activeIndex + 1) % transformations.length);
  };

  return (
    <div className="py-10">
      <h2 className="text-2xl md:text-3xl font-playfair text-[#aa6b5d] text-center mb-2">
        Transformações Reais
      </h2>
      <p className="text-center text-[#3a3a3a] mb-6 max-w-md mx-auto">
        Veja como o conhecimento do estilo pessoal transforma a imagem e a autoconfiança
      </p>
      <div className="elegant-divider w-32 mx-auto mt-0 mb-6"></div>

      <div className="max-w-2xl mx-auto">
        <Card className="p-6 card-elegant overflow-hidden">
          {!areImagesReady && (
            <div className="h-[400px] md:h-[500px] w-full flex items-center justify-center bg-[#f9f4ef]">
              <div className="w-12 h-12 border-4 border-[#aa6b5d] border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          <div className={`relative h-[400px] md:h-[500px] w-full mb-4 ${areImagesReady ? '' : 'hidden'}`}>
            <div className="absolute inset-0 w-full h-full">
              <img 
                src={showBefore ? activeTransformation.beforeImage : activeTransformation.afterImage} 
                alt={`Transformação - ${activeTransformation.name} - ${showBefore ? 'Antes' : 'Depois'}`} 
                className="w-full h-full object-cover" 
                loading="eager"
                fetchPriority="high"
              />
            </div>

            <div className="absolute top-4 right-4">
              <button 
                className="bg-white/90 px-4 py-2 rounded-full shadow-md text-sm font-medium text-[#432818] hover:bg-white transition-colors"
                onClick={handleToggle}
              >
                Ver {showBefore ? 'Depois' : 'Antes'}
              </button>
            </div>

            <div className="absolute bottom-4 left-4">
              <button 
                className="bg-[#aa6b5d]/90 px-4 py-2 rounded-full shadow-md text-sm font-medium text-white hover:bg-[#aa6b5d] transition-colors"
                onClick={nextTransformation}
              >
                Próxima Transformação
              </button>
            </div>
          </div>
          
          <div className="text-center">
            <p className="font-medium text-[#432818]">
              {showBefore ? 'Antes' : 'Depois'} de descobrir seu estilo pessoal
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default BeforeAfterTransformation;
