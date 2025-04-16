
import React, { useEffect } from 'react';
import { Card } from './ui/card';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import type { QuizQuestion as QuizQuestionType, UserResponse } from '../types/quiz';

interface QuizQuestionProps {
  question: QuizQuestionType;
  onAnswer: (response: UserResponse) => void;
  currentAnswers: string[];
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  onAnswer,
  currentAnswers,
}) => {
  // Log any image URLs to check their format
  useEffect(() => {
    if (question.type !== 'text') {
      console.log('Question with images:', question.title);
      question.options.forEach(opt => {
        if (opt.imageUrl) {
          console.log('Image URL:', opt.imageUrl);
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
    <Card className="w-full max-w-4xl mx-auto p-8">
      <h2 className="text-2xl font-playfair text-center mb-8 text-[#432818]">
        {question.title}
      </h2>
      
      <div className={`grid gap-6 ${question.type === 'text' ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}>
        {question.options.map((option) => (
          <div key={option.id} className="relative flex items-start space-x-3">
            <Checkbox
              id={option.id}
              checked={currentAnswers.includes(option.id)}
              onCheckedChange={() => handleOptionSelect(option.id)}
            />
            <div className="flex-1">
              {question.type !== 'text' && option.imageUrl && (
                <div className="mb-4 aspect-square relative overflow-hidden rounded-lg">
                  <img
                    src={option.imageUrl}
                    alt={option.text}
                    className="object-cover w-full h-full"
                    onError={(e) => {
                      console.error(`Failed to load image: ${option.imageUrl}`);
                      e.currentTarget.src = 'https://via.placeholder.com/400?text=Image+Not+Found';
                    }}
                  />
                </div>
              )}
              <Label
                htmlFor={option.id}
                className="text-sm leading-relaxed cursor-pointer"
              >
                {option.text}
              </Label>
            </div>
          </div>
        ))}
      </div>
      
      <p className="text-sm text-muted-foreground mt-6 text-center">
        Selecione {question.multiSelect} {question.multiSelect === 1 ? 'opção' : 'opções'}
      </p>
    </Card>
  );
};

export { QuizQuestion };
