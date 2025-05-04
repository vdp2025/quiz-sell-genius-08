import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Save, Eye, EyeOff } from 'lucide-react';
import { UnifiedEditorState } from '@/types/unifiedEditor';
import { QuizBuilder } from '@/components/quiz-builder/QuizBuilder';
import { ResultPageEditorWithControls } from '@/components/result-editor/ResultPageEditorWithControls';

interface UnifiedEditorProps {
  initialData?: any;
}

const UnifiedEditor: React.FC<UnifiedEditorProps> = ({ initialData }) => {
  const [editorState, setEditorState] = useState<UnifiedEditorState>({
    activeTab: 'quiz',
    isPreviewing: false,
    quizEditorState: {
      components: [],
      stages: [],
    },
    resultEditorState: {
      config: {
        title: '',
        description: '',
        sections: [],
      },
      blocks: [],
    },
    salesEditorState: {
      blocks: [],
    },
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    // Implementar lógica de salvamento aqui
    setTimeout(() => setIsSaving(false), 1000);
  };

  const togglePreview = () => {
    setEditorState(prev => ({
      ...prev,
      isPreviewing: !prev.isPreviewing
    }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Barra de ferramentas superior */}
      <div className="border-b p-4 bg-card">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <h1 className="text-2xl font-playfair text-[#432818]">Editor Unificado</h1>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={togglePreview}
            >
              {editorState.isPreviewing ? (
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
              disabled={isSaving}
            >
              <Save className="w-4 h-4 mr-2" />
              {isSaving ? 'Salvando...' : 'Salvar'}
            </Button>
          </div>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="flex-1 container mx-auto py-6">
        <Tabs
          defaultValue="quiz"
          className="w-full"
          onValueChange={(value) => setEditorState(prev => ({ ...prev, activeTab: value as 'quiz' | 'result' | 'sales' }))}
        >
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="quiz">Quiz</TabsTrigger>
            <TabsTrigger value="result">Página de Resultado</TabsTrigger>
            <TabsTrigger value="sales">Página de Vendas</TabsTrigger>
          </TabsList>

          <TabsContent value="quiz" className="mt-6">
            <QuizBuilder />
          </TabsContent>

          <TabsContent value="result" className="mt-6">
            <ResultPageEditorWithControls
              primaryStyle={{ category: 'default' }}
              secondaryStyles={[]}
            />
          </TabsContent>

          <TabsContent value="sales" className="mt-6">
            <div className="text-center py-12 text-muted-foreground">
              Editor da página de vendas em desenvolvimento...
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UnifiedEditor;