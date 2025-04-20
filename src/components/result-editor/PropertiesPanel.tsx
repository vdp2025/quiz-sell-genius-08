
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Trash2 } from 'lucide-react';
import { Block } from '@/types/editor';

interface PropertiesPanelProps {
  selectedBlockId: string | null;
  blocks: Block[];
  onClose: () => void;
  onUpdate: (content: any) => void;
  onDelete: () => void;
}

export const PropertiesPanel: React.FC<PropertiesPanelProps> = ({
  selectedBlockId,
  blocks,
  onClose,
  onUpdate,
  onDelete
}) => {
  const selectedBlock = blocks.find(block => block.id === selectedBlockId);

  if (!selectedBlock) {
    return (
      <div className="h-full bg-white border-l border-[#B89B7A]/20 p-6 flex flex-col items-center justify-center text-center">
        <p className="text-[#8F7A6A] mb-4">
          Selecione um bloco para editar suas propriedades
        </p>
        <p className="text-sm text-[#8F7A6A]/70">
          Você pode adicionar novos blocos a partir do painel de componentes
        </p>
      </div>
    );
  }

  return (
    <div className="h-full bg-white border-l border-[#B89B7A]/20 overflow-y-auto">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-[#432818]">
            Propriedades
          </h2>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="text-red-500 border-red-200 hover:bg-red-50"
              onClick={onDelete}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Excluir
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onClose}
            >
              Fechar
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          {selectedBlock.type === 'header' && (
            <>
              <div className="space-y-2">
                <Label htmlFor="title">Título</Label>
                <Input
                  id="title"
                  value={selectedBlock.content.title || ''}
                  onChange={(e) => onUpdate({ title: e.target.value })}
                  placeholder="Título do cabeçalho"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subtitle">Subtítulo</Label>
                <Input
                  id="subtitle"
                  value={selectedBlock.content.subtitle || ''}
                  onChange={(e) => onUpdate({ subtitle: e.target.value })}
                  placeholder="Subtítulo opcional"
                />
              </div>
            </>
          )}

          {selectedBlock.type === 'headline' && (
            <>
              <div className="space-y-2">
                <Label htmlFor="title">Título</Label>
                <Input
                  id="title"
                  value={selectedBlock.content.title || ''}
                  onChange={(e) => onUpdate({ title: e.target.value })}
                  placeholder="Título principal"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subtitle">Subtítulo</Label>
                <Input
                  id="subtitle"
                  value={selectedBlock.content.subtitle || ''}
                  onChange={(e) => onUpdate({ subtitle: e.target.value })}
                  placeholder="Subtítulo opcional"
                />
              </div>
            </>
          )}

          {selectedBlock.type === 'text' && (
            <div className="space-y-2">
              <Label htmlFor="text">Texto</Label>
              <Textarea
                id="text"
                value={selectedBlock.content.text || ''}
                onChange={(e) => onUpdate({ text: e.target.value })}
                placeholder="Digite seu texto aqui"
                rows={5}
              />
            </div>
          )}

          {selectedBlock.type === 'style-result' && (
            <>
              <div className="space-y-2">
                <Label htmlFor="description">Descrição do Estilo</Label>
                <Textarea
                  id="description"
                  value={selectedBlock.content.description || ''}
                  onChange={(e) => onUpdate({ description: e.target.value })}
                  placeholder="Descrição personalizada do estilo"
                  rows={5}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="customImage">URL da Imagem</Label>
                <Input
                  id="customImage"
                  value={selectedBlock.content.customImage || ''}
                  onChange={(e) => onUpdate({ customImage: e.target.value })}
                  placeholder="https://exemplo.com/imagem.jpg"
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
