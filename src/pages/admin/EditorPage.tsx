
import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PageEditor } from '@/components/editor/PageEditor';
import ResultPageEditor from '@/components/result-editor/ResultPageEditor';
import { EditorBlock } from '@/types/editor';
import { useEditor } from '@/hooks/useEditor';

const EditorPage = () => {
  const { config, updateConfig } = useEditor();
  const [isPreviewing, setIsPreviewing] = useState(false);

  const handleBlocksChange = (blocks: EditorBlock[]) => {
    updateConfig({
      ...config,
      blocks
    });
  };

  return (
    <AdminLayout>
      <div className="h-full bg-[#FAF9F7]">
        <Tabs defaultValue="sales" className="h-full">
          <div className="bg-white border-b px-4 py-2">
            <TabsList>
              <TabsTrigger value="sales">Editor de Página de Vendas</TabsTrigger>
              <TabsTrigger value="results">Editor de Página de Resultados</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="sales" className="h-full mt-0">
            <PageEditor 
              blocks={config.blocks}
              onBlocksChange={handleBlocksChange}
              onPreviewToggle={() => setIsPreviewing(!isPreviewing)}
              isPreviewing={isPreviewing}
            />
          </TabsContent>
          
          <TabsContent value="results" className="h-full mt-0">
            <ResultPageEditor />
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default EditorPage;
