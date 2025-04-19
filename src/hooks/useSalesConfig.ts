
import { useEffect, useState } from 'react';
import { salesConfig } from '@/config/salesConfig';
import { Block } from '@/types/editor';

export const useSalesConfig = (styleType: string) => {
  const [config, setConfig] = useState(salesConfig);

  useEffect(() => {
    // Instead of modifying the defaultBlocks array, just create a complete new config
    // This avoids type issues with the complex nested structure
    const newConfig = {
      ...salesConfig,
      styleImage: salesConfig.images.capas[styleType.toLowerCase()]
    };
    
    // We'll create a brand new array with carefully constructed objects
    const headerBlock = salesConfig.defaultBlocks.find(block => block.type === 'header');
    if (headerBlock) {
      // Find index of the header block to replace it in the same position
      const headerIndex = salesConfig.defaultBlocks.findIndex(block => block.type === 'header');
      
      if (headerIndex !== -1) {
        // Create a new array with all blocks
        const newBlocks = [...salesConfig.defaultBlocks];
        
        // Replace the header block with updated title
        newBlocks[headerIndex] = {
          ...headerBlock,
          content: {
            ...headerBlock.content,
            title: `Você descobriu seu Estilo ${styleType}! E isso é muito poderoso.`
          }
        };
        
        // Set the new blocks array on the config
        newConfig.defaultBlocks = newBlocks;
      }
    }
    
    // Update the state with the new config
    setConfig(newConfig);
  }, [styleType]);

  return config;
};
