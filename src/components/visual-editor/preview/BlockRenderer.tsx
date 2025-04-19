
import React from 'react';
import { EditorBlock } from '@/types/editor';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { StyleResult } from '@/types/quiz';
import { styleConfig } from '@/config/styleConfig';
import { StyleResultSection } from '@/components/result/StyleResult';
import StyleHeroBlockPreview from '@/components/result-editor/block-previews/StyleHeroBlockPreview';
import StyleOfferBlockPreview from '@/components/result-editor/block-previews/StyleOfferBlockPreview';
import BenefitsBlockPreview from '@/components/result-editor/block-previews/BenefitsBlockPreview';
import TestimonialsBlockPreview from '@/components/result-editor/block-previews/TestimonialsBlockPreview';
import TextBlockPreview from '@/components/result-editor/block-previews/TextBlockPreview';
import HeadlineBlockPreview from '@/components/result-editor/block-previews/HeadlineBlockPreview';
import GuaranteeBlockPreview from '@/components/result-editor/block-previews/GuaranteeBlockPreview';
import TwoColumnBlockPreview from '@/components/result-editor/block-previews/TwoColumnBlockPreview';

interface BlockRendererProps {
  block: EditorBlock;
  isSelected: boolean;
  onSelect: () => void;
  isPreview: boolean;
  primaryStyle?: StyleResult;
  onUpdate?: (content: any) => void;
}

export function BlockRenderer({
  block,
  isSelected,
  onSelect,
  isPreview,
  primaryStyle,
  onUpdate
}: BlockRendererProps) {
  // Create mock secondary styles for preview
  const mockSecondaryStyles: StyleResult[] = [
    { category: 'Contemporâneo', score: 4, percentage: 30 },
    { category: 'Clássico', score: 3, percentage: 20 }
  ];

  return (
    <div
      onClick={() => !isPreview && onSelect()}
      className={cn(
        "group relative p-4 mb-4 rounded-lg transition-all duration-200",
        !isPreview && "cursor-pointer hover:bg-[#FAF9F7]",
        !isPreview && isSelected && "ring-2 ring-[#B89B7A] bg-[#FAF9F7]",
        !isPreview && "border-2 border-dashed border-[#B89B7A]/40"
      )}
    >
      {renderBlockContent(block, primaryStyle, mockSecondaryStyles, isPreview, onUpdate)}

      {!isPreview && isSelected && (
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button variant="ghost" size="sm" className="text-[#8F7A6A]">
            Editar
          </Button>
        </div>
      )}
    </div>
  );
}

function renderBlockContent(block: EditorBlock, primaryStyle?: StyleResult, secondaryStyles?: StyleResult[], isPreview?: boolean, onUpdate?: (content: any) => void) {
  if (!primaryStyle && (block.type === 'style-result' || block.type === 'secondary-styles')) {
    return <div>Carregando...</div>;
  }

  switch (block.type) {
    case 'headline':
      return <HeadlineBlockPreview content={block.content} />;
    case 'text':
      return <TextBlockPreview content={block.content} />;
    case 'style-result':
      return (
        <StyleResultSection
          primaryStyle={primaryStyle!}
          description={block.content.description || styleConfig[primaryStyle!.category].description}
          image={block.content.imageUrl || styleConfig[primaryStyle!.category].image}
          secondaryStyles={secondaryStyles || []}
        />
      );
    case 'style-hero':
      return <StyleHeroBlockPreview content={block.content} styleType={primaryStyle?.category || 'Natural'} />;
    case 'offer':
      return <StyleOfferBlockPreview content={block.content} />;
    case 'benefits':
      return <BenefitsBlockPreview content={block.content} />;
    case 'testimonials':
      return <TestimonialsBlockPreview 
        content={block.content} 
        isPreview={!!isPreview}
        onUpdate={onUpdate}
        block={block}
      />;
    case 'guarantee':
      return <GuaranteeBlockPreview content={block.content} />;
    case 'two-column':
      return <TwoColumnBlockPreview content={block.content} />;
    default:
      return (
        <p className="text-[#8F7A6A]">Bloco tipo: {block.type}</p>
      );
  }
}
