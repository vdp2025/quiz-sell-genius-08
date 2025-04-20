
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Eye, Monitor, Smartphone, MoveVertical } from 'lucide-react';
import { cn } from '@/lib/utils';
import { QuizComponentData } from '@/types/quizBuilder';
import { ComponentRenderer } from './ComponentRenderer';

interface PreviewPanelProps {
  components: QuizComponentData[];
  selectedComponentId: string | null;
  onSelectComponent: (id: string | null) => void;
  onMoveComponent: (draggedId: string, targetId: string) => void;
}

export const PreviewPanel: React.FC<PreviewPanelProps> = ({
  components,
  selectedComponentId,
  onSelectComponent,
  onMoveComponent,
}) => {
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [isPreviewing, setIsPreviewing] = useState(false);
  
  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData('componentId', id);
  };
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };
  
  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    const draggedId = e.dataTransfer.getData('componentId');
    if (draggedId && draggedId !== targetId) {
      onMoveComponent(draggedId, targetId);
    }
  };

  return (
    <div className="h-full flex flex-col bg-[#FAF9F7]">
      <div className="p-4 border-b bg-white flex items-center justify-between">
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setViewMode('desktop')}
            className={cn(viewMode === 'desktop' ? 'bg-[#FAF9F7]' : '')}
          >
            <Monitor className="w-4 h-4 mr-2" />
            Desktop
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setViewMode('mobile')}
            className={cn(viewMode === 'mobile' ? 'bg-[#FAF9F7]' : '')}
          >
            <Smartphone className="w-4 h-4 mr-2" />
            Mobile
          </Button>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsPreviewing(!isPreviewing)}
        >
          <Eye className="w-4 h-4 mr-2" />
          {isPreviewing ? 'Editar' : 'Visualizar'}
        </Button>
      </div>
      
      <div className="flex-1 overflow-auto p-4">
        <div 
          className={cn(
            "min-h-full bg-white rounded-lg shadow-sm p-6",
            viewMode === 'mobile' && 'max-w-sm mx-auto'
          )}
        >
          {components.length === 0 ? (
            <div className="text-center p-8 text-[#8F7A6A] border-2 border-dashed border-[#B89B7A]/40 rounded-lg">
              <p className="mb-4">Adicione componentes do menu lateral para começar a construir seu quiz</p>
            </div>
          ) : (
            <div className="space-y-6">
              {isPreviewing ? (
                // Preview mode - display without edit controls
                <div className="animate-fade-in">
                  {components.map((component) => (
                    <div key={component.id} className="mb-6">
                      <ComponentRenderer 
                        component={component} 
                        isPreview={true}
                        isSelected={false}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                // Edit mode - display with controls
                components.map((component) => (
                  <div 
                    key={component.id} 
                    className={cn(
                      "relative transition-all border-2 rounded-lg p-2",
                      selectedComponentId === component.id 
                        ? "border-blue-500" 
                        : "border-transparent hover:border-gray-200"
                    )}
                    onClick={() => onSelectComponent(component.id)}
                    draggable={true}
                    onDragStart={(e) => handleDragStart(e, component.id)}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, component.id)}
                  >
                    <div className="absolute -left-3 top-1/2 transform -translate-y-1/2 cursor-move opacity-50 hover:opacity-100 bg-white p-1 rounded-full shadow">
                      <MoveVertical className="w-4 h-4 text-[#8F7A6A]" />
                    </div>
                    <ComponentRenderer 
                      component={component} 
                      isPreview={false}
                      isSelected={selectedComponentId === component.id}
                    />
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
