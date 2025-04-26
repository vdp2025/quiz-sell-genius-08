import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Suspense } from 'react';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from './components/ui/toaster';
import { LoadingState } from './components/ui/loading-state';
import { QuizProvider } from './context/QuizContext';
import { TooltipProvider } from './components/ui/tooltip'; // Adicione esta importação
import Index from './pages/Index';
import ResultPage from './pages/ResultPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import QuizBuilderPage from './pages/QuizBuilderPage';
import UnifiedEditorPage from './pages/UnifiedEditorPage';

// Componente para rotas protegidas administrativas
const ProtectedAdminRoute = ({ children }: { children: React.ReactNode }) => {
  // Aqui você pode verificar se o usuário está autenticado e é um administrador
  // Por enquanto, apenas renderizamos diretamente para fins de desenvolvimento
  const isAdmin = true; // Implementar lógica real de verificação
  
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

function App() {
  return (
    <TooltipProvider> {/* Adicione este provider como wrapper mais externo */}
      <AuthProvider>
        <QuizProvider>
          <Router>
            <Suspense fallback={<LoadingState />}>
              <Routes>
                {/* Rotas públicas */}
                <Route path="/" element={<Index />} />
                <Route path="/resultado" element={<ResultPage />} />
                
                {/* Rotas administrativas protegidas */}
                <Route path="/admin" element={<ProtectedAdminRoute><AdminDashboard /></ProtectedAdminRoute>} />
                <Route path="/admin/quiz-builder" element={<ProtectedAdminRoute><QuizBuilderPage /></ProtectedAdminRoute>} />
                <Route path="/admin/editor" element={<ProtectedAdminRoute><UnifiedEditorPage /></ProtectedAdminRoute>} />
              </Routes>
            </Suspense>
            <Toaster />
          </Router>
        </QuizProvider>
      </AuthProvider>
    </TooltipProvider>
  );
}

export default App;