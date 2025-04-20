
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Block } from '@/types/editor';
import StyleResultBlockEditor from './block-editors/StyleResultBlockEditor';
import BenefitsListBlockEditor from './block-editors/BenefitsListBlockEditor';
import TestimonialsBlockEditor from './block-editors/TestimonialsBlockEditor';
import PricingBlockEditor from './block-editors/PricingBlockEditor';
import HeaderBlockEditor from './block-editors/HeaderBlockEditor';
import HeroBlockEditor from './block-editors/HeroBlockEditor';
import GuaranteeBlockEditor from './block-editors/GuaranteeBlockEditor';
import CallToActionBlockEditor from './block-editors/CallToActionBlockEditor';
import AuthorInfoBlockEditor from './block-editors/AuthorInfoBlockEditor';

interface PropertiesPanelProps {
  selectedBlockId: string | null;
  blocks: Block[];
  onClose: () => void;
  onUpdate: (content: any) => void;
  onDelete: () => void;
}

export function PropertiesPanel({
  selectedBlockId,
  blocks,
  onClose,
  onUpdate,
  onDelete
}: PropertiesPanelProps) {
  const selectedBlock = selectedBlockId 
    ? blocks.find(block => block.id === selectedBlockId) 
    : null;

  if (!selectedBlock) {
    return (
      <div className="h-full border-l border-[#B89B7A]/20 bg-white p-4 flex items-center justify-center text-[#8F7A6A]">
        <p>Selecione um componente para editar suas propriedades</p>
      </div>
    );
  }

  const renderEditor = () => {
    switch (selectedBlock.type) {
      case 'header':
        return <HeaderBlockEditor block={selectedBlock} onUpdate={onUpdate} />;
      case 'hero':
        return <HeroBlockEditor block={selectedBlock} onUpdate={onUpdate} />;
      case 'styleResult':
        return <StyleResultBlockEditor block={selectedBlock} onUpdate={onUpdate} />;
      case 'benefitsList':
        return <BenefitsListBlockEditor block={selectedBlock} onUpdate={onUpdate} />;
      case 'testimonials':
        return <TestimonialsBlockEditor block={selectedBlock} onUpdate={onUpdate} />;
      case 'pricing':
        return <PricingBlockEditor block={selectedBlock} onUpdate={onUpdate} />;
      case 'guarantee':
        return <GuaranteeBlockEditor block={selectedBlock} onUpdate={onUpdate} />;
      case 'callToAction':
        return <CallToActionBlockEditor block={selectedBlock} onUpdate={onUpdate} />;
      case 'authorInfo':
        return <AuthorInfoBlockEditor block={selectedBlock} onUpdate={onUpdate} />;
      default:
        return <p>Editor não disponível para este tipo de bloco</p>;
    }
  };

  return (
    <div className="h-full border-l border-[#B89B7A]/20 bg-white">
      <div className="p-4 border-b border-[#B89B7A]/20 flex justify-between items-center">
        <h3 className="font-medium text-[#432818]">
          Editar {selectedBlock.type}
        </h3>
        <button 
          onClick={onClose}
          className="text-[#8F7A6A] hover:text-[#432818]"
        >
          Fechar
        </button>
      </div>
      
      <ScrollArea className="h-[calc(100%-64px)] p-4">
        <div className="space-y-6">
          {renderEditor()}
          
          <div className="pt-4 border-t border-[#B89B7A]/20">
            <button
              onClick={onDelete}
              className="text-red-500 hover:text-red-700 text-sm"
            >
              Excluir componente
            </button>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
