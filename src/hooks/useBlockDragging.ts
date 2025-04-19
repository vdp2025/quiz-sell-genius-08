
import { useState, useCallback } from 'react';
import { Block } from '@/types/editor';

export const useBlockDragging = (onReorder: (sourceIndex: number, destinationIndex: number) => void) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handleDragEnd = useCallback((source: number, destination: number) => {
    setIsDragging(false);
    if (destination !== undefined && source !== destination) {
      onReorder(source, destination);
    }
  }, [onReorder]);

  return {
    isDragging,
    handleDragStart,
    handleDragEnd
  };
};
