
import React from 'react';
import { Block } from '@/types/editor';
import { StyleResult } from '@/types/quiz';
import { cn } from '@/lib/utils';
import {
  HeaderBlock,
  HeroBlock,
  StyleResultBlock,
  SecondaryStylesBlock,
  BenefitsListBlock,
  TestimonialsBlock,
  PricingBlock,
  GuaranteeBlock,
  CallToActionBlock,
  AuthorInfoBlock
} from './blocks';

interface EditableBlockProps {
  block: Block;
  index: number;
  isSelected: boolean;
  onClick: () => void;
  isPreviewMode: boolean;
  onReorderBlocks: (sourceIndex: number, destinationIndex: number) => void;
  primaryStyle: StyleResult;
}

const EditableBlock: React.FC<EditableBlockProps> = ({
  block,
  index,
  isSelected,
  onClick,
  isPreviewMode,
  primaryStyle
}) => {
  const renderBlockContent = () => {
    switch (block.type) {
      case 'header':
        return <HeaderBlock content={block.content} />;
      case 'hero':
        return <HeroBlock content={block.content} />;
      case 'styleResult':
        return <StyleResultBlock content={block.content} primaryStyle={primaryStyle} />;
      case 'secondaryStyles':
        return <SecondaryStylesBlock content={block.content} />;
      case 'benefitsList':
        return <BenefitsListBlock content={block.content} />;
      case 'testimonials':
        return <TestimonialsBlock content={block.content} />;
      case 'pricing':
        return <PricingBlock content={block.content} />;
      case 'guarantee':
        return <GuaranteeBlock content={block.content} />;
      case 'callToAction':
        return <CallToActionBlock content={block.content} />;
      case 'authorInfo':
        return <AuthorInfoBlock content={block.content} />;
      default:
        return <div>Bloco desconhecido</div>;
    }
  };

  return (
    <div
      className={cn(
        "relative mb-4 p-4 transition-all duration-200",
        !isPreviewMode && "hover:bg-[#FAF9F7] cursor-pointer",
        isSelected && !isPreviewMode && "ring-2 ring-[#B89B7A]"
      )}
      onClick={!isPreviewMode ? onClick : undefined}
    >
      {!isPreviewMode && (
        <div className="absolute top-0 right-0 bg-[#B89B7A] text-white text-xs px-2 py-1 rounded-bl">
          {block.type}
        </div>
      )}
      {renderBlockContent()}
    </div>
  );
};

export default EditableBlock;
