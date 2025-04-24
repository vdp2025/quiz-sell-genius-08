
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Trash2, Image, Plus } from 'lucide-react';

interface QuizOptionEditorProps {
  option: {
    text: string;
    imageUrl?: string;
    styleCategory?: string;
  };
  index: number;
  onUpdate: (index: number, field: string, value: string) => void;
  onRemove: (index: number) => void;
  showImage?: boolean;
}

const QuizOptionEditor: React.FC<QuizOptionEditorProps> = ({
  option,
  index,
  onUpdate,
  onRemove,
  showImage = false
}) => {
  return (
    <div className="space-y-4 p-4 border border-[#B89B7A]/20 rounded-lg">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium">Opção {index + 1}</Label>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => onRemove(index)}
          className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor={`option-text-${index}`}>Texto</Label>
          <Input
            id={`option-text-${index}`}
            value={option.text}
            onChange={(e) => onUpdate(index, 'text', e.target.value)}
            placeholder="Digite o texto da opção"
          />
        </div>

        {showImage && (
          <div className="space-y-2">
            <Label htmlFor={`option-image-${index}`}>Imagem</Label>
            <div className="flex gap-2">
              <Input
                id={`option-image-${index}`}
                value={option.imageUrl || ''}
                onChange={(e) => onUpdate(index, 'imageUrl', e.target.value)}
                placeholder="URL da imagem"
              />
              <Button variant="outline" size="icon" className="shrink-0">
                <Image className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor={`option-category-${index}`}>Categoria de Estilo</Label>
          <Input
            id={`option-category-${index}`}
            value={option.styleCategory || ''}
            onChange={(e) => onUpdate(index, 'styleCategory', e.target.value)}
            placeholder="Categoria de estilo"
          />
        </div>
      </div>
    </div>
  );
};

export default QuizOptionEditor;
