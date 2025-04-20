
import { useState, useCallback } from 'react';
import { QuizQuestion, QuizOption } from '@/types/quiz';
import { generateId } from '@/utils/idGenerator';

export const useQuizState = () => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [selectedQuestionId, setSelectedQuestionId] = useState<string | null>(null);

  const addQuestion = useCallback(() => {
    const newQuestion: QuizQuestion = {
      id: generateId(),
      title: 'Nova Pergunta',
      type: 'text',
      multiSelect: 3,
      options: []
    };

    setQuestions(prev => [...prev, newQuestion]);
    setSelectedQuestionId(newQuestion.id);
    return newQuestion.id;
  }, []);

  const updateQuestion = useCallback((questionId: string, updates: Partial<QuizQuestion>) => {
    setQuestions(prev =>
      prev.map(question =>
        question.id === questionId
          ? { ...question, ...updates }
          : question
      )
    );
  }, []);

  const deleteQuestion = useCallback((questionId: string) => {
    setQuestions(prev => prev.filter(question => question.id !== questionId));
    if (selectedQuestionId === questionId) {
      setSelectedQuestionId(null);
    }
  }, [selectedQuestionId]);

  const addOption = useCallback((questionId: string) => {
    const newOption: QuizOption = {
      id: generateId(),
      text: 'Nova opção',
      styleCategory: 'Natural',
      points: 1
    };

    setQuestions(prev =>
      prev.map(question =>
        question.id === questionId
          ? { ...question, options: [...question.options, newOption] }
          : question
      )
    );
  }, []);

  const updateOption = useCallback((questionId: string, optionId: string, updates: Partial<QuizOption>) => {
    setQuestions(prev =>
      prev.map(question =>
        question.id === questionId
          ? {
              ...question,
              options: question.options.map(option =>
                option.id === optionId
                  ? { ...option, ...updates }
                  : option
              )
            }
          : question
      )
    );
  }, []);

  const deleteOption = useCallback((questionId: string, optionId: string) => {
    setQuestions(prev =>
      prev.map(question =>
        question.id === questionId
          ? {
              ...question,
              options: question.options.filter(option => option.id !== optionId)
            }
          : question
      )
    );
  }, []);

  return {
    questions,
    selectedQuestionId,
    setSelectedQuestionId,
    addQuestion,
    updateQuestion,
    deleteQuestion,
    addOption,
    updateOption,
    deleteOption
  };
};
