
import React from 'react';
import { QuizComponentData, QuizStage } from '@/types/quizBuilder';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Monitor, Smartphone, Tablet } from 'lucide-react';
import ComponentRenderer from './ComponentRenderer';

interface TypeformPreviewPanelProps {
  components: QuizComponentData[];
  activeStage: QuizStage | null;
  selectedComponentId: string | null;
  isPreviewing: boolean;
  onSelectComponent: (id: string) => void;
  onNavigateStage?: (direction: 'prev' | 'next') => void;
  viewportSize?: 'sm' | 'md' | 'lg';
}

export const TypeformPreviewPanel: React.FC<TypeformPreviewPanelProps> = ({
  components,
  activeStage,
  selectedComponentId,
  isPreviewing,
  onSelectComponent,
  onNavigateStage,
  viewportSize = 'md'
}) => {
  if (!activeStage) {
    return (
      <div className="h-full flex justify-center items-center text-[#8F7A6A]">
        Selecione uma etapa para visualizar
      </div>
    );
  }

  const sortedComponents = [...components].sort((a, b) => a.order - b.order);

  // Determine preview width based on viewport size
  const getViewportWidth = () => {
    switch (viewportSize) {
      case 'sm': return 'max-w-sm'; // Mobile
      case 'lg': return 'max-w-4xl'; // Desktop
      default: return 'max-w-2xl'; // Tablet (default)
    }
  };

  // Get icon for viewport size
  const getViewportIcon = () => {
    switch (viewportSize) {
      case 'sm': return <Smartphone className="h-4 w-4" />;
      case 'lg': return <Monitor className="h-4 w-4" />;
      default: return <Tablet className="h-4 w-4" />;
    }
  };

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
          <div className="flex-1 text-center text-sm font-medium flex items-center justify-center gap-2">
            {getViewportIcon()}
            <span>{activeStage.title}</span>
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
        <div className={`${getViewportWidth()} mx-auto`}>
          {sortedComponents.length === 0 ? (
            <Card className="p-8 border-2 border-dashed text-center">
              <p className="text-[#8F7A6A] mb-4">
                {activeStage.type === 'cover' ? 'Adicione uma capa para iniciar seu quiz' :
                 activeStage.type === 'question' ? 'Adicione uma pergunta para esta etapa' :
                 activeStage.type === 'result' ? 'Adicione um componente de resultado' :
                 'Adicione uma pergunta estratégica'}
              </p>
            </Card>
          ) : (
            <div className="space-y-2">
              {sortedComponents.map(component => (
                <ComponentRenderer
                  key={component.id}
                  component={component}
                  isSelected={component.id === selectedComponentId}
                  onSelect={() => onSelectComponent(component.id)}
                  onMove={() => {}} // We're not handling drag-n-drop here
                  isPreviewing={isPreviewing}
                />
              ))}
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};
