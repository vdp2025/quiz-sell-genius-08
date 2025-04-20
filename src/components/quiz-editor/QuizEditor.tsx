
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { QuizEditorState, QUIZ_CATEGORIES, QuizCategory } from '@/types/quizEditor';
import { QuizQuestion } from '@/types/quiz';
import QuizCategoryTab from './QuizCategoryTab';
import QuestionEditor from './QuestionEditor';
import { Button } from '@/components/ui/button';
import { Plus, Save, ArrowLeft } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { generateId } from '@/utils/idGenerator';
import TemplateSelector from './TemplateSelector';
import { getTemplateById, saveTemplate } from '@/services/templates/templateService';
import { QuizTemplate } from '@/types/quizTemplate';

const QuizEditor: React.FC = () => {
  const [isSelectingTemplate, setIsSelectingTemplate] = useState(true);
  const [activeTab, setActiveTab] = useState<QuizCategory>('clothingQuestions');
  const [editorState, setEditorState] = useState<QuizEditorState>({
    questions: [],
    editingQuestionId: null,
    selectedCategory: null
  });
  const [currentTemplate, setCurrentTemplate] = useState<QuizTemplate | null>(null);

  // Handle template selection
  const handleSelectTemplate = async (templateId: string) => {
    try {
      const template = await getTemplateById(templateId);
      if (template) {
        setCurrentTemplate(template);
        
        // Organize questions by category
        const categoryQuestions: Record<QuizCategory, QuizQuestion[]> = {} as Record<QuizCategory, QuizQuestion[]>;
        
        // Initialize empty arrays for all categories
        QUIZ_CATEGORIES.forEach(category => {
          categoryQuestions[category.id] = [];
        });
        
        // Distribute questions to categories (this is just a simple example)
        // In a real implementation, you would need a way to determine which question belongs to which category
        template.questions.forEach(question => {
          // This is a placeholder - in reality, each question should have a category property
          // For now, we'll just put all questions in the first category
          categoryQuestions.clothingQuestions.push(question);
        });
        
        setEditorState(prevState => ({
          ...prevState,
          questions: categoryQuestions.clothingQuestions,
          editingQuestionId: null
        }));
        
        setIsSelectingTemplate(false);
      }
    } catch (error) {
      console.error('Error loading template:', error);
      toast({
        title: 'Erro ao carregar modelo',
        description: 'Não foi possível carregar o modelo selecionado',
        variant: 'destructive'
      });
    }
  };
  
  // Load questions when tab changes
  useEffect(() => {
    if (currentTemplate) {
      // This is a placeholder implementation
      // In a real app, you would have a way to filter questions by category
      setEditorState(prevState => ({
        ...prevState,
        questions: currentTemplate.questions.filter(q => q.id.includes(activeTab) || activeTab === 'clothingQuestions'),
        editingQuestionId: null
      }));
    }
  }, [activeTab, currentTemplate]);

  const handleAddQuestion = () => {
    const newQuestion: QuizQuestion = {
      id: generateId(),
      title: 'Nova Pergunta',
      type: 'text',
      multiSelect: 3,
      options: []
    };
    
    setEditorState(prevState => ({
      ...prevState,
      questions: [...prevState.questions, { ...newQuestion, isNew: true, isEditing: true }],
      editingQuestionId: newQuestion.id
    }));
  };

  const handleEditQuestion = (questionId: string) => {
    setEditorState(prevState => ({
      ...prevState,
      editingQuestionId: questionId
    }));
  };

  const handleSaveQuestion = (updatedQuestion: QuizQuestion) => {
    const updatedQuestions = editorState.questions.map(q => 
      q.id === updatedQuestion.id ? { ...updatedQuestion, isEditing: false } : q
    );
    
    setEditorState(prevState => ({
      ...prevState,
      questions: updatedQuestions,
      editingQuestionId: null
    }));
    
    // Update the template with the updated questions
    if (currentTemplate) {
      const templateQuestions = [...currentTemplate.questions];
      const questionIndex = templateQuestions.findIndex(q => q.id === updatedQuestion.id);
      
      if (questionIndex >= 0) {
        templateQuestions[questionIndex] = updatedQuestion;
      } else {
        templateQuestions.push(updatedQuestion);
      }
      
      setCurrentTemplate({
        ...currentTemplate,
        questions: templateQuestions,
        updatedAt: new Date().toISOString()
      });
    }
    
    toast({
      title: 'Pergunta salva com sucesso',
      description: 'As alterações foram salvas.',
    });
  };

  const handleDeleteQuestion = (questionId: string) => {
    const updatedQuestions = editorState.questions.filter(q => q.id !== questionId);
    
    setEditorState(prevState => ({
      ...prevState,
      questions: updatedQuestions,
      editingQuestionId: null
    }));
    
    // Update the template without the deleted question
    if (currentTemplate) {
      setCurrentTemplate({
        ...currentTemplate,
        questions: currentTemplate.questions.filter(q => q.id !== questionId),
        updatedAt: new Date().toISOString()
      });
    }
    
    toast({
      title: 'Pergunta removida',
      description: 'A pergunta foi removida com sucesso.',
    });
  };

  const handleSaveAllChanges = async () => {
    if (currentTemplate) {
      try {
        const success = await saveTemplate(currentTemplate);
        
        if (success) {
          toast({
            title: 'Alterações salvas',
            description: 'Todas as alterações foram salvas com sucesso.',
          });
        }
      } catch (error) {
        console.error('Error saving template:', error);
        toast({
          title: 'Erro ao salvar alterações',
          description: 'Não foi possível salvar as alterações',
          variant: 'destructive'
        });
      }
    }
  };

  const handleBackToTemplates = () => {
    setIsSelectingTemplate(true);
  };

  const currentQuestion = editorState.editingQuestionId 
    ? editorState.questions.find(q => q.id === editorState.editingQuestionId)
    : null;

  const isEditingQuestion = !!currentQuestion;

  if (isSelectingTemplate) {
    return (
      <div className="bg-white rounded-lg shadow-sm h-full p-6">
        <TemplateSelector onSelectTemplate={handleSelectTemplate} />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm h-full flex flex-col">
      <div className="p-4 border-b flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleBackToTemplates}
            className="rounded-full"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-2xl font-playfair text-[#432818]">
            {currentTemplate?.name || 'Editor de Quiz'}
          </h1>
        </div>
        <Button onClick={handleSaveAllChanges} className="bg-[#B89B7A] hover:bg-[#A38A69]">
          <Save className="w-4 h-4 mr-2" />
          Salvar Alterações
        </Button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left side - Category selection and question list */}
        <div className="w-1/3 border-r overflow-auto p-4">
          <Tabs defaultValue={activeTab} onValueChange={(value) => setActiveTab(value as QuizCategory)}>
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="styleQuestions">Estilo</TabsTrigger>
              <TabsTrigger value="strategicQuestions">Estratégicas</TabsTrigger>
            </TabsList>
            
            <TabsContent value="styleQuestions" className="space-y-4">
              {QUIZ_CATEGORIES.filter(cat => !cat.isStrategic).map(category => (
                <QuizCategoryTab 
                  key={category.id}
                  category={category}
                  isActive={activeTab === category.id}
                  onClick={() => setActiveTab(category.id)}
                  questions={
                    category.id === activeTab 
                      ? editorState.questions 
                      : currentTemplate?.questions.filter(
                          q => q.id.includes(category.id)
                        ) || []
                  }
                  onEditQuestion={handleEditQuestion}
                />
              ))}
            </TabsContent>
            
            <TabsContent value="strategicQuestions" className="space-y-4">
              {QUIZ_CATEGORIES.filter(cat => cat.isStrategic).map(category => (
                <QuizCategoryTab 
                  key={category.id}
                  category={category}
                  isActive={activeTab === category.id}
                  onClick={() => setActiveTab(category.id)}
                  questions={
                    category.id === activeTab 
                      ? editorState.questions 
                      : currentTemplate?.questions.filter(
                          q => q.id.includes(category.id)
                        ) || []
                  }
                  onEditQuestion={handleEditQuestion}
                />
              ))}
            </TabsContent>
          </Tabs>
          
          <div className="mt-6">
            <Button 
              onClick={handleAddQuestion} 
              className="w-full bg-[#B89B7A] hover:bg-[#A38A69]"
            >
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Pergunta
            </Button>
          </div>
        </div>
        
        {/* Right side - Question editor */}
        <div className="flex-1 overflow-auto p-4">
          {isEditingQuestion ? (
            <QuestionEditor 
              question={currentQuestion}
              onSave={handleSaveQuestion}
              onCancel={() => setEditorState(prev => ({...prev, editingQuestionId: null}))}
              onDelete={() => currentQuestion && handleDeleteQuestion(currentQuestion.id)}
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
              <p className="text-lg mb-4">Selecione uma pergunta para editar ou crie uma nova.</p>
              <Button 
                variant="outline" 
                onClick={handleAddQuestion}
                className="border-[#B89B7A] text-[#B89B7A]"
              >
                <Plus className="w-4 h-4 mr-2" />
                Nova Pergunta
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizEditor;
