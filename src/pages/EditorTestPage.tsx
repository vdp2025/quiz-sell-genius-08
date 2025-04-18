
import React from 'react';
import { PageEditor } from '@/components/editor/PageEditor';
import { useEditor } from '@/hooks/useEditor';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const EditorTestPage = () => {
  const { config, updateConfig } = useEditor();
  const [isPreviewing, setIsPreviewing] = React.useState(false);

  const handleBlocksChange = (blocks: any) => {
    updateConfig({
      ...config,
      blocks
    });
  };

  return (
    <div className="min-h-screen bg-[#FAF9F7]">
      <div className="h-16 border-b bg-white flex items-center px-4">
        <h1 className="text-xl font-playfair text-[#432818]">Editor Visual</h1>
      </div>

      <div className="h-[calc(100vh-4rem)] bg-[#FAF9F7]">
        <Tabs defaultValue="editor" className="h-full">
          <div className="bg-white border-b px-4 py-2">
            <TabsList>
              <TabsTrigger value="editor">Editor</TabsTrigger>
              <TabsTrigger value="code">Código</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="editor" className="h-full mt-0">
            <PageEditor 
              blocks={config.blocks}
              onBlocksChange={handleBlocksChange}
              onPreviewToggle={() => setIsPreviewing(!isPreviewing)}
              isPreviewing={isPreviewing}
            />
          </TabsContent>
          
          <TabsContent value="code" className="h-full mt-0 p-4">
            <div className="bg-[#1e1e1e] text-white p-4 rounded-md h-full overflow-auto">
              <pre>{JSON.stringify(config, null, 2)}</pre>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EditorTestPage;
