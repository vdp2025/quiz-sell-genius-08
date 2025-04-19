
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import QuizPage from './components/QuizPage';
import ResultPage from './pages/ResultPage';
import EditorPage from './pages/EditorPage';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from './components/ui/toaster';
import { QuizProvider } from './context/QuizContext';

function App() {
  return (
    <AuthProvider>
      <QuizProvider>
        <Router>
          <Routes>
            <Route path="/" element={<QuizPage />} />
            <Route path="/resultado" element={<ResultPage />} />
            <Route path="/editor" element={<EditorPage />} />
            <Route path="/editor/:style" element={<EditorPage />} />
          </Routes>
          <Toaster />
        </Router>
      </QuizProvider>
    </AuthProvider>
  );
}

export default App;
