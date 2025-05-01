
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from './components/ui/toaster';
import { AuthProvider } from './context/AuthContext';
import { QuizProvider } from './context/QuizContext';
import HomePage from './pages/HomePage';
import QuizPage from './components/QuizPage';
import ResultPage from './pages/ResultPage';
import AdminPage from './components/admin/AdminPage';
import LoginPage from './components/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import ProtectedRoute from './components/auth/ProtectedRoute.tsx';
import UnifiedEditorPage from './pages/UnifiedEditorPage';
import ResultPageEditor from './components/quiz-result/ResultPageEditor.lovable';

function App() {
  return (
    <Router>
      <AuthProvider>
        <QuizProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/quiz" element={<QuizPage />} />
            <Route path="/resultado" element={<ResultPage />} />
            <Route path="/login" element={<LoginPage />} />
            
            {/* Rotas protegidas (apenas admin) */}
            <Route element={<ProtectedRoute />}>
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/admin/editor/unified" element={<UnifiedEditorPage />} />
              <Route path="/admin/editor/result-editor" element={<ResultPageEditor />} />
            </Route>
            
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          
          <Toaster />
        </QuizProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
