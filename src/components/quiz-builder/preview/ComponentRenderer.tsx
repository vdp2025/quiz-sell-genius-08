
import React from 'react';
import { QuizComponentData } from '@/types/quizBuilder';
import { cn } from '@/lib/utils';
import StageResultComponent from './components/StageResultComponent';
import StageCoverComponent from './components/StageCoverComponent';
import StageQuestionComponent from './components/StageQuestionComponent';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';

interface ComponentRendererProps {
  component: QuizComponentData;
  isPreview?: boolean;
  isSelected?: boolean;
  onSelect?: () => void;
  onMove?: (draggedId: string, targetId: string) => void;
  isPreviewing?: boolean;
  isActive?: boolean;
  isOver?: boolean;
}

export const ComponentRenderer: React.FC<ComponentRendererProps> = ({ 
  component, 
  isPreview = false,
  isSelected = false,
  onSelect,
  onMove,
  isPreviewing = false,
  isActive = false,
  isOver = false
}) => {
  const { type, data, style } = component;
  
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: component.id,
    disabled: isPreviewing
  });
  
  const sortableStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isActive ? 0.8 : 1
  };

  const getComponentStyles = () => {
    return {
      backgroundColor: style?.backgroundColor || 'transparent',
      color: style?.textColor || 'inherit',
      borderRadius: style?.borderRadius ? `${style.borderRadius}px` : '0',
      padding: style?.padding || '1rem',
      margin: style?.margin || '0',
      borderColor: style?.borderColor || 'transparent',
      borderWidth: style?.borderWidth || '0',
      boxShadow: style?.boxShadow || 'none',
    };
  };

  const componentProps = {
    data,
    style,
    isSelected: isSelected && !isPreviewing
  };

  const renderInnerComponent = () => {
    switch (type) {
      case 'header': 
        return (
          <div style={getComponentStyles()} className={cn("py-6", isSelected && !isPreview && "bg-opacity-90")}>
            <h1 className="text-3xl font-bold text-center font-playfair">{data.stageTitle || 'Título Principal'}</h1>
            {data.subtitle && <p className="text-xl text-center mt-2">{data.subtitle}</p>}
          </div>
        );

      case 'headline':
        return (
          <div style={getComponentStyles()} className={cn("py-4", isSelected && !isPreview && "bg-opacity-90")}>
            <h2 className="text-2xl font-bold font-playfair">{data.title || 'Título da Seção'}</h2>
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

      case 'singleChoice':
      case 'multipleChoice':
        return (
          <StageQuestionComponent
            data={{
              ...data,
              displayType: data.displayType || 'text',
              multiSelect: type === 'multipleChoice' ? (data.multiSelect || 3) : 1,
              layout: data.layout || { columns: 2, direction: 'vertical' },
              imageSize: data.imageSize || 'medium',
              selectionIndicator: data.selectionIndicator === 'background' ? 'highlight' : (data.selectionIndicator || 'border'),
            }}
            style={style || {}}
            isSelected={isSelected && !isPreview}
          />
        );
        
      case 'quizResult':
        return (
          <div style={getComponentStyles()} className={cn("py-6 text-center", isSelected && !isPreview && "bg-opacity-90")}>
            <h2 className="text-2xl font-bold mb-4 font-playfair">{data.resultTitle || 'Seu Estilo Predominante'}</h2>
            <div className="inline-block bg-[#ffefec] px-4 py-2 rounded-md text-[#aa6b5d] mb-6">
              Estilo exemplo: Natural
            </div>
            <p>{data.resultDescription || 'Descrição do resultado do quiz será exibida aqui.'}</p>
          </div>
        );

      case 'stageCover':
        return <StageCoverComponent {...componentProps} />;
        
      case 'stageQuestion':
        return <StageQuestionComponent {...componentProps} />;

      case 'stageResult':
        return <StageResultComponent {...componentProps} />;

      default:
        return (
          <div className="p-4 text-center border border-dashed border-gray-300 rounded-md">
            <p className="text-gray-500">Componente tipo {type} não reconhecido</p>
          </div>
        );
    }
  };

  if (isPreviewing) {
    return renderInnerComponent();
  }

  return (
    <div
      ref={setNodeRef}
      style={sortableStyle}
      className={cn(
        "relative border-2 rounded-lg transition-all duration-200 my-3 overflow-hidden",
        isSelected ? "border-[#B89B7A]" : "border-transparent hover:border-gray-200",
        isOver && "border-dashed border-[#B89B7A]"
      )}
      onClick={(e) => {
        e.stopPropagation();
        if (onSelect) onSelect();
      }}
    >
      <div 
        {...attributes} 
        {...listeners}
        className="absolute top-2 right-2 z-10 cursor-grab w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow-sm"
      >
        <GripVertical className="w-4 h-4 text-gray-500" />
      </div>
      {renderInnerComponent()}
    </div>
  );
};
