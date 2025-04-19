
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { X, Trash2 } from 'lucide-react';
import { Block } from '@/types/editor';
import HeadlineBlockEditor from './block-editors/HeadlineBlockEditor';
import BenefitsBlockEditor from './block-editors/BenefitsBlockEditor';
import StyleHeroBlockEditor from './block-editors/StyleHeroBlockEditor';
import StyleResultBlockEditor from './block-editors/StyleResultBlockEditor';
import OfferBlockEditor from './block-editors/OfferBlockEditor';
import GuaranteeBlockEditor from './block-editors/GuaranteeBlockEditor';
import TestimonialsBlockEditor from './block-editors/TestimonialsBlockEditor';
import FAQBlockEditor from './block-editors/FAQBlockEditor';
import TwoColumnBlockEditor from './block-editors/TwoColumnBlockEditor';

interface PropertiesPanelProps {
  selectedBlockId: string | null;
  blocks: Block[];
  onClose: () => void;
  onUpdate: (content: any) => void;
  onDelete: () => void;
}

export const PropertiesPanel: React.FC<PropertiesPanelProps> = ({
  selectedBlockId,
  blocks,
  onClose,
  onUpdate,
  onDelete
}) => {
  const selectedBlock = blocks.find(block => block.id === selectedBlockId);

  const getBlockEditorTitle = (type: Block['type']) => {
    switch (type) {
      case 'headline': return 'Editar Título';
      case 'benefits': return 'Editar Benefícios';
      case 'style-hero': return 'Editar Hero de Estilo';
      case 'style-result': return 'Editar Resultado do Estilo';
      case 'offer': return 'Editar Oferta';
      case 'guarantee': return 'Editar Garantia';
      case 'testimonials': return 'Editar Depoimentos';
      case 'faq': return 'Editar Perguntas Frequentes';
      case 'two-column': return 'Editar Duas Colunas';
      default: return 'Editar Bloco';
    }
  };

  const renderBlockEditor = () => {
    if (!selectedBlock) return null;

    switch (selectedBlock.type) {
      case 'headline':
        return <HeadlineBlockEditor block={selectedBlock} onUpdate={onUpdate} />;
        
      case 'benefits':
        return <BenefitsBlockEditor block={selectedBlock} onUpdate={onUpdate} />;
        
      case 'style-hero':
        return <StyleHeroBlockEditor block={selectedBlock} onUpdate={onUpdate} />;
        
      case 'style-result':
        return <StyleResultBlockEditor block={selectedBlock} onUpdate={onUpdate} />;
        
      case 'offer':
        return <OfferBlockEditor block={selectedBlock} onUpdate={onUpdate} />;
        
      case 'guarantee':
        return <GuaranteeBlockEditor block={selectedBlock} onUpdate={onUpdate} />;
        
      case 'testimonials':
        return <TestimonialsBlockEditor block={selectedBlock} onUpdate={onUpdate} />;
        
      case 'faq':
        return <FAQBlockEditor block={selectedBlock} onUpdate={onUpdate} />;
        
      case 'two-column':
        return <TwoColumnBlockEditor block={selectedBlock} onUpdate={onUpdate} />;
        
      default:
        return <p>Tipo de bloco não suportado: {selectedBlock.type}</p>;
    }
  };

  return (
    <div className="h-full flex flex-col bg-white border-l border-[#B89B7A]/20">
      {selectedBlock ? (
        <>
          <div className="p-4 border-b border-[#B89B7A]/20 flex justify-between items-center">
            <h2 className="font-semibold text-[#432818]">
              {getBlockEditorTitle(selectedBlock.type)}
            </h2>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                onClick={onDelete}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          <ScrollArea className="flex-1 p-4">
            {renderBlockEditor()}
          </ScrollArea>
        </>
      ) : (
        <div className="h-full flex items-center justify-center text-[#8F7A6A]">
          <div className="text-center p-6">
            <p>Selecione um bloco para editar</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertiesPanel;
