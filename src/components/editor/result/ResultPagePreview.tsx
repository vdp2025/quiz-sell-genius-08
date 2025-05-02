
import React, { useState } from 'react';
import { StyleResult } from '@/types/quiz';
import { useResultPageEditor } from '@/hooks/useResultPageEditor';
import { Button } from '@/components/ui/button';
import { Monitor, Smartphone, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { renderBlock } from './ResultBlockRenderer';

interface ResultPagePreviewProps {
  primaryStyle: StyleResult;
  isPreviewing: boolean;
}

export const ResultPagePreview: React.FC<ResultPagePreviewProps> = ({
  primaryStyle,
  isPreviewing
}) => {
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const {
    resultPageConfig,
    blocks,
    selectedBlockId,
    selectBlock
  } = useResultPageEditor(primaryStyle.category);

  const handleOpenInNewTab = () => {
    // In a real implementation, this would open a preview in a new tab
    window.open('/resultado', '_blank');
  };

  return (
    <div className="h-full flex flex-col">
      <div className="border-b p-4 bg-background flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setViewMode('desktop')}
            className={cn(viewMode === 'desktop' ? 'bg-muted' : '')}
          >
            <Monitor className="h-4 w-4 mr-2" />
            Desktop
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setViewMode('mobile')}
            className={cn(viewMode === 'mobile' ? 'bg-muted' : '')}
          >
            <Smartphone className="h-4 w-4 mr-2" />
            Mobile
          </Button>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          onClick={handleOpenInNewTab}
        >
          <ExternalLink className="h-4 w-4 mr-2" />
          Abrir em nova aba
        </Button>
      </div>
      
      <div className="flex-1 overflow-auto bg-muted p-8">
        <div 
          className={cn(
            "bg-background mx-auto",
            viewMode === 'mobile' ? 'max-w-sm' : 'max-w-4xl'
          )}
          style={{
            backgroundColor: resultPageConfig.globalStyles?.backgroundColor || '#fffaf7',
            color: resultPageConfig.globalStyles?.textColor || '#432818',
            fontFamily: resultPageConfig.globalStyles?.fontFamily || 'inherit',
          }}
        >
          {/* Render blocks */}
          <div className="space-y-6 p-4">
            {blocks.map((block) => (
              <div
                key={block.id}
                onClick={() => !isPreviewing && selectBlock(block.id)}
                className={cn(
                  "transition-all",
                  !isPreviewing && "hover:outline-dashed hover:outline-primary/30 hover:outline-2 cursor-pointer",
                  !isPreviewing && selectedBlockId === block.id && "outline outline-2 outline-primary"
                )}
              >
                {renderBlock(block, primaryStyle)}
              </div>
            ))}
            
            {blocks.length === 0 && !isPreviewing && (
              <Card className="p-8 text-center">
                <p className="text-muted-foreground mb-4">Nenhum bloco adicionado à página de resultados</p>
                <p className="text-sm text-muted-foreground">
                  Use o painel lateral para adicionar blocos à página
                </p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
