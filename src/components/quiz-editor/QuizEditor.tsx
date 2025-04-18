
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { QuizEditorState, QUIZ_CATEGORIES, QuizCategory } from '@/types/quizEditor';
import { QuizQuestion } from '@/types/quiz';
import QuizCategoryTab from './QuizCategoryTab';
import QuestionEditor from './QuestionEditor';
import { Button } from '@/components/ui/button';
import { Plus, Save } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { generateId } from '@/utils/idGenerator';

// Import all question categories
import { clothingQuestions } from '@/data/questions/clothingQuestions';
import { personalityQuestions } from '@/data/questions/personalityQuestions';
import { accessoriesQuestions } from '@/data/questions/accessoriesQuestions';
import { stylePreferencesQuestions } from '@/data/questions/stylePreferencesQuestions';
import { outerwearQuestions } from '@/data/questions/outerwearQuestions';
import { accessoryStyleQuestions } from '@/data/questions/accessoryStyleQuestions';
import { selfPerceptionQuestions } from '@/data/questions/selfPerceptionQuestions';
import { styleExperienceQuestions } from '@/data/questions/styleExperienceQuestions';
import { purchaseIntentQuestions } from '@/data/questions/purchaseIntentQuestions';
import { desiredOutcomesQuestions } from '@/data/questions/desiredOutcomesQuestions';

// Map to get questions by category
const questionsMap: Record<QuizCategory, QuizQuestion[]> = {
  clothingQuestions,
  personalityQuestions,
  accessoriesQuestions,
  stylePreferencesQuestions,
  outerwearQuestions,
  accessoryStyleQuestions,
  selfPerceptionQuestions,
  styleExperienceQuestions,
  purchaseIntentQuestions,
  desiredOutcomesQuestions
};

const QuizEditor: React.FC = () => {
  const [activeTab, setActiveTab] = useState<QuizCategory>('clothingQuestions');
  const [editorState, setEditorState] = useState<QuizEditorState>({
    questions: [],
    editingQuestionId: null,
    selectedCategory: null
  });
  
  // Load questions when tab changes
  useEffect(() => {
    const questions = questionsMap[activeTab] || [];
    setEditorState(prevState => ({
      ...prevState,
      questions: [...questions],
      editingQuestionId: null
    }));
  }, [activeTab]);

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
    setEditorState(prevState => ({
      ...prevState,
      questions: prevState.questions.map(q => 
        q.id === updatedQuestion.id ? { ...updatedQuestion, isEditing: false } : q
      ),
      editingQuestionId: null
    }));
    
    toast({
      title: "Pergunta salva com sucesso",
      description: "As alterações foram salvas.",
    });
  };

  const handleDeleteQuestion = (questionId: string) => {
    setEditorState(prevState => ({
      ...prevState,
      questions: prevState.questions.filter(q => q.id !== questionId),
      editingQuestionId: null
    }));
    
    toast({
      title: "Pergunta removida",
      description: "A pergunta foi removida com sucesso.",
    });
  };

  const handleSaveAllChanges = () => {
    // In a real app, this would save to a database
    // For now, just show a success message
    toast({
      title: "Alterações salvas",
      description: "Todas as alterações foram salvas com sucesso.",
    });
  };

  const currentQuestion = editorState.editingQuestionId 
    ? editorState.questions.find(q => q.id === editorState.editingQuestionId)
    : null;

  const isEditingQuestion = !!currentQuestion;

  return (
    <div className="bg-white rounded-lg shadow-sm h-full flex flex-col">
      <div className="p-4 border-b flex justify-between items-center">
        <h1 className="text-2xl font-playfair text-[#432818]">Editor de Quiz</h1>
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
                  questions={questionsMap[category.id] || []}
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
                  questions={questionsMap[category.id] || []}
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
