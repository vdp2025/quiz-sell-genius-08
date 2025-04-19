
import { useEffect, useState } from 'react';
import { salesConfig } from '@/config/salesConfig';
import { Block } from '@/types/editor';

export const useSalesConfig = (styleType: string) => {
  const [config, setConfig] = useState(salesConfig);

  useEffect(() => {
    // Create a deep copy of the defaultBlocks to ensure we don't modify the original
    const modifiedBlocks = salesConfig.defaultBlocks.map(block => {
      if (block.type === 'header') {
        return {
          ...block,
          content: {
            ...block.content,
            title: `Você descobriu seu Estilo ${styleType}! E isso é muito poderoso.`
          }
        };
      }
      return { ...block };
    });
    
    const styleSpecificConfig = {
      ...salesConfig,
      styleImage: salesConfig.images.capas[styleType.toLowerCase()],
      defaultBlocks: modifiedBlocks
    };
    
    setConfig(styleSpecificConfig);
  }, [styleType]);

  return config;
};
