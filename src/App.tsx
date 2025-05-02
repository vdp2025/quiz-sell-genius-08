
import { useState, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import ResultPage from './pages/ResultPage';
import { QuizProvider } from './context/QuizContext';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from './components/ui/toaster';
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

  return (
    <>
      <AuthProvider>
        <QuizProvider>
          <Routes>
            <Route path="/" element={<Navigate to="/resultado" replace />} />
            <Route path="/resultado" element={<ResultPage />} />
            <Route path="/admin/editor/result/enhanced" element={<EnhancedResultEditorPage />} />
          </Routes>
          <Toaster />
          <BuildInfo />
        </QuizProvider>
      </AuthProvider>
    </>
  );
}

export default App;
