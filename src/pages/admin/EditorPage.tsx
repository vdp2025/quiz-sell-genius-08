
import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ResizablePanelGroup } from '@/components/ui/resizable';
import { StyleResult } from '@/types/quiz';
import { UnifiedEditorLayout } from '@/components/editor/UnifiedEditorLayout';

const EditorPage = () => {
  const [activeTab, setActiveTab] = useState<'quiz' | 'result' | 'sales'>('quiz');
  const [primaryStyle, setPrimaryStyle] = useState<StyleResult>({
    category: 'Elegante',
    score: 12,
    percentage: 40
  });

  return (
    <AdminLayout>
      <div className="h-full flex flex-col">
        <Tabs 
          value={activeTab} 
          onValueChange={(value) => setActiveTab(value as 'quiz' | 'result' | 'sales')} 
          className="w-full h-full"
        >
          <div className="border-b bg-white px-6 py-2">
            <TabsList>
              <TabsTrigger value="quiz" className="data-[state=active]:bg-[#FAF9F7]">
                Editor de Quiz
              </TabsTrigger>
              <TabsTrigger value="result" className="data-[state=active]:bg-[#FAF9F7]">
                Página de Resultado
              </TabsTrigger>
              <TabsTrigger value="sales" className="data-[state=active]:bg-[#FAF9F7]">
                Página de Vendas
              </TabsTrigger>
            </TabsList>
          </div>
          
          <div className="flex-1 h-[calc(100%-53px)]">
            <UnifiedEditorLayout 
              activeTab={activeTab}
              primaryStyle={primaryStyle}
            />
          </div>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default EditorPage;
