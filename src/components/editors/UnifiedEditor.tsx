
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { ComponentsSidebar } from '@/components/editor/sidebar/ComponentsSidebar';
import PropertiesPanel from '@/components/editor/properties/PropertiesPanel';
import { PageEditor } from '@/components/editor/PageEditor';
import { useEditor } from '@/hooks/useEditor';
import { ResultPageVisualEditor } from '@/components/result-editor/ResultPageVisualEditor';
import QuizEditor from '@/components/quiz-editor/QuizEditor';
import { Button } from '@/components/ui/button';
import { Save, Eye, EyeOff } from 'lucide-react';
import { StyleResult } from '@/types/quiz';
import { toast } from '@/components/ui/use-toast';
import { createDefaultConfig } from '@/utils/resultPageDefaults';

interface UnifiedEditorProps {
  initialQuizQuestions?: any[];
  initialResultStyle?: StyleResult;
  onSave?: (data: any) => void;
}

const UnifiedEditor: React.FC<UnifiedEditorProps> = ({
  initialQuizQuestions = [],
  initialResultStyle = { category: 'Natural', score: 100, percentage: 100 },
  onSave
}) => {
  const [activeTab, setActiveTab] = useState('quiz');
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [questions, setQuestions] = useState(initialQuizQuestions);
  const { config, addBlock, updateBlock, deleteBlock, saveConfig } = useEditor();
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  
  // Criamos um objeto ResultPageConfig a partir do initialResultStyle
  const resultPageConfig = createDefaultConfig(initialResultStyle.category);
  
  const handleSave = () => {
    if (onSave) {
      onSave({
        questions,
        config,
        resultStyle: initialResultStyle
      });
    }
    
    toast({
      title: "Alterações salvas",
      description: "Todas as alterações foram salvas com sucesso."
    });
  };
  
  return (
    <div className="h-screen flex flex-col overflow-hidden bg-white">
      {/* Toolbar */}
      <div className="border-b p-4 flex items-center justify-between">
        <div className="flex gap-2">
          <h1 className="text-2xl font-playfair text-[#432818]">Editor Unificado</h1>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="outline"
            onClick={() => setIsPreviewing(!isPreviewing)}
          >
            {isPreviewing ? (
              <>
                <EyeOff className="w-4 h-4 mr-2" />
                Editar
              </>
            ) : (
              <>
                <Eye className="w-4 h-4 mr-2" />
                Visualizar
              </>
            )}
          </Button>
          
          <Button 
            className="bg-[#B89B7A] hover:bg-[#A38A69]"
            onClick={handleSave}
          >
            <Save className="w-4 h-4 mr-2" />
            Salvar
          </Button>
        </div>
      </div>
      
      {/* Main content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <div className="border-b px-6 bg-white">
          <TabsList className="h-12">
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
        
        <div className="flex-1 overflow-auto">
          <TabsContent value="quiz" className="h-full m-0">
            <QuizEditor 
              questions={questions} 
              onQuestionsChange={setQuestions}
              isPreviewing={isPreviewing}
            />
          </TabsContent>
          
          <TabsContent value="result" className="h-full m-0">
            <ResultPageVisualEditor 
              selectedStyle={initialResultStyle}
              initialConfig={resultPageConfig}
            />
          </TabsContent>
          
          <TabsContent value="sales" className="h-full m-0 p-4 bg-[#FAF9F7]">
            <ResizablePanelGroup direction="horizontal" className="h-full">
              {/* Components Sidebar */}
              <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
                <ComponentsSidebar 
                  onComponentSelect={(type) => {
                    const id = addBlock(type);
                    setSelectedBlockId(id);
                  }} 
                />
              </ResizablePanel>

              <ResizableHandle withHandle />

              {/* Page Editor */}
              <ResizablePanel defaultSize={55}>
                <PageEditor 
                  blocks={config.blocks}
                  onBlocksChange={(blocks) => {
                    saveConfig();
                  }}
                  onPreviewToggle={() => setIsPreviewing(!isPreviewing)}
                  isPreviewing={isPreviewing}
                />
              </ResizablePanel>

              <ResizableHandle withHandle />

              {/* Properties Panel */}
              <ResizablePanel defaultSize={25}>
                <PropertiesPanel
                  selectedComponentId={selectedBlockId}
                  onClose={() => setSelectedBlockId(null)}
                  blocks={config.blocks}
                  onUpdate={(content) => {
                    if (selectedBlockId) {
                      updateBlock(selectedBlockId, content);
                    }
                  }}
                  onDelete={() => {
                    if (selectedBlockId) {
                      deleteBlock(selectedBlockId);
                      setSelectedBlockId(null);
                    }
                  }}
                />
              </ResizablePanel>
            </ResizablePanelGroup>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default UnifiedEditor;
