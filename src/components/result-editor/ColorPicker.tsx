
import React, { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({
  color,
  onChange
}) => {
  const [inputValue, setInputValue] = useState(color);
  const colorInputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    setInputValue(color);
  }, [color]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    onChange(e.target.value);
  };
  
  const handleColorPickerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="flex space-x-2">
      <div 
        className="w-10 h-10 rounded border cursor-pointer flex items-center justify-center"
        style={{ backgroundColor: color }}
        onClick={() => colorInputRef.current?.click()}
      >
        <input
          ref={colorInputRef}
          type="color"
          value={color}
          onChange={handleColorPickerChange}
          className="sr-only"
        />
      </div>
      <Input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        className="flex-1"
        placeholder="#000000"
      />
    </div>
  );
};
