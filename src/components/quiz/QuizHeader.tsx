
import React from 'react';
import { cn } from '@/lib/utils';

interface QuizHeaderProps {
  userName?: string;
  currentQuestionIndex: number;
  totalQuestions: number;
  showingStrategicQuestions?: boolean;
  currentStrategicQuestionIndex?: number;
}

export const QuizHeader: React.FC<QuizHeaderProps> = ({
  userName = '',
  currentQuestionIndex,
  totalQuestions,
  showingStrategicQuestions = false,
  currentStrategicQuestionIndex = 0
}) => {
  const progress = showingStrategicQuestions
    ? 100
    : Math.round((currentQuestionIndex / (totalQuestions - 1)) * 100);

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-[#B89B7A]/10">
      <div className="container mx-auto p-4 flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-3 md:mb-0">
          <img 
            src="/lovable-uploads/d9da05d3-6fdd-46d0-afea-42417af058c5.png" 
            alt="Quiz de Estilo Pessoal"
            className="h-10" 
          />
          
          {userName && (
            <div className="ml-4 text-[#432818] hidden md:block">
              Olá, <span className="font-medium">{userName}</span>!
            </div>
          )}
        </div>
        
        <div className="w-full md:w-1/2 flex flex-col">
          <div className="flex justify-between text-xs text-[#8F7A6A] mb-1 px-1">
            <span>
              {showingStrategicQuestions 
                ? 'Perguntas Finais' 
                : `Pergunta ${currentQuestionIndex + 1}/${totalQuestions}`}
            </span>
            <span>{progress}% Completo</span>
          </div>
          
          <div className="w-full bg-[#F3E8E6] h-2 rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#B89B7A] transition-all duration-500 ease-out rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </header>
  );
};
