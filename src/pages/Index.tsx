
import { useState } from 'react';
import { QuizWelcome } from '../components/QuizWelcome';
import QuizPage from '../components/QuizPage';
import { useQuizContext } from '../context/QuizContext';

const Index = () => {
  const [started, setStarted] = useState(false);
  const { quizCompleted } = useQuizContext();

  const handleStart = () => {
    setStarted(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {!started ? (
        <QuizWelcome onStart={handleStart} />
      ) : (
        <QuizPage />
      )}
    </div>
  );
};

export default Index;
