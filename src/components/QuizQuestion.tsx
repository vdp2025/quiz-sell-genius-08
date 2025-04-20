
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { QuizQuestion as QuizQuestionType, UserResponse } from '../types/quiz';
import { QuizOption } from './quiz/QuizOption';

interface QuizQuestionProps {
  question: QuizQuestionType;
  onAnswer: (response: UserResponse) => void;
  currentAnswers: string[];
  onNextClick: () => void;
}

export const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  onAnswer,
  currentAnswers,
  onNextClick
}) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const { multiSelect } = question;
  
  // Initialize selected options from current answers
  useEffect(() => {
    setSelectedOptions(currentAnswers || []);
  }, [currentAnswers, question.id]);

  const handleOptionSelect = (optionId: string) => {
    setSelectedOptions(prevSelected => {
      const isSelected = prevSelected.includes(optionId);
      
      if (isSelected) {
        // Remove the option if it's already selected
        const newSelection = prevSelected.filter(id => id !== optionId);
        
        // Update the parent component with the new selection
        onAnswer({
          questionId: question.id,
          selectedOptions: newSelection
        });
        
        return newSelection;
      } else {
        // Add the option, but respect multiSelect limit
        let newSelection = [...prevSelected];
        
        if (newSelection.length >= multiSelect) {
          // If we already have the maximum number of selections, remove the first one
          newSelection = newSelection.slice(1);
        }
        
        newSelection.push(optionId);
        
        // Update the parent component with the new selection
        onAnswer({
          questionId: question.id,
          selectedOptions: newSelection
        });
        
        return newSelection;
      }
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto px-4 mb-8"
    >
      <div className="mb-6">
        <h2 className="text-2xl font-playfair text-[#432818] mb-4 text-center sm:text-left">
          {question.title}
        </h2>
        <p className="text-[#8F7A6A] mb-4 text-center sm:text-left">
          Selecione <span className="font-medium">{multiSelect}</span> {multiSelect === 1 ? 'opção' : 'opções'} para continuar
        </p>
      </div>

      <div className={`grid gap-6 ${question.type === 'both' ? 'sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'sm:grid-cols-1 md:grid-cols-2'}`}>
        {question.options.map(option => (
          <QuizOption
            key={option.id}
            option={option}
            isSelected={selectedOptions.includes(option.id)}
            onSelect={() => handleOptionSelect(option.id)}
            questionType={question.type}
          />
        ))}
      </div>

      {selectedOptions.length === multiSelect && (
        <div className="mt-8 text-center">
          <Button
            onClick={onNextClick}
            className="bg-[#B89B7A] hover:bg-[#A38A69] text-white px-8 py-6 rounded-md"
          >
            Continuar
          </Button>
        </div>
      )}
    </motion.div>
  );
};
