import React from 'react';
import { StyleResult } from '@/types/quiz';
import { Button } from '@/components/ui/button';
import { EyeIcon, Smartphone, Monitor, PlusIcon } from 'lucide-react';
import { EditorBlock } from '@/types/editor';

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
        return (
          <div className="text-center p-4 border-2 border-dashed border-[#B89B7A]/40 rounded-lg cursor-pointer hover:bg-[#FAF9F7]" onClick={() => onSelectComponent(block.id)}>
            {block.content.logo && (
              <img src={block.content.logo} alt={block.content.logoAlt || ''} className="mx-auto w-36 mb-6" />
            )}
            {block.content.title && (
              <h1 className="text-4xl md:text-5xl font-bold text-[#aa6b5d]">{block.content.title}</h1>
            )}
            {block.content.subtitle && (
              <p className="text-lg mt-4 max-w-2xl mx-auto">{block.content.subtitle}</p>
            )}
          </div>
        );
        
      case 'hero-section':
        return (
          <div className="p-4 border-2 border-dashed border-[#B89B7A]/40 rounded-lg cursor-pointer hover:bg-[#FAF9F7]" onClick={() => onSelectComponent(block.id)}>
            <section className="grid md:grid-cols-2 gap-8 items-center">
              {block.content.heroImage && (
                <img 
                  src={block.content.heroImage} 
                  alt={block.content.heroImageAlt || ''} 
                  className="rounded-lg shadow-lg"
                />
              )}
              <div>
                {block.content.quote && (
                  <blockquote className="italic text-lg text-[#6b4e43]">
                    "{block.content.quote}"
                    {block.content.quoteAuthor && (
                      <br />
                      <span className="not-italic font-medium">— {block.content.quoteAuthor}</span>
                    )}
                  </blockquote>
                )}
              </div>
            </section>
          </div>
        );
        
      case 'bonus-carousel':
        return (
          <div className="p-4 border-2 border-dashed border-[#B89B7A]/40 rounded-lg cursor-pointer hover:bg-[#FAF9F7]" onClick={() => onSelectComponent(block.id)}>
            {block.content.title && (
              <h2 className="text-xl font-semibold text-[#aa6b5d] mb-4">{block.content.title}</h2>
            )}
            <div className="grid md:grid-cols-3 gap-6">
              {(block.content.bonusImages || []).map((image, index) => (
                <div key={index} className="space-y-2">
                  <img 
                    src={image.url} 
                    alt={image.alt} 
                    className="rounded-lg shadow w-full"
                  />
                  {image.title && (
                    <p className="text-sm text-center text-[#6b4e43]">{image.title}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'headline':
        return (
          <div className="space-y-3 p-4 border-2 border-dashed border-[#B89B7A]/40 rounded-lg cursor-pointer hover:bg-[#FAF9F7]" onClick={() => onSelectComponent(block.id)}>
            {block.content.title && (
              <h2 className={`text-3xl font-playfair ${block.content.textColor ? `text-[${block.content.textColor}]` : 'text-[#432818]'}`}>{block.content.title}</h2>
            )}
            {block.content.subtitle && (
              <p className="text-xl text-[#8F7A6A]">{block.content.subtitle}</p>
            )}
          </div>
        );
      case 'text':
        return (
          <div className="p-4 border-2 border-dashed border-[#B89B7A]/40 rounded-lg cursor-pointer hover:bg-[#FAF9F7]" onClick={() => onSelectComponent(block.id)}>
            {block.content.text && (
              <p className={`${block.content.textColor ? `text-[${block.content.textColor}]` : 'text-[#432818]'}`}>{block.content.text}</p>
            )}
          </div>
        );
      case 'image':
        return (
          <div className="p-4 border-2 border-dashed border-[#B89B7A]/40 rounded-lg cursor-pointer hover:bg-[#FAF9F7]" onClick={() => onSelectComponent(block.id)}>
            {block.content.imageUrl ? (
              <img 
                src={block.content.imageUrl} 
                alt={block.content.imageAlt || "Imagem"} 
                className="max-w-full rounded-md"
              />
            ) : (
              <div className="h-40 bg-[#F0EBE5] rounded-md flex items-center justify-center text-[#8F7A6A]">
                Imagem Placeholder
              </div>
            )}
          </div>
        );
      case 'benefits':
        return (
          <div className="p-4 border-2 border-dashed border-[#B89B7A]/40 rounded-lg cursor-pointer hover:bg-[#FAF9F7]" onClick={() => onSelectComponent(block.id)}>
            <h3 className="text-xl font-playfair text-[#B89B7A] mb-4">{block.content.title || 'Benefícios'}</h3>
            <div className="space-y-2">
              {(block.content.items || ['Benefício 1', 'Benefício 2', 'Benefício 3']).map((item, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-[#B89B7A] flex-shrink-0 mt-1" />
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>
        );
      case 'testimonials':
        return (
          <div className="p-4 border-2 border-dashed border-[#B89B7A]/40 rounded-lg cursor-pointer hover:bg-[#FAF9F7]" onClick={() => onSelectComponent(block.id)}>
            <h3 className="text-xl font-playfair text-[#B89B7A] mb-4">{block.content.title || 'Depoimentos'}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2].map(num => (
                <div key={num} className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="italic text-[#432818]">"Este produto transformou meu estilo completamente!"</p>
                  <p className="font-medium mt-2">Cliente {num}</p>
                </div>
              ))}
            </div>
          </div>
        );
      case 'pricing':
        return (
          <div className="p-4 border-2 border-dashed border-[#B89B7A]/40 rounded-lg cursor-pointer hover:bg-[#FAF9F7]" onClick={() => onSelectComponent(block.id)}>
            <h3 className="text-xl font-playfair text-[#B89B7A] mb-2">{block.content.title || 'Preço Especial'}</h3>
            <p className="text-[#432818] mb-4">{block.content.text || 'Aproveite nossa oferta exclusiva'}</p>
            <div className="bg-[#FAF9F7] p-4 rounded-lg border border-[#B89B7A]/20 text-center">
              <p className="text-2xl font-bold text-[#B89B7A]">R$ 197,00</p>
              <Button className="mt-4 bg-[#B89B7A] hover:bg-[#8F7A6A]">Comprar Agora</Button>
            </div>
          </div>
        );
      case 'guarantee':
        return (
          <div className="p-4 border-2 border-dashed border-[#B89B7A]/40 rounded-lg cursor-pointer hover:bg-[#FAF9F7]" onClick={() => onSelectComponent(block.id)}>
            <h3 className="text-xl font-playfair text-[#B89B7A] mb-2">{block.content.title || 'Garantia'}</h3>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-[#B89B7A] flex items-center justify-center text-white text-2xl">7</div>
              <p className="text-[#432818]">{block.content.text || 'Satisfação garantida ou seu dinheiro de volta em até 7 dias.'}</p>
            </div>
          </div>
        );
      case 'cta':
        return (
          <div className="p-4 border-2 border-dashed border-[#B89B7A]/40 rounded-lg cursor-pointer hover:bg-[#FAF9F7] text-center" onClick={() => onSelectComponent(block.id)}>
            <h3 className="text-xl font-playfair text-[#B89B7A] mb-2">{block.content.title || 'Comece Agora'}</h3>
            <p className="text-[#432818] mb-4">{block.content.text || 'Clique no botão abaixo para começar'}</p>
            <Button className="bg-[#B89B7A] hover:bg-[#8F7A6A] px-8 py-2 text-lg">Quero Comprar</Button>
          </div>
        );
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
      {/* Preview Toolbar */}
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

      {/* Preview Canvas */}
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
