
import React from 'react';
import { Button } from '@/components/ui/button';
import { Monitor, Smartphone } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EditorPreviewProps {
  isPreviewing: boolean;
  selectedBlockId: string | null;
  onSelectBlock: (id: string) => void;
}

export const EditorPreview: React.FC<EditorPreviewProps> = ({
  isPreviewing,
  selectedBlockId,
  onSelectBlock
}) => {
  const [viewMode, setViewMode] = React.useState<'desktop' | 'mobile'>('desktop');

  return (
    <div className="h-full flex flex-col">
      <div className="border-b p-4 flex justify-between items-center bg-white">
        <div className="flex space-x-2">
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
      </div>

      <div className="flex-1 p-4 overflow-auto bg-[#FAF9F7]">
        <div className={cn(
          "min-h-full bg-white rounded-lg shadow-sm p-6",
          viewMode === 'mobile' && 'max-w-md mx-auto'
        )}>
          {isPreviewing ? (
            <div className="text-center p-8">Preview mode</div>
          ) : (
            <div className="text-center p-8 border-2 border-dashed border-[#B89B7A]/40 rounded-lg">
              <p className="text-[#8F7A6A] mb-4">Adicione componentes usando o painel lateral</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
