import React from 'react';
import { StyleResult } from '@/types/quiz';
import { Button } from '@/components/ui/button';
import { EyeIcon, Smartphone, Monitor, PlusIcon } from 'lucide-react';
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
      <div className="border-b border-[#B89B7A]/20 p-4 bg-white flex items-center justify-between">
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setViewMode('desktop')}
            className={viewMode === 'desktop' ? 'bg-[#FAF9F7]' : ''}
          >
            <Monitor className="w-4 h-4 mr-2" />
            Desktop
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setViewMode('mobile')}
            className={viewMode === 'mobile' ? 'bg-[#FAF9F7]' : ''}
          >
            <Smartphone className="w-4 h-4 mr-2" />
            Mobile
          </Button>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsPreviewing(!isPreviewing)}
        >
          <EyeIcon className="w-4 h-4 mr-2" />
          {isPreviewing ? 'Editar' : 'Visualizar'}
        </Button>
      </div>

      <div className={`flex-1 overflow-y-auto p-8 ${viewMode === 'mobile' ? 'max-w-md mx-auto' : ''}`}>
        <div className="min-h-full bg-white rounded-lg shadow-sm border border-[#B89B7A]/20 p-6">
          {blocks.length > 0 ? (
            <div className="space-y-6">
              {blocks.map((block) => (
                <div key={block.id} className="relative">
                  {renderBlockContent(block)}
                </div>
              ))}
            </div>
          ) : (
            <div 
              className="flex flex-col items-center justify-center h-64 text-[#8F7A6A] text-sm border-2 border-dashed border-[#B89B7A]/40 rounded-lg"
            >
              <p className="mb-4">Arraste componentes para esta área ou clique no botão abaixo</p>
              <Button 
                variant="outline"
                onClick={onAddBlock}
                className="border-[#B89B7A] text-[#B89B7A]"
              >
                <PlusIcon className="w-4 h-4 mr-2" />
                Adicionar Componente
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PagePreview;
