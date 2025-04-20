
import React from 'react';
import { User } from '../../types/auth';
import { Question, UserResponse } from '../../types/quiz';

interface QuizContentProps {
  user: User | null;
  currentQuestionIndex: number;
  totalQuestions: number;
  showingStrategicQuestions: boolean;
  currentStrategicQuestionIndex: number;
  currentQuestion: Question;
  currentAnswers: string[];
  handleAnswerSubmit: (response: UserResponse) => void;
  handleNextClick: () => void;
  handlePrevious: () => void;
}

export const QuizContent: React.FC<QuizContentProps> = ({
  user,
  currentQuestionIndex,
  totalQuestions,
  showingStrategicQuestions,
  currentStrategicQuestionIndex,
  currentQuestion,
  currentAnswers,
  handleAnswerSubmit,
  handleNextClick,
  handlePrevious
}) => {
  const handleOptionClick = (optionId: string) => {
    // Create a copy of the current answers
    let newAnswers = [...currentAnswers];
    
    // Check if this option is already selected
    const isSelected = newAnswers.includes(optionId);
    
    if (isSelected) {
      // If selected, remove it
      newAnswers = newAnswers.filter(id => id !== optionId);
    } else {
      // If not selected and we haven't reached the limit, add it
      if (newAnswers.length < currentQuestion.multiSelect) {
        newAnswers.push(optionId);
      } else if (currentQuestion.multiSelect === 1) {
        // If single select, replace the existing selection
        newAnswers = [optionId];
      }
    }
    
    handleAnswerSubmit({
      questionId: currentQuestion.id,
      selectedOptions: newAnswers
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div className="mb-6">
        <h2 className="text-xl font-medium text-[#432818]">{currentQuestion.title}</h2>
        {currentQuestion.multiSelect > 1 && (
          <p className="text-sm text-[#8F7A6A] mt-1">
            Selecione {currentQuestion.multiSelect} opções
          </p>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {currentQuestion.options.map((option) => (
          <button
            key={option.id}
            onClick={() => handleOptionClick(option.id)}
            className={`p-4 border rounded-lg text-left transition flex items-start gap-3 ${
              currentAnswers.includes(option.id)
                ? 'bg-[#B89B7A]/10 border-[#B89B7A]'
                : 'border-gray-200 hover:border-[#B89B7A]/50'
            }`}
          >
            <div className="shrink-0 mt-1">
              <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                currentAnswers.includes(option.id)
                  ? 'border-[#B89B7A] bg-[#B89B7A]'
                  : 'border-gray-300'
              }`}>
                {currentAnswers.includes(option.id) && (
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                )}
              </div>
            </div>
            <div>
              <span className="block font-medium text-[#432818]">{option.text}</span>
              {option.imageUrl && (
                <img 
                  src={option.imageUrl}
                  alt={option.text}
                  className="w-full h-auto mt-2 rounded-md" 
                />
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
