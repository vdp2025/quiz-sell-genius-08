
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { QuizProvider } from './context/QuizContext';
import HomePage from './pages/HomePage';
import QuizPage from './components/QuizPage';
import ResultPage from './pages/ResultPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import UnifiedEditorPage from './pages/UnifiedEditorPage';
import SettingsPage from './pages/admin/SettingsPage';
import NotFoundPage from './pages/NotFoundPage';
import { TooltipProvider } from '@/components/ui/tooltip';

const App = () => {
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
              {/* Simplify editor routes - redirect all editor routes to unified editor */}
              <Route path="/admin/editor" element={<Navigate to="/admin/editor/unified" replace />} />
              <Route path="/admin/editor/unified" element={<UnifiedEditorPage />} />
              <Route path="/admin/quiz-builder" element={<Navigate to="/admin/editor/unified?tab=quiz" replace />} />
              <Route path="/admin/settings" element={<SettingsPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Router>
        </TooltipProvider>
      </QuizProvider>
    </AuthProvider>
  );
};

export default App;
