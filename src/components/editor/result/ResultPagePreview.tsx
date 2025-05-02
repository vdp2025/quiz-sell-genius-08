
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

// Define a type for the globalStyles
interface GlobalStyles {
  backgroundColor: string;
  textColor: string;
  fontFamily: string;
  [key: string]: any; // Allow for other properties that might be in globalStyles
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
  } = useResultPageEditor(primaryStyle?.category || 'default');

  const handleOpenInNewTab = () => {
    // In a real implementation, this would open a preview in a new tab
    window.open('/resultado', '_blank');
  };

  // Safeguard against missing resultPageConfig with default values
  const globalStyles: GlobalStyles = resultPageConfig?.globalStyles as GlobalStyles || {
    backgroundColor: '#fffaf7',
    textColor: '#432818',
    fontFamily: 'inherit'
  };
  const safeBlocks = blocks || [];

  // Calculate classes for the preview container
  const containerClasses = cn(
    "bg-background mx-auto",
    viewMode === 'mobile' ? 'max-w-sm' : 'max-w-4xl'
  );

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
          className={containerClasses}
          style={{
            backgroundColor: globalStyles.backgroundColor,
            color: globalStyles.textColor,
            fontFamily: globalStyles.fontFamily,
          }}
        >
          {/* Render blocks */}
          <div className="space-y-6 p-4">
            {safeBlocks.length > 0 ? safeBlocks.map((block) => (
              <div
                key={block.id}
                onClick={() => !isPreviewing && selectBlock(block.id)}
                className={cn(
                  "transition-all",
                  !isPreviewing && "hover:outline-dashed hover:outline-primary/30 hover:outline-2 cursor-pointer",
                  !isPreviewing && selectedBlockId === block.id && "outline outline-2 outline-primary"
                )}
              >
                {renderBlock(block, primaryStyle || { category: "Natural", score: 0, percentage: 0 })}
              </div>
            )) : (
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
