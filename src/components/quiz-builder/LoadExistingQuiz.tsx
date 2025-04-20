
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { styleQuizTemplate } from '@/services/templates/styleQuizTemplate';
import { QuizComponentData, QuizStep } from '@/types/quizBuilder';

interface LoadExistingQuizProps {
  onLoadQuiz: (steps: QuizStep[]) => void;
}

export const LoadExistingQuiz: React.FC<LoadExistingQuizProps> = ({ onLoadQuiz }) => {
  const handleLoadStyleQuiz = () => {
    // Create welcome step (cover)
    const welcomeStep: QuizStep = {
      id: `step-welcome`,
      title: 'Capa do Quiz',
      components: [
        {
          id: 'header-welcome',
          type: 'header',
          order: 0,
          data: {
            title: 'Descubra o seu Estilo',
            subtitle: 'Responda às perguntas abaixo e descubra seu estilo pessoal'
          },
          style: {
            paddingY: '24',
            paddingX: '16',
            backgroundColor: '',
            textColor: '',
            borderRadius: 0
          }
        },
        {
          id: 'text-welcome',
          type: 'text',
          order: 1,
          data: {
            text: 'Este quiz vai te ajudar a descobrir seu estilo pessoal predominante e como você pode usá-lo para escolher roupas que combinem com sua personalidade.'
          },
          style: {
            paddingY: '16',
            paddingX: '16',
            backgroundColor: '',
            textColor: '',
            borderRadius: 0
          }
        }
      ]
    };
    
    // Create steps for each question
    const questionSteps: QuizStep[] = styleQuizTemplate.map((question, index) => {
      const component: QuizComponentData = {
        id: question.id,
        type: 'multipleChoice',
        order: 0,
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
      };
      
      return {
        id: `step-${index + 1}`,
        title: `Pergunta ${index + 1}`,
        components: [component]
      };
    });
    
    // Create results step
    const resultsStep: QuizStep = {
      id: `step-results`,
      title: 'Resultados',
      components: [
        {
          id: 'quizResult-main',
          type: 'quizResult',
          order: 0,
          data: {
            title: 'Seu Estilo Principal',
            subtitle: 'Baseado nas suas respostas'
          },
          style: {
            paddingY: '16',
            paddingX: '16',
            backgroundColor: '',
            textColor: '',
            borderRadius: 0
          }
        }
      ]
    };
    
    // Combine all steps
    const allSteps = [welcomeStep, ...questionSteps, resultsStep];
    
    onLoadQuiz(allSteps);
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
