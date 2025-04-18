
import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import EditorLayout from '@/components/editor/EditorLayout';
import ResultPageEditor from '@/components/result-editor/ResultPageEditor';
import { useQuizLogic } from '@/hooks/useQuizLogic';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const EditorPage = () => {
  const { quizResult } = useQuizLogic();
  const [activeTab, setActiveTab] = useState('sales');
  
  return (
    <AdminLayout>
      <div className="h-full bg-[#FAF9F7]">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
          <div className="bg-white border-b px-4 py-2">
            <TabsList>
              <TabsTrigger value="sales">Editor de Página de Vendas</TabsTrigger>
              <TabsTrigger value="results">Editor de Página de Resultados</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="sales" className="h-full mt-0">
            <EditorLayout 
              primaryStyle={quizResult?.primaryStyle || {
                category: 'Natural',
                score: 0,
                percentage: 100
              }} 
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
