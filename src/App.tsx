<<<<<<< HEAD
﻿
// Componente para rotas protegidas administrativas
const ProtectedAdminRoute = ({ children }: { children: React.ReactNode }) => {
  // Aqui vocÃª pode verificar se o usuÃ¡rio estÃ¡ autenticado e Ã© um administrador
  // Por enquanto, apenas renderizamos diretamente para fins de desenvolvimento
  const isAdmin = true; // Implementar lÃ³gica real de verificaÃ§Ã£o
=======

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Suspense } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/react-query';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from './components/ui/toaster';
import { LoadingState } from './components/ui/loading-state';
import { QuizProvider } from './context/QuizContext';
import Index from './pages/Index';
import ResultPage from './pages/ResultPage';
import ResultPageEditorPage from './pages/admin/ResultPageEditorPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import SettingsPage from './pages/admin/SettingsPage';
import UTMAnalyticsPage from './pages/admin/UTMAnalyticsPage';
import { useAuth } from './context/AuthContext';

const ProtectedAdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isAdmin } = useAuth();
>>>>>>> 1536c934da19267d874eb3db76aa0734c71d7cd9
  
  if (!user || !isAdmin) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

function App() {
  return (
<<<<<<< HEAD
    <AuthProvider>
      <QuizProvider>
        <Router>
          <Suspense fallback={<LoadingState />}>
            <Routes>
              {/* Rotas pÃºblicas */}
              <Route path="/" element={<Index />} />
              <Route path="/resultado" element={<ResultPage />} />
              
              {/* Rotas administrativas protegidas */}
              <Route path="/admin" element={<ProtectedAdminRoute><AdminDashboard /></ProtectedAdminRoute>} />
            </Routes>
          </Suspense>
          <Toaster />
        </Router>
      </QuizProvider>
    </AuthProvider>
=======
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <QuizProvider>
          <Router>
            <Suspense fallback={<LoadingState />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/resultado" element={<ResultPage />} />
                <Route path="/admin" element={<ProtectedAdminRoute><AdminDashboard /></ProtectedAdminRoute>} />
                <Route path="/admin/resultado-editor" element={<ProtectedAdminRoute><ResultPageEditorPage /></ProtectedAdminRoute>} />
                <Route path="/admin/settings" element={<ProtectedAdminRoute><SettingsPage /></ProtectedAdminRoute>} />
                <Route path="/admin/utm-analytics" element={<ProtectedAdminRoute><UTMAnalyticsPage /></ProtectedAdminRoute>} />
              </Routes>
            </Suspense>
            <Toaster />
          </Router>
        </QuizProvider>
      </AuthProvider>
    </QueryClientProvider>
>>>>>>> 1536c934da19267d874eb3db76aa0734c71d7cd9
  );
}

export default App;





