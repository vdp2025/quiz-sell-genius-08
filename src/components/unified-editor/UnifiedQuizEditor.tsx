import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { QuizTemplate } from '@/types/quizTemplate';
import { Button } from '@/components/ui/button';
import { Loader2, Save, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { getTemplateById, saveTemplate } from '@/services/templates/templateService';
import QuizEditor from '@/components/quiz-editor/QuizEditor';
import { ResultPageEditorWithPreview } from './ResultPageEditorWithPreview';

interface UnifiedQuizEditorProps {
  templateId: string | null;
  onBack: () => void;
}

const UnifiedQuizEditor: React.FC<UnifiedQuizEditorProps> = ({ templateId, onBack }) => {
  const [template, setTemplate] = useState<QuizTemplate | null>(null);
  const [activeTab, setActiveTab] = useState<string>('questions');
  const [loading, setLoading] = useState<boolean>(true);
  const [isPreviewMode, setIsPreviewMode] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  useEffect(() => {
    if (templateId) {
      loadTemplate(templateId);
    }
  }, [templateId]);

  const loadTemplate = async (id: string) => {
    setLoading(true);
    try {
      const loadedTemplate = getTemplateById(id);
      if (loadedTemplate) {
        setTemplate(loadedTemplate);
      } else {
        toast({
          title: 'Erro ao carregar template',
          description: 'O template solicitado não foi encontrado.',
          variant: 'destructive'
        });
        onBack();
      }
    } catch (error) {
      console.error('Erro ao carregar template:', error);
      toast({
        title: 'Erro ao carregar template',
        description: 'Não foi possível carregar o template.',
        variant: 'destructive'
      });
      onBack();
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!template) return;
    
    setIsSaving(true);
    try {
      await saveTemplate(template);
      setLastSaved(new Date());
      toast({
        title: 'Template salvo',
        description: 'Todas as alterações foram salvas com sucesso.',
      });
    } catch (error) {
      console.error('Erro ao salvar template:', error);
      toast({
        title: 'Erro ao salvar',
        description: 'Não foi possível salvar as alterações.',
        variant: 'destructive'
      });
    } finally {
      setIsSaving(false);
    }
  };

  const updateQuestions = (questions: any[]) => {
    if (!template) return;
    
    setTemplate({
      ...template,
      questions,
      updatedAt: new Date().toISOString()
    });
  };

  const updateResultPageSettings = (resultPageSettings: any) => {
    if (!template) return;
    
    setTemplate({
      ...template,
      resultPageSettings,
      updatedAt: new Date().toISOString()
    });
  };

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
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar para Templates
        </Button>
        <p className="mt-4 text-red-500">Template não encontrado.</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-white">
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
          {!isPreviewMode && (
            <div className="text-sm text-muted-foreground">
              {isSaving ? (
                <span>Salvando...</span>
              ) : (
                lastSaved && (
                  <span>Salvo às {lastSaved.toLocaleTimeString()}</span>
                )
              )}
            </div>
          )}
          
          <Button
            variant="outline"
            onClick={() => setIsPreviewMode(!isPreviewMode)}
          >
            {isPreviewMode ? (
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
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-col flex-1">
        <div className="border-b bg-white px-4">
          <TabsList>
            <TabsTrigger value="questions">Perguntas do Quiz</TabsTrigger>
            <TabsTrigger value="results">Página de Resultados</TabsTrigger>
            <TabsTrigger value="settings">Configurações</TabsTrigger>
          </TabsList>
        </div>
        
        <div className="flex-1 overflow-hidden">
          <TabsContent value="questions" className="h-full m-0">
            <QuizEditor 
              template={template}
              onQuestionsUpdate={updateQuestions}
              isPreviewing={isPreviewMode}
            />
          </TabsContent>
          
          <TabsContent value="results" className="h-full m-0">
            <ResultPageEditorWithPreview
              template={template}
              onResultSettingsUpdate={updateResultPageSettings}
              isPreviewing={isPreviewMode}
            />
          </TabsContent>
          
          <TabsContent value="settings" className="p-6">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-xl font-semibold mb-4 text-[#432818]">Configurações do Template</h2>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="templateName" className="block text-sm font-medium mb-1">
                    Nome do Template
                  </label>
                  <input
                    id="templateName"
                    type="text"
                    value={template.name}
                    onChange={(e) => setTemplate({...template, name: e.target.value})}
                    className="w-full p-2 border rounded"
                  />
                </div>
                
                <div>
                  <label htmlFor="templateDescription" className="block text-sm font-medium mb-1">
                    Descrição
                  </label>
                  <textarea
                    id="templateDescription"
                    value={template.description}
                    onChange={(e) => setTemplate({...template, description: e.target.value})}
                    className="w-full p-2 border rounded h-24"
                  />
                </div>
                
                <div className="flex items-center">
                  <input
                    id="templateIsPublished"
                    type="checkbox"
                    checked={template.isPublished}
                    onChange={(e) => setTemplate({...template, isPublished: e.target.checked})}
                    className="mr-2"
                  />
                  <label htmlFor="templateIsPublished" className="text-sm font-medium">
                    Publicado
                  </label>
                </div>
                
                <div className="pt-4">
                  <Button 
                    className="bg-[#B89B7A] hover:bg-[#A38A69] w-full" 
                    onClick={handleSave}
                    disabled={isSaving}
                  >
                    {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                    Salvar Alterações
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default UnifiedQuizEditor;
