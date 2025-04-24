import React from 'react';
import { QuizComponentData } from '@/types/quizBuilder';
import { cn } from '@/lib/utils';
import StageResultComponent from './components/StageResultComponent';
import StageCoverComponent from './components/StageCoverComponent';

interface ComponentRendererProps {
  component: QuizComponentData;
  isPreview?: boolean;
  isSelected?: boolean;
}

export const ComponentRenderer: React.FC<ComponentRendererProps> = ({ 
  component, 
  isPreview = false,
  isSelected = false
}) => {
  const { type, data, style } = component;

  const getComponentStyles = () => {
    return {
      backgroundColor: style?.backgroundColor || 'transparent',
      color: style?.textColor || 'inherit',
      borderRadius: style?.borderRadius ? {
        'sm': '0.25rem',
        'md': '0.5rem',
        'lg': '1rem',
        'full': '9999px'
      }[style.borderRadius] : '0',
      padding: `${style?.paddingY ? `${parseInt(style.paddingY) * 0.25}rem` : '1rem'} ${style?.paddingX ? `${parseInt(style.paddingX) * 0.25}rem` : '1rem'}`,
    };
  };

  switch (type) {
    case 'header': 
      return (
        <div style={getComponentStyles()} className={cn("py-6", isSelected && !isPreview && "bg-opacity-90")}>
          <h1 className="text-3xl font-bold text-center">{data.stageTitle || 'Título Principal'}</h1>
          {data.subtitle && <p className="text-xl text-center mt-2">{data.subtitle}</p>}
        </div>
      );

    case 'headline':
      return (
        <div style={getComponentStyles()} className={cn("py-4", isSelected && !isPreview && "bg-opacity-90")}>
          <h2 className="text-2xl font-bold">{data.title || 'Título da Seção'}</h2>
        </div>
      );

    case 'text':
      return (
        <div style={getComponentStyles()} className={cn("py-3", isSelected && !isPreview && "bg-opacity-90")}>
          <p>{data.text || 'Texto do parágrafo que será exibido aqui. Edite este texto nas propriedades.'}</p>
        </div>
      );

    case 'image':
      return (
        <div style={getComponentStyles()} className={cn("py-4 text-center", isSelected && !isPreview && "bg-opacity-90")}>
          {data.imageUrl ? (
            <img 
              src={data.imageUrl} 
              alt={data.alt || 'Quiz image'} 
              className="max-w-full max-h-96 mx-auto rounded-md"
            />
          ) : (
            <div className="bg-gray-200 h-48 flex items-center justify-center rounded-md">
              <p className="text-gray-500">Imagem não configurada</p>
            </div>
          )}
          {data.caption && (
            <p className="text-sm text-gray-500 mt-2">{data.caption}</p>
          )}
        </div>
      );

    case 'multipleChoice':
      return (
        <div style={getComponentStyles()} className={cn("py-4", isSelected && !isPreview && "bg-opacity-90")}>
          <h3 className="text-xl font-medium mb-4">{data.question || 'Pergunta de múltipla escolha'}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {(data.options || ['Opção 1', 'Opção 2', 'Opção 3', 'Opção 4']).map((option, index) => (
              <div 
                key={index} 
                className="border rounded-md p-3 cursor-pointer hover:bg-gray-50"
              >
                {option}
              </div>
            ))}
          </div>
          <div className="text-sm text-gray-500 mt-4">
            {data.multiSelect > 1 ? `Selecione ${data.multiSelect} opções` : 'Selecione uma opção'}
          </div>
        </div>
      );

    case 'singleChoice':
      return (
        <div style={getComponentStyles()} className={cn("py-4", isSelected && !isPreview && "bg-opacity-90")}>
          <h3 className="text-xl font-medium mb-4">{data.question || 'Pergunta de escolha única'}</h3>
          <div className="space-y-3">
            {(data.options || ['Opção 1', 'Opção 2', 'Opção 3']).map((option, index) => (
              <div 
                key={index} 
                className="border rounded-md p-3 flex items-center cursor-pointer hover:bg-gray-50"
              >
                <div className="w-5 h-5 rounded-full border border-gray-300 mr-3 flex-shrink-0"></div>
                <span>{option}</span>
              </div>
            ))}
          </div>
        </div>
      );

    case 'quizResult':
      return (
        <div style={getComponentStyles()} className={cn("py-6 text-center", isSelected && !isPreview && "bg-opacity-90")}>
          <h2 className="text-2xl font-bold mb-4">{data.resultTitle || 'Seu Estilo Predominante'}</h2>
          <div className="inline-block bg-[#ffefec] px-4 py-2 rounded-md text-[#aa6b5d] mb-6">
            Estilo exemplo: Natural
          </div>
          <p>{data.resultDescription || 'Descrição do resultado do quiz será exibida aqui.'}</p>
        </div>
      );

    case 'stageResult':
      return (
        <StageResultComponent 
          data={data}
          style={style}
          isSelected={isSelected && !isPreview}
        />
      );

    case 'stageCover':
      return (
        <StageCoverComponent 
          data={data} 
          style={style} 
          isSelected={isSelected && !isPreview}
        />
      );

    default:
      return (
        <div className="p-4 text-center border border-dashed border-gray-300 rounded-md">
          <p className="text-gray-500">Componente tipo {type} não reconhecido</p>
        </div>
      );
  }
};
