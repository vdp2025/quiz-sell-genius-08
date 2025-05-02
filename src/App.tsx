
import { useState, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage';
import QuizPage from './pages/QuizPage';
import ResultPage from './pages/ResultPage';
import EnhancedQuizBuilder from './components/enhanced-editor/EnhancedQuizBuilder';
import ResultPageEditorPage from './pages/ResultPageEditorPage';
import { QuizProvider } from './context/QuizContext';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { Toaster } from './components/ui/toaster';
import { Analytics } from './components/Analytics';
import BuildInfo from './components/BuildInfo';
import EnhancedResultEditorPage from './pages/EnhancedResultEditorPage';

function App() {
  const [hasShownWelcome, setHasShownWelcome] = useState(false);

  useEffect(() => {
    // Check if the user has seen the welcome page
    const welcomeSeen = localStorage.getItem('welcomeSeen');
    if (welcomeSeen) {
      setHasShownWelcome(true);
    }
  }, []);

  const handleWelcomeComplete = () => {
    localStorage.setItem('welcomeSeen', 'true');
    setHasShownWelcome(true);
  };

  return (
    <ThemeProvider>
      <AuthProvider>
        <QuizProvider>
          <Routes>
            <Route
              path="/"
              element={
                hasShownWelcome ? (
                  <Navigate to="/quiz" replace />
                ) : (
                  <WelcomePage onComplete={handleWelcomeComplete} />
                )
              }
            />
            <Route path="/quiz" element={<QuizPage />} />
            <Route path="/resultado" element={<ResultPage />} />
            <Route path="/admin/editor" element={<EnhancedQuizBuilder />} />
            <Route path="/admin/editor/result" element={<ResultPageEditorPage />} />
            <Route path="/admin/editor/result/enhanced" element={<EnhancedResultEditorPage />} />
          </Routes>
          <Toaster />
          <Analytics />
          <BuildInfo />
        </QuizProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
