
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { QuizProvider } from './context/QuizContext'; // Import the QuizProvider
import HomePage from './pages/HomePage';
import QuizPage from './components/QuizPage';
import ResultPage from './components/pages/ResultPage';
import AdminPage from './pages/admin/AdminPage';
import EditorPage from './pages/admin/EditorPage';
import QuizBuilderPage from './pages/admin/QuizBuilderPage';
import SettingsPage from './pages/admin/SettingsPage';
import NotFoundPage from './pages/NotFoundPage';

const App = () => {
  return (
    <AuthProvider>
      <QuizProvider> {/* Add the QuizProvider here */}
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/quiz" element={<QuizPage />} />
            <Route path="/resultado" element={<ResultPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/admin/editor" element={<EditorPage />} />
            <Route path="/admin/quiz-builder" element={<QuizBuilderPage />} />
            <Route path="/admin/settings" element={<SettingsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Router>
      </QuizProvider>
    </AuthProvider>
  );
};

export default App;
