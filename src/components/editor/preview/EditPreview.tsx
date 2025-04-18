
import React from 'react';
import { Button } from '@/components/ui/button';
import { Monitor, Smartphone, EyeIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PreviewContent } from './PreviewContent';
import { Tooltip } from '@/components/ui/tooltip';

interface EditPreviewProps {
  isPreviewing: boolean;
  onPreviewToggle: () => void;
  onSelectComponent: (id: string | null) => void;
  selectedComponentId: string | null;
}

export function EditPreview({
  isPreviewing,
  onPreviewToggle,
  onSelectComponent,
  selectedComponentId
}: EditPreviewProps) {
  const [viewMode, setViewMode] = React.useState<'desktop' | 'mobile'>('desktop');

  return (
    <div className="h-full flex flex-col">
      {/* Preview Toolbar */}
      <div className="border-b border-[#B89B7A]/20 p-4 bg-white flex items-center justify-between">
        <div className="flex gap-2">
          <Tooltip content="Visualização Desktop">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setViewMode('desktop')}
              className={cn(viewMode === 'desktop' ? 'bg-[#FAF9F7]' : '')}
            >
              <Monitor className="w-4 h-4 mr-2" />
              Desktop
            </Button>
          </Tooltip>
          <Tooltip content="Visualização Mobile">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setViewMode('mobile')}
              className={cn(viewMode === 'mobile' ? 'bg-[#FAF9F7]' : '')}
            >
              <Smartphone className="w-4 h-4 mr-2" />
              Mobile
            </Button>
          </Tooltip>
        </div>

        <Tooltip content={isPreviewing ? 'Modo Edição' : 'Modo Visualização'}>
          <Button
            variant="outline"
            size="sm"
            onClick={onPreviewToggle}
          >
            <EyeIcon className="w-4 h-4 mr-2" />
            {isPreviewing ? 'Editar' : 'Visualizar'}
          </Button>
        </Tooltip>
      </div>

      {/* Preview Content */}
      <div className={cn(
        "flex-1 overflow-auto p-8",
        viewMode === 'mobile' && 'max-w-md mx-auto'
      )}>
        <PreviewContent
          isPreviewing={isPreviewing}
          selectedComponentId={selectedComponentId}
          onSelectComponent={onSelectComponent}
          viewMode={viewMode}
        />
      </div>
    </div>
  );
}
