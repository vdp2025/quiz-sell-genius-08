
import React from 'react';
import { SalesPageConfig, defaultSalesPageConfig } from '@/types/salesPageConfig';
import SalesPageHeader from './SalesPageHeader';
import SalesHeroSection from './SalesHeroSection';
import { SalesProductCard } from './SalesProductCard';
import SalesBenefitList from './SalesBenefitList';
import SalesBonusSection from './SalesBonusSection';
import SalesTestimonials from './SalesTestimonials';
import SalesGuarantee from './SalesGuarantee';

interface SalesPageContainerProps {
  config?: Partial<SalesPageConfig>;
}

const SalesPageContainer: React.FC<SalesPageContainerProps> = ({ config = {} }) => {
  // Merge the provided config with default values
  const mergedConfig = {
    ...defaultSalesPageConfig,
    ...config,
    header: { ...defaultSalesPageConfig.header, ...config.header },
    hero: { ...defaultSalesPageConfig.hero, ...config.hero },
    product: { ...defaultSalesPageConfig.product, ...config.product },
    benefits: { ...defaultSalesPageConfig.benefits, ...config.benefits },
    bonus: { ...defaultSalesPageConfig.bonus, ...config.bonus },
    testimonials: { ...defaultSalesPageConfig.testimonials, ...config.testimonials },
    guarantee: { ...defaultSalesPageConfig.guarantee, ...config.guarantee },
    style: { ...defaultSalesPageConfig.style, ...config.style }
  };

  const { 
    header, hero, product, benefits, 
    bonus, testimonials, guarantee, style 
  } = mergedConfig;

  return (
    <div 
      className="min-h-screen px-4 py-8"
      style={{ backgroundColor: style.backgroundColor }}
    >
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <SalesPageHeader
          title={header.title}
          subtitle={header.subtitle}
          logo={header.logo}
          logoAlt={header.logoAlt}
          logoHeight={header.logoHeight}
          backgroundColor={style.cardBackgroundColor}
          textColor={style.primaryColor}
          accentColor={style.accentColor}
        />

        {/* Hero Section */}
        <SalesHeroSection
          title={hero.title}
          subtitle={hero.subtitle}
          image={hero.image}
          imageAlt={hero.imageAlt}
          backgroundColor={style.cardBackgroundColor}
          textColor={style.textColor}
          accentColor={style.accentColor}
        />

        {/* Product Card */}
        <SalesProductCard 
          product={{
            id: "default-product",
            title: product.title,
            description: product.description,
            imageUrl: product.image,
            price: parseFloat(product.salePrice) || 39.00,
            originalPrice: parseFloat(product.regularPrice) || 175.00,
            isInstallments: true,
            installmentsCount: 12,
            isBestSeller: true
          }}
          onAddToCart={() => {}}
          isSelected={false}
        />

        {/* Benefits List */}
        <SalesBenefitList
          title={benefits.title}
          items={benefits.items}
          backgroundColor={style.cardBackgroundColor}
          textColor={style.primaryColor}
          accentColor={style.accentColor}
          iconColor={style.iconColor}
          iconBgColor={style.iconBgColor}
        />

        {/* Bonus Section */}
        <SalesBonusSection
          bonusImage={bonus.bonusImage}
          bonusImageAlt={bonus.bonusImageAlt}
          mentorImage={bonus.mentorImage}
          mentorImageAlt={bonus.mentorImageAlt}
        />

        {/* Testimonials */}
        <SalesTestimonials
          title={testimonials.title}
          items={testimonials.items}
          backgroundColor={style.cardBackgroundColor}
          textColor={style.textColor}
          accentColor={style.accentColor}
          cardBgColor={style.testimonialBgColor}
        />

        {/* Guarantee */}
        <SalesGuarantee
          title={guarantee.title}
          text={guarantee.text}
          image={guarantee.image}
          imageAlt={guarantee.imageAlt}
          backgroundColor={style.cardBackgroundColor}
          textColor={style.textColor}
          accentColor={style.primaryColor}
        />
      </div>
    </div>
  );
};

export default SalesPageContainer;
