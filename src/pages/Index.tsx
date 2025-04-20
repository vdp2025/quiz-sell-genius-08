
import { useQuizContext } from '../context/QuizContext';
import QuizPage from '../components/QuizPage';

const Index = () => {
  const { quizCompleted } = useQuizContext();

  return (
    <div className="min-h-screen bg-background">
      <QuizPage />
    </div>
  );
};

export default Index;
