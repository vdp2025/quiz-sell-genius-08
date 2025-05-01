
import React from 'react';
import { QuizComponentData, QuizStage } from '@/types/quizBuilder';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface TypeformPreviewPanelProps {
  components: QuizComponentData[];
  activeStage: QuizStage | null;
  selectedComponentId: string | null;
  isPreviewing: boolean;
  onSelectComponent: (id: string) => void;
  onNavigateStage?: (direction: 'prev' | 'next') => void;
}

export const TypeformPreviewPanel: React.FC<TypeformPreviewPanelProps> = ({
  components,
  activeStage,
  selectedComponentId,
  isPreviewing,
  onSelectComponent,
  onNavigateStage
}) => {
  if (!activeStage) {
    return (
      <div className="h-full flex justify-center items-center text-[#8F7A6A]">
        Selecione uma etapa para visualizar
      </div>
    );
  }

  const sortedComponents = [...components].sort((a, b) => a.order - b.order);

  return (
    <div className="h-full flex flex-col bg-[#FAF9F7]">
      {/* Navigation Bar */}
      {isPreviewing && (
        <div className="bg-white p-3 border-b flex justify-between items-center">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onNavigateStage && onNavigateStage('prev')}
            disabled={!onNavigateStage}
          >
            <ArrowLeft className="h-4 w-4 mr-1" /> Anterior
          </Button>
          <div className="flex-1 text-center text-sm font-medium">
            {activeStage.title}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onNavigateStage && onNavigateStage('next')}
            disabled={!onNavigateStage}
          >
            Próxima <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      )}

      {/* Content Area */}
      <ScrollArea className="flex-1 p-4">
        <div className="max-w-4xl mx-auto">
          {activeStage.type === 'cover' && (
            <CoverStagePreview 
              components={sortedComponents}
              selectedComponentId={selectedComponentId}
              isPreviewing={isPreviewing}
              onSelectComponent={onSelectComponent}
            />
          )}

          {activeStage.type === 'question' && (
            <QuestionStagePreview 
              components={sortedComponents}
              selectedComponentId={selectedComponentId}
              isPreviewing={isPreviewing}
              onSelectComponent={onSelectComponent}
            />
          )}

          {activeStage.type === 'result' && (
            <ResultStagePreview 
              components={sortedComponents}
              selectedComponentId={selectedComponentId}
              isPreviewing={isPreviewing}
              onSelectComponent={onSelectComponent}
            />
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

const CoverStagePreview: React.FC<{
  components: QuizComponentData[];
  selectedComponentId: string | null;
  isPreviewing: boolean;
  onSelectComponent: (id: string) => void;
}> = ({ components, selectedComponentId, isPreviewing, onSelectComponent }) => {
  const coverComponent = components.find(c => c.type === 'stageCover');

  if (!coverComponent) {
    return <div className="text-center text-[#8F7A6A] my-10">Nenhum componente de capa encontrado</div>;
  }

  const data = coverComponent.data;
  
  const containerStyle = {
    backgroundColor: data.backgroundColor || '#FAF9F7',
    color: data.textColor || '#432818',
    borderRadius: `${data.borderRadius || 8}px`,
    padding: `${data.paddingY || 16}px ${data.paddingX || 16}px`
  };

  const handleClick = () => {
    if (!isPreviewing) {
      onSelectComponent(coverComponent.id);
    }
  };

  const isSelected = selectedComponentId === coverComponent.id;

  return (
    <Card 
      className={`mb-4 transition-all ${isSelected ? 'ring-2 ring-[#B89B7A]' : ''} ${isPreviewing ? '' : 'cursor-pointer hover:shadow-md'}`}
      style={containerStyle}
      onClick={handleClick}
    >
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
        {data.imageUrl && (
          <div className="mb-6">
            <img 
              src={data.imageUrl} 
              alt="Capa do Quiz" 
              className="max-h-[200px] object-contain"
            />
          </div>
        )}
        
        <h1 className="text-3xl font-medium mb-4">{data.title || 'Título do Quiz'}</h1>
        <p className="text-lg mb-8 opacity-80">{data.subtitle || 'Descrição do Quiz'}</p>
        
        <Button 
          className="px-8 py-2 bg-[#B89B7A] hover:bg-[#A38A69] text-white"
          disabled={isPreviewing}
        >
          {data.buttonText || 'Começar Quiz'}
        </Button>
      </div>
    </Card>
  );
};

const QuestionStagePreview: React.FC<{
  components: QuizComponentData[];
  selectedComponentId: string | null;
  isPreviewing: boolean;
  onSelectComponent: (id: string) => void;
}> = ({ components, selectedComponentId, isPreviewing, onSelectComponent }) => {
  const questionComponent = components.find(c => c.type === 'stageQuestion');

  if (!questionComponent) {
    return <div className="text-center text-[#8F7A6A] my-10">Nenhum componente de pergunta encontrado</div>;
  }

  const data = questionComponent.data;
  
  const containerStyle = {
    backgroundColor: data.backgroundColor || '#FAF9F7',
    color: data.textColor || '#432818',
    borderRadius: `${data.borderRadius || 8}px`,
    padding: `${data.paddingY || 16}px ${data.paddingX || 16}px`
  };

  const handleClick = () => {
    if (!isPreviewing) {
      onSelectComponent(questionComponent.id);
    }
  };

  const isSelected = selectedComponentId === questionComponent.id;

  // Determine grid columns based on layout
  const columns = data.layout?.columns || 1;
  const gridClass = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  }[columns];

  // Determine selection indicator style
  const getSelectionStyle = (option: string, index: number) => {
    const baseStyle = "border rounded-lg p-4 transition-all";
    
    switch (data.selectionIndicator) {
      case 'border':
        return `${baseStyle} border-2 cursor-pointer ${isPreviewing ? 'hover:border-[#B89B7A]' : ''}`;
      case 'checkbox':
        return `${baseStyle} flex items-start cursor-pointer ${isPreviewing ? 'hover:bg-[#FAF9F7]' : ''}`;
      case 'highlight':
        return `${baseStyle} cursor-pointer ${isPreviewing ? 'hover:bg-[#F0EBE4]' : ''}`;
      default:
        return baseStyle;
    }
  };

  return (
    <Card 
      className={`mb-4 transition-all ${isSelected ? 'ring-2 ring-[#B89B7A]' : ''} ${isPreviewing ? '' : 'cursor-pointer hover:shadow-md'}`}
      style={containerStyle}
      onClick={handleClick}
    >
      <div className="min-h-[400px]">
        <h2 className="text-2xl font-medium mb-6">{data.question || 'Pergunta do Quiz'}</h2>
        
        <div className={`grid ${gridClass} gap-4 mt-6`}>
          {(data.options || []).map((option, index) => {
            const optionImage = (data.optionImages || [])[index];
            const displayType = data.displayType || 'text';
            
            return (
              <div 
                key={index} 
                className={getSelectionStyle(option, index)}
              >
                {(displayType === 'image' || displayType === 'both') && optionImage && (
                  <div className="mb-3">
                    <img 
                      src={optionImage} 
                      alt={option} 
                      className={`mx-auto object-cover rounded ${
                        data.imageSize === 'small' ? 'h-24' : 
                        data.imageSize === 'large' ? 'h-48' : 'h-32'
                      }`}
                    />
                  </div>
                )}
                
                {(displayType === 'text' || displayType === 'both') && (
                  <div className={data.selectionIndicator === 'checkbox' ? "ml-2" : ""}>
                    {data.selectionIndicator === 'checkbox' && (
                      <div className="w-5 h-5 border-2 border-[#B89B7A] rounded-sm mr-3 mt-0.5 flex-shrink-0" />
                    )}
                    <span>{option}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
};

const ResultStagePreview: React.FC<{
  components: QuizComponentData[];
  selectedComponentId: string | null;
  isPreviewing: boolean;
  onSelectComponent: (id: string) => void;
}> = ({ components, selectedComponentId, isPreviewing, onSelectComponent }) => {
  const resultComponent = components.find(c => c.type === 'stageResult');

  if (!resultComponent) {
    return <div className="text-center text-[#8F7A6A] my-10">Nenhum componente de resultado encontrado</div>;
  }

  const data = resultComponent.data;
  
  const containerStyle = {
    backgroundColor: data.backgroundColor || '#FAF9F7',
    color: data.textColor || '#432818',
    borderRadius: `${data.borderRadius || 8}px`,
    padding: `${data.paddingY || 16}px ${data.paddingX || 16}px`
  };

  const accentColor = data.accentColor || '#B89B7A';

  const handleClick = () => {
    if (!isPreviewing) {
      onSelectComponent(resultComponent.id);
    }
  };

  const isSelected = selectedComponentId === resultComponent.id;

  return (
    <Card 
      className={`mb-4 transition-all ${isSelected ? 'ring-2 ring-[#B89B7A]' : ''} ${isPreviewing ? '' : 'cursor-pointer hover:shadow-md'}`}
      style={containerStyle}
      onClick={handleClick}
    >
      <div className="min-h-[400px]">
        <h2 className="text-2xl font-medium mb-6 text-center">
          {data.title || 'Seu Resultado de Estilo'}
        </h2>
        
        <div className="mb-8">
          <div className="text-lg font-medium mb-2" style={{ color: accentColor }}>
            {data.primaryStyleTitle || 'Seu Estilo Predominante'}
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="flex justify-between items-center">
              <div className="text-xl font-medium">Elegante</div>
              {data.showPercentages && <div className="text-lg">60%</div>}
            </div>
            
            {data.showDescriptions && (
              <p className="mt-2 text-sm opacity-70">
                O estilo elegante é caracterizado por linhas limpas, cores neutras e
                uma aparência sofisticada e refinada.
              </p>
            )}
          </div>
        </div>
        
        {data.showDescriptions && (
          <div>
            <div className="text-lg font-medium mb-2">
              {data.secondaryStylesTitle || 'Estilos Complementares'}
            </div>
            <div className="space-y-2">
              <div className="bg-white/70 p-3 rounded-lg border flex justify-between">
                <div>Natural</div>
                {data.showPercentages && <div>25%</div>}
              </div>
              <div className="bg-white/70 p-3 rounded-lg border flex justify-between">
                <div>Clássico</div>
                {data.showPercentages && <div>15%</div>}
              </div>
            </div>
          </div>
        )}
        
        <div className="mt-8 flex justify-center">
          <Button 
            className="px-6 py-2"
            style={{ backgroundColor: accentColor, color: 'white' }}
            disabled={isPreviewing}
          >
            {data.callToActionText || 'Ver Recomendações'}
          </Button>
        </div>
      </div>
    </Card>
  );
};
