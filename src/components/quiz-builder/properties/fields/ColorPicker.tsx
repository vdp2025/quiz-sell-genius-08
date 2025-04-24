
import React from 'react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({
  color,
  onChange
}) => {
  return (
    <div className="flex gap-2 items-center">
      <div 
        className={cn(
          "w-10 h-10 rounded border border-[#333333] overflow-hidden flex-shrink-0",
          !color && "bg-gray-300"
        )}
      >
        <Input 
          type="color"
          value={color || '#ffffff'} 
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-full border-0 p-0 m-0"
        />
      </div>
      <Input 
        type="text"
        value={color || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder="#ffffff"
        className="flex-1 bg-[#262939] border-[#333333] text-white"
      />
    </div>
  );
};

export default ColorPicker;
