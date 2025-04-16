
import React from 'react';
import { Card } from './ui/card';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import type { QuizQuestion, UserResponse } from '../types/quiz';

interface QuizQuestionProps {
  question: QuizQuestion;
  onAnswer: (response: UserResponse) => void;
  currentAnswers: string[];
}

export const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  onAnswer,
  currentAnswers,
}) => {
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {question.options.map((option) => (
          <div key={option.id} className="relative">
            {question.type !== 'text' && option.imageUrl && (
              <div className="mb-4 aspect-square relative overflow-hidden rounded-lg">
                <img
                  src={option.imageUrl}
                  alt={option.text}
                  className="object-cover w-full h-full"
                />
              </div>
            )}
            
            <div className="flex items-start space-x-3">
              <Checkbox
                id={option.id}
                checked={currentAnswers.includes(option.id)}
                onCheckedChange={() => handleOptionSelect(option.id)}
              />
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
