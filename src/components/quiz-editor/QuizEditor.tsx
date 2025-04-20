
import React, { useState, useEffect } from 'react';
import { QuizEditorState, QuizCategory } from '@/types/quizEditor';
import { QuizQuestion } from '@/types/quiz';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { generateId } from '@/utils/idGenerator';
import { QuizTemplate } from '@/types/quizTemplate';
import { saveTemplate } from '@/services/templates/templateService';
import QuestionEditor from './QuestionEditor';
import QuizTemplateSelector from './sections/QuizTemplateSelector';
import QuizEditorHeader from './sections/QuizEditorHeader';
import QuizCategoryTabs from './sections/QuizCategoryTabs';

const QuizEditor: React.FC = () => {
  const [isSelectingTemplate, setIsSelectingTemplate] = useState(true);
  const [activeTab, setActiveTab] = useState<QuizCategory>('clothingQuestions');
  const [editorState, setEditorState] = useState<QuizEditorState>({
    questions: [],
    editingQuestionId: null,
    selectedCategory: null
  });
  const [currentTemplate, setCurrentTemplate] = useState<QuizTemplate | null>(null);

  const handleSelectTemplate = (template: QuizTemplate) => {
    setCurrentTemplate(template);
    setEditorState(prevState => ({
      ...prevState,
      questions: template.questions,
      editingQuestionId: null
    }));
    setIsSelectingTemplate(false);
  };

  useEffect(() => {
    if (currentTemplate) {
      setEditorState(prevState => ({
        ...prevState,
        questions: currentTemplate.questions.filter(q => 
          q.id.includes(activeTab) || activeTab === 'clothingQuestions'
        ),
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

  const handleSaveQuestion = (updatedQuestion: QuizQuestion) => {
    const updatedQuestions = editorState.questions.map(q => 
      q.id === updatedQuestion.id ? { ...updatedQuestion, isEditing: false } : q
    );
    
    setEditorState(prevState => ({
      ...prevState,
      questions: updatedQuestions,
      editingQuestionId: null
    }));
    
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

  const currentQuestion = editorState.editingQuestionId 
    ? editorState.questions.find(q => q.id === editorState.editingQuestionId)
    : null;

  if (isSelectingTemplate) {
    return <QuizTemplateSelector onSelectTemplate={handleSelectTemplate} />;
  }

  return (
    <div className="bg-white rounded-lg shadow-sm h-full flex flex-col">
      <QuizEditorHeader
        currentTemplate={currentTemplate}
        onBackToTemplates={() => setIsSelectingTemplate(true)}
        onSaveChanges={handleSaveAllChanges}
      />

      <div className="flex flex-1 overflow-hidden">
        {/* Left side - Category selection and question list */}
        <div className="w-1/3 border-r overflow-auto p-4">
          <QuizCategoryTabs
            activeTab={activeTab}
            questions={editorState.questions}
            onTabChange={setActiveTab}
            onEditQuestion={(id) => setEditorState(prev => ({ ...prev, editingQuestionId: id }))}
          />
          
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
          {currentQuestion ? (
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
