
import React, { useState, useRef, useEffect } from 'react';
import { SketchPicker } from 'react-color';
import { Button } from '@/components/ui/button';

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({ color, onChange }) => {
  const [showPicker, setShowPicker] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setShowPicker(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      <Button
        type="button"
        onClick={() => setShowPicker(!showPicker)}
        className="w-10 h-10 p-0 rounded-md"
        style={{ backgroundColor: color }}
      />
      
      {showPicker && (
        <div
          ref={pickerRef}
          className="absolute z-10 mt-2"
          style={{ top: '100%', left: '0' }}
        >
          <SketchPicker
            color={color}
            onChange={(color) => onChange(color.hex)}
          />
        </div>
      )}
    </div>
  );
};
