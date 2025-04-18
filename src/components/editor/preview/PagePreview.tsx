
import React from 'react';
import { StyleResult } from '@/types/quiz';
import { EditorBlock } from '@/types/editor';
import { PreviewToolbar } from './PreviewToolbar';
import { PreviewContainer } from './PreviewContainer';
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

interface PagePreviewProps {
  primaryStyle: StyleResult;
  onSelectComponent: (id: string) => void;
  blocks: EditorBlock[];
  onAddBlock: () => void;
}

const PagePreview = ({ primaryStyle, onSelectComponent, blocks, onAddBlock }: PagePreviewProps) => {
  const [viewMode, setViewMode] = React.useState<'desktop' | 'mobile'>('desktop');
  const [isPreviewing, setIsPreviewing] = React.useState(false);

  const renderBlockContent = (block: EditorBlock) => {
    switch (block.type) {
      case 'header':
        return <HeaderBlock content={block.content} onClick={() => onSelectComponent(block.id)} />;
      case 'hero-section':
        return <HeroBlock content={block.content} onClick={() => onSelectComponent(block.id)} />;
      case 'bonus-carousel':
        return <BonusCarouselBlock content={block.content} onClick={() => onSelectComponent(block.id)} />;
      case 'headline':
        return <HeadlineBlock content={block.content} onClick={() => onSelectComponent(block.id)} />;
      case 'text':
        return <TextBlock content={block.content} onClick={() => onSelectComponent(block.id)} />;
      case 'benefits':
        return <BenefitsBlock content={block.content} onClick={() => onSelectComponent(block.id)} />;
      case 'testimonials':
        return <TestimonialsBlock content={block.content} onClick={() => onSelectComponent(block.id)} />;
      case 'pricing':
        return <PricingBlock content={block.content} onClick={() => onSelectComponent(block.id)} />;
      case 'guarantee':
        return <GuaranteeBlock content={block.content} onClick={() => onSelectComponent(block.id)} />;
      case 'cta':
        return <CTABlock content={block.content} onClick={() => onSelectComponent(block.id)} />;
      default:
        return (
          <div className="p-4 border-2 border-dashed border-[#B89B7A]/40 rounded-lg cursor-pointer hover:bg-[#FAF9F7]" onClick={() => onSelectComponent(block.id)}>
            <p className="text-[#8F7A6A]">Bloco do tipo: {block.type}</p>
          </div>
        );
    }
  };

  return (
    <div className="h-full flex flex-col bg-[#FAF9F7]">
      <PreviewToolbar
        viewMode={viewMode}
        isPreviewing={isPreviewing}
        onViewModeChange={setViewMode}
        onPreviewToggle={() => setIsPreviewing(!isPreviewing)}
      />
      <PreviewContainer
        viewMode={viewMode}
        blocks={blocks}
        onAddBlock={onAddBlock}
        renderBlockContent={renderBlockContent}
      />
    </div>
  );
};

export default PagePreview;
