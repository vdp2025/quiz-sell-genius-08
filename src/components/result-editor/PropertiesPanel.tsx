
import React from 'react';
import { Block } from '@/types/editor';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import { EmptyState } from '@/components/shared/EmptyState';
import HeadlineBlockEditor from './block-editors/HeadlineBlockEditor';
import TextBlockEditor from './block-editors/TextBlockEditor';
import ImageBlockEditor from './block-editors/ImageBlockEditor';
import StyleResultBlockEditor from './block-editors/StyleResultBlockEditor';
import CTABlockEditor from './block-editors/CTABlockEditor';
import BenefitsBlockEditor from './block-editors/BenefitsBlockEditor';
import TestimonialsBlockEditor from './block-editors/TestimonialsBlockEditor';
import PricingBlockEditor from './block-editors/PricingBlockEditor';
import GuaranteeBlockEditor from './block-editors/GuaranteeBlockEditor';
import CountdownTimerBlockEditor from './block-editors/CountdownTimerBlockEditor';
import FeatureComparisonBlockEditor from './block-editors/FeatureComparisonBlockEditor';
import TestimonialCardBlockEditor from './block-editors/TestimonialCardBlockEditor';

interface PropertiesPanelProps {
  selectedBlockId: string | null;
  blocks: Block[];
  onClose: () => void;
  onUpdate: (content: any) => void;
  onDelete: (id: string) => void;
}

export const PropertiesPanel: React.FC<PropertiesPanelProps> = ({
  selectedBlockId,
  blocks,
  onClose,
  onUpdate,
  onDelete
}) => {
  const selectedBlock = blocks.find(block => block.id === selectedBlockId);
  
  if (!selectedBlock) {
    return (
      <div className="h-full bg-white p-4 flex items-center justify-center">
        <EmptyState 
          title="Nenhum bloco selecionado"
          description="Selecione um bloco para editar suas propriedades"
        />
      </div>
    );
  }
  
  const renderEditor = () => {
    switch (selectedBlock.type) {
      case 'headline':
        return <HeadlineBlockEditor block={selectedBlock} onUpdate={onUpdate} />;
      case 'text':
        return <TextBlockEditor block={selectedBlock} onUpdate={onUpdate} />;
      case 'image':
        return <ImageBlockEditor block={selectedBlock} onUpdate={onUpdate} />;
      case 'style-result':
        return <StyleResultBlockEditor block={selectedBlock} onUpdate={onUpdate} />;
      case 'cta':
        return <CTABlockEditor block={selectedBlock} onUpdate={onUpdate} />;
      case 'benefits':
        return <BenefitsBlockEditor block={selectedBlock} onUpdate={onUpdate} />;
      case 'testimonials':
        return <TestimonialsBlockEditor block={selectedBlock} onUpdate={onUpdate} />;
      case 'pricing':
        return <PricingBlockEditor block={selectedBlock} onUpdate={onUpdate} />;
      case 'guarantee':
        return <GuaranteeBlockEditor block={selectedBlock} onUpdate={onUpdate} />;
      case 'countdown-timer':
        return <CountdownTimerBlockEditor block={selectedBlock} onUpdate={onUpdate} />;
      case 'feature-comparison':
        return <FeatureComparisonBlockEditor block={selectedBlock} onUpdate={onUpdate} />;
      case 'testimonial-card':
        return <TestimonialCardBlockEditor block={selectedBlock} onUpdate={onUpdate} />;
      default:
        return (
          <div className="p-4">
            <p className="text-sm text-gray-500">
              Editor não disponível para o tipo de bloco: {selectedBlock.type}
            </p>
          </div>
        );
    }
  };
  
  return (
    <div className="h-full bg-white border-l flex flex-col">
      <div className="border-b p-4 flex justify-between items-center">
        <h3 className="font-medium text-[#432818]">
          Editar {selectedBlock.type}
        </h3>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <span className="sr-only">Fechar</span>
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
          </svg>
        </Button>
      </div>
      
      <ScrollArea className="flex-1 p-4">
        {renderEditor()}
      </ScrollArea>
      
      <div className="border-t p-4">
        <Button 
          variant="destructive" 
          className="w-full" 
          onClick={() => onDelete(selectedBlock.id)}
        >
          <Trash className="h-4 w-4 mr-2" /> Excluir Bloco
        </Button>
      </div>
    </div>
  );
};

export default PropertiesPanel;
