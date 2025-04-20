
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { styleQuizTemplate } from '@/services/templates/styleQuizTemplate';
import { QuizComponentData } from '@/types/quizBuilder';

interface LoadExistingQuizProps {
  onLoadQuiz: (components: QuizComponentData[]) => void;
}

export const LoadExistingQuiz: React.FC<LoadExistingQuizProps> = ({ onLoadQuiz }) => {
  const handleLoadStyleQuiz = () => {
    const components: QuizComponentData[] = styleQuizTemplate.map((question, index) => ({
      id: question.id,
      type: 'multipleChoice',
      order: index,
      data: {
        title: question.title,
        question: question.title,
        options: question.options.map(opt => opt.text),
        // Store the full option objects in a separate property for later use
        fullOptions: question.options.map(opt => ({
          text: opt.text,
          imageUrl: opt.imageUrl,
          styleCategory: opt.styleCategory
        })),
        multiSelect: question.multiSelect,
        questionType: question.type
      },
      style: {
        paddingY: '16',
        paddingX: '16',
        backgroundColor: '',
        textColor: '',
        borderRadius: 0
      }
    }));
    
    onLoadQuiz(components);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-playfair text-[#432818] mb-6">Carregar Quiz Existente</h1>
      
      <Card className="cursor-pointer hover:border-[#B89B7A] transition-colors"
            onClick={handleLoadStyleQuiz}>
        <CardHeader>
          <CardTitle>Quiz de Estilo</CardTitle>
          <CardDescription>
            Quiz para descoberta do estilo pessoal com 10 perguntas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">
            10 perguntas com opções de texto e imagem
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
