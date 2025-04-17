
import React from 'react';

export const highlightStrategicWords = (text: string): React.ReactNode => {
  const strategicWords = [
    // Previous words...
    'desconectada', 'dúvidas', 'segura', 'evoluir', 
    'combiná-las', 'impulso', 'arrependo', 'percebida', 
    'autenticidade', 'leveza', 'confiante', 'presença', 
    'elegância', 'autoridade', 'admirada', 'consciência', 
    'estilosa', 'facilidade', 'propósito', 'transformar'
  ];

  const pattern = new RegExp(`(${strategicWords.join('|')})`, 'gi');
  
  const parts = text.split(pattern);
  
  return parts.map((part, index) => {
    if (strategicWords.some(word => part.toLowerCase() === word.toLowerCase())) {
      return React.createElement('strong', { key: index, className: 'text-primary/80' }, part);
    }
    return part;
  });
};
