
import React from 'react';
import { Copy, Eye, EyeOff, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/components/ui/use-toast';

interface BuilderToolbarProps {
  activeView: 'editor' | 'preview';
  isPreviewing: boolean;
  onViewChange: (value: 'editor' | 'preview') => void;
  onPreviewToggle: () => void;
  onSave: () => void;
}

const BuilderToolbar: React.FC<BuilderToolbarProps> = ({
  activeView,
  isPreviewing,
  onViewChange,
  onPreviewToggle,
  onSave
}) => {
  const handleCopyCurrentQuiz = () => {
    toast({
      title: "Funcionalidade em desenvolvimento",
      description: "A cópia do quiz atual será implementada em breve.",
    });
  };

  return (
    <div className="p-4 border-b bg-white flex justify-between items-center">
      <h1 className="text-2xl font-playfair text-[#432818]">
        Construtor de Quiz
      </h1>
      
      <div className="flex items-center gap-2">
        <Tabs value={activeView} onValueChange={(value) => onViewChange(value as 'editor' | 'preview')}>
          <TabsList>
            <TabsTrigger value="editor">Editor</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <Button 
          variant="outline" 
          size="sm"
          onClick={handleCopyCurrentQuiz}
          className="ml-4"
        >
          <Copy className="h-4 w-4 mr-2" />
          Copiar Quiz Atual
        </Button>
        
        <Button 
          variant="outline" 
          size="sm"
          onClick={onPreviewToggle}
          className="ml-2"
        >
          {isPreviewing ? (
            <>
              <EyeOff className="h-4 w-4 mr-2" />
              Editar
            </>
          ) : (
            <>
              <Eye className="h-4 w-4 mr-2" />
              Visualizar
            </>
          )}
        </Button>
        
        <Button 
          size="sm"
          onClick={onSave}
          className="ml-2 bg-[#B89B7A] hover:bg-[#A38A69]"
        >
          <Save className="h-4 w-4 mr-2" />
          Salvar
        </Button>
      </div>
    </div>
  );
};

export default BuilderToolbar;
