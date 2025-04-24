
import React from 'react';
import { QuizComponentData } from '@/types/quizBuilder';
import { cn } from '@/lib/utils';
import StageResultComponent from './components/StageResultComponent';
import StageCoverComponent from './components/StageCoverComponent';
import StageQuestionComponent from './components/StageQuestionComponent';
import MultipleChoiceComponent from './components/MultipleChoiceComponent';

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
      borderRadius: style?.borderRadius ? `${style.borderRadius}px` : '0',
      padding: `${style?.paddingY || '0'}px ${style?.paddingX || '0'}px`,
    };
  };

  switch (type) {
    case 'header': 
      return (
        <div style={getComponentStyles()} className={cn("py-6", isSelected && !isPreview && "bg-opacity-90")}>
          <h1 className="text-3xl font-bold text-center">{data.title || 'Título Principal'}</h1>
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
    case 'singleChoice':
      return (
        <MultipleChoiceComponent
          data={data}
          style={style || {}}
          isSelected={isSelected && !isPreview}
        />
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

    case 'stageCover':
      return (
        <StageCoverComponent 
          data={data}
          style={style}
          isSelected={isSelected && !isPreview}
        />
      );
      
    case 'stageQuestion':
      return (
        <StageQuestionComponent
          data={data}
          style={style || {}}
          isSelected={isSelected && !isPreview}
        />
      );
      
    case 'stageResult':
      return (
        <StageResultComponent
          data={data}
          style={style || {}}
          isSelected={isSelected && !isPreview}
        />
      );
      
    case 'benefitsList':
      return (
        <div style={getComponentStyles()} className={cn("p-6 bg-[#F9F6F2]", isSelected && !isPreview && "bg-opacity-90")}>
          <h3 className="text-xl font-medium mb-4">{data.title || 'Benefícios'}</h3>
          <ul className="space-y-2">
            {(data.benefits || [
              'Benefício 1: Descrição do benefício',
              'Benefício 2: Descrição do benefício',
              'Benefício 3: Descrição do benefício',
            ]).map((benefit, index) => (
              <li key={index} className="flex items-start">
                <span className="text-[#B89B7A] mr-2">✓</span>
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      );
    
    default: 
      return (
        <div style={getComponentStyles()} className="p-4 bg-gray-100 text-center rounded">
          <p>Componente tipo: {type}</p>
          <p className="text-sm text-gray-500">Este tipo de componente não tem visualização personalizada.</p>
        </div>
      );
  }
};

export default ComponentRenderer;
