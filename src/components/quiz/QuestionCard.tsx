
import React from 'react';
import { QuizQuestion } from '../../types/quiz';
import { AnimatedWrapper } from '../ui/animated-wrapper';

interface QuestionCardProps {
  question: QuizQuestion;
  selectedOptions: string[];
  onSelect: (questionId: string, options: string[]) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  selectedOptions,
  onSelect
}) => {
  const handleOptionClick = (optionId: string) => {
    const isSelected = selectedOptions.includes(optionId);
    let newSelectedOptions: string[];
    
    if (isSelected) {
      // If already selected, remove it
      newSelectedOptions = selectedOptions.filter(id => id !== optionId);
    } else {
      // If not selected and we haven't reached the multi-select limit, add it
      if (selectedOptions.length < question.multiSelect) {
        newSelectedOptions = [...selectedOptions, optionId];
      } else {
        // If we've reached the limit, replace the first selected with the new one
        newSelectedOptions = [...selectedOptions.slice(1), optionId];
      }
    }
    
    onSelect(question.id, newSelectedOptions);
  };
  
  // Determine grid columns based on question type
  const gridCols = question.type === 'both' ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-1 md:grid-cols-2';
  
  return (
    <AnimatedWrapper className="mb-8">
      {question.imageUrl && (
        <div className="mb-6">
          <img 
            src={question.imageUrl} 
            alt={question.title}
            className="w-full h-auto rounded-lg object-cover"
          />
        </div>
      )}
      
      <div className={`grid ${gridCols} gap-4`}>
        {question.options.map((option) => (
          <div 
            key={option.id}
            onClick={() => handleOptionClick(option.id)}
            className={`cursor-pointer rounded-lg p-4 border-2 transition-all duration-200 flex flex-col
              ${selectedOptions.includes(option.id) 
                ? 'border-[#B89B7A] bg-[#B89B7A]/10' 
                : 'border-gray-200 hover:border-[#B89B7A]/50'}`}
          >
            {option.imageUrl && (
              <div className="mb-3">
                <img 
                  src={option.imageUrl} 
                  alt={option.text}
                  className="w-full h-auto rounded-md object-cover"
                />
              </div>
            )}
            
            <div className="flex items-start space-x-3">
              <div className={`flex-shrink-0 w-5 h-5 mt-0.5 rounded-full border-2 flex items-center justify-center
                ${selectedOptions.includes(option.id) 
                  ? 'border-[#B89B7A] bg-[#B89B7A]' 
                  : 'border-gray-300'}`}
              >
                {selectedOptions.includes(option.id) && (
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
              <p className="text-sm text-[#432818]">{option.text}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 text-sm text-[#8F7A6A]">
        Selecione {question.multiSelect} {question.multiSelect === 1 ? 'opção' : 'opções'}.
      </div>
    </AnimatedWrapper>
  );
};

export default QuestionCard;
