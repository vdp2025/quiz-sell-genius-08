
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react'; // Removido ErrorBoundary
import { AuthProvider } from './context/AuthContext';
import { Toaster } from './components/ui/toaster';
import { LoadingState } from './components/ui/loading-state';
import { QuizProvider } from './context/QuizContext';
// Importar Index em vez de QuizPage diretamente
import Index from './pages/Index';
// Import ResultPage normalmente to avoid lazy loading issues
import ResultPage from './pages/ResultPage';
// Only lazy load components that aren't on the main route
const EditorPage = lazy(() => import('./pages/EditorPage'));
const QuizBuilderPage = lazy(() => import('./pages/QuizBuilderPage'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const QuizEditorPage = lazy(() => import('./pages/admin/QuizEditorPage'));

// Simple error boundary component
const ErrorFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-white">
    <div className="text-center p-6">
      <h1 className="text-2xl font-semibold text-red-600 mb-4">
        Algo deu errado
      </h1>
      <p className="text-gray-600 mb-6">
        Houve um erro ao carregar esta página. Por favor, tente novamente.
      </p>
      <a href="/" className="inline-block px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-colors">
        Voltar para o início
      </a>
    </div>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <QuizProvider>
        <Router>
          <Suspense fallback={<LoadingState />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/resultado" element={<ResultPage />} />
              <Route path="/editor" element={<EditorPage />} />
              <Route path="/editor/:style" element={<EditorPage />} />
              <Route path="/builder" element={<QuizBuilderPage />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/quiz-editor" element={<QuizEditorPage />} />
              <Route path="/admin/quiz-editor/:templateId" element={<QuizEditorPage />} />
            </Routes>
          </Suspense>
          <Toaster />
        </Router>
      </QuizProvider>
    </AuthProvider>
  );
}

export default App;
