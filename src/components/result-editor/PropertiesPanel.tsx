import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Block } from '@/types/editor';
import { X, Trash } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { blockTemplates } from '@/utils/blockTemplates';
import { useTemplateSelection } from '@/hooks/useTemplateSelection';
import StyleEditor from './style-editors/StyleEditor';

interface PropertiesPanelProps {
  selectedBlockId: string | null;
  blocks: Block[];
  onClose: () => void;
  onUpdate: (id: string, content: any) => void;
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
  const { handleApplyTemplate } = useTemplateSelection(onUpdate);
  
  if (!selectedBlock) {
    return (
      <div className="h-full flex flex-col border-l">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="font-semibold">Propriedades</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex-1 flex items-center justify-center p-4 text-center">
          <p className="text-[#8F7A6A]">
            Selecione um bloco para editar suas propriedades
          </p>
        </div>
      </div>
    );
  }
  
  const availableTemplates = blockTemplates.filter(
    template => template.type === selectedBlock.type
  );

  return (
    <div className="h-full flex flex-col border-l">
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="font-semibold">{selectedBlock.type}</h2>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(selectedBlock.id)}
            className="h-8 w-8 hover:bg-red-100 hover:text-red-600"
          >
            <Trash className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-4">
          <Tabs defaultValue="templates">
            <TabsList className="mb-4">
              <TabsTrigger value="templates">Templates</TabsTrigger>
              <TabsTrigger value="content">Conteúdo</TabsTrigger>
              <TabsTrigger value="style">Estilo</TabsTrigger>
            </TabsList>
            
            <TabsContent value="templates">
              <div className="grid gap-4">
                {availableTemplates.map(template => (
                  <Card
                    key={template.id}
                    className="p-4 cursor-pointer hover:bg-[#FAF9F7] transition-colors"
                    onClick={() => handleApplyTemplate(template.id, selectedBlock.id)}
                  >
                    <h3 className="font-medium mb-2">{template.name}</h3>
                    {template.preview && (
                      <img 
                        src={template.preview} 
                        alt={template.name}
                        className="w-full rounded-md mb-2" 
                      />
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleApplyTemplate(template.id, selectedBlock.id);
                      }}
                    >
                      Aplicar Template
                    </Button>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="content">
              {renderContentEditor()}
            </TabsContent>
            
            <TabsContent value="style">
              <StyleEditor
                style={selectedBlock.content.style || {}}
                onUpdate={(style) => onUpdate(selectedBlock.id, { 
                  ...selectedBlock.content,
                  style 
                })}
              />
            </TabsContent>
          </Tabs>
        </div>
      </ScrollArea>
    </div>
  );
};

const renderContentEditor = () => {
  switch (selectedBlock.type) {
    case 'header':
      return <HeaderBlockEditor block={selectedBlock} onUpdate={(content) => onUpdate(selectedBlock.id, content)} />;
    case 'headline':
      return <HeadlineBlockEditor block={selectedBlock} onUpdate={(content) => onUpdate(selectedBlock.id, content)} />;
    case 'text':
      return <TextBlockEditor block={selectedBlock} onUpdate={(content) => onUpdate(selectedBlock.id, content)} />;
    case 'image':
      return <ImageBlockEditor block={selectedBlock} onUpdate={(content) => onUpdate(selectedBlock.id, content)} />;
    case 'benefits':
      return <BenefitsBlockEditor block={selectedBlock} onUpdate={(content) => onUpdate(selectedBlock.id, content)} />;
    case 'pricing':
      return <PricingBlockEditor block={selectedBlock} onUpdate={(content) => onUpdate(selectedBlock.id, content)} />;
    case 'guarantee':
      return <GuaranteeBlockEditor block={selectedBlock} onUpdate={(content) => onUpdate(selectedBlock.id, content)} />;
    case 'cta':
      return <CTABlockEditor block={selectedBlock} onUpdate={(content) => onUpdate(selectedBlock.id, content)} />;
    case 'style-result':
      return <StyleResultBlockEditor block={selectedBlock} onUpdate={(content) => onUpdate(selectedBlock.id, content)} />;
    case 'secondary-styles':
      return <SecondaryStylesBlockEditor block={selectedBlock} onUpdate={(content) => onUpdate(selectedBlock.id, content)} />;
    case 'hero-section':
      return <HeroSectionBlockEditor block={selectedBlock} onUpdate={(content) => onUpdate(selectedBlock.id, content)} />;
    case 'products':
      return <ProductsBlockEditor block={selectedBlock} onUpdate={(content) => onUpdate(selectedBlock.id, content)} />;
    case 'testimonials':
      return <TestimonialsBlockEditor block={selectedBlock} onUpdate={(content) => onUpdate(selectedBlock.id, content)} />;
    case 'spacer':
      return <SpacerBlockEditor block={selectedBlock} onUpdate={(content) => onUpdate(selectedBlock.id, content)} />;
    case 'video':
      return <VideoBlockEditor block={selectedBlock} onUpdate={(content) => onUpdate(selectedBlock.id, content)} />;
    case 'two-column':
      return <TwoColumnBlockEditor block={selectedBlock} onUpdate={(content) => onUpdate(selectedBlock.id, content)} />;
    case 'icon':
      return <IconBlockEditor block={selectedBlock} onUpdate={(content) => onUpdate(selectedBlock.id, content)} />;
    case 'faq':
      return <FAQBlockEditor block={selectedBlock} onUpdate={(content) => onUpdate(selectedBlock.id, content)} />;
    case 'carousel':
      return <CarouselBlockEditor block={selectedBlock} onUpdate={(content) => onUpdate(selectedBlock.id, content)} />;
    case 'custom-code':
      return <CustomCodeBlockEditor block={selectedBlock} onUpdate={(content) => onUpdate(selectedBlock.id, content)} />;
    case 'animation-block':
      return <AnimationBlockEditor block={selectedBlock} onUpdate={(content) => onUpdate(selectedBlock.id, content)} />;
    default:
      return <div>Editor não disponível para este tipo de bloco</div>;
  }
};
