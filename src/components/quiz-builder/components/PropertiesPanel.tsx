import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { QuizComponentData, QuizStage } from '@/types/quizBuilder';
import { X } from 'lucide-react';

interface PropertiesPanelProps {
  component: QuizComponentData | null;
  stage: QuizStage | null;
  onClose: () => void;
  onUpdate: (id: string, updates: Partial<QuizComponentData>) => void;
  onUpdateStage: (id: string, updates: Partial<QuizStage>) => void;
  onDelete: (id: string) => void;
}

export const PropertiesPanel: React.FC<PropertiesPanelProps> = ({
  component,
  stage,
  onClose,
  onUpdate,
  onUpdateStage,
  onDelete
}) => {
  if (!component && !stage) {
    return (
      <div className="h-full flex flex-col border-l">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="font-semibold">Propriedades</h2>
        </div>
        
        <div className="flex items-center justify-center h-full p-4 text-center">
          <p className="text-gray-500">
            Selecione um componente ou uma etapa para editar suas propriedades
          </p>
        </div>
      </div>
    );
  }

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: string) => {
    if (component) {
      onUpdate(component.id, { 
        data: { ...component.data, [field]: e.target.value } 
      });
    }
  };

  const handleStyleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>, 
    field: string
  ) => {
    if (component) {
      onUpdate(component.id, { 
        style: { ...component.style, [field]: e.target.value } 
      });
    }
  };

  const handleDeleteComponent = () => {
    if (component) {
      onDelete(component.id);
      onClose();
    }
  };

  const renderComponentProperties = () => {
    if (!component) return null;

    switch (component.type) {
      case 'header':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                value={component.data.title || ''}
                onChange={(e) => handleTextChange(e, 'title')}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subtítulo</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                value={component.data.subtitle || ''}
                onChange={(e) => handleTextChange(e, 'subtitle')}
              />
            </div>
          </div>
        );
      case 'text':
      case 'headline':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Texto</label>
              <textarea
                className="w-full p-2 border rounded-md"
                rows={5}
                value={component.data.text || ''}
                onChange={(e) => handleTextChange(e, 'text')}
              />
            </div>
          </div>
        );
      case 'image':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">URL da Imagem</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                value={component.data.imageUrl || ''}
                onChange={(e) => handleTextChange(e, 'imageUrl')}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Texto Alternativo</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                value={component.data.alt || ''}
                onChange={(e) => handleTextChange(e, 'alt')}
              />
            </div>
          </div>
        );
      case 'multipleChoice':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Pergunta</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                value={component.data.question || ''}
                onChange={(e) => handleTextChange(e, 'question')}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Número mínimo de seleções</label>
              <input
                type="number"
                className="w-full p-2 border rounded-md"
                value={component.data.minSelections || 1}
                onChange={(e) => handleTextChange(e, 'minSelections')}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Número máximo de seleções</label>
              <input
                type="number"
                className="w-full p-2 border rounded-md"
                value={component.data.maxSelections || 1}
                onChange={(e) => handleTextChange(e, 'maxSelections')}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de exibição</label>
              <select
                className="w-full p-2 border rounded-md"
                value={component.data.displayType || 'text'}
                onChange={(e) => handleTextChange(e, 'displayType')}
              >
                <option value="text">Apenas texto</option>
                <option value="image">Apenas imagem</option>
                <option value="both">Texto e imagem</option>
              </select>
            </div>
          </div>
        );
      default:
        return <p className="italic text-gray-500">Propriedades não disponíveis para este tipo de componente.</p>;
    }
  };

  const renderStyleProperties = () => {
    if (!component || !component.style) return null;

    return (
      <div className="space-y-4 mt-6">
        <h3 className="font-medium text-sm text-gray-700">Estilos</h3>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Cor de fundo</label>
          <input
            type="color"
            className="w-10 h-10 p-1 border rounded-md"
            value={component.style.backgroundColor || '#ffffff'}
            onChange={(e) => handleStyleChange(e, 'backgroundColor')}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Cor do texto</label>
          <input
            type="color"
            className="w-10 h-10 p-1 border rounded-md"
            value={component.style.textColor || '#000000'}
            onChange={(e) => handleStyleChange(e, 'textColor')}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Raio da borda</label>
          <input
            type="number"
            className="w-full p-2 border rounded-md"
            value={component.style.borderRadius || '0'}
            onChange={(e) => handleStyleChange(e, 'borderRadius')}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Espaçamento vertical (px)</label>
          <input
            type="number"
            className="w-full p-2 border rounded-md"
            value={component.style.paddingY || '16'}
            onChange={(e) => handleStyleChange(e, 'paddingY')}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Espaçamento horizontal (px)</label>
          <input
            type="number"
            className="w-full p-2 border rounded-md"
            value={component.style.paddingX || '16'}
            onChange={(e) => handleStyleChange(e, 'paddingX')}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col border-l">
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="font-semibold">Propriedades</h2>
        <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-4">
          {component && (
            <>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">{component.type}</h3>
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={handleDeleteComponent}
                >
                  Excluir
                </Button>
              </div>
              {renderComponentProperties()}
              {renderStyleProperties()}
            </>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};
