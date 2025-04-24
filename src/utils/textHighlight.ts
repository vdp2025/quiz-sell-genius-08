
import React from 'react';

export function highlightStrategicWords(text: string): React.ReactNode {
  // Se não houver marcadores especiais, retorne o texto original
  if (!text.includes('**')) {
    return text;
  }

  // Dividir o texto nos marcadores ** e processar cada parte
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  
  // Mapear as partes, destacando as que estão entre **
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      // Extrair o texto sem os marcadores
      const highlightedText = part.substring(2, part.length - 2);
      return (
        <span key={index} className="font-medium text-[#B89B7A]">
          {highlightedText}
        </span>
      );
    }
    return part;
  });
}
