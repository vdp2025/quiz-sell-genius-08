
import { useState, useMemo } from 'react';
import { QuizStep } from '@/types/quizBuilder';

export const useStepSearch = (steps: QuizStep[]) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSteps = useMemo(() => {
    if (!searchQuery.trim()) return steps;

    const query = searchQuery.toLowerCase();
    return steps.filter(step => {
      // Search in title
      if (step.title.toLowerCase().includes(query)) return true;
      
      // Search in components content
      return step.components.some(component => {
        const data = component.data;
        return (
          (data.title?.toLowerCase().includes(query)) ||
          (data.text?.toLowerCase().includes(query)) ||
          (data.question?.toLowerCase().includes(query))
        );
      });
    });
  }, [steps, searchQuery]);

  return {
    searchQuery,
    setSearchQuery,
    filteredSteps
  };
};
