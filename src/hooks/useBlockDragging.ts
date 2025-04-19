
import { useState, useCallback } from 'react';

export const useBlockDragging = (onReorder: (sourceIndex: number, destinationIndex: number) => void) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handleDragEnd = useCallback((result: any) => {
    setIsDragging(false);
    
    if (!result.destination) {
      return;
    }
    
    if (result.source.index !== result.destination.index) {
      onReorder(result.source.index, result.destination.index);
    }
  }, [onReorder]);

  return {
    isDragging,
    handleDragStart,
    handleDragEnd
  };
};
