
import React from 'react';

export function highlightStrategicWords(text: string): React.ReactNode {
  // If no special markers, return the original text
  if (!text.includes('**')) {
    return text;
  }

  // Create an array to hold our result elements
  const result: React.ReactNode[] = [];
  
  // Split the text by the marker pattern
  const parts = text.split(/(\*\*[^*]+\*\*)/);
  
  // Process each part
  parts.forEach((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      // Extract the highlighted text without markers
      const highlightedText = part.substring(2, part.length - 2);
      
      // Add a styled span for highlighted text
      result.push(
        <span key={index} className="font-medium text-[#B89B7A]">
          {highlightedText}
        </span>
      );
    } else if (part) {
      // Add regular text
      result.push(part);
    }
  });
  
  return result;
}
