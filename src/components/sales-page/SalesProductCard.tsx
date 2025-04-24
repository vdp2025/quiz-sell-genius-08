
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';

interface SalesProductCardProps {
  title?: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  regularPrice?: string;
  salePrice?: string;
  ctaText?: string;
  ctaUrl?: string;
  backgroundColor?: string;
  accentColor?: string;
  textColor?: string;
}

export const SalesProductCard: React.FC<SalesProductCardProps> = ({
  title = "Guia de Estilo e Imagem + Bônus Exclusivos",
  description,
  image = "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911682/C%C3%B3pia_de_MOCKUPS_13_znzbks.webp",
  imageAlt = "Produto e bônus mockup",
  regularPrice = "175,00",
  salePrice = "39,00",
  ctaText = "Quero meu Guia + Bônus",
  ctaUrl = "https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912",
  backgroundColor = "white",
  accentColor = "#aa6b5d",
  textColor = "#432818"
}) => {
  return (
    <Card 
      className="p-6 border-[#aa6b5d]/20 mb-8"
      style={{ backgroundColor }}
    >
      <h2 
        className="text-2xl font-playfair mb-4"
        style={{ color: accentColor }}
      >
        {title}
      </h2>

      {description && (
        <p className="mb-4" style={{ color: textColor }}>
          {description}
        </p>
      )}
      
      <img
        src={image}
        alt={imageAlt}
        className="w-full rounded-lg mb-6"
      />

      <div className="space-y-6">
        <div className="flex flex-col md:flex-row gap-6 items-center justify-center mb-6">
          <div className="text-center md:text-right">
            <p className="text-sm text-[#3a3a3a]/60 mb-1">Valor Total</p>
            <p className="text-lg line-through text-[#3a3a3a]/60">
              R$ {regularPrice}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm mb-1" style={{ color: accentColor }}>Oferta especial</p>
            <p className="text-3xl font-bold" style={{ color: accentColor }}>
              R$ {salePrice}
            </p>
          </div>
        </div>

        <Button 
          className="w-full py-6 rounded-md text-lg transition-colors duration-300 text-white"
          style={{ backgroundColor: accentColor, hover: { backgroundColor: 'darken(accentColor, 10%)' } }}
          onClick={() => window.location.href = ctaUrl}
        >
          <ShoppingCart className="w-5 h-5 mr-2" />
          {ctaText}
        </Button>
      </div>
    </Card>
  );
};

export default SalesProductCard;
