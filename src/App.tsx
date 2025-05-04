
import ABTestResults from './pages/admin/ABTestResults';
import React from 'react';
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
import { Toaster } from '@/components/ui/toaster';
import { ABTestProvider } from './contexts/ABTestContext';

function App() {
  return (
    <QuizProvider>
      <ABTestProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/quiz" element={<QuizPage />} />
            <Route path="/resultado" element={<ResultPage />} />
            <Route path="/resultado/editar" element={<Navigate to="/admin/editor?tab=result" replace />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/editor" element={<EditorPage />} />
            <Route path="/admin/quiz-builder" element={<Navigate to="/admin/editor?tab=quiz" replace />} />
            <Route path="/admin/settings" element={<SettingsPage />} />
            <Route path="/admin/analytics" element={<AnalyticsPage />} />
            <Route path="/admin/ab-test" element={<ABTestResults />} />
          </Routes>
        </Router>
      </ABTestProvider>
    </QuizProvider>
  );
}

export default App;
