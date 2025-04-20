
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import QuizPage from './pages/QuizPage';
import ResultPage from './pages/ResultPage';
import ResultadoEditorPage from './pages/admin/ResultadoEditorPage';
import '@/styles/globals.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/resultado" element={<ResultPage />} />
        <Route path="/admin/resultado-editor" element={<ResultadoEditorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
