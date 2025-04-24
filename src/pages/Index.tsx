
import { useState } from 'react';
import QuizIntro from '../components/QuizIntro';
import QuizPage from '../components/QuizPage';
import { useQuiz } from '../context/QuizContext';

const Index = () => {
  const [started, setStarted] = useState(false);
  const { resetQuiz } = useQuiz();

  const handleStart = async (name: string) => {
    setStarted(true);
    resetQuiz();
    console.log(`Quiz started by ${name}`);
    localStorage.setItem('userName', name);
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
