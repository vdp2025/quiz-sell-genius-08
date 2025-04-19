
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({ color, onChange }) => {
  const [currentColor, setCurrentColor] = useState(color);
  
  useEffect(() => {
    setCurrentColor(color);
  }, [color]);
  
  const presetColors = [
    '#000000', '#FFFFFF', '#F8F9FA', '#E9ECEF', 
    '#DEE2E6', '#CED4DA', '#ADB5BD', '#6C757D',
    '#495057', '#343A40', '#212529', '#B89B7A',
    '#A38A69', '#8F7A6A', '#432818', '#aa6b5d',
    '#FAF9F7', '#FEF4EE', '#FCE6D6', '#FFEFEC'
  ];
  
  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentColor(e.target.value);
    onChange(e.target.value);
  };
  
  const handlePresetClick = (presetColor: string) => {
    setCurrentColor(presetColor);
    onChange(presetColor);
  };
  
  return (
    <div className="p-3 bg-white">
      <div className="grid grid-cols-5 gap-1 mb-3">
        {presetColors.map((presetColor) => (
          <button
            key={presetColor}
            type="button"
            className="w-full pt-[100%] relative rounded-md border hover:scale-110 transition-transform"
            style={{ 
              backgroundColor: presetColor,
              borderColor: presetColor === '#FFFFFF' ? '#e5e7eb' : presetColor
            }}
            onClick={() => handlePresetClick(presetColor)}
          >
            {presetColor === currentColor && (
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="w-2 h-2 bg-black rounded-full" />
              </span>
            )}
          </button>
        ))}
      </div>
      
      <div className="flex items-center gap-2">
        <div 
          className="w-8 h-8 rounded-md border"
          style={{ backgroundColor: currentColor }} 
        />
        <Input
          type="text"
          value={currentColor}
          onChange={handleColorChange}
          className="flex-1"
        />
        <Input
          type="color"
          value={currentColor}
          onChange={handleColorChange}
          className="w-8 h-8 p-0 border-0"
        />
      </div>
    </div>
  );
};

export default ColorPicker;
