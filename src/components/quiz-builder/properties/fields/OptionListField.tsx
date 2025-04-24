
import React from 'react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PlusCircle, XCircle, Image, Type, Settings } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ImageUploadField } from './ImageUploadField';

interface OptionListFieldProps {
  options: string[];
  optionImages?: string[];
  displayType?: 'text' | 'image' | 'both';
  onUpdate: (updates: Record<string, any>) => void;
}

export const OptionListField: React.FC<OptionListFieldProps> = ({
  options,
  optionImages = [],
  displayType = 'text',
  onUpdate
}) => {
  const handleOptionUpdate = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    onUpdate({ options: newOptions });
  };

  const handleOptionImageUpdate = (index: number, url: string) => {
    const newImages = [...optionImages];
    newImages[index] = url;
    onUpdate({ optionImages: newImages });
  };

  const handleAddOption = () => {
    const newOptions = [...options, ''];
    const newImages = [...optionImages, ''];
    onUpdate({ options: newOptions, optionImages: newImages });
  };

  const handleRemoveOption = (index: number) => {
    const newOptions = [...options];
    const newImages = [...optionImages];
    newOptions.splice(index, 1);
    newImages.splice(index, 1);
    onUpdate({ options: newOptions, optionImages: newImages });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label className="text-white">Tipo de Exibição</Label>
        <Select 
          value={displayType} 
          onValueChange={(value: 'text' | 'image' | 'both') => onUpdate({ displayType: value })}
        >
          <SelectTrigger className="bg-[#262939] border-[#333333] text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-[#262939] border-[#333333] text-white">
            <SelectItem value="text">
              <div className="flex items-center">
                <Type className="w-4 h-4 mr-2" />
                <span>Apenas Texto</span>
              </div>
            </SelectItem>
            <SelectItem value="image">
              <div className="flex items-center">
                <Image className="w-4 h-4 mr-2" />
                <span>Apenas Imagem</span>
              </div>
            </SelectItem>
            <SelectItem value="both">
              <div className="flex items-center">
                <Settings className="w-4 h-4 mr-2" />
                <span>Texto e Imagem</span>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label className="text-white">Opções</Label>
        <Card className="bg-[#1d212e] border-[#333333] p-2 space-y-4">
          {options.map((option, index) => (
            <Card key={index} className="bg-[#262939] border-[#333333] p-3">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-400">Opção {index + 1}</span>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => handleRemoveOption(index)}
                  className="h-6 w-6 text-gray-400 hover:text-white hover:bg-[#333333]"
                >
                  <XCircle className="h-4 w-4" />
                </Button>
              </div>
              
              {(displayType === 'text' || displayType === 'both') && (
                <div className="mb-3">
                  <Label className="text-sm text-white mb-1">Texto da Opção</Label>
                  <Input 
                    value={option} 
                    onChange={(e) => handleOptionUpdate(index, e.target.value)}
                    placeholder={`Opção ${index + 1}`}
                    className="bg-[#1d212e] border-[#333333] text-white"
                  />
                </div>
              )}
              
              {(displayType === 'image' || displayType === 'both') && (
                <div>
                  <Label className="text-sm text-white mb-1">Imagem da Opção</Label>
                  {optionImages[index] ? (
                    <div className="relative rounded-md overflow-hidden">
                      <img 
                        src={optionImages[index]} 
                        alt={option} 
                        className="w-full h-[120px] object-cover"
                      />
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2 h-6 w-6 rounded-full"
                        onClick={() => handleOptionImageUpdate(index, '')}
                      >
                        <XCircle className="h-3 w-3" />
                      </Button>
                    </div>
                  ) : (
                    <div 
                      className="h-[80px] bg-[#1d212e] border border-dashed border-[#333333] rounded-md flex items-center justify-center cursor-pointer"
                      onClick={() => handleOptionImageUpdate(index, '/placeholder-image.jpg')}
                    >
                      <Image className="h-5 w-5 text-gray-500 mr-2" />
                      <span className="text-sm text-gray-500">Adicionar imagem</span>
                    </div>
                  )}
                </div>
              )}
            </Card>
          ))}
          
          <Button
            onClick={handleAddOption}
            variant="ghost"
            size="sm"
            className="w-full text-gray-400 hover:text-white hover:bg-[#333333]"
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Adicionar Opção
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default OptionListField;
