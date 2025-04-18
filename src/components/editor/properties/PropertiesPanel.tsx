
import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EditorBlock, EditableContent } from '@/types/editor';

interface PropertiesPanelProps {
  selectedComponentId: string | null;
  onClose: () => void;
  onUpdate?: (content: Partial<EditableContent>) => void;
  onDelete?: () => void;
  blocks?: EditorBlock[];
}

const PropertiesPanel = ({ 
  selectedComponentId, 
  onClose, 
  onUpdate,
  onDelete,
  blocks 
}: PropertiesPanelProps) => {
  const selectedBlock = blocks?.find(block => block.id === selectedComponentId);

  if (!selectedComponentId || !selectedBlock) {
    return (
      <div className="h-full p-4 bg-white">
        <div className="flex justify-between items-center border-b pb-4 mb-4">
          <h2 className="text-lg font-playfair text-[#432818]">Propriedades</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex flex-col items-center justify-center h-64 text-[#8F7A6A] text-sm">
          <p>Selecione um componente para editar suas propriedades</p>
        </div>
      </div>
    );
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate?.({ title: e.target.value });
  };

  const handleAlignmentChange = (alignment: 'left' | 'center' | 'right') => {
    onUpdate?.({ alignment });
  };

  return (
    <div className="h-full p-4 bg-white">
      <div className="flex justify-between items-center border-b pb-4 mb-4">
        <h2 className="text-lg font-playfair text-[#432818]">Propriedades</h2>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </div>
      
      <div className="space-y-4">
        <p className="text-sm text-[#8F7A6A]">
          Editando componente: {selectedBlock.type}
        </p>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-[#432818] block mb-1">
              Título
            </label>
            <input 
              type="text" 
              className="w-full border border-[#B89B7A]/30 rounded-md p-2 text-sm" 
              placeholder="Insira um título"
              value={selectedBlock.content.title || ''}
              onChange={handleTitleChange}
            />
          </div>
          
          <div>
            <label className="text-sm font-medium text-[#432818] block mb-1">
              Alinhamento
            </label>
            <div className="flex space-x-2">
              <Button 
                variant={selectedBlock.content.alignment === 'left' ? 'default' : 'outline'} 
                size="sm" 
                className="flex-1"
                onClick={() => handleAlignmentChange('left')}
              >
                Esquerda
              </Button>
              <Button 
                variant={selectedBlock.content.alignment === 'center' ? 'default' : 'outline'} 
                size="sm" 
                className="flex-1"
                onClick={() => handleAlignmentChange('center')}
              >
                Centro
              </Button>
              <Button 
                variant={selectedBlock.content.alignment === 'right' ? 'default' : 'outline'} 
                size="sm" 
                className="flex-1"
                onClick={() => handleAlignmentChange('right')}
              >
                Direita
              </Button>
            </div>
          </div>

          {/* Add more property fields based on block type */}
          {selectedBlock.type === 'text' && (
            <div>
              <label className="text-sm font-medium text-[#432818] block mb-1">
                Texto
              </label>
              <textarea 
                className="w-full border border-[#B89B7A]/30 rounded-md p-2 text-sm" 
                placeholder="Insira o texto"
                value={selectedBlock.content.text || ''}
                onChange={(e) => onUpdate?.({ text: e.target.value })}
                rows={4}
              />
            </div>
          )}

          {/* Delete button */}
          <div className="pt-4 border-t mt-6">
            <Button 
              variant="destructive" 
              size="sm" 
              className="w-full"
              onClick={onDelete}
            >
              Excluir Componente
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertiesPanel;
