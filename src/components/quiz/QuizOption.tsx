import React from 'react';
import { QuizOptionImage } from '@/components/quiz/QuizOption';
import { cn } from '@/lib/utils';

interface QuizQuestionProps {
  question: string;
  options: {
    imageUrl: string;
    altText: string;
    styleCategory: string;
  }[];
  selectedOptions: string[];
  onSelectOption: (styleCategory: string) => void;
  is3DQuestion?: boolean;
  questionId: string;
}

export const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  options,
  selectedOptions,
  onSelectOption,
  is3DQuestion = false,
  questionId,
}) => {
  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold mb-4">{question}</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {options.map((option, index) => (
          <div
            key={index}
            className={cn(
              'cursor-pointer border rounded-md overflow-hidden transition-all',
              selectedOptions.includes(option.styleCategory)
                ? 'border-brand-gold/50'
                : 'border-transparent'
            )}
            onClick={() => onSelectOption(option.styleCategory)}
          >
            <QuizOptionImage
              imageUrl={option.imageUrl}
              altText={option.altText}
              styleCategory={option.styleCategory}
              isSelected={selectedOptions.includes(option.styleCategory)}
              is3DQuestion={is3DQuestion}
              questionId={questionId}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
