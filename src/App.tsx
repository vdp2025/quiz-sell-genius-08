
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import QuizPage from './components/QuizPage';
import ResultPage from './pages/ResultPage';
import EditorPage from './pages/EditorPage';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from './components/ui/toaster';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<QuizPage />} />
          <Route path="/resultado" element={<ResultPage />} />
          <Route path="/editor" element={<Navigate to="/editor/Natural" replace />} />
          <Route path="/editor/:style" element={<EditorPage />} />
        </Routes>
        <Toaster />
      </Router>
    </AuthProvider>
  );
}

export default App;
