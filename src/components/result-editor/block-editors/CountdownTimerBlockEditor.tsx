
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Block } from '@/types/editor';
import { DatePicker } from '@/components/ui/date-picker';
import { useColorPicker } from '@/hooks/useColorPicker';

interface CountdownTimerBlockEditorProps {
  block: Block;
  onUpdate: (content: any) => void;
}

const CountdownTimerBlockEditor: React.FC<CountdownTimerBlockEditorProps> = ({ block, onUpdate }) => {
  const content = block.content;
  const { ColorPicker } = useColorPicker();
  
  // Set default date to tomorrow if not present
  const endDate = content.endDate 
    ? new Date(content.endDate) 
    : new Date(Date.now() + 24 * 60 * 60 * 1000);
    
  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      onUpdate({ endDate: date.toISOString() });
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Título</Label>
        <Input
          id="title"
          value={content.title || "Oferta por tempo limitado"}
          onChange={(e) => onUpdate({ title: e.target.value })}
          placeholder="Título do contador"
        />
      </div>
      
      <div className="space-y-2">
        <Label>Data de término</Label>
        <DatePicker
          date={endDate}
          onDateChange={handleDateChange}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="text">Texto adicional</Label>
        <Textarea
          id="text"
          value={content.text || ""}
          onChange={(e) => onUpdate({ text: e.target.value })}
          placeholder="Texto adicional (opcional)"
        />
      </div>
      
      <div className="space-y-2">
        <Label>Cor de fundo</Label>
        <ColorPicker
          color={content.style?.backgroundColor || "#FFF8F0"}
          onChange={(color) => onUpdate({ 
            style: { 
              ...content.style,
              backgroundColor: color 
            } 
          })}
        />
      </div>
    </div>
  );
};

export default CountdownTimerBlockEditor;
