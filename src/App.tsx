import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Suspense } from 'react';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from './components/ui/toaster';
import { LoadingState } from './components/ui/loading-state';
import { QuizProvider } from './context/QuizContext';
import Index from './pages/Index';
import ResultPage from './pages/ResultPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import QuizBuilderPage from './pages/QuizBuilderPage';
import UnifiedEditorPage from './pages/UnifiedEditorPage';
import EditorIndexPage from './pages/EditorIndexPage';

const ProtectedAdminRoute = ({ children }: { children: React.ReactNode }) => {
  const isAdmin = true; // Implementar lógica real de verificação
  
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

function App() {
  return (
    <AuthProvider>
      <QuizProvider>
        <Router>
          <Suspense fallback={<LoadingState />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/resultado" element={<ResultPage />} />
              <Route path="/admin" element={<ProtectedAdminRoute><AdminDashboard /></ProtectedAdminRoute>} />
              <Route path="/admin/quiz-builder" element={<ProtectedAdminRoute><QuizBuilderPage /></ProtectedAdminRoute>} />
              
              <Route path="/editors" element={<EditorIndexPage />} />
              
              <Route path="/unified-editor" element={<UnifiedEditorPage />} />
              <Route path="/unified-editor/:id" element={<UnifiedEditorPage />} />
            </Routes>
          </Suspense>
          <Toaster />
        </Router>
      </QuizProvider>
    </AuthProvider>
  );
}

export default App;
