
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from './components/ui/toaster';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import QuizEditorPage from './pages/admin/QuizEditorPage';
import QuizListPage from './pages/admin/QuizListPage';
import UnifiedQuizEditorPage from './pages/admin/UnifiedQuizEditorPage';
import QuizPage from './pages/public/QuizPage';
import QuizResultPage from './pages/public/QuizResultPage';
import NotFoundPage from './pages/NotFoundPage';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Navigate to="/quiz" replace />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/quiz/result" element={<QuizResultPage />} />
          
          {/* Admin routes */}
          <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
          <Route path="/admin/quizzes" element={<QuizListPage />} />
          
          {/* Quiz Editor Routes */}
          <Route path="/admin/quiz-editor" element={<Navigate to="/admin/unified-editor" replace />} />
          <Route path="/admin/quiz-editor/:templateId" element={<QuizEditorPage />} />
          
          {/* New Unified Editor Routes */}
          <Route path="/admin/unified-editor" element={<UnifiedQuizEditorPage />} />
          <Route path="/admin/unified-editor/:templateId" element={<UnifiedQuizEditorPage />} />
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        
        <Toaster />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
