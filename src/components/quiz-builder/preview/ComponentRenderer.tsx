
import React from 'react';
import { QuizComponentData } from '@/types/quizBuilder';
import { cn } from '@/lib/utils';
import MultipleChoiceComponent from '../components/MultipleChoiceComponent';

interface ComponentRendererProps {
  component: QuizComponentData;
  isSelected?: boolean;
  onSelect?: () => void;
  onMove?: (draggedId: string, targetId: string) => void;
  isPreviewing?: boolean;
  isEditing?: boolean;
}

const ComponentRenderer: React.FC<ComponentRendererProps> = ({ 
  component, 
  isSelected = false, 
  onSelect = () => {}, 
  onMove = () => {}, 
  isPreviewing = false,
  isEditing = false 
}) => {
  const { type, data, style } = component;
  
  const containerStyles = {
    backgroundColor: style?.backgroundColor || 'transparent',
    color: style?.textColor || 'inherit',
    borderRadius: style?.borderRadius ? `${style.borderRadius}px` : '0',
    padding: `${style?.paddingY || '0'}px ${style?.paddingX || '0'}px`
  };
  
  const renderHeader = () => (
    <div className="text-center mb-6">
      <h1 className="text-2xl md:text-3xl font-playfair mb-2">{data.title}</h1>
      {data.subtitle && <p className="text-sm md:text-base">{data.subtitle}</p>}
    </div>
  );
  
  const renderText = () => (
    <div className="prose max-w-none">
      <p>{data.text}</p>
    </div>
  );
  
  const renderImage = () => (
    <div className="text-center">
      {data.imageUrl ? (
        <img 
          src={data.imageUrl} 
          alt={data.alt || 'Imagem do quiz'} 
          className="max-w-full mx-auto rounded-md"
        />
      ) : (
        <div className="h-40 bg-gray-200 rounded-md flex items-center justify-center">
          <p className="text-gray-500">Imagem não disponível</p>
        </div>
      )}
      {data.caption && <p className="text-sm mt-2 text-gray-600">{data.caption}</p>}
    </div>
  );
  
  const renderMultipleChoice = () => {
    return (
      <MultipleChoiceComponent
        data={data}
        style={style || {}}
        isSelected={isEditing}
      />
    );
  };
  
  const renderStageCover = () => (
    <div className="text-center py-8">
      <h1 className="text-3xl font-playfair mb-6">{data.headline}</h1>
      <p className="mb-8 text-gray-700">{data.subheadline}</p>
      <button className="bg-[#B89B7A] text-white px-6 py-2 rounded-md hover:bg-[#A38A69] transition-colors">
        {data.buttonText || 'Começar'}
      </button>
    </div>
  );
  
  const renderStageQuestion = () => (
    <div className="text-center mb-6">
      <div className="mb-2 text-sm text-gray-500">
        {data.progressText?.replace('{current}', String(data.stageNumber))
          .replace('{total}', '10') || `Questão ${data.stageNumber || 1} de 10`}
      </div>
      <h2 className="text-xl font-playfair">{data.stageTitle}</h2>
    </div>
  );
  
  const renderStageResult = () => (
    <div className="text-center py-8">
      <h1 className="text-3xl font-playfair mb-3">{data.headline}</h1>
      <p className="mb-6 text-gray-700">{data.subheadline}</p>
    </div>
  );

  const renderContent = () => {
    switch (type) {
      case 'header': return renderHeader();
      case 'text': return renderText();
      case 'image': return renderImage();
      case 'multipleChoice': return renderMultipleChoice();
      case 'stageCover': return renderStageCover();
      case 'stageQuestion': return renderStageQuestion();
      case 'stageResult': return renderStageResult();
      default: return <p>Componente não suportado: {type}</p>;
    }
  };

  return (
    <div 
      className={cn("relative rounded-md overflow-hidden", isSelected && "border-2 border-[#B89B7A]")}
      style={containerStyles}
      onClick={onSelect}
    >
      {isSelected && (
        <div className="absolute top-0 right-0 bg-[#B89B7A] text-white px-2 py-1 text-xs z-10">
          {type}
        </div>
      )}
      <div className="p-4">
        {renderContent()}
      </div>
    </div>
  );
};

export default ComponentRenderer;
