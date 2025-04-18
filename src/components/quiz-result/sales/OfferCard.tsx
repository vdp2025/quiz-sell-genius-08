
import React from 'react';
import { StyleResult } from '@/types/quiz';
import HeroSection from './HeroSection';
import ProductShowcase from './ProductShowcase';
import PricingSection from './PricingSection';
import BenefitList from './BenefitList';
import Testimonials from './Testimonials';
import Guarantee from './Guarantee';
import { getSalesPageConfig } from '@/config/salesPageConfig';

interface OfferCardProps {
  primaryStyle: StyleResult;
  config?: {
    title?: string;
    subtitle?: string;
    price?: string;
    regularPrice?: string;
    ctaText?: string;
    ctaUrl?: string;
    [key: string]: any;
  };
}

const OfferCard: React.FC<OfferCardProps> = ({ primaryStyle, config = {} }) => {
  // Get the sales page configuration based on the primary style
  const salesConfig = getSalesPageConfig(primaryStyle);
  
  // Merge the default config with any custom config passed as props
  const finalConfig = {
    ...salesConfig,
    ...config
  };

  return (
    <div className="space-y-12 bg-[#fffaf7] px-4 py-8 rounded-lg">
      <HeroSection 
        primaryStyle={primaryStyle} 
        title={finalConfig.title}
        subtitle={finalConfig.subtitle}
      />
      <ProductShowcase />
      <PricingSection 
        price={finalConfig.price}
        regularPrice={finalConfig.regularPrice}
        ctaText={finalConfig.ctaText}
        ctaUrl={finalConfig.ctaUrl}
      />
      
      <div className="grid md:grid-cols-2 gap-8">
        <img
          src="https://res.cloudinary.com/dqljyf76t/image/upload/v1744911687/C%C3%B3pia_de_MOCKUPS_12_w8fwrn.webp"
          alt="Revista Peças-Chave"
          className="w-full rounded-lg shadow-lg"
        />
        <img
          src="https://res.cloudinary.com/dqljyf76t/image/upload/v1744911674/Espanhol_Portugu%C3%AAs_1_-_Copia_zuhznw.webp"
          alt="Revista Várias Imagens"
          className="w-full rounded-lg shadow-lg"
        />
      </div>
      
      <BenefitList />
      <Testimonials />
      <Guarantee />
      <PricingSection 
        price={finalConfig.price}
        regularPrice={finalConfig.regularPrice}
        ctaText={finalConfig.ctaText}
        ctaUrl={finalConfig.ctaUrl}
      />
    </div>
  );
};

export default OfferCard;
