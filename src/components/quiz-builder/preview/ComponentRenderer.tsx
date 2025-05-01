
import React from 'react';
import { QuizComponentData } from '@/types/quizBuilder';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card } from '@/components/ui/card';
import { GripVertical, Image, Type, CheckSquare, CircleCheck, PencilLine } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ComponentRendererProps {
  component: QuizComponentData;
  isSelected: boolean;
  onSelect: () => void;
  onMove: (draggedId: string, targetId: string) => void;
  isPreviewing: boolean;
  isActive?: boolean;
  isOver?: boolean;
}

const ComponentTypeIcon = ({ type }: { type: QuizComponentData['type'] }) => {
  switch(type) {
    case 'stageCover':
      return <Type className="h-4 w-4" />;
    case 'stageQuestion':
      return <CheckSquare className="h-4 w-4" />;
    case 'stageResult':
      return <CircleCheck className="h-4 w-4" />;
    case 'text':
      return <PencilLine className="h-4 w-4" />;
    case 'image':
      return <Image className="h-4 w-4" />;
    default:
      return <Type className="h-4 w-4" />;
  }
};

const ComponentRenderer: React.FC<ComponentRendererProps> = ({
  component,
  isSelected,
  onSelect,
  onMove,
  isPreviewing,
  isActive = false,
  isOver = false
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({
    id: component.id
  });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };
  
  // Apply custom styles from the component data
  const customStyle = {
    backgroundColor: component.data.backgroundColor || '',
    color: component.data.textColor || '',
    padding: `${component.data.paddingY || 16}px ${component.data.paddingX || 16}px`,
    borderRadius: `${component.data.borderRadius || 8}px`,
    ...(component.style || {}),
  };
  
  // Generate component type label
  const getComponentTypeLabel = () => {
    switch(component.type) {
      case 'stageCover':
        return 'Capa';
      case 'stageQuestion':
        return 'Pergunta';
      case 'stageResult':
        return 'Resultado';
      case 'text':
        return 'Texto';
      case 'image':
        return 'Imagem';
      default:
        return component.type;
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "relative mb-2 transition-all duration-150",
        isActive && "z-10",
        isOver && "opacity-70"
      )}
    >
      <Card 
        className={cn(
          "border overflow-hidden",
          isSelected && !isPreviewing && "ring-2 ring-[#B89B7A]",
          isPreviewing && "pointer-events-none"
        )}
        onClick={() => !isPreviewing && onSelect()}
      >
        {!isPreviewing && (
          <div className="flex items-center justify-between p-2 border-b bg-[#FAF9F7] text-xs text-[#8F7A6A]">
            <div className="flex items-center">
              <div 
                className="cursor-grab mr-2"
                {...attributes}
                {...listeners}
              >
                <GripVertical className="h-4 w-4" />
              </div>
              <div className="flex items-center">
                <ComponentTypeIcon type={component.type} />
                <span className="ml-2">{getComponentTypeLabel()}</span>
              </div>
            </div>
          </div>
        )}
        
        <div style={customStyle} className="p-4">
          {component.type === 'stageCover' && (
            <div className="flex flex-col items-center text-center">
              {component.data.imageUrl && (
                <img 
                  src={component.data.imageUrl} 
                  alt={component.data.alt || 'Quiz cover'} 
                  className="mb-4 max-h-32 object-contain"
                />
              )}
              <h2 className="text-xl font-medium mb-2">{component.data.title || 'Título do Quiz'}</h2>
              <p className="mb-4">{component.data.subtitle || 'Descrição do quiz'}</p>
              <button className="px-4 py-2 bg-[#B89B7A] text-white rounded">
                {component.data.buttonText || 'Iniciar Quiz'}
              </button>
            </div>
          )}
          
          {component.type === 'stageQuestion' && (
            <div>
              <h3 className="text-lg font-medium mb-4">{component.data.question || 'Pergunta do Quiz'}</h3>
              
              <div className={cn(
                "grid gap-3",
                component.data.layout?.columns === 2 && "grid-cols-1 md:grid-cols-2",
                component.data.layout?.columns === 3 && "grid-cols-1 md:grid-cols-3",
                component.data.layout?.columns === 4 && "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
                !component.data.layout?.columns && "grid-cols-1"
              )}>
                {(component.data.options || []).map((option, index) => {
                  const optionImage = (component.data.optionImages || [])[index];
                  
                  return (
                    <div 
                      key={index} 
                      className={cn(
                        "border rounded-lg p-3 transition-all",
                        component.data.selectionIndicator === 'border' && "border-2",
                        component.data.selectionIndicator === 'checkbox' && "flex items-start",
                        component.data.selectionIndicator === 'highlight' && "hover:bg-[#F0EBE4]"
                      )}
                    >
                      {component.data.selectionIndicator === 'checkbox' && (
                        <div className="w-5 h-5 border-2 border-[#B89B7A] rounded-sm mr-3 mt-0.5 flex-shrink-0" />
                      )}
                      
                      <div>
                        {(component.data.displayType === 'image' || component.data.displayType === 'both') && optionImage && (
                          <div className="mb-2">
                            <img 
                              src={optionImage} 
                              alt={`Option ${index + 1}`}
                              className={cn(
                                "object-cover rounded mx-auto",
                                component.data.imageSize === 'small' ? "h-24" : 
                                component.data.imageSize === 'large' ? "h-48" : "h-32"
                              )}
                            />
                          </div>
                        )}
                        
                        {(component.data.displayType === 'text' || component.data.displayType === 'both') && (
                          <div>{option}</div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          
          {component.type === 'stageResult' && (
            <div className="text-center">
              <h3 className="text-xl font-medium mb-4">{component.data.title || 'Seu Resultado'}</h3>
              
              <div className="mb-6">
                <div className="font-medium mb-2" style={{color: component.data.accentColor || '#B89B7A'}}>
                  {component.data.primaryStyleTitle || 'Seu Estilo Predominante'}
                </div>
                
                <div className="bg-white p-4 border rounded-lg mb-4">
                  <div className="flex justify-between">
                    <span className="font-medium">Elegante</span>
                    {component.data.showPercentages && <span>65%</span>}
                  </div>
                  
                  {component.data.showDescriptions && (
                    <p className="mt-2 text-sm opacity-80">
                      O estilo elegante valoriza peças clássicas e atemporais, com linhas limpas e acabamentos refinados.
                    </p>
                  )}
                </div>
                
                {component.data.showDescriptions && (
                  <div>
                    <div className="font-medium mb-2">
                      {component.data.secondaryStylesTitle || 'Estilos Complementares'}
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between bg-white/60 border p-3 rounded-lg">
                        <span>Clássico</span>
                        {component.data.showPercentages && <span>20%</span>}
                      </div>
                      <div className="flex justify-between bg-white/60 border p-3 rounded-lg">
                        <span>Natural</span>
                        {component.data.showPercentages && <span>15%</span>}
                      </div>
                    </div>
                  </div>
                )}
                
                <button 
                  className="mt-6 px-6 py-2 rounded"
                  style={{
                    backgroundColor: component.data.accentColor || '#B89B7A',
                    color: 'white'
                  }}
                >
                  {component.data.callToActionText || 'Ver Recomendações'}
                </button>
              </div>
            </div>
          )}
          
          {component.type === 'text' && (
            <div>
              {component.data.title && <h3 className="font-medium mb-2">{component.data.title}</h3>}
              <p>{component.data.text || 'Conteúdo do texto'}</p>
            </div>
          )}
          
          {component.type === 'image' && (
            <div className="text-center">
              {component.data.imageUrl ? (
                <img 
                  src={component.data.imageUrl}
                  alt={component.data.alt || 'Image'}
                  className={cn(
                    "mx-auto object-contain",
                    component.data.imageSize === 'small' ? "max-h-32" : 
                    component.data.imageSize === 'large' ? "max-h-96" : 
                    component.data.imageSize === 'full' ? "w-full" : "max-h-64"
                  )}
                />
              ) : (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 flex items-center justify-center">
                  <Image className="h-8 w-8 text-gray-300" />
                </div>
              )}
              {component.data.title && (
                <p className="mt-2 text-sm opacity-80">{component.data.title}</p>
              )}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default ComponentRenderer;
