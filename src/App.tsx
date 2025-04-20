
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from './components/ui/toaster';
import { LoadingState } from './components/ui/loading-state';
import QuizPage from './components/QuizPage';

// Change the lazy loading implementation for ResultPage
const ResultPage = lazy(() => import('./pages/ResultPage').catch(() => {
  console.error('Failed to load ResultPage component');
  return { default: () => <div>Failed to load the result page. Please try again.</div> };
}));

// Only lazy load components that aren't on the main route
const EditorPage = lazy(() => import('./pages/EditorPage'));
const QuizBuilderPage = lazy(() => import('./pages/QuizBuilderPage'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const QuizEditorPage = lazy(() => import('./pages/admin/QuizEditorPage'));

function App() {
  return (
    <AuthProvider>
      <Router>
        <Suspense fallback={<LoadingState />}>
          <Routes>
            <Route path="/" element={<QuizPage />} />
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
    </AuthProvider>
  );
}

export default App;
