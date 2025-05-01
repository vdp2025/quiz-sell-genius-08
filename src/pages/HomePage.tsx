
import { useState } from 'react';
import QuizIntro from '../components/QuizIntro';
import QuizPage from '../components/QuizPage';
import { useQuizContext } from '../context/QuizContext';
import { useAuth } from '../context/AuthContext';
import { trackLeadGeneration, trackQuizStart, captureUTMParameters } from '@/utils/analytics';

const HomePage = () => {
  const [started, setStarted] = useState(false);
  const { startQuiz } = useQuizContext();
  const { login } = useAuth();

  const handleStart = async (name: string, email?: string) => {
    setStarted(true);
    login(name);
    
    // Capturar UTM parameters ao iniciar o quiz
    captureUTMParameters();
    
    // Rastrear início do quiz com dados do usuário
    trackQuizStart(name, email);
    
    // Se o email foi fornecido, registrar como lead
    if (email) {
      trackLeadGeneration(email);
    }
    
    console.log(`Quiz started by ${name}${email ? ` (${email})` : ''}`);
    localStorage.setItem('userName', name);
    if (email) localStorage.setItem('userEmail', email);
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
