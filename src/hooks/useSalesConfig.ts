
import { useEffect, useState } from 'react';
import { salesConfig } from '@/config/salesConfig';
import { Block } from '@/types/editor';

export const useSalesConfig = (styleType: string) => {
  const [config, setConfig] = useState(salesConfig);

  useEffect(() => {
    // Create a new config object without modifying the structure
    const newConfig = JSON.parse(JSON.stringify(salesConfig));
    
    // Set the style image for the specific style
    newConfig.styleImage = salesConfig.images.capas[styleType.toLowerCase()];
    
    // Update the header title for the style
    for (let i = 0; i < newConfig.defaultBlocks.length; i++) {
      if (newConfig.defaultBlocks[i].type === 'header') {
        newConfig.defaultBlocks[i].content.title = `Você descobriu seu Estilo ${styleType}! E isso é muito poderoso.`;
        break;
      }
    }
    
    // Update the state with the new config
    setConfig(newConfig);
  }, [styleType]);

  return config;
};
