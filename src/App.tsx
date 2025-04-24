import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import QuizResult from './components/quiz-result/QuizResult';
import Quiz from './components/quiz/Quiz';
import { styleConfig } from './config/styleConfig';
import QuizBuilderPage from './pages/QuizBuilderPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Quiz />} />
        <Route
          path="/resultado"
          element={
            <QuizResult
              primaryStyle={{
                category: 'Elegante',
                score: 12,
                percentage: 40
              }}
              secondaryStyles={[
                {
                  category: 'Romântico',
                  score: 9,
                  percentage: 30
                },
                {
                  category: 'Clássico',
                  score: 6,
                  percentage: 20
                },
                {
                  category: 'Contemporâneo',
                  score: 3,
                  percentage: 10
                }
              ]}
            />
          }
        />
        <Route path="/admin/quiz-builder" element={<QuizBuilderPage />} />
      </Routes>
    </Router>
  );
}

export default App;
