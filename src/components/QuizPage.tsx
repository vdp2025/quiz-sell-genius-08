
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { QuizQuestion } from './QuizQuestion';
import { Button } from './ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { UserResponse } from '../types/quiz';
import { quizQuestions } from '../data/quizQuestions';

const QuizPage: React.FC = () => {
  const { user } = useAuth();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const currentAnswers = answers[currentQuestion.id] || [];
  const canProceed = currentAnswers.length === currentQuestion.multiSelect;

  const handleAnswer = (response: UserResponse) => {
    setAnswers(prev => ({
      ...prev,
      [response.questionId]: response.selectedOptions
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  return (
    <div className="min-h-screen bg-background px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-playfair text-[#432818]">
            Olá, {user.userName}!
          </h1>
          <div className="text-sm text-muted-foreground">
            Questão {currentQuestionIndex + 1} de {quizQuestions.length}
          </div>
        </div>

        <QuizQuestion
          question={currentQuestion}
          onAnswer={handleAnswer}
          currentAnswers={currentAnswers}
        />

        <div className="flex justify-between mt-8">
          <Button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            variant="outline"
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Anterior
          </Button>

          <Button
            onClick={handleNext}
            disabled={!canProceed}
            className="flex items-center gap-2 bg-[#B89B7A] hover:bg-[#B89B7A]/90"
          >
            {currentQuestionIndex === quizQuestions.length - 1 ? 'Finalizar' : 'Próxima'}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
