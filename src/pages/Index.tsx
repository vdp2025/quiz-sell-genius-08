
import { useState } from 'react';
import { QuizWelcome } from '../components/QuizWelcome';
import { AuthProvider } from '../context/AuthContext';
import QuizPage from '../components/QuizPage';
import { useQuiz } from '../context/QuizContext';

const Index = () => {
  const [started, setStarted] = useState(false);
  const { quizCompleted } = useQuiz();

  const handleStart = () => {
    setStarted(true);
  };

  return (
    <AuthProvider>
      <div className="min-h-screen bg-background">
        {!started ? (
          <QuizWelcome onStart={handleStart} />
        ) : (
          <QuizPage />
        )}
      </div>
    </AuthProvider>
  );
};

export default Index;
