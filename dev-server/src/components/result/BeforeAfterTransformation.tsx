import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
// TODO: Import analytics tracking once utils/analytics module is created

// Define your transformations data
const transformations = [
  {
    beforeImage: 'path/to/before/image1.jpg',
    afterImage: 'path/to/after/image1.jpg',
    name: 'Transformation 1'
  },
  // Add more transformations as needed
];

const BeforeAfterTransformation: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState({ before: false, after: false });
  const activeTransformation = transformations[activeIndex];

  useEffect(() => {
    const beforeImg = new Image();
    const afterImg = new Image();
    beforeImg.src = activeTransformation.beforeImage;
    afterImg.src = activeTransformation.afterImage;

    beforeImg.onload = () => setImagesLoaded(prev => ({ ...prev, before: true }));
    afterImg.onload = () => setImagesLoaded(prev => ({ ...prev, after: true }));
  }, [activeTransformation]);

  const areImagesReady = imagesLoaded.before && imagesLoaded.after;

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
                src={activeTransformation.afterImage} 
                alt={`Transformação - ${activeTransformation.name}`} 
                className="w-full h-full object-cover" 
                loading="eager"
                fetchPriority="high"
              />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default BeforeAfterTransformation;