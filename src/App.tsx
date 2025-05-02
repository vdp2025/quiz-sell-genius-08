
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { QuizProvider } from './context/QuizContext';
import HomePage from './pages/HomePage';
import QuizPage from './components/QuizPage';
import ResultPage from './pages/ResultPage'; // Ensure we're importing from pages, not components
import AdminDashboard from './pages/admin/AdminDashboard';
import EditorPage from './pages/admin/EditorPage';
import SettingsPage from './pages/admin/SettingsPage';
import AnalyticsPage from './pages/admin/AnalyticsPage';
import NotFoundPage from './pages/NotFoundPage';
import { TooltipProvider } from '@/components/ui/tooltip';
import { initFacebookPixel, captureUTMParameters } from './utils/analytics';
import ResultPageEditorPage from './pages/ResultPageEditorPage';

const App = () => {
  // Initialize Facebook Pixel as soon as the app loads
  useEffect(() => {
    // Initialize Facebook Pixel
    initFacebookPixel();
    
    // Capture UTM parameters for marketing analytics
    captureUTMParameters();
    
    // Re-initialize Facebook Pixel on route changes
    const handleRouteChange = () => {
      initFacebookPixel();
      if (window.fbq) {
        window.fbq('track', 'PageView');
        console.log('PageView tracked on route change');
      }
    };
    
    // Add listener for route changes
    window.addEventListener('popstate', handleRouteChange);
    
    // Clean up the listener
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
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
              <Route path="/resultado/editar" element={<ResultPageEditorPage />} />
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
