
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { QuizProvider } from './context/QuizContext';
import HomePage from './pages/HomePage';
import QuizPage from './components/QuizPage';
import ResultPage from './pages/ResultPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import EditorPage from './pages/admin/EditorPage';
import SettingsPage from './pages/admin/SettingsPage';
import AnalyticsPage from './pages/admin/AnalyticsPage';
import NotFoundPage from './pages/NotFoundPage';
import { TooltipProvider } from '@/components/ui/tooltip';
import { initFacebookPixel, captureUTMParameters } from './utils/analytics';

const App = () => {
  useEffect(() => {
    // Inicializar o Facebook Pixel
    initFacebookPixel();
    
    // Capturar UTM parameters para analytics de marketing
    captureUTMParameters();
  }, []);

  return (
    <AuthProvider>
      <QuizProvider>
        <TooltipProvider>
          <Router>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/quiz" element={<QuizPage />} />
              <Route path="/resultado" element={<ResultPage />} />
              <Route path="/admin" element={<AdminDashboard />} />
              {/* Use the EditorPage as the main editor */}
              <Route path="/admin/editor" element={<EditorPage />} />
              <Route path="/admin/editor/unified" element={<EditorPage />} />
              <Route path="/admin/quiz-builder" element={<Navigate to="/admin/editor?tab=quiz" replace />} />
              <Route path="/admin/settings" element={<SettingsPage />} />
              <Route path="/admin/analytics" element={<AnalyticsPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Router>
        </TooltipProvider>
      </QuizProvider>
    </AuthProvider>
  );
};

export default App;
