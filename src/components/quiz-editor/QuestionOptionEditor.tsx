
import React from 'react';
import { QuizOption } from '@/types/quiz';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import ImageUploader from './ImageUploader';

interface QuestionOptionEditorProps {
  option: QuizOption;
  questionType: 'text' | 'image' | 'both';
  onUpdate: (option: QuizOption) => void;
  onDelete: () => void;
  index: number;
}

const styleCategories = [
  { value: 'Natural', label: 'Natural' },
  { value: 'Clássico', label: 'Clássico' },
  { value: 'Contemporâneo', label: 'Contemporâneo' },
  { value: 'Elegante', label: 'Elegante' },
  { value: 'Romântico', label: 'Romântico' },
  { value: 'Sexy', label: 'Sexy' },
  { value: 'Dramático', label: 'Dramático' },
  { value: 'Criativo', label: 'Criativo' }
];

const QuestionOptionEditor: React.FC<QuestionOptionEditorProps> = ({
  option,
  questionType,
  onUpdate,
  onDelete,
  index
}) => {
  const handleChange = (field: keyof QuizOption, value: any) => {
    onUpdate({
      ...option,
      [field]: value
    });
  };

  const letterOptions = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const letter = index < letterOptions.length ? letterOptions[index] : `#${index + 1}`;

  return (
    <Card className="shadow-sm border-[#B89B7A]/20">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="bg-[#B89B7A] text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
            {letter}
          </div>
          
          <div className="grid gap-4 flex-1">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <Label htmlFor={`option-text-${option.id}`}>Texto da opção</Label>
                <Input
                  id={`option-text-${option.id}`}
                  value={option.text}
                  onChange={(e) => handleChange('text', e.target.value)}
                  placeholder="Digite o texto da opção"
                />
              </div>
              
              <div>
                <Label htmlFor={`option-category-${option.id}`}>Categoria de Estilo</Label>
                <Select
                  value={option.styleCategory}
                  onValueChange={(value: any) => handleChange('styleCategory', value)}
                >
                  <SelectTrigger id={`option-category-${option.id}`}>
                    <SelectValue placeholder="Selecione a categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {styleCategories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {(questionType === 'image' || questionType === 'both') && (
              <div>
                <Label>Imagem da opção</Label>
                <ImageUploader
                  imageUrl={option.imageUrl}
                  onImageUpload={(url) => handleChange('imageUrl', url)}
                  onImageRemove={() => handleChange('imageUrl', undefined)}
                />
              </div>
            )}
            
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Label htmlFor={`option-points-${option.id}`} className="mb-0">Pontos:</Label>
                <Select
                  value={String(option.points)}
                  onValueChange={(value) => handleChange('points', parseInt(value))}
                >
                  <SelectTrigger id={`option-points-${option.id}`} className="w-16">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[0, 1, 2, 3, 4, 5].map((value) => (
                      <SelectItem key={value} value={String(value)}>
                        {value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <Button 
                type="button" 
                variant="ghost" 
                onClick={onDelete}
                className="text-red-500 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuestionOptionEditor;
