
import React, { useState } from 'react';
import { Plus, Layout, Type, Image, ListChecks, FileQuestion, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { QuizStage, QuizComponentType } from '@/types/quizBuilder';
import { cn } from '@/lib/utils';

interface ComponentToolbarProps {
  activeStage: QuizStage | null;
  onComponentSelect: (type: string) => void;
  isPreviewing: boolean;
}

export const ComponentToolbar: React.FC<ComponentToolbarProps> = ({
  activeStage,
  onComponentSelect,
  isPreviewing
}) => {
  const [open, setOpen] = useState(false);

  const componentTypes = [
    { type: 'header', label: 'Cabeçalho', icon: Layout },
    { type: 'headline', label: 'Título', icon: Type },
    { type: 'text', label: 'Texto/Parágrafo', icon: Type },
    { type: 'image', label: 'Imagem', icon: Image },
    { type: 'multipleChoice', label: 'Múltipla Escolha', icon: ListChecks },
    { type: 'singleChoice', label: 'Escolha Única', icon: FileQuestion },
  ];

  const handleComponentSelect = (type: QuizComponentType) => {
    onComponentSelect(type);
    setOpen(false);
  };

  if (!activeStage) {
    return (
      <div className="p-4 border-b bg-[#2A2D36] text-white flex items-center justify-between">
        <div>
          <span className="text-gray-400">Selecione uma etapa para começar</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 border-b border-[#333333] bg-[#2A2D36] flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button 
              variant="outline" 
              className="bg-[#333333] border-[#444444] hover:bg-[#444444] text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Componente
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-56 p-0 bg-[#333333] border-[#444444]" align="start">
            <div className="grid gap-1 p-2">
              {componentTypes.map((component) => (
                <Button
                  key={component.type}
                  variant="ghost"
                  className="w-full justify-start text-white hover:bg-[#444444]"
                  onClick={() => handleComponentSelect(component.type as QuizComponentType)}
                >
                  <component.icon className="w-4 h-4 mr-2" />
                  <span>{component.label}</span>
                </Button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          className={cn(
            "border-[#444444] hover:bg-[#444444]",
            isPreviewing ? "bg-[#333333] text-white" : "bg-[#333333] text-gray-400"
          )}
          onClick={() => {/* Toggle preview mode */}}
        >
          {isPreviewing ? (
            <>
              <EyeOff className="w-4 h-4 mr-2" />
              Editar
            </>
          ) : (
            <>
              <Eye className="w-4 h-4 mr-2" />
              Visualizar
            </>
          )}
        </Button>
      </div>
    </div>
  );
};
