
import { useState } from 'react';
import QuizIntro from '../components/QuizIntro';
import QuizPage from '../components/QuizPage';
import { useQuizContext } from '../context/QuizContext';
import { useAuth } from '../context/AuthContext';

const HomePage = () => {
  const [started, setStarted] = useState(false);
  const { startQuiz } = useQuizContext(); // This will now work as we have the QuizProvider in App.tsx
  const { login } = useAuth();

  const handleStart = async (name: string) => {
    setStarted(true);
    login(name);
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

export default HomePage;
