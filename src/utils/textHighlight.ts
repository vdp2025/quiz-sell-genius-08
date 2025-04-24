
import React from 'react';

export function highlightStrategicWords(text: string): React.ReactNode {
  // Check if there are any special characters for highlighting
  if (!text.includes('**')) {
    return text;
  }

  // Split by ** markers and process
  const parts = text.split(/(\*\*.*?\*\*)/g);
  
  return parts.map((part, index) => {
    // Check if this part is a highlighted term
    if (part.startsWith('**') && part.endsWith('**')) {
      // Extract the text without the markers
      const highlightedText = part.slice(2, -2);
      return (
        <span key={index} className="font-medium text-[#B89B7A]">
          {highlightedText}
        </span>
      );
    }
    
    return part;
  });
}
