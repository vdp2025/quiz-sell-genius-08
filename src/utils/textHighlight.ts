
import React from 'react';

export const highlightStrategicWords = (text: string): React.ReactNode => {
  const strategicWords = [
    'confortáveis', 'soltos', 'práticos', 'discretas', 'clássico', 'despercebidas',
    'refinados', 'perfeito', 'atual', 'delicadas', 'suaves', 'fluídas',
    'marquem', 'decotes', 'fendas', 'estruturadas', 'assimétricas', 'modernas',
    'marcantes', 'mix', 'informal', 'espontânea', 'essencialista', 'conservadora',
    'exigente', 'sofisticada', 'feminina', 'meiga', 'sensível', 'glamorosa',
    'sensual', 'cosmopolita', 'audaciosa', 'exótica', 'aventureira', 'leve',
    'tradicional', 'casual', 'imponente', 'romântico', 'urbano', 'criativo',
    'colorido', 'ousado', 'discretos', 'sutis', 'clean', 'status', 'laços',
    'babados', 'couro', 'zíper', 'firmeza', 'peso', 'exclusivos', 'identidade',
    'flamingo', 'cores', 'marcado', 'definido'
  ];

  const pattern = new RegExp(`(${strategicWords.join('|')})`, 'gi');
  
  const parts = text.split(pattern);
  
  return parts.map((part, index) => {
    if (strategicWords.some(word => part.toLowerCase() === word.toLowerCase())) {
      return <strong key={index}>{part}</strong>;
    }
    return part;
  });
};
