
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export const useNavigation = () => {
  const navigate = useNavigate();

  const navigateToEditor = useCallback(() => {
    navigate('/result-editor');
  }, [navigate]);

  const navigateToQuiz = useCallback(() => {
    navigate('/');
  }, [navigate]);

  const navigateToResult = useCallback(() => {
    navigate('/resultado');
  }, [navigate]);

  return {
    navigateToEditor,
    navigateToQuiz,
    navigateToResult
  };
};
