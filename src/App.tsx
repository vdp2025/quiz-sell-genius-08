
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import QuizPage from './components/QuizPage';
import ResultPage from './pages/ResultPage';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from './components/ui/toaster';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<QuizPage />} />
          <Route path="/resultado" element={<ResultPage />} />
        </Routes>
        <Toaster />
      </Router>
    </AuthProvider>
  );
}

export default App;
