
import React from 'react';
import { Block } from '@/types/editor';
import { cn } from '@/lib/utils';
import { StyleResult } from '@/types/quiz';

interface BlockRendererProps {
  block: Block;
  primaryStyle: StyleResult;
  isSelected: boolean;
  onSelect: () => void;
  isDragging?: boolean;
}

export const BlockRenderer: React.FC<BlockRendererProps> = ({
  block,
  primaryStyle,
  isSelected,
  onSelect,
  isDragging = false
}) => {
  // Render different block types
  const renderBlockContent = () => {
    const content = block.content;
    
    switch (block.type) {
      case 'header':
        return (
          <div className="text-center py-4">
            {content.logo && (
              <img src={content.logo} alt={content.logoAlt || 'Logo'} className="h-16 mx-auto mb-4" />
            )}
            <h1 className="text-2xl font-semibold mb-2 text-[#432818]">{content.title || 'Olá, seu Estilo Predominante é:'}</h1>
            {content.subtitle && <p className="text-[#8F7A6A]">{content.subtitle}</p>}
          </div>
        );
        
      case 'headline':
        return (
          <div className={`text-${content.alignment || 'center'} py-4`}>
            <h2 className="text-2xl font-bold mb-2" style={{ color: content.textColor || '#432818' }}>
              {content.title || 'VOCÊ DESCOBRIU SEU ESTILO'}
            </h2>
            {content.subtitle && <p className="text-[#8F7A6A]">{content.subtitle}</p>}
          </div>
        );
        
      case 'text':
        return (
          <div className={`text-${content.alignment || 'left'} py-4`}>
            <p className="text-[#432818]">{content.text || 'Digite seu texto aqui...'}</p>
          </div>
        );
        
      case 'image':
        return (
          <div className="py-4 flex justify-center">
            <img 
              src={content.imageUrl || 'https://placehold.co/600x400?text=Imagem'} 
              alt={content.imageAlt || 'Imagem'} 
              style={{ 
                width: content.width || '100%',
                borderRadius: content.borderRadius || '8px'
              }}
            />
          </div>
        );
        
      case 'benefits':
        return (
          <div className="py-4">
            <h3 className="text-xl font-semibold mb-4 text-[#432818]">{content.title || 'O que você vai aprender:'}</h3>
            <ul className="space-y-2 pl-6">
              {(content.items || []).map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-[#B89B7A] mr-2">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        );
        
      case 'pricing':
        return (
          <div className="py-6 text-center">
            <div className="mb-4">
              {content.regularPrice && (
                <div className="text-[#8F7A6A] line-through mb-1">
                  De R$ {content.regularPrice}
                </div>
              )}
              <div className="text-3xl font-bold text-[#432818]">
                Por R$ {content.salePrice || '39,00'}
              </div>
            </div>
            <button className="bg-[#B89B7A] text-white py-3 px-6 rounded-lg font-semibold text-lg hover:bg-[#8F7A6A] transition-colors">
              {content.buttonText || 'Quero Transformar Meu Estilo'}
            </button>
            {content.urgencyText && (
              <div className="mt-3 text-sm text-[#8F7A6A]">{content.urgencyText}</div>
            )}
          </div>
        );
        
      case 'guarantee':
        return (
          <div className="py-4 flex flex-col md:flex-row items-center gap-6 bg-[#FAF9F7] p-6 rounded-lg">
            {content.image && (
              <img src={content.image} alt="Garantia" className="w-24 h-24 object-contain" />
            )}
            <div>
              <h3 className="text-xl font-semibold mb-2 text-[#432818]">{content.title || 'Garantia de 7 dias'}</h3>
              <p className="text-[#8F7A6A]">{content.text || 'Se você não ficar 100% satisfeita com o conteúdo nos primeiros 7 dias, devolvemos seu dinheiro integralmente, sem burocracia.'}</p>
            </div>
          </div>
        );
        
      case 'cta':
        return (
          <div className="py-6 text-center">
            {content.title && (
              <h3 className="text-xl font-semibold mb-4 text-[#432818]">{content.title}</h3>
            )}
            <button className="bg-[#B89B7A] text-white py-3 px-8 rounded-lg font-semibold text-lg hover:bg-[#8F7A6A] transition-colors">
              {content.buttonText || 'Clique Aqui'}
            </button>
          </div>
        );
        
      case 'style-result':
        return (
          <div className="py-4">
            <h2 className="text-2xl font-bold mb-4 text-[#432818]">
              {(content.title || 'Seu estilo predominante é {{primaryStyle}}').replace('{{primaryStyle}}', primaryStyle.category)}
            </h2>
            <p className="text-[#8F7A6A]">
              {content.description || 'Você possui características únicas que refletem sua personalidade através do seu estilo pessoal.'}
            </p>
            {content.customImage && (
              <img 
                src={content.customImage} 
                alt={`Estilo ${primaryStyle.category}`} 
                className="mt-4 max-w-full rounded-lg mx-auto"
              />
            )}
          </div>
        );
        
      case 'secondary-styles':
        return (
          <div className="py-4">
            <h3 className="text-xl font-semibold mb-4 text-[#432818]">
              {content.title || 'Seus Estilos Complementares'}
            </h3>
            <div className="bg-[#FAF9F7] p-4 rounded-lg">
              <p className="text-[#8F7A6A] italic">
                (Os estilos complementares serão exibidos automaticamente)
              </p>
            </div>
          </div>
        );
        
      case 'hero-section':
        return (
          <div className="py-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl md:text-3xl font-bold mb-3 text-[#432818]">
                {content.title || 'VOCÊ DESCOBRIU SEU ESTILO'}
              </h2>
              <p className="text-[#8F7A6A]">
                {content.subtitle || 'Agora é hora de aplicar com clareza — e se vestir de você'}
              </p>
            </div>
            
            <div className="flex flex-col md:flex-row gap-6 items-center">
              {content.heroImage && (
                <img 
                  src={content.heroImage} 
                  alt={content.heroImageAlt || 'Guia de Estilo'} 
                  className="w-full md:w-1/2 rounded-lg object-cover"
                />
              )}
              
              <div className="w-full md:w-1/2">
                {content.heroImage2 && (
                  <img 
                    src={content.heroImage2} 
                    alt="Guia de Estilo" 
                    className="w-full rounded-lg object-cover mb-4"
                  />
                )}
                
                {content.quote && (
                  <blockquote className="border-l-4 border-[#B89B7A] pl-4 italic text-[#8F7A6A] my-4">
                    "{content.quote}"
                    {content.quoteAuthor && (
                      <footer className="mt-2 font-medium text-[#432818]">— {content.quoteAuthor}</footer>
                    )}
                  </blockquote>
                )}
              </div>
            </div>
          </div>
        );
        
      case 'products':
        return (
          <div className="py-6">
            <h3 className="text-xl font-semibold mb-4 text-center text-[#432818]">
              {content.title || 'O que você vai receber:'}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              {(content.images || []).map((image, index) => (
                <div key={index} className="text-center">
                  <img 
                    src={image.url} 
                    alt={image.alt} 
                    className="w-full rounded-lg object-contain h-64"
                  />
                  {image.title && (
                    <p className="mt-2 font-medium text-[#432818]">{image.title}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
        
      case 'testimonials':
        return (
          <div className="py-6">
            <h3 className="text-xl font-semibold mb-4 text-center text-[#432818]">
              {content.title || 'O que estão dizendo'}
            </h3>
            
            {content.testimonialsImage ? (
              <img 
                src={content.testimonialsImage} 
                alt="Depoimentos" 
                className="w-full rounded-lg"
              />
            ) : (
              <div className="bg-[#FAF9F7] p-6 rounded-lg text-center">
                <p className="text-[#8F7A6A]">
                  (Imagem de depoimentos será exibida aqui)
                </p>
              </div>
            )}
          </div>
        );
        
      case 'bonus-carousel':
        return (
          <div className="py-6">
            <h3 className="text-xl font-semibold mb-4 text-center text-[#432818]">
              {content.title || 'Você também recebe estes bônus'}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              {(content.bonusImages || []).map((bonus, index) => (
                <div key={index} className="text-center">
                  <img 
                    src={bonus.url} 
                    alt={bonus.alt} 
                    className="w-full rounded-lg object-contain h-64"
                  />
                  <p className="mt-2 font-medium text-[#432818]">{bonus.title}</p>
                </div>
              ))}
            </div>
          </div>
        );
        
      default:
        return <p>Bloco não reconhecido: {block.type}</p>;
    }
  };

  return (
    <div
      onClick={onSelect}
      className={cn(
        "border-2 p-4 mb-4 rounded-lg cursor-pointer transition-all",
        isSelected ? "border-[#B89B7A] bg-[#FAF9F7]" : "border-dashed border-gray-300 hover:border-[#B89B7A]/50",
        isDragging && "opacity-50"
      )}
    >
      {renderBlockContent()}
    </div>
  );
};

export default BlockRenderer;
