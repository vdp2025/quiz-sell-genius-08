
import React from 'react';

export const highlightStrategicWords = (text: string): React.ReactNode => {
  const strategicWords = [
    'conforto', 'estilo', 'elegante', 'sofisticado', 'moderno',
    'clássico', 'tradicional', 'casual', 'discreto', 'refinado',
    'delicado', 'sensual', 'glamorosa', 'ousado', 'criativo',
    'exclusivo', 'atemporal', 'único', 'autêntico', 'atual',
    'tendência', 'personalidade', 'identidade', 'estruturado',
    'fluido', 'clean', 'minimalista', 'versátil', 'despojado',
    'natural', 'romântico', 'prático', 'contemporâneo', 'dramático',
    'marcante', 'impacto', 'status', 'presença', 'poder',
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
      return React.createElement('strong', { key: index, className: 'text-brand-coffee/80' }, part);
    }
    return part;
  });
};

