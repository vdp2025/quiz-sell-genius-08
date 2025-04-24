
import React from 'react';
import { Block } from '@/types/editor';
import { StyleResult } from '@/types/quiz';

interface BlockRendererProps {
  block: Block;
  isPreviewing?: boolean;
  primaryStyle?: StyleResult;
  secondaryStyles?: StyleResult[];
}

export const BlockRenderer: React.FC<BlockRendererProps> = ({
  block,
  isPreviewing = false,
  primaryStyle,
  secondaryStyles
}) => {
  // In a real implementation, each block type would have a dedicated component
  // This is a simplified version that just shows different content based on block type

  const renderBlockContent = () => {
    switch (block.type) {
      case 'headline':
        return (
          <div className="py-4">
            {block.content.title && (
              <h2 className="text-2xl font-bold text-[#432818]">{block.content.title}</h2>
            )}
            {block.content.subtitle && (
              <p className="mt-2 text-[#8F7A6A]">{block.content.subtitle}</p>
            )}
          </div>
        );
      case 'text':
        return (
          <div className="py-4">
            <div className="prose max-w-none text-[#432818]"
                dangerouslySetInnerHTML={{ __html: block.content.text || '' }}
            />
          </div>
        );
      case 'cta':
        return (
          <div className="py-6 text-center">
            <h3 className="text-xl font-medium mb-3">{block.content.title || 'Comece Agora'}</h3>
            <p className="mb-4">{block.content.text || 'Clique no botão abaixo para começar'}</p>
            <button className="px-8 py-3 bg-[#B89B7A] text-white rounded-md font-medium hover:bg-[#A38A69] transition-colors">
              {block.content.buttonText || 'Quero Comprar'}
            </button>
          </div>
        );
      case 'style-result':
        return (
          <div className="py-4">
            <h2 className="text-2xl font-bold mb-3 text-[#432818]">
              {primaryStyle ? `Seu Estilo: ${primaryStyle.category}` : 'Estilo Principal'}
            </h2>
            <p>Aqui será exibido o resultado do seu estilo predominante.</p>
          </div>
        );
      case 'secondary-styles':
        return (
          <div className="py-4">
            <h3 className="text-xl font-medium mb-3 text-[#432818]">Estilos Secundários</h3>
            {secondaryStyles && secondaryStyles.length > 0 ? (
              <div className="space-y-2">
                {secondaryStyles.map((style, index) => (
                  <div key={index} className="flex justify-between">
                    <span>{style.category}</span>
                    <span>{style.percentage}%</span>
                  </div>
                ))}
              </div>
            ) : (
              <p>Estilos secundários serão exibidos aqui.</p>
            )}
          </div>
        );
      case 'hero-section':
        return (
          <div className="py-6 grid md:grid-cols-2 gap-6 items-center">
            {block.content.heroImage ? (
              <img 
                src={block.content.heroImage}
                alt={block.content.heroImageAlt || 'Hero image'} 
                className="rounded-lg shadow-md"
              />
            ) : (
              <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
                Imagem do Hero
              </div>
            )}
            <div>
              <h2 className="text-2xl font-bold mb-3 text-[#432818]">{block.content.title || 'Título do Hero'}</h2>
              <p className="text-[#8F7A6A]">{block.content.text || 'Texto descritivo do hero section'}</p>
            </div>
          </div>
        );
      case 'products':
        return (
          <div className="py-4">
            <h3 className="text-xl font-medium mb-3 text-[#432818]">{block.content.title || 'Produtos e Bônus'}</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border border-[#B89B7A]/20 rounded-lg p-4">
                <h4 className="font-medium">Produto 1</h4>
                <p className="text-sm text-[#8F7A6A]">Descrição do produto</p>
              </div>
              <div className="border border-[#B89B7A]/20 rounded-lg p-4">
                <h4 className="font-medium">Produto 2</h4>
                <p className="text-sm text-[#8F7A6A]">Descrição do produto</p>
              </div>
            </div>
          </div>
        );
      case 'testimonials':
        return (
          <div className="py-4">
            <h3 className="text-xl font-medium mb-3 text-[#432818]">{block.content.title || 'Depoimentos'}</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="italic text-[#432818]">"Este produto transformou meu estilo completamente!"</p>
                <p className="font-medium mt-2">Cliente 1</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="italic text-[#432818]">"Recomendo a todas minhas amigas!"</p>
                <p className="font-medium mt-2">Cliente 2</p>
              </div>
            </div>
          </div>
        );
      case 'spacer':
        return <div style={{ height: block.content.height || '40px' }} />;
      case 'video':
        return (
          <div className="py-4">
            <h3 className="text-xl font-medium mb-3 text-[#432818]">{block.content.title || 'Vídeo'}</h3>
            <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg">
              {block.content.videoUrl ? (
                <iframe 
                  src={block.content.videoUrl} 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                  className="w-full h-full rounded-lg"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p>Vídeo será exibido aqui</p>
                </div>
              )}
            </div>
          </div>
        );
      case 'two-column':
        return (
          <div className="py-4 grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-medium mb-2 text-[#432818]">Coluna Esquerda</h3>
              <p>Conteúdo da coluna esquerda.</p>
            </div>
            <div>
              <h3 className="text-xl font-medium mb-2 text-[#432818]">Coluna Direita</h3>
              <p>Conteúdo da coluna direita.</p>
            </div>
          </div>
        );
      case 'icon':
        return (
          <div className="py-4 flex flex-col items-center">
            <div className="w-16 h-16 bg-[#B89B7A]/20 rounded-full flex items-center justify-center mb-3">
              <span className="text-2xl text-[#B89B7A]">★</span>
            </div>
            <h3 className="text-lg font-medium text-[#432818]">{block.content.title || 'Ícone'}</h3>
            <p className="text-center text-[#8F7A6A]">{block.content.text || 'Texto descritivo do ícone'}</p>
          </div>
        );
      case 'faq':
        return (
          <div className="py-4">
            <h3 className="text-xl font-medium mb-3 text-[#432818]">{block.content.title || 'Perguntas Frequentes'}</h3>
            <div className="space-y-3">
              <div className="border-b pb-3">
                <h4 className="font-medium">Pergunta 1?</h4>
                <p className="text-sm text-[#8F7A6A]">Resposta para a pergunta 1.</p>
              </div>
              <div className="border-b pb-3">
                <h4 className="font-medium">Pergunta 2?</h4>
                <p className="text-sm text-[#8F7A6A]">Resposta para a pergunta 2.</p>
              </div>
            </div>
          </div>
        );
      case 'carousel':
        return (
          <div className="py-4">
            <h3 className="text-xl font-medium mb-3 text-[#432818]">{block.content.title || 'Carrossel'}</h3>
            <div className="flex overflow-x-auto space-x-4 pb-4">
              <div className="flex-shrink-0 w-64 h-40 bg-gray-200 rounded-lg flex items-center justify-center">
                Slide 1
              </div>
              <div className="flex-shrink-0 w-64 h-40 bg-gray-200 rounded-lg flex items-center justify-center">
                Slide 2
              </div>
              <div className="flex-shrink-0 w-64 h-40 bg-gray-200 rounded-lg flex items-center justify-center">
                Slide 3
              </div>
            </div>
          </div>
        );
      case 'custom-code':
        return (
          <div className="py-4">
            <h3 className="text-xl font-medium mb-3 text-[#432818]">{block.content.title || 'Código Personalizado'}</h3>
            <div className="border border-[#B89B7A]/20 rounded-lg p-4 bg-gray-50">
              <pre className="text-xs overflow-auto">{block.content.code || '// Seu código personalizado aqui'}</pre>
            </div>
          </div>
        );
      case 'animation-block':
        return (
          <div className="py-4">
            <h3 className="text-xl font-medium mb-3 text-[#432818]">{block.content.title || 'Animação'}</h3>
            <div className="border border-[#B89B7A]/20 rounded-lg p-4 h-40 flex items-center justify-center">
              <span className="animate-pulse">Conteúdo animado</span>
            </div>
          </div>
        );
      default:
        return (
          <div className="py-4 border border-dashed border-[#B89B7A]/40 rounded-lg p-4">
            <p>Bloco do tipo: {block.type}</p>
          </div>
        );
    }
  };

  return (
    <div className={`relative ${isPreviewing ? '' : 'hover:outline hover:outline-2 hover:outline-[#B89B7A]'}`}>
      {renderBlockContent()}
    </div>
  );
};

export default BlockRenderer;
