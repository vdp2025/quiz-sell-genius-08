
import React from 'react';
import { EditorBlock } from '@/types/editor';
import { HeaderBlock } from './blocks/HeaderBlock';
import { HeroBlock } from './blocks/HeroBlock';
import { BonusCarouselBlock } from './blocks/BonusCarouselBlock';
import { HeadlineBlock } from './blocks/HeadlineBlock';
import { TextBlock } from './blocks/TextBlock';
import { BenefitsBlock } from './blocks/BenefitsBlock';
import { TestimonialsBlock } from './blocks/TestimonialsBlock';
import { PricingBlock } from './blocks/PricingBlock';
import { GuaranteeBlock } from './blocks/GuaranteeBlock';
import { CTABlock } from './blocks/CTABlock';
import { CountdownTimerBlock } from './blocks/CountdownTimerBlock';
import { FeatureComparisonBlock } from './blocks/FeatureComparisonBlock';
import { TestimonialCardBlock } from './blocks/TestimonialCardBlock';
import { cn } from '@/lib/utils';

interface BlockRendererProps {
  block: EditorBlock;
  onSelect: () => void;
  isPreview?: boolean;
}

export const BlockRenderer: React.FC<BlockRendererProps> = ({ 
  block, 
  onSelect,
  isPreview = false
}) => {
  // Common wrapper for placeholder blocks
  const PlaceholderBlock = ({ title, description }: { title: string, description: string }) => (
    <div 
      className={cn(
        "p-4 border-2 border-dashed border-[#B89B7A]/40 rounded-lg hover:bg-[#FAF9F7] transition-all",
        !isPreview && "cursor-pointer"
      )}
      onClick={isPreview ? undefined : onSelect}
    >
      <h3 className="font-medium text-[#432818]">{title}</h3>
      <p className="text-sm text-[#8F7A6A]">{description}</p>
    </div>
  );

  switch (block.type) {
    case 'header':
      return <HeaderBlock content={block.content} onClick={onSelect} />;
      
    case 'hero-section':
      return <HeroBlock content={block.content} onClick={onSelect} />;
      
    case 'bonus-carousel':
      return <BonusCarouselBlock content={block.content} onClick={onSelect} />;
      
    case 'headline':
      return <HeadlineBlock content={block.content} onClick={onSelect} />;
      
    case 'text':
      return <TextBlock content={block.content} onClick={onSelect} />;
      
    case 'benefits':
      return <BenefitsBlock content={block.content} onClick={onSelect} />;
      
    case 'testimonials':
      return <TestimonialsBlock content={block.content} onClick={onSelect} />;
      
    case 'pricing':
      return <PricingBlock content={block.content} onClick={onSelect} />;
      
    case 'guarantee':
      return <GuaranteeBlock content={block.content} onClick={onSelect} />;
      
    case 'cta':
      return <CTABlock content={block.content} onClick={onSelect} />;
      
    case 'countdown-timer':
      return <CountdownTimerBlock content={block.content} onClick={onSelect} />;
      
    case 'feature-comparison':
      return <FeatureComparisonBlock content={block.content} onClick={onSelect} />;
      
    case 'testimonial-card':
      return <TestimonialCardBlock content={block.content} onClick={onSelect} />;
      
    case 'image':
      return (
        <div className="p-4 border-2 border-dashed border-[#B89B7A]/40 rounded-lg" onClick={onSelect}>
          {block.content.imageUrl ? (
            <div className="flex flex-col items-center">
              <img 
                src={block.content.imageUrl} 
                alt={block.content.imageAlt || "Imagem"} 
                className="max-w-full h-auto rounded"
              />
              {block.content.caption && (
                <p className="mt-2 text-sm text-[#8F7A6A] text-center">{block.content.caption}</p>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-40 bg-[#FAF9F7]">
              <p className="text-[#8F7A6A]">Imagem não configurada</p>
            </div>
          )}
        </div>
      );
      
    case 'products':
      return (
        <PlaceholderBlock 
          title="Produtos" 
          description="Clique para editar esta seção de produtos" 
        />
      );
      
    case 'style-result':
      return (
        <PlaceholderBlock 
          title="Estilo Principal" 
          description="Clique para editar esta seção de resultado do estilo" 
        />
      );
      
    case 'secondary-styles':
      return (
        <PlaceholderBlock 
          title="Estilos Secundários"
          description="Clique para editar esta seção de estilos secundários" 
        />
      );
      
    default:
      return (
        <div 
          className={cn(
            "p-4 border-2 border-dashed border-[#B89B7A]/40 rounded-lg hover:bg-[#FAF9F7]",
            !isPreview && "cursor-pointer"
          )}
          onClick={isPreview ? undefined : onSelect}
        >
          <p className="text-[#8F7A6A]">Bloco do tipo: {block.type}</p>
        </div>
      );
  }
};
