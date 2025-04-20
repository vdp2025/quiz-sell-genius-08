
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from './components/ui/toaster';
import { LoadingState } from './components/ui/loading-state';

const QuizPage = lazy(() => import('./components/QuizPage'));
const ResultPage = lazy(() => import('./pages/ResultPage'));
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
          </Routes>
        </Suspense>
        <Toaster />
      </Router>
    </AuthProvider>
  );
}

export default App;
