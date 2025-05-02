
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';

interface TransformationItem {
  beforeImage: string;
  afterImage: string;
  name: string;
  quote: string;
}

const transformations: TransformationItem[] = [
  {
    beforeImage: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911666/before_transformation_1_mmicef.jpg",
    afterImage: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911667/after_transformation_1_wzkeev.jpg",
    name: "Ana Paula",
    quote: "Antes me vestia por obrigação. Agora me visto para expressar quem eu realmente sou."
  },
  {
    beforeImage: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911666/before_transformation_2_lbkmwo.jpg",
    afterImage: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911667/after_transformation_2_pdkqmu.jpg",
    name: "Daniela Torres",
    quote: "Nunca imaginei que entender meu estilo pudesse transformar também minha confiança."
  }
];

const BeforeAfterTransformation: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [imagesLoaded, setImagesLoaded] = useState<{before: boolean, after: boolean}>({before: false, after: false});
  const activeTransformation = transformations[activeIndex];

  // Preload images to ensure they display correctly
  useEffect(() => {
    const beforeImg = new Image();
    const afterImg = new Image();
    
    beforeImg.src = activeTransformation.beforeImage;
    afterImg.src = activeTransformation.afterImage;
    
    beforeImg.onload = () => setImagesLoaded(prev => ({...prev, before: true}));
    afterImg.onload = () => setImagesLoaded(prev => ({...prev, after: true}));
    
    return () => {
      beforeImg.onload = null;
      afterImg.onload = null;
    };
  }, [activeIndex, activeTransformation.beforeImage, activeTransformation.afterImage]);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPosition(Number(e.target.value));
  };

  const handleDotClick = (index: number) => {
    setActiveIndex(index);
    // Reset images loaded state when changing transformation
    setImagesLoaded({before: false, after: false});
  };

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
          
          <div 
            className={`relative h-[400px] md:h-[500px] w-full mb-4 ${areImagesReady ? '' : 'hidden'}`}
          >
            {/* Before Image (full width) */}
            <div className="absolute inset-0 w-full h-full">
              <img 
                src={activeTransformation.beforeImage} 
                alt={`Antes - ${activeTransformation.name}`}
                className="w-full h-full object-cover"
              />
            </div>

            {/* After Image (partial width based on slider) */}
            <div 
              className="absolute inset-0 h-full overflow-hidden" 
              style={{ width: `${sliderPosition}%` }}
            >
              <img 
                src={activeTransformation.afterImage} 
                alt={`Depois - ${activeTransformation.name}`}
                className="w-full h-full object-cover"
                style={{ 
                  width: `${100 * (100/sliderPosition)}%`,
                  maxWidth: sliderPosition > 0 ? `${100 * (100/sliderPosition)}%` : '100%',
                  position: 'absolute',
                  left: 0,
                }}
              />
            </div>

            {/* Slider line */}
            <div 
              className="absolute inset-y-0 w-1 bg-white shadow-lg cursor-move"
              style={{ left: `${sliderPosition}%` }}
            ></div>

            {/* Before/After Labels */}
            <div className="absolute inset-x-0 top-4 flex justify-between px-4 pointer-events-none">
              <span className="bg-[#432818]/80 text-white px-3 py-1 rounded-full text-sm font-medium">Antes</span>
              <span className="bg-[#4CAF50]/80 text-white px-3 py-1 rounded-full text-sm font-medium">Depois</span>
            </div>

            {/* Slider input with improved mobile handling */}
            <input
              type="range"
              min="5"
              max="95"
              value={sliderPosition}
              onChange={handleSliderChange}
              className="absolute bottom-4 inset-x-0 mx-auto w-3/4 accent-[#aa6b5d] z-10 before-after-slider"
              style={{
                touchAction: "none" // Prevents scrolling while dragging on mobile
              }}
            />
          </div>

          <div className="text-center">
            <p className="text-lg font-playfair text-[#432818] mb-1">{activeTransformation.name}</p>
            <p className="italic text-[#432818]/80">"{activeTransformation.quote}"</p>
          </div>

          {/* Dots navigation */}
          {transformations.length > 1 && (
            <div className="flex justify-center gap-2 mt-4">
              {transformations.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full ${index === activeIndex ? 'bg-[#aa6b5d]' : 'bg-[#aa6b5d]/30'}`}
                  onClick={() => handleDotClick(index)}
                  aria-label={`Transformação ${index + 1}`}
                />
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default BeforeAfterTransformation;
