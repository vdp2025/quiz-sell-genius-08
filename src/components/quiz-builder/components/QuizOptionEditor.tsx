
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Trash } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface QuizOptionEditorProps {
  option: {
    id: string;
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
  showImage = true
}) => {
  const styleOptions = [
    'Natural',
    'Clássico',
    'Contemporâneo',
    'Elegante',
    'Romântico',
    'Sexy',
    'Dramático',
    'Criativo'
  ];
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        onUpdate(index, 'imageUrl', result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <div className="flex items-start justify-between mb-3">
        <span className="bg-[#B89B7A]/20 text-[#432818] text-xs px-2 py-1 rounded">
          Opção {index + 1}
        </span>
        
        <Button 
          variant="ghost" 
          size="sm"
          className="text-red-500 hover:text-red-700 hover:bg-red-50"
          onClick={() => onRemove(index)}
        >
          <Trash className="w-4 h-4" />
        </Button>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1">Texto</label>
          <Input
            value={option.text || ''}
            onChange={(e) => onUpdate(index, 'text', e.target.value)}
            placeholder="Texto da opção"
          />
        </div>
        
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1">Categoria de Estilo</label>
          <Select
            value={option.styleCategory || 'Natural'}
            onValueChange={(value) => onUpdate(index, 'styleCategory', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione o estilo" />
            </SelectTrigger>
            <SelectContent>
              {styleOptions.map(style => (
                <SelectItem key={style} value={style}>{style}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {showImage && (
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Imagem</label>
            
            {option.imageUrl ? (
              <div className="mb-2">
                <AspectRatio ratio={4/3} className="bg-gray-100 rounded-md overflow-hidden">
                  <img 
                    src={option.imageUrl} 
                    alt={option.text} 
                    className="w-full h-full object-cover"
                  />
                </AspectRatio>
                <div className="flex justify-end mt-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-red-500 hover:text-red-700"
                    onClick={() => onUpdate(index, 'imageUrl', '')}
                  >
                    Remover Imagem
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md h-36 bg-gray-50">
                <div className="space-y-1 text-center">
                  <div className="text-sm text-gray-600">
                    <label className="cursor-pointer bg-[#B89B7A] text-white px-3 py-2 rounded-md hover:bg-[#A38A69] transition-colors">
                      Upload de Imagem
                      <input 
                        type="file" 
                        className="hidden" 
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                    </label>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF (máx. 2MB)</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizOptionEditor;
