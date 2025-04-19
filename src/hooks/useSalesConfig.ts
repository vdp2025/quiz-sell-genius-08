
import { useEffect, useState } from 'react';
import { salesConfig } from '@/config/salesConfig';

export const useSalesConfig = (styleType: string) => {
  const [config, setConfig] = useState(salesConfig);

  useEffect(() => {
    const styleSpecificConfig = {
      ...salesConfig,
      styleImage: salesConfig.images.capas[styleType.toLowerCase()],
      defaultBlocks: salesConfig.defaultBlocks.map(block => {
        if (block.type === 'header') {
          return {
            ...block,
            content: {
              ...block.content,
              title: `Você descobriu seu Estilo ${styleType}! E isso é muito poderoso.`
            }
          };
        }
        return block;
      })
    };
    
    setConfig(styleSpecificConfig);
  }, [styleType]);

  return config;
};
