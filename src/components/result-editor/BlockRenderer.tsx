
import React from 'react';
import { cn } from '@/lib/utils';
import { Block } from '@/types/editor';
import { StyleResult } from '@/types/quiz';
import HeadlineBlockPreview from './block-previews/HeadlineBlockPreview';
import BenefitsBlockPreview from './block-previews/BenefitsBlockPreview';
import OfferBlockPreview from './block-previews/OfferBlockPreview';
import StyleHeroBlockPreview from './block-previews/StyleHeroBlockPreview';
import StyleResultBlockPreview from './block-previews/StyleResultBlockPreview';
import GuaranteeBlockPreview from './block-previews/GuaranteeBlockPreview';
import TestimonialsBlockPreview from './block-previews/TestimonialsBlockPreview';
import FAQBlockPreview from './block-previews/FAQBlockPreview';
import TwoColumnBlockPreview from './block-previews/TwoColumnBlockPreview';

interface BlockRendererProps {
  block: Block;
  isSelected?: boolean;
  onSelect?: () => void;
  isPreview?: boolean;
  primaryStyle?: StyleResult;
  onClick?: () => void;
  onUpdate?: (content: any) => void;
  styleType?: string;
}

const BlockRenderer: React.FC<BlockRendererProps> = ({
  block,
  isSelected = false,
  onSelect = () => {},
  isPreview = false,
  primaryStyle,
  onClick,
  onUpdate,
  styleType = 'Natural'
}) => {
  const renderBlockContent = () => {
    switch (block.type) {
      case 'headline':
        return <HeadlineBlockPreview content={block.content} styleType={styleType} />;
        
      case 'benefits':
        return <BenefitsBlockPreview content={block.content} styleType={styleType} />;
        
      case 'offer':
        return <OfferBlockPreview content={block.content} styleType={styleType} />;
        
      case 'style-hero':
        return <StyleHeroBlockPreview content={block.content} styleType={styleType} />;
        
      case 'style-result':
        return <StyleResultBlockPreview content={block.content} primaryStyle={primaryStyle} styleType={styleType} />;
        
      case 'guarantee':
        return <GuaranteeBlockPreview content={block.content} styleType={styleType} />;
        
      case 'testimonials':
        return <TestimonialsBlockPreview content={block.content} styleType={styleType} />;
        
      case 'faq':
        return <FAQBlockPreview content={block.content} styleType={styleType} />;
        
      case 'two-column':
        return <TwoColumnBlockPreview content={block.content} styleType={styleType} />;
        
      default:
        return <div className="p-4 bg-gray-100 rounded-md">Tipo de bloco não suportado: {block.type}</div>;
    }
  };

  return (
    <div
      className={cn(
        "my-6 relative group",
        !isPreview && "cursor-pointer hover:outline hover:outline-[#B89B7A] hover:outline-2 hover:outline-dashed",
        isSelected && !isPreview && "outline outline-[#B89B7A] outline-2 outline-dashed"
      )}
      onClick={() => {
        if (!isPreview) {
          if (onClick) onClick();
          onSelect();
        }
      }}
    >
      {renderBlockContent()}
    </div>
  );
};

export default BlockRenderer;
