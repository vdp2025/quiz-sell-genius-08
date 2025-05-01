
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}

export const useColorPicker = () => {
  const ColorPicker = ({ color, onChange }: ColorPickerProps) => {
    const [pickerColor, setPickerColor] = useState(color || '#FFFFFF');

    const handleColorChange = (newColor: string) => {
      setPickerColor(newColor);
      onChange(newColor);
    };

    return (
      <Popover>
        <PopoverTrigger asChild>
          <div className="flex items-center">
            <div
              className="w-8 h-8 border rounded cursor-pointer mr-2"
              style={{ backgroundColor: pickerColor }}
            ></div>
            <Input
              value={pickerColor}
              onChange={(e) => handleColorChange(e.target.value)}
              className="w-32"
            />
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-64">
          <div className="space-y-2">
            <Label>Selecionar Cor</Label>
            <div className="grid grid-cols-7 gap-1">
              {['#FFFFFF', '#F8F9FA', '#E9ECEF', '#DEE2E6', '#CED4DA', '#ADB5BD', '#6C757D',
                '#495057', '#343A40', '#212529', '#000000', '#F8F9D7', '#FCE9DF', '#FFE8E8',
                '#DAF2D6', '#D7EFFA', '#E2D7F4', '#FFD6E7', '#FFC107', '#FD7E14', '#DC3545',
                '#198754', '#0D6EFD', '#6610F2', '#D63384'].map((color) => (
                <button
                  key={color}
                  type="button"
                  className="w-6 h-6 rounded-sm shadow-sm border"
                  style={{ backgroundColor: color }}
                  onClick={() => handleColorChange(color)}
                />
              ))}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    );
  };

  return { ColorPicker };
};
