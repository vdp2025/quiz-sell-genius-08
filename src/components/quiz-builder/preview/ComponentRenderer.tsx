
import React from 'react';
import { QuizComponentData } from '@/types/quizBuilder';
import { cn } from '@/lib/utils';

interface ComponentRendererProps {
  component: QuizComponentData;
  isEditing?: boolean;
}

const ComponentRenderer: React.FC<ComponentRendererProps> = ({ component, isEditing = false }) => {
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
    const optionsLayout = data.layout || { columns: 1, direction: 'vertical' };
    const isImageOption = data.displayType === 'image' || data.displayType === 'both';
    const imageSize = data.imageSize || 'medium';
    
    const getImageSizeClass = (size: string) => {
      switch (size) {
        case 'small': return 'h-24';
        case 'large': return 'h-48';
        default: return 'h-36';
      }
    };
    
    const getGridClass = () => {
      const cols = optionsLayout.columns;
      switch (cols) {
        case 1: return 'grid-cols-1';
        case 2: return 'grid-cols-1 md:grid-cols-2';
        case 3: return 'grid-cols-1 md:grid-cols-3';
        case 4: return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-4';
        default: return 'grid-cols-1';
      }
    };
    
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-center mb-4">{data.question}</h3>
        
        {data.multiSelect && (
          <p className="text-sm text-center text-gray-600 mb-4">
            Selecione {data.multiSelect} {data.multiSelect === 1 ? 'opção' : 'opções'}
          </p>
        )}
        
        <div className={cn("grid gap-4", getGridClass())}>
          {(data.options || []).map((option: string, index: number) => {
            const optionImage = data.optionImages && data.optionImages[index];
            const styleCategory = data.optionStyleCategories && data.optionStyleCategories[index];
            
            return (
              <div key={index} className="border rounded-md overflow-hidden hover:shadow-md transition-shadow">
                {isImageOption && optionImage && (
                  <div className={cn("w-full overflow-hidden", getImageSizeClass(imageSize))}>
                    <img 
                      src={optionImage} 
                      alt={`Opção ${index + 1}`} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-3">
                  <div className="flex items-start">
                    <div className="h-5 w-5 rounded-full border-2 border-[#B89B7A] flex-shrink-0 mr-3 mt-0.5"></div>
                    <div>
                      <p>{option}</p>
                      {styleCategory && <span className="text-xs text-gray-500">({styleCategory})</span>}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
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
      className={cn("relative rounded-md overflow-hidden", isEditing && "border-2 border-[#B89B7A]")}
      style={containerStyles}
    >
      {isEditing && (
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
