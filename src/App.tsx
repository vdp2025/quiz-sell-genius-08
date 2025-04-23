
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from './components/ui/toaster';
import { LoadingState } from './components/ui/loading-state';
import { QuizProvider } from './context/QuizContext';
import Index from './pages/Index';
import ResultPage from './pages/ResultPage';

function App() {
  return (
    <AuthProvider>
      <QuizProvider>
        <Router>
          <Suspense fallback={<LoadingState />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/resultado" element={<ResultPage />} />
            </Routes>
          </Suspense>
          <Toaster />
        </Router>
      </QuizProvider>
    </AuthProvider>
  );
}

export default App;
