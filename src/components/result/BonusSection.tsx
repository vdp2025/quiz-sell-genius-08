
import React from 'react';
import { Card } from '@/components/ui/card';
import { Gift } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';

const BonusSection: React.FC = () => {
  const bonuses = [
    {
      title: "Guia de Maquiagem",
      description: "Descubra as cores e técnicas de maquiagem que mais valorizam seu estilo e tipo físico",
      image: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911677/C%C3%B3pia_de_MOCKUPS_15_-_Copia_grstwl.webp"
    },
    {
      title: "Guia de Acessórios",
      description: "Saiba quais acessórios combinam melhor com seu estilo e como usá-los para elevar qualquer look",
      image: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911682/C%C3%B3pia_de_MOCKUPS_13_znzbks.webp"
    }
  ];

  return (
    <Card className="p-6 mb-10 bg-white shadow-md border border-[#B89B7A]/20">
      <div className="text-center mb-8">
        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] rounded-full flex items-center justify-center shadow-lg">
          <Gift className="w-8 h-8 text-white" />
        </div>
        
        <h2 className="text-2xl font-playfair text-[#aa6b5d] mb-2">
          Bônus Exclusivos
        </h2>
        
        <p className="text-[#432818] max-w-2xl mx-auto">
          Além do seu guia de estilo personalizado, você também receberá estes bônus especiais
          para complementar sua jornada de transformação.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {bonuses.map((bonus, index) => (
          <div key={index} className="flex flex-col space-y-4">
            <div className="overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow">
              {/* Increased image size with larger aspect ratio */}
              <AspectRatio ratio={3/2} className="w-full">
                <img
                  src={bonus.image || `https://via.placeholder.com/600x400?text=${encodeURIComponent(bonus.title)}`}
                  alt={bonus.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    console.error(`Failed to load bonus image: ${bonus.image}`);
                    e.currentTarget.src = `https://via.placeholder.com/600x400?text=${encodeURIComponent(bonus.title)}`;
                  }}
                />
              </AspectRatio>
            </div>
            <div>
              <h3 className="text-xl font-medium text-[#aa6b5d] mb-2">{bonus.title}</h3>
              <p className="text-[#432818]">{bonus.description}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default BonusSection;
