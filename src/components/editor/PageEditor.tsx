
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface EditorBlock {
  id: string;
  type: string;
  content: any;
  order: number;
}

interface PageEditorProps {
  blocks: EditorBlock[];
  onBlocksChange: (blocks: EditorBlock[]) => void;
  onPreviewToggle: () => void;
  isPreviewing: boolean;
}

export const PageEditor: React.FC<PageEditorProps> = ({
  blocks,
  onBlocksChange,
  onPreviewToggle,
  isPreviewing
}) => {
  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="font-semibold">Editor Visual</h2>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={onPreviewToggle}
          >
            {isPreviewing ? "Editar" : "Pré-visualizar"}
          </Button>
          <Button 
            className="bg-[#B89B7A] hover:bg-[#A38A69]"
            onClick={() => console.log("Salvando...")}
          >
            Salvar
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4 bg-[#FAF9F7]">
        <Card className="p-8 text-center">
          <p className="text-[#432818] mb-6">
            O novo editor visual intuitivo está sendo desenvolvido para oferecer
            uma melhor experiência de edição.
          </p>
          <p className="text-[#432818]">
            Volte em breve para experimentar a nova interface de design.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default PageEditor;
