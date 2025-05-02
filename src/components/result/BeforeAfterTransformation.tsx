
import React from 'react';
import { Card } from '@/components/ui/card';
import { Sparkles } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';

const BeforeAfterTransformation: React.FC = () => {
  const transformations = [
    {
      title: "Antes de aplicar o guia",
      description: "Dúvidas ao se vestir, compra de peças que não usa, looks sem harmonia",
      image: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911666/C%C3%B3pia_de_Template_Dossi%C3%AA_Completo_2024_15_-_Copia_ssrhu3.webp"
    },
    {
      title: "Depois do guia",
      description: "Estilo autêntico, looks que valorizam, guarda-roupa funcional e econômico",
      image: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911682/C%C3%B3pia_de_MOCKUPS_14_oxegnd.webp"
    }
  ];

  return (
    <Card className="p-6 mb-10 bg-white shadow-md border border-[#B89B7A]/20">
      <div className="text-center mb-8">
        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] rounded-full flex items-center justify-center shadow-lg">
          <Sparkles className="w-8 h-8 text-white" />
        </div>
        
        <h2 className="text-2xl font-playfair text-[#aa6b5d] mb-2">
          Transforme Seu Estilo
        </h2>
        
        <p className="text-[#432818] max-w-2xl mx-auto">
          Veja a diferença que o guia de estilo personalizado pode fazer na sua vida
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {transformations.map((item, index) => (
          <div key={index} className="flex flex-col space-y-4">
            <div className="overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow">
              {/* Increased image size with larger aspect ratio */}
              <AspectRatio ratio={3/2} className="w-full">
                <img
                  src={item.image || `https://via.placeholder.com/600x400?text=${encodeURIComponent(item.title)}`}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    console.error(`Failed to load transformation image: ${item.image}`);
                    e.currentTarget.src = `https://via.placeholder.com/600x400?text=${encodeURIComponent(item.title)}`;
                  }}
                />
              </AspectRatio>
            </div>
            <div>
              <h3 className="text-xl font-medium text-[#aa6b5d] mb-2">{item.title}</h3>
              <p className="text-[#432818]">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default BeforeAfterTransformation;
