
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Save, Eye, EyeOff, Settings, Edit } from 'lucide-react';

interface BuilderToolbarProps {
  activeView: 'editor' | 'preview';
  isPreviewing: boolean;
  onViewChange: (view: 'editor' | 'preview') => void;
  onPreviewToggle: () => void;
  onSave: () => void;
  onPreviewResultPage?: () => void;
}

const BuilderToolbar: React.FC<BuilderToolbarProps> = ({
  activeView,
  isPreviewing,
  onViewChange,
  onPreviewToggle,
  onSave,
  onPreviewResultPage
}) => {
  return (
    <div className="border-b bg-white p-3 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-playfair text-[#432818]">Construtor de Quiz</h1>
        
        <Tabs value={activeView} onValueChange={(value) => onViewChange(value as 'editor' | 'preview')}>
          <TabsList>
            <TabsTrigger 
              value="editor" 
              className={activeView === 'editor' ? 'bg-[#B89B7A] text-white' : ''}
            >
              <Edit className="h-4 w-4 mr-2" />
              Editor
            </TabsTrigger>
            <TabsTrigger 
              value="preview" 
              className={activeView === 'preview' ? 'bg-[#B89B7A] text-white' : ''}
            >
              <Eye className="h-4 w-4 mr-2" />
              Visualizar
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <div className="flex space-x-2">
        {activeView === 'editor' && (
          <Button
            variant="outline"
            size="sm"
            onClick={onPreviewToggle}
            className="border-[#B89B7A] text-[#432818]"
          >
            {isPreviewing ? (
              <>
                <EyeOff className="h-4 w-4 mr-2" />
                Esconder Preview
              </>
            ) : (
              <>
                <Eye className="h-4 w-4 mr-2" />
                Mostrar Preview
              </>
            )}
          </Button>
        )}
        
        {activeView === 'preview' && onPreviewResultPage && (
          <Button
            variant="outline"
            size="sm"
            onClick={onPreviewResultPage}
            className="border-[#B89B7A] text-[#432818]"
          >
            <Settings className="h-4 w-4 mr-2" />
            Previsualizar Resultado
          </Button>
        )}
        
        <Button 
          size="sm" 
          onClick={onSave}
          className="bg-[#B89B7A] hover:bg-[#A38A69]"
        >
          <Save className="h-4 w-4 mr-2" />
          Salvar
        </Button>
      </div>
    </div>
  );
};

export default BuilderToolbar;
