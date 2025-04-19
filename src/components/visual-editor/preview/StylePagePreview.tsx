import React from 'react';
import { Button } from '@/components/ui/button';
import { Monitor, Smartphone, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';
import { styleConfig } from '@/config/styleConfig';
import { Block } from '@/types/editor';
import { StyleResult } from '@/types/quiz';
import { BlockRenderer } from './BlockRenderer';

interface StylePagePreviewProps {
  blocks: Block[];
  selectedBlockId: string | null;
  onSelectBlock: (id: string | null) => void;
  isPreviewing: boolean;
  onPreviewToggle: () => void;
  styleType: string;
  onUpdateBlock?: (blockId: string, content: any) => void;
}

export function StylePagePreview({
  blocks,
  selectedBlockId,
  onSelectBlock,
  isPreviewing,
  onPreviewToggle,
  styleType,
  onUpdateBlock
}: StylePagePreviewProps) {
  const [viewMode, setViewMode] = React.useState<'desktop' | 'mobile'>('desktop');
  
  const styleResult: StyleResult = {
    category: styleType as any,
    score: 100,
    percentage: 100
  };

  const styleInfo = styleConfig[styleType];

  return (
    <div className="h-full flex flex-col">
      <div className="border-b border-[#B89B7A]/20 p-4 bg-white flex items-center justify-between">
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setViewMode('desktop')}
            className={cn(viewMode === 'desktop' && 'bg-[#FAF9F7]')}
          >
            <Monitor className="w-4 h-4 mr-2" />
            Desktop
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setViewMode('mobile')}
            className={cn(viewMode === 'mobile' && 'bg-[#FAF9F7]')}
          >
            <Smartphone className="w-4 h-4 mr-2" />
            Mobile
          </Button>
        </div>

        <Button variant="outline" size="sm" onClick={onPreviewToggle}>
          <Eye className="w-4 h-4 mr-2" />
          {isPreviewing ? 'Editar' : 'Visualizar'}
        </Button>
      </div>

      <div className="flex-1 overflow-auto p-4 bg-[#FAF9F7]">
        <div className={cn(
          "min-h-full bg-white rounded-lg shadow-sm p-6",
          viewMode === 'mobile' && 'max-w-md mx-auto'
        )}>
          <div className="text-center mb-8">
            <h1 className="text-3xl font-playfair text-[#432818] mb-4">
              Estilo {styleType}
            </h1>
            <p className="text-[#8F7A6A] max-w-2xl mx-auto">
              {styleInfo.description}
            </p>
          </div>

          <div className="mb-8">
            <img 
              src={styleInfo.image} 
              alt={`Estilo ${styleType}`}
              className="w-full max-w-2xl mx-auto rounded-lg shadow-md"
            />
          </div>

          {blocks.map((block) => (
            <BlockRenderer
              key={block.id}
              block={block}
              isSelected={block.id === selectedBlockId}
              onSelect={() => onSelectBlock(block.id)}
              isPreview={isPreviewing}
              primaryStyle={styleResult}
              onUpdate={onUpdateBlock ? (content) => onUpdateBlock(block.id, content) : undefined}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
