
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { EditorWorkspace } from '@/components/editor/layouts/EditorWorkspace';
import ResultPageEditor from '@/components/result-editor/ResultPageEditor';

const EditorPage = () => {
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
            <EditorWorkspace />
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
