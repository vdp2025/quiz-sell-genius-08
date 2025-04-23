
import React, { useState } from 'react';
import { QuizQuestion, QuizOption } from '@/types/quiz';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Trash2, Image, Plus, Copy } from 'lucide-react';
import { generateId } from '@/utils/idGenerator';
import { cn } from '@/lib/utils';

interface QuizPropertyPanelProps {
  question: QuizQuestion | null;
  onUpdateQuestion: (id: string, question: QuizQuestion) => void;
  onDeleteQuestion: (id: string) => void;
}

const QuizPropertyPanel: React.FC<QuizPropertyPanelProps> = ({ 
  question, 
  onUpdateQuestion, 
  onDeleteQuestion 
}) => {
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  
  if (!question) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-500">Selecione uma pergunta para editar</p>
      </div>
    );
  }
  
  const handleChange = (field: string, value: any) => {
    onUpdateQuestion(question.id, {
      ...question,
      [field]: value
    });
  };
  
  const handleOptionChange = (optionId: string, field: string, value: any) => {
    const updatedOptions = question.options.map(option =>
      option.id === optionId ? { ...option, [field]: value } : option
    );
    
    onUpdateQuestion(question.id, {
      ...question,
      options: updatedOptions
    });
  };
  
  const handleAddOption = () => {
    const newOption: QuizOption = {
      id: generateId(),
      text: 'Nova Opção',
      styleCategory: 'Natural'
    };
    
    onUpdateQuestion(question.id, {
      ...question,
      options: [...question.options, newOption]
    });
  };
  
  const handleDeleteOption = (optionId: string) => {
    const updatedOptions = question.options.filter(option => option.id !== optionId);
    
    onUpdateQuestion(question.id, {
      ...question,
      options: updatedOptions
    });
  };
  
  const handleDeleteQuestion = () => {
    if (isConfirmingDelete) {
      onDeleteQuestion(question.id);
      setIsConfirmingDelete(false);
    } else {
      setIsConfirmingDelete(true);
    }
  };
  
  const styleCategories = [
    'Natural',
    'Clássico',
    'Contemporâneo',
    'Elegante',
    'Romântico',
    'Sexy',
    'Dramático',
    'Criativo'
  ];
  
  return (
    <div className="p-6">
      <div className="space-y-6">
        {/* Question Basic Properties */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Pergunta</Label>
            <Input
              id="title"
              value={question.title}
              onChange={(e) => handleChange('title', e.target.value)}
              className="mt-1"
            />
          </div>
          
          <div className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="questionType">Tipo</Label>
              <Select 
                value={question.type}
                onValueChange={(value) => handleChange('type', value)}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Tipo da pergunta" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="text">Texto</SelectItem>
                  <SelectItem value="image">Imagem</SelectItem>
                  <SelectItem value="both">Texto e Imagem</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex-1">
              <Label htmlFor="multiSelect">Seleção múltipla</Label>
              <Select 
                value={question.multiSelect.toString()}
                onValueChange={(value) => handleChange('multiSelect', parseInt(value))}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Número de opções" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 opção</SelectItem>
                  <SelectItem value="2">2 opções</SelectItem>
                  <SelectItem value="3">3 opções</SelectItem>
                  <SelectItem value="4">4 opções</SelectItem>
                  <SelectItem value="5">5 opções</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        {/* Options */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <Label>Opções</Label>
            <Button
              variant="outline"
              size="sm"
              onClick={handleAddOption}
              className="text-xs"
            >
              <Plus className="w-3 h-3 mr-1" />
              Adicionar
            </Button>
          </div>
          
          <div className="space-y-4">
            {question.options.map((option, index) => (
              <Card key={option.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Opção {index + 1}</span>
                      <div className="flex space-x-1">
                        {question.type !== 'text' && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 w-7 p-0"
                            onClick={() => {/* Image upload logic */}}
                          >
                            <Image className="w-4 h-4" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 w-7 p-0 text-red-500"
                          onClick={() => handleDeleteOption(option.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    
                    {question.type !== 'image' && (
                      <Textarea
                        value={option.text}
                        onChange={(e) => handleOptionChange(option.id, 'text', e.target.value)}
                        className="mt-1 text-sm mb-3"
                        placeholder="Texto da opção"
                        rows={2}
                      />
                    )}
                    
                    {question.type !== 'text' && option.imageUrl && (
                      <div className="relative mb-3 rounded overflow-hidden">
                        <img 
                          src={option.imageUrl}
                          alt={option.text || `Opção ${index + 1}`}
                          className="w-full h-auto"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          className="absolute top-2 right-2 bg-white"
                          onClick={() => {/* Image upload logic */}}
                        >
                          Trocar
                        </Button>
                      </div>
                    )}
                    
                    {!option.imageUrl && question.type !== 'text' && (
                      <div 
                        className="flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-md mb-3 cursor-pointer hover:bg-gray-50"
                        onClick={() => {/* Image upload logic */}}
                      >
                        <Image className="w-8 h-8 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-500">Adicionar imagem</p>
                      </div>
                    )}
                    
                    <div>
                      <Label htmlFor={`style-${option.id}`} className="text-xs">Categoria de Estilo</Label>
                      <Select 
                        value={option.styleCategory || 'Natural'}
                        onValueChange={(value) => handleOptionChange(option.id, 'styleCategory', value)}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Estilo" />
                        </SelectTrigger>
                        <SelectContent>
                          {styleCategories.map(style => (
                            <SelectItem key={style} value={style}>{style}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {question.options.length === 0 && (
              <Button
                className="w-full py-6 border-dashed border-2 bg-transparent hover:bg-gray-50 text-gray-500"
                onClick={handleAddOption}
              >
                <Plus className="w-4 h-4 mr-2" />
                Adicionar opção
              </Button>
            )}
          </div>
        </div>
        
        {/* Delete Question */}
        <div className="pt-4 border-t">
          <Button
            variant="destructive"
            className="w-full"
            onClick={handleDeleteQuestion}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            {isConfirmingDelete ? 'Confirmar exclusão?' : 'Excluir pergunta'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuizPropertyPanel;
