import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Suspense } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/react-query';
import { AuthProvider, useAuth } from './context/AuthContext';
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

const ProtectedAdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isAdmin } = useAuth();
  if (!user || !isAdmin) {
    return <Navigate to="/" />;
  }
  return <>{children}</>;
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <QuizProvider>
          <Router>
            <Suspense fallback={<LoadingState />}>
              <Routes>
                {/* públicas */}
                <Route path="/" element={<Index />} />
                <Route path="/resultado" element={<ResultPage />} />

                {/* admin protegidas */}
                <Route
                  path="/admin"
                  element={
                    <ProtectedAdminRoute>
                      <AdminDashboard />
                    </ProtectedAdminRoute>
                  }
                />
                <Route
                  path="/admin/quiz-builder"
                  element={
                    <ProtectedAdminRoute>
                      <QuizEditorPage />
                    </ProtectedAdminRoute>
                  }
                />
                <Route
                  path="/admin/editor-resultado"
                  element={
                    <ProtectedAdminRoute>
                      <EditorResultadoPage />
                    </ProtectedAdminRoute>
                  }
                />
                <Route
                  path="/admin/settings"
                  element={
                    <ProtectedAdminRoute>
                      <SettingsPage />
                    </ProtectedAdminRoute>
                  }
                />
                <Route
                  path="/admin/utm-analytics"
                  element={
                    <ProtectedAdminRoute>
                      <UTMAnalyticsPage />
                    </ProtectedAdminRoute>
                  }
                />
              </Routes>
            </Suspense>
            <Toaster />
          </Router>
        </QuizProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
