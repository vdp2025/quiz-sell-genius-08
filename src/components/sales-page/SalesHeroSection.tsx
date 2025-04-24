
import React from 'react';
import { Card } from '@/components/ui/card';

interface SalesHeroSectionProps {
  title?: string;
  subtitle?: string;
  image?: string;
  imageAlt?: string;
  backgroundColor?: string;
  textColor?: string;
  accentColor?: string;
}

const SalesHeroSection: React.FC<SalesHeroSectionProps> = ({
  title = "Como seria sua vida com um guarda-roupa que realmente reflete quem você é?",
  subtitle = "Descubra como construir seu estilo de forma autêntica e prática",
  image = "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911666/C%C3%B3pia_de_Template_Dossi%C3%AA_Completo_2024_15_-_Copia_ssrhu3.webp",
  imageAlt = "Guia de Estilo",
  backgroundColor = "white",
  textColor = "#432818",
  accentColor = "#aa6b5d"
}) => {
  return (
    <Card className="p-6 mb-8" style={{ backgroundColor }}>
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <h2 
            className="text-2xl md:text-3xl font-playfair"
            style={{ color: accentColor }}
          >
            {title}
          </h2>
          <p style={{ color: textColor }}>
            {subtitle}
          </p>
        </div>
        <div>
          <img
            src={image}
            alt={imageAlt}
            className="w-full rounded-lg"
          />
        </div>
      </div>
    </Card>
  );
};

export default SalesHeroSection;
