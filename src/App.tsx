
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Index from './pages/Index';
import { ThemeProvider } from './components/theme-provider';
import { Toaster } from './components/ui/toaster';
import { QuizProvider } from './context/QuizContext';
import { AuthProvider } from './context/AuthContext';
import QuizBuilder from './components/quiz-builder/QuizBuilder';
import QuizResult from './components/QuizResult';

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="quiz-theme">
      <AuthProvider>
        <QuizProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/admin/quiz-builder" element={<QuizBuilder />} />
              <Route path="/resultado" element={
                <QuizResult 
                  primaryStyle={{
                    category: "Elegante",
                    score: 12,
                    percentage: 40
                  }}
                  secondaryStyles={[
                    {
                      category: "Romântico",
                      score: 9,
                      percentage: 30
                    },
                    {
                      category: "Clássico",
                      score: 6,
                      percentage: 20
                    },
                    {
                      category: "Contemporâneo",
                      score: 3,
                      percentage: 10
                    }
                  ]}
                />
              } />
            </Routes>
            
            {process.env.NODE_ENV === 'development' && (
              <div className="fixed bottom-4 right-4 z-50 bg-white p-3 rounded-lg shadow-lg">
                <div className="flex flex-col gap-2">
                  <Link to="/" className="text-sm text-[#432818] hover:underline">Home</Link>
                  <Link to="/admin/quiz-builder" className="text-sm text-[#432818] hover:underline">Quiz Builder</Link>
                  <Link to="/resultado" className="text-sm text-[#432818] hover:underline">Resultado</Link>
                </div>
              </div>
            )}
          </Router>
          <Toaster />
        </QuizProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
