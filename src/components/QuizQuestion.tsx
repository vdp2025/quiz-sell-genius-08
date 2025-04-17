
import React, { useEffect } from 'react';
import { Card } from './ui/card';
import { AnimatedWrapper } from './ui/animated-wrapper';
import { cn } from '@/lib/utils';
import type { QuizQuestion as QuizQuestionType, QuizOption, UserResponse } from '../types/quiz';
import { useIsMobile } from '@/hooks/use-mobile';

interface QuizQuestionProps {
  question: QuizQuestionType;
  onAnswer: (response: UserResponse) => void;
  currentAnswers: string[];
  autoAdvance?: boolean;
}

// Function to highlight strategic words with bold
const highlightStrategicWords = (text: string): React.ReactNode => {
  // List of strategic words to highlight based on style categories
  const strategicWords = [
    'confortáveis', 'soltos', 'práticos', 'discretas', 'clássico', 'despercebidas',
    'refinados', 'perfeito', 'atual', 'delicadas', 'suaves', 'fluídas',
    'marquem', 'decotes', 'fendas', 'estruturadas', 'assimétricas', 'modernas',
    'marcantes', 'mix', 'informal', 'espontânea', 'essencialista', 'conservadora',
    'exigente', 'sofisticada', 'feminina', 'meiga', 'sensível', 'glamorosa',
    'sensual', 'cosmopolita', 'audaciosa', 'exótica', 'aventureira', 'leve',
    'tradicional', 'casual', 'imponente', 'romântico', 'urbano', 'criativo',
    'colorido', 'ousado', 'discretos', 'sutis', 'clean', 'status', 'laços',
    'babados', 'couro', 'zíper', 'firmeza', 'peso', 'exclusivos', 'identidade',
    'flamingo', 'cores', 'marcado', 'definido'
  ];

  // Create a regex pattern from the strategic words
  const pattern = new RegExp(`(${strategicWords.join('|')})`, 'gi');
  
  // Split the text by the pattern and create an array of normal and bold elements
  const parts = text.split(pattern);
  
  return parts.map((part, index) => {
    // Check if this part matches any strategic word (case insensitive)
    if (strategicWords.some(word => part.toLowerCase() === word.toLowerCase())) {
      return <strong key={index}>{part}</strong>;
    }
    return part;
  });
};

const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  onAnswer,
  currentAnswers,
  autoAdvance = true,
}) => {
  const isMobile = useIsMobile();

  useEffect(() => {
    if (question.type !== 'text') {
      question.options.forEach(opt => {
        if (opt.imageUrl) {
          const img = new Image();
          img.src = opt.imageUrl;
        }
      });
    }
  }, [question]);

  const handleOptionSelect = (optionId: string) => {
    let newSelectedOptions: string[];
    
    if (currentAnswers.includes(optionId)) {
      newSelectedOptions = currentAnswers.filter(id => id !== optionId);
    } else {
      if (currentAnswers.length >= question.multiSelect) {
        newSelectedOptions = [...currentAnswers.slice(1), optionId];
      } else {
        newSelectedOptions = [...currentAnswers, optionId];
      }
    }
    
    onAnswer({
      questionId: question.id,
      selectedOptions: newSelectedOptions,
    });
  };

  return (
    <AnimatedWrapper>
      <Card className="w-full max-w-4xl mx-auto p-3 sm:p-8 bg-white shadow-md" id={`question-${question.id}`}>
        <h2 className="text-xl sm:text-2xl font-playfair text-center mb-3 sm:mb-8 text-[#432818]">
          {question.title}
        </h2>
        
        <div className={cn(
          "grid gap-2 sm:gap-6",
          question.type === 'text' 
            ? "grid-cols-1" 
            : isMobile ? "grid-cols-2" : "grid-cols-2"
        )}>
          {question.options.map((option) => (
            <div 
              key={option.id} 
              className="relative group"
              onClick={() => handleOptionSelect(option.id)}
            >
              <div 
                className={cn(
                  "transition-all duration-200 rounded-lg p-1 sm:p-4 cursor-pointer flex flex-col items-center",
                  currentAnswers.includes(option.id) 
                    ? "border-[#B89B7A] border-[0.5px] shadow-lg shadow-[#00000050] dark:shadow-[#000a]" 
                    : "border border-gray-200 hover:border-[#B89B7A]/50 hover:shadow-sm",
                )}
              >
                {question.type !== 'text' && option.imageUrl && (
                  <div className="mb-1 sm:mb-2 overflow-hidden rounded-lg border border-[#B89B7A]/10 w-full aspect-[3/4] max-w-[1000px] mx-auto">
                    <img
                      src={option.imageUrl}
                      alt={option.text}
                      className={cn(
                        "object-cover w-full h-full transition-transform duration-300",
                        currentAnswers.includes(option.id) ? "scale-105" : "group-hover:scale-105"
                      )}
                      onError={(e) => {
                        console.error(`Failed to load image: ${option.imageUrl}`);
                        e.currentTarget.src = 'https://via.placeholder.com/400?text=Image+Not+Found';
                      }}
                    />
                  </div>
                )}
                <p className={cn(
                  "cursor-pointer text-[#1A1818]/80 text-center max-w-[230px] sm:max-w-[280px] mx-auto",
                  question.type !== 'text' 
                    ? isMobile 
                      ? "text-[0.45rem] leading-[0.6rem]" 
                      : "text-2xs leading-none"
                    : isMobile 
                      ? "text-xs leading-tight" 
                      : "text-xs leading-tight"
                )}>
                  {highlightStrategicWords(option.text)}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <p className="text-xs sm:text-sm text-[#1A1818]/60 mt-3 sm:mt-6 text-center">
          Selecione {question.multiSelect} {question.multiSelect === 1 ? 'opção' : 'opções'}
        </p>
      </Card>
    </AnimatedWrapper>
  );
};

export { QuizQuestion };
