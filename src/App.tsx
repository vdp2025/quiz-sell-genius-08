
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import QuizPage from './components/QuizPage';
import ResultPage from './pages/ResultPage';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from './components/ui/toaster';
import QuizEditorPage from './pages/admin/QuizEditorPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<QuizPage />} />
          <Route path="/resultado" element={<ResultPage />} />
          <Route path="/admin/quiz-editor" element={<QuizEditorPage />} />
        </Routes>
        <Toaster />
      </Router>
    </AuthProvider>
  );
}

export default App;
