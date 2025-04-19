
import { useEffect, useState } from 'react';
import { salesConfig } from '@/config/salesConfig';
import { Block } from '@/types/editor';

export const useSalesConfig = (styleType: string) => {
  const [config, setConfig] = useState(salesConfig);

  useEffect(() => {
    const newConfig = JSON.parse(JSON.stringify(salesConfig));
    const styleLower = styleType.toLowerCase();
    
    // Set the style image
    newConfig.styleImage = salesConfig.images.capas[styleLower];
    
    // Update blocks with style-specific content
    newConfig.defaultBlocks = newConfig.defaultBlocks.map(block => {
      // Update header title
      if (block.type === 'header') {
        block.content.title = `Você descobriu seu Estilo ${styleType}! E isso é muito poderoso.`;
      }
      
      // Update hero section
      if (block.type === 'hero-section') {
        block.content.title = `SEU ESTILO É ${styleType.toUpperCase()}`;
        block.content.subtitle = "Agora é hora de aplicar com clareza — e se vestir de você";
      }
      
      // Update benefits with style-specific items
      if (block.type === 'benefits' && salesConfig.styleSpecificContent[styleLower]) {
        block.content.items = [
          ...salesConfig.styleSpecificContent[styleLower].benefits,
          ...block.content.items.slice(-2) // Keep the last 2 generic benefits
        ];
      }
      
      return block;
    });
    
    setConfig(newConfig);
  }, [styleType]);

  return config;
};
