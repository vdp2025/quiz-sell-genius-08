
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import QuizPage from './components/QuizPage';
import ResultPage from './pages/ResultPage';
import EditorPage from './pages/EditorPage';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from './components/ui/toaster';

function App() {
  // Função para obter o estilo do usuário se disponível
  const getUserStyle = () => {
    try {
      const savedResult = localStorage.getItem('quizResult');
      if (savedResult) {
        const parsedResult = JSON.parse(savedResult);
        if (parsedResult.primaryStyle && parsedResult.primaryStyle.category) {
          return parsedResult.primaryStyle.category;
        }
      }
    } catch (error) {
      console.error('Erro ao obter o estilo do usuário:', error);
    }
    return 'Natural'; // Fallback
  };

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<QuizPage />} />
          <Route path="/resultado" element={<ResultPage />} />
          <Route path="/editor" element={<Navigate to={`/editor/${getUserStyle()}`} replace />} />
          <Route path="/editor/:style" element={<EditorPage />} />
        </Routes>
        <Toaster />
      </Router>
    </AuthProvider>
  );
}

export default App;
