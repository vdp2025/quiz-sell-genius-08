
import React from 'react';
import { Block } from '@/types/editor';
import { StyleResult } from '@/types/quiz';
import HeaderBlockPreview from './block-previews/HeaderBlockPreview';
import HeadlineBlockPreview from './block-previews/HeadlineBlockPreview';
import TextBlockPreview from './block-previews/TextBlockPreview';
import ImageBlockPreview from './block-previews/ImageBlockPreview';
import { StyleResultBlockPreview } from './block-previews/StyleResultBlockPreview';
import SecondaryStylesBlockPreview from './block-previews/SecondaryStylesBlockPreview';
import BenefitsBlockPreview from './block-previews/BenefitsBlockPreview';
import PricingBlockPreview from './block-previews/PricingBlockPreview';
import TestimonialsBlockPreview from './block-previews/TestimonialsBlockPreview';
import HeroSectionBlockPreview from './block-previews/HeroSectionBlockPreview';
import ProductsBlockPreview from './block-previews/ProductsBlockPreview';
import CTABlockPreview from './block-previews/CTABlockPreview';
import GuaranteeBlockPreview from './block-previews/GuaranteeBlockPreview';
import SpacerBlockPreview from './block-previews/SpacerBlockPreview';
import IconBlockPreview from './block-previews/IconBlockPreview';
import TwoColumnBlockPreview from './block-previews/TwoColumnBlockPreview';
import VideoBlockPreview from './block-previews/VideoBlockPreview';
import CarouselBlockPreview from './block-previews/CarouselBlockPreview';
import CustomCodeBlockPreview from './block-previews/CustomCodeBlockPreview';
import AnimationBlockPreview from './block-previews/AnimationBlockPreview';
import FAQBlockPreview from './block-previews/FAQBlockPreview';
import StyleHeroBlockPreview from './block-previews/StyleHeroBlockPreview';
import StyleOfferBlockPreview from './block-previews/StyleOfferBlockPreview';

interface BlockRendererProps {
  block: Block;
  primaryStyle?: StyleResult;
  styleType?: string;
  onClick?: () => void;
}

export const BlockRenderer: React.FC<BlockRendererProps> = ({
  block,
  primaryStyle,
  styleType,
  onClick
}) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onClick) onClick();
  };

  const renderContent = () => {
    switch (block.type) {
      case 'header':
        return <HeaderBlockPreview content={block.content} />;
      case 'headline':
        return <HeadlineBlockPreview content={block.content} />;
      case 'text':
        return <TextBlockPreview content={block.content} />;
      case 'image':
        return <ImageBlockPreview content={block.content} />;
      case 'style-result':
        return <StyleResultBlockPreview 
          content={block.content} 
          primaryStyle={primaryStyle}
          styleType={styleType}
        />;
      case 'secondary-styles':
        return <SecondaryStylesBlockPreview content={block.content} />;
      case 'benefits':
        return <BenefitsBlockPreview content={block.content} />;
      case 'pricing':
        return <PricingBlockPreview content={block.content} />;
      case 'testimonials':
        return <TestimonialsBlockPreview content={block.content} />;
      case 'hero-section':
        return <HeroSectionBlockPreview 
          content={block.content} 
          primaryStyle={primaryStyle || { category: 'Natural', score: 0, percentage: 0 }}
        />;
      case 'products':
        return <ProductsBlockPreview content={block.content} />;
      case 'cta':
        return <CTABlockPreview content={block.content} />;
      case 'guarantee':
        return <GuaranteeBlockPreview content={block.content} />;
      case 'spacer':
        return <SpacerBlockPreview content={block.content} />;
      case 'icon':
        return <IconBlockPreview content={block.content} />;
      case 'two-column':
        return <TwoColumnBlockPreview content={block.content} />;
      case 'video':
        return <VideoBlockPreview content={block.content} />;
      case 'carousel':
        return <CarouselBlockPreview content={block.content} />;
      case 'custom-code':
        return <CustomCodeBlockPreview content={block.content} />;
      case 'animation-block':
        return <AnimationBlockPreview content={block.content} />;
      case 'faq':
        return <FAQBlockPreview content={block.content} />;
      case 'style-hero':
        return <StyleHeroBlockPreview content={block.content} styleType={styleType} />;
      case 'offer':
        return <StyleOfferBlockPreview content={block.content} />;
      default:
        return (
          <div onClick={handleClick}>
            Tipo de bloco não suportado: {block.type}
          </div>
        );
    }
  };

  return (
    <div className="relative" style={block.content.style as React.CSSProperties}>
      {renderContent()}
    </div>
  );
};

export default BlockRenderer;
