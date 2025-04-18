
import React from 'react';
import { StyleResult } from '@/types/quiz';
import { Button } from '@/components/ui/button';
import { EyeIcon, Smartphone, Monitor } from 'lucide-react';

interface PagePreviewProps {
  primaryStyle: StyleResult;
  onSelectComponent: (id: string) => void;
}

const PagePreview = ({ primaryStyle, onSelectComponent }: PagePreviewProps) => {
  const [viewMode, setViewMode] = React.useState<'desktop' | 'mobile'>('desktop');
  const [isPreviewing, setIsPreviewing] = React.useState(false);

  return (
    <div className="h-full flex flex-col">
      {/* Toolbar */}
      <div className="border-b border-[#B89B7A]/20 p-4 bg-white flex items-center justify-between">
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setViewMode('desktop')}
            className={viewMode === 'desktop' ? 'bg-[#FAF9F7]' : ''}
          >
            <Monitor className="w-4 h-4 mr-2" />
            Desktop
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setViewMode('mobile')}
            className={viewMode === 'mobile' ? 'bg-[#FAF9F7]' : ''}
          >
            <Smartphone className="w-4 h-4 mr-2" />
            Mobile
          </Button>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsPreviewing(!isPreviewing)}
        >
          <EyeIcon className="w-4 h-4 mr-2" />
          {isPreviewing ? 'Editar' : 'Visualizar'}
        </Button>
      </div>

      {/* Preview Area */}
      <div className={`flex-1 overflow-y-auto p-8 ${viewMode === 'mobile' ? 'max-w-md mx-auto' : ''}`}>
        <div 
          className="min-h-full bg-white rounded-lg shadow-sm border border-[#B89B7A]/20 p-6"
          onClick={() => !isPreviewing && onSelectComponent('preview-area')}
        >
          Preview content will go here
        </div>
      </div>
    </div>
  );
};

export default PagePreview;
