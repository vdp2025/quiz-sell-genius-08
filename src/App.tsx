import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/react-query';
import { Toaster } from './components/ui/toaster';
import { LoadingState } from './components/ui/loading-state';
import { QuizProvider } from './context/QuizContext';
import Index from './pages/Index';
import ResultPage from './pages/ResultPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import QuizEditorPage from './pages/admin/QuizEditorPage';
import EditorResultadoPage from './pages/admin/EditorResultadoPage';
import SettingsPage from './pages/admin/SettingsPage';
import UTMAnalyticsPage from './pages/admin/UTMAnalyticsPage';
import UnifiedEditorPage from './pages/editor/UnifiedEditorPage';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <QuizProvider>
        <Router>
          <Suspense fallback={<LoadingState />}>
            <Routes>
              {/* Rotas públicas */}
              <Route path="/" element={<Index />} />
              <Route path="/resultado" element={<ResultPage />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/quiz-builder" element={<QuizEditorPage />} />
              <Route path="/admin/editor-resultado" element={<EditorResultadoPage />} />
              <Route path="/admin/settings" element={<SettingsPage />} />
              <Route path="/admin/utm-analytics" element={<UTMAnalyticsPage />} />
              <Route path="/admin/editor-unificado" element={<UnifiedEditorPage />} />
            </Routes>
          </Suspense>
          <Toaster />
        </Router>
      </QuizProvider>
    </QueryClientProvider>
  );
}

export default App;