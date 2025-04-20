
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { QUIZ_CATEGORIES, QuizCategory } from '@/types/quizEditor';
import { QuizQuestion } from '@/types/quiz';
import QuizCategoryTab from '../QuizCategoryTab';

interface QuizCategoryTabsProps {
  activeTab: QuizCategory;
  questions: QuizQuestion[];
  onTabChange: (category: QuizCategory) => void;
  onEditQuestion: (questionId: string) => void;
}

const QuizCategoryTabs: React.FC<QuizCategoryTabsProps> = ({
  activeTab,
  questions,
  onTabChange,
  onEditQuestion
}) => {
  return (
    <Tabs defaultValue={activeTab} onValueChange={(value) => onTabChange(value as QuizCategory)}>
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
            onClick={() => onTabChange(category.id)}
            questions={category.id === activeTab ? questions : []}
            onEditQuestion={onEditQuestion}
          />
        ))}
      </TabsContent>
      
      <TabsContent value="strategicQuestions" className="space-y-4">
        {QUIZ_CATEGORIES.filter(cat => cat.isStrategic).map(category => (
          <QuizCategoryTab 
            key={category.id}
            category={category}
            isActive={activeTab === category.id}
            onClick={() => onTabChange(category.id)}
            questions={category.id === activeTab ? questions : []}
            onEditQuestion={onEditQuestion}
          />
        ))}
      </TabsContent>
    </Tabs>
  );
};

export default QuizCategoryTabs;
