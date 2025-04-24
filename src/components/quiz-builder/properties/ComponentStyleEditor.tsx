
import React from 'react';
import { QuizComponentData } from '@/types/quizBuilder';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { ColorPicker } from './fields/ColorPicker';

interface ComponentStyleEditorProps {
  component: QuizComponentData;
  onUpdate: (updates: Partial<QuizComponentData>) => void;
}

const ComponentStyleEditor: React.FC<ComponentStyleEditorProps> = ({
  component,
  onUpdate
}) => {
  const updateStyle = (updates: Record<string, any>) => {
    onUpdate({
      style: { ...component.style, ...updates }
    });
  };
  
  return (
    <div className="space-y-6">
      <Card className="p-4 bg-[#1d212e] border-[#333333]">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-white">Cor de Fundo</Label>
            <ColorPicker 
              color={component.style?.backgroundColor || ''}
              onChange={(color) => updateStyle({ backgroundColor: color })}
            />
          </div>
          
          <div className="space-y-2">
            <Label className="text-white">Cor do Texto</Label>
            <ColorPicker 
              color={component.style?.textColor || ''}
              onChange={(color) => updateStyle({ textColor: color })}
            />
          </div>
        </div>
      </Card>
      
      <Card className="p-4 bg-[#1d212e] border-[#333333]">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-white">Arredondamento de Bordas</Label>
            <Select 
              value={component.style?.borderRadius || 'none'} 
              onValueChange={(value) => updateStyle({ borderRadius: value })}
            >
              <SelectTrigger className="bg-[#262939] border-[#333333] text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#262939] border-[#333333] text-white">
                <SelectItem value="none">Sem Arredondamento</SelectItem>
                <SelectItem value="sm">Pequeno</SelectItem>
                <SelectItem value="md">Médio</SelectItem>
                <SelectItem value="lg">Grande</SelectItem>
                <SelectItem value="full">Completo</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>
      
      <Card className="p-4 bg-[#1d212e] border-[#333333]">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-white">Espaçamento Vertical</Label>
            <Select 
              value={component.style?.paddingY || '4'} 
              onValueChange={(value) => updateStyle({ paddingY: value })}
            >
              <SelectTrigger className="bg-[#262939] border-[#333333] text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#262939] border-[#333333] text-white">
                <SelectItem value="0">Nenhum</SelectItem>
                <SelectItem value="2">Extra Pequeno (0.5rem)</SelectItem>
                <SelectItem value="4">Pequeno (1rem)</SelectItem>
                <SelectItem value="6">Médio (1.5rem)</SelectItem>
                <SelectItem value="8">Grande (2rem)</SelectItem>
                <SelectItem value="12">Extra Grande (3rem)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label className="text-white">Espaçamento Horizontal</Label>
            <Select 
              value={component.style?.paddingX || '4'} 
              onValueChange={(value) => updateStyle({ paddingX: value })}
            >
              <SelectTrigger className="bg-[#262939] border-[#333333] text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#262939] border-[#333333] text-white">
                <SelectItem value="0">Nenhum</SelectItem>
                <SelectItem value="2">Extra Pequeno (0.5rem)</SelectItem>
                <SelectItem value="4">Pequeno (1rem)</SelectItem>
                <SelectItem value="6">Médio (1.5rem)</SelectItem>
                <SelectItem value="8">Grande (2rem)</SelectItem>
                <SelectItem value="12">Extra Grande (3rem)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>
      
      {(component.type === 'multipleChoice' || component.type === 'singleChoice') && (
        <Card className="p-4 bg-[#1d212e] border-[#333333]">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-white">Indicador de Seleção</Label>
              <Select 
                value={component.style?.selectionIndicator || 'border'} 
                onValueChange={(value) => updateStyle({ selectionIndicator: value })}
              >
                <SelectTrigger className="bg-[#262939] border-[#333333] text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#262939] border-[#333333] text-white">
                  <SelectItem value="border">Borda</SelectItem>
                  <SelectItem value="checkbox">Checkbox</SelectItem>
                  <SelectItem value="highlight">Destaque</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>
      )}
      
      {(component.type === 'quizResult' || component.type === 'benefitsList') && (
        <Card className="p-4 bg-[#1d212e] border-[#333333]">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-white">Cor de Destaque</Label>
              <ColorPicker 
                color={component.data?.accentColor || '#9b87f5'}
                onChange={(color) => onUpdate({
                  data: { ...component.data, accentColor: color }
                })}
              />
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default ComponentStyleEditor;
