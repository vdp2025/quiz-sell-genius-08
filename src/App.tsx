
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import QuizBuilderPage from './pages/QuizBuilderPage';
import ResultPageEditorPage from './pages/ResultPageEditorPage';
import { QuizProvider } from './context/QuizContext';

const App: React.FC = () => {
  return (
    <QuizProvider>
      <Router>
        <Routes>
          <Route path="/" element={<QuizBuilderPage />} />
          <Route path="/builder" element={<QuizBuilderPage />} />
          <Route path="/result-editor" element={<ResultPageEditorPage />} />
        </Routes>
      </Router>
    </QuizProvider>
  );
};

export default App;
