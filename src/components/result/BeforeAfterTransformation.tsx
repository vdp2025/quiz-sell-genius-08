
import React, { useState } from 'react';
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
  const activeTransformation = transformations[activeIndex];

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPosition(Number(e.target.value));
  };

  const handleDotClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className="py-10">
      <h2 className="text-2xl md:text-3xl font-playfair text-[#aa6b5d] text-center mb-8">
        Transformações Reais
        <div className="elegant-divider w-32 mx-auto mt-2"></div>
      </h2>

      <div className="max-w-2xl mx-auto">
        <Card className="p-6 card-elegant overflow-hidden">
          <div className="relative h-[400px] md:h-[500px] w-full mb-4">
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
              <span className="bg-[#432818]/80 text-white px-3 py-1 rounded-full text-sm">Antes</span>
              <span className="bg-[#4CAF50]/80 text-white px-3 py-1 rounded-full text-sm">Depois</span>
            </div>

            {/* Slider input */}
            <input
              type="range"
              min="5"
              max="95"
              value={sliderPosition}
              onChange={handleSliderChange}
              className="absolute bottom-4 inset-x-0 mx-auto w-3/4 accent-[#aa6b5d]"
            />
          </div>

          <div className="text-center">
            <p className="text-lg font-medium text-[#432818] mb-1">{activeTransformation.name}</p>
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
