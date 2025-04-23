
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { Button } from '@/components/ui/button';
import { Loader2, Save, ArrowLeft, Eye, EyeOff, Plus } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { QuizTemplate } from '@/types/quizTemplate';
import { getTemplateById, saveTemplate } from '@/services/templates/templateService';
import { QuizQuestion, StyleResult } from '@/types/quiz';
import { ScrollArea } from '@/components/ui/scroll-area';
import QuizStepsList from './QuizStepsList';
import QuizPreview from './QuizPreview';
import QuizPropertyPanel from './QuizPropertyPanel';
import ResultBlocksList from './ResultBlocksList';
import ResultPagePreview from './ResultPagePreview';
import ResultPropertyPanel from './ResultPropertyPanel';

interface InlineQuizEditorProps {
  templateId: string | null;
  onBack: () => void;
}

const InlineQuizEditor: React.FC<InlineQuizEditorProps> = ({ templateId, onBack }) => {
  const navigate = useNavigate();
  const [template, setTemplate] = useState<QuizTemplate | null>(null);
  const [activeTab, setActiveTab] = useState<'quiz' | 'result'>('quiz');
  const [activeQuestionId, setActiveQuestionId] = useState<string | null>(null);
  const [activeBlockId, setActiveBlockId] = useState<string | null>(null);
  const [isPreviewing, setIsPreviewing] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  
  // Mock result for preview
  const mockResult: StyleResult = {
    category: 'Elegante',
    score: 12,
    percentage: 40
  };
  const mockSecondaryStyles: StyleResult[] = [
    { category: 'Romântico', score: 9, percentage: 30 },
    { category: 'Clássico', score: 6, percentage: 20 },
    { category: 'Contemporâneo', score: 3, percentage: 10 }
  ];

  // Load template data
  useEffect(() => {
    const loadTemplate = async () => {
      setLoading(true);
      try {
        if (templateId) {
          const loadedTemplate = await getTemplateById(templateId);
          if (!loadedTemplate) {
            toast({
              title: 'Erro ao carregar template',
              description: 'Template não encontrado',
              variant: 'destructive'
            });
            onBack();
            return;
          }
          
          setTemplate(loadedTemplate);
          
          // Set first question as active by default
          if (loadedTemplate.questions && loadedTemplate.questions.length > 0) {
            setActiveQuestionId(loadedTemplate.questions[0].id);
          }
        }
      } catch (error) {
        console.error('Error loading template:', error);
        toast({
          title: 'Erro ao carregar template',
          description: 'Ocorreu um erro ao carregar o template',
          variant: 'destructive'
        });
        onBack();
      } finally {
        setLoading(false);
      }
    };
    
    loadTemplate();
  }, [templateId, onBack]);

  // Handle saving the template
  const handleSave = async () => {
    if (!template) return;
    
    setIsSaving(true);
    try {
      await saveTemplate(template);
      setLastSaved(new Date());
      toast({
        title: 'Template salvo',
        description: 'Todas as alterações foram salvas com sucesso',
      });
    } catch (error) {
      console.error('Error saving template:', error);
      toast({
        title: 'Erro ao salvar template',
        description: 'Ocorreu um erro ao salvar as alterações',
        variant: 'destructive'
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Update question handler
  const handleUpdateQuestion = (questionId: string, updatedQuestion: QuizQuestion) => {
    if (!template) return;
    
    const updatedQuestions = template.questions.map(q => 
      q.id === questionId ? updatedQuestion : q
    );
    
    setTemplate({
      ...template,
      questions: updatedQuestions,
      updatedAt: new Date().toISOString()
    });
  };

  // Add new question handler
  const handleAddQuestion = (newQuestion: QuizQuestion) => {
    if (!template) return;
    
    setTemplate({
      ...template,
      questions: [...template.questions, newQuestion],
      updatedAt: new Date().toISOString()
    });
    
    setActiveQuestionId(newQuestion.id);
  };

  // Delete question handler
  const handleDeleteQuestion = (questionId: string) => {
    if (!template) return;
    
    const updatedQuestions = template.questions.filter(q => q.id !== questionId);
    
    setTemplate({
      ...template,
      questions: updatedQuestions,
      updatedAt: new Date().toISOString()
    });
    
    // Set next active question
    if (updatedQuestions.length > 0) {
      setActiveQuestionId(updatedQuestions[0].id);
    } else {
      setActiveQuestionId(null);
    }
  };

  // Update result page settings
  const handleUpdateResultPage = (updatedSettings: any) => {
    if (!template) return;
    
    setTemplate({
      ...template,
      resultPageSettings: updatedSettings,
      updatedAt: new Date().toISOString()
    });
  };

  // Auto-save effect
  useEffect(() => {
    const autoSaveInterval = setInterval(() => {
      if (template && !isSaving) {
        handleSave();
      }
    }, 60000); // Auto-save every 60 seconds
    
    return () => clearInterval(autoSaveInterval);
  }, [template, isSaving]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-16">
        <Loader2 className="w-10 h-10 animate-spin text-[#B89B7A] mb-4" />
        <p className="text-[#432818]">Carregando template...</p>
      </div>
    );
  }

  if (!template) {
    return (
      <div className="p-6">
        <Button variant="outline" onClick={onBack} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>
        <div className="text-center">
          <p className="text-red-500">Template não encontrado.</p>
        </div>
      </div>
    );
  }

  const activeQuestion = activeQuestionId 
    ? template.questions.find(q => q.id === activeQuestionId)
    : null;

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Toolbar */}
      <div className="p-4 border-b flex justify-between items-center sticky top-0 z-10 bg-white">
        <div className="flex items-center gap-3">
          <Button variant="ghost" onClick={onBack} size="icon" className="rounded-full">
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-2xl font-playfair text-[#432818]">
            {template.name}
          </h1>
        </div>
        
        <div className="flex items-center gap-3">
          {lastSaved && !isPreviewing && (
            <span className="text-sm text-muted-foreground">
              {isSaving ? 'Salvando...' : `Salvo às ${lastSaved.toLocaleTimeString()}`}
            </span>
          )}
          
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
            disabled={isSaving}
          >
            {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
            Salvar
          </Button>
        </div>
      </div>
      
      {/* Editor Tabs */}
      <Tabs 
        value={activeTab} 
        onValueChange={(value) => setActiveTab(value as 'quiz' | 'result')} 
        className="flex-1 flex flex-col overflow-hidden"
      >
        <div className="border-b bg-white px-4">
          <TabsList>
            <TabsTrigger value="quiz">Quiz</TabsTrigger>
            <TabsTrigger value="result">Página de Resultados</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="quiz" className="flex-1 h-full overflow-hidden m-0 p-0">
          <ResizablePanelGroup direction="horizontal" className="h-full">
            {/* Left panel - Quiz steps */}
            <ResizablePanel defaultSize={20} minSize={15} maxSize={25}>
              <div className="h-full flex flex-col border-r">
                <div className="p-4 border-b bg-white flex justify-between items-center">
                  <h2 className="font-medium">Perguntas</h2>
                  <Button size="sm" variant="outline" onClick={() => {
                    // Add new question logic
                  }}>
                    <Plus className="w-3 h-3 mr-1" />
                    Adicionar
                  </Button>
                </div>
                <ScrollArea className="flex-1">
                  <QuizStepsList 
                    questions={template.questions}
                    activeQuestionId={activeQuestionId}
                    onSelectQuestion={setActiveQuestionId}
                    onAddQuestion={handleAddQuestion}
                  />
                </ScrollArea>
              </div>
            </ResizablePanel>
            
            <ResizableHandle withHandle />
            
            {/* Middle panel - Preview */}
            <ResizablePanel defaultSize={50}>
              <div className="h-full flex flex-col">
                <div className="p-4 border-b bg-white">
                  <h2 className="font-medium">Visualização</h2>
                </div>
                <div className="flex-1 overflow-auto p-4 bg-[#FAF9F7]">
                  <QuizPreview 
                    activeQuestion={activeQuestion}
                    isPreviewing={isPreviewing}
                  />
                </div>
              </div>
            </ResizablePanel>
            
            <ResizableHandle withHandle />
            
            {/* Right panel - Properties */}
            <ResizablePanel defaultSize={30} minSize={25} maxSize={40}>
              <div className="h-full flex flex-col border-l">
                <div className="p-4 border-b bg-white">
                  <h2 className="font-medium">Propriedades</h2>
                </div>
                <ScrollArea className="flex-1">
                  <QuizPropertyPanel 
                    question={activeQuestion}
                    onUpdateQuestion={handleUpdateQuestion}
                    onDeleteQuestion={handleDeleteQuestion}
                  />
                </ScrollArea>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </TabsContent>
        
        <TabsContent value="result" className="flex-1 h-full overflow-hidden m-0 p-0">
          <ResizablePanelGroup direction="horizontal" className="h-full">
            {/* Left panel - Result blocks */}
            <ResizablePanel defaultSize={20} minSize={15} maxSize={25}>
              <div className="h-full flex flex-col border-r">
                <div className="p-4 border-b bg-white flex justify-between items-center">
                  <h2 className="font-medium">Blocos</h2>
                  <Button size="sm" variant="outline" onClick={() => {
                    // Add new block logic
                  }}>
                    <Plus className="w-3 h-3 mr-1" />
                    Adicionar
                  </Button>
                </div>
                <ScrollArea className="flex-1">
                  <ResultBlocksList 
                    resultSettings={template.resultPageSettings}
                    activeBlockId={activeBlockId}
                    onSelectBlock={setActiveBlockId}
                  />
                </ScrollArea>
              </div>
            </ResizablePanel>
            
            <ResizableHandle withHandle />
            
            {/* Middle panel - Preview */}
            <ResizablePanel defaultSize={50}>
              <div className="h-full flex flex-col">
                <div className="p-4 border-b bg-white">
                  <h2 className="font-medium">Visualização do Resultado</h2>
                </div>
                <div className="flex-1 overflow-auto p-4 bg-[#FAF9F7]">
                  <ResultPagePreview 
                    primaryStyle={mockResult}
                    secondaryStyles={mockSecondaryStyles}
                    resultSettings={template.resultPageSettings}
                    activeBlockId={activeBlockId}
                    isPreviewing={isPreviewing}
                  />
                </div>
              </div>
            </ResizablePanel>
            
            <ResizableHandle withHandle />
            
            {/* Right panel - Properties */}
            <ResizablePanel defaultSize={30} minSize={25} maxSize={40}>
              <div className="h-full flex flex-col border-l">
                <div className="p-4 border-b bg-white">
                  <h2 className="font-medium">Propriedades</h2>
                </div>
                <ScrollArea className="flex-1">
                  <ResultPropertyPanel 
                    resultSettings={template.resultPageSettings}
                    activeBlockId={activeBlockId}
                    onUpdateSettings={handleUpdateResultPage}
                  />
                </ScrollArea>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InlineQuizEditor;
