
import { useState } from 'react';
import QuizIntro from '../components/QuizIntro';
import QuizPage from '../components/QuizPage';
import { useQuizContext } from '../context/QuizContext';

const Index = () => {
  const [started, setStarted] = useState(false);
  const { quizCompleted } = useQuizContext();

  const handleStart = () => {
    setStarted(true);
    console.log('Quiz started');
  };

  return (
    <div className="min-h-screen bg-background">
      {!started ? (
        <QuizIntro onStart={handleStart} />
      ) : (
        <QuizPage />
      )}
    </div>
  );
};

export default Index;
