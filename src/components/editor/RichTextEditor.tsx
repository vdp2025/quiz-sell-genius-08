
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Bold, Italic, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

interface RichTextEditorProps {
  initialValue: string;
  onChange: (value: string) => void;
  alignment?: 'left' | 'center' | 'right';
  onAlignmentChange?: (alignment: 'left' | 'center' | 'right') => void;
  placeholder?: string;
  label?: string;
  minRows?: number;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  initialValue,
  onChange,
  alignment = 'left',
  onAlignmentChange,
  placeholder = 'Digite seu texto aqui...',
  label,
  minRows = 4
}) => {
  const [text, setText] = useState<string>(initialValue || '');
  const [textAlignment, setTextAlignment] = useState<'left' | 'center' | 'right'>(alignment);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setText(newText);
    onChange(newText);
  };

  const handleAlignmentChange = (value: string) => {
    if (value) {
      const newAlignment = value as 'left' | 'center' | 'right';
      setTextAlignment(newAlignment);
      if (onAlignmentChange) {
        onAlignmentChange(newAlignment);
      }
    }
  };

  const handleFormat = (format: 'bold' | 'italic') => {
    let newText = text;
    const textarea = document.getElementById('rich-text-editor') as HTMLTextAreaElement;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    
    if (start !== end) {
      // Text is selected
      const selectedText = text.substring(start, end);
      let formattedText = '';
      
      switch (format) {
        case 'bold':
          formattedText = `**${selectedText}**`;
          break;
        case 'italic':
          formattedText = `*${selectedText}*`;
          break;
        default:
          return;
      }
      
      newText = text.substring(0, start) + formattedText + text.substring(end);
      setText(newText);
      onChange(newText);
    }
  };

  return (
    <div className="space-y-3">
      {label && <div className="text-sm font-medium">{label}</div>}
      
      <div className="flex items-center space-x-1 border-b pb-2">
        <Button 
          type="button" 
          variant="ghost" 
          size="sm"
          onClick={() => handleFormat('bold')}
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button 
          type="button" 
          variant="ghost" 
          size="sm"
          onClick={() => handleFormat('italic')}
        >
          <Italic className="h-4 w-4" />
        </Button>
        
        <div className="border-l h-6 mx-2" />
        
        <ToggleGroup type="single" value={textAlignment} onValueChange={handleAlignmentChange}>
          <ToggleGroupItem value="left" aria-label="Alinhar à esquerda">
            <AlignLeft className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="center" aria-label="Centralizar">
            <AlignCenter className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="right" aria-label="Alinhar à direita">
            <AlignRight className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      
      <Textarea
        id="rich-text-editor"
        value={text}
        onChange={handleTextChange}
        placeholder={placeholder}
        className="min-h-[120px]"
        style={{ textAlign: textAlignment }}
        rows={minRows}
      />
      
      <div className="text-xs text-gray-500">
        Use **texto** para texto em negrito e *texto* para itálico
      </div>
    </div>
  );
};
