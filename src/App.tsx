
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import QuizPage from './components/QuizPage';
import ResultPage from './pages/ResultPage';
import EditorPage from './pages/EditorPage';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from './components/ui/toaster';
import TemplateBrowser from './components/templates/TemplateBrowser';
import PremiumExpertTemplate from './components/templates/premium-expert/PremiumExpertTemplate';
import EmotionalJourneyTemplate from './components/templates/emotional-journey/EmotionalJourneyTemplate';

function App() {
  // Mock data for templates
  const mockStyleResult = {
    category: 'Natural',
    score: 100,
    percentage: 100
  };
  
  const mockSecondaryStyles = [
    { category: 'Romântico', score: 60, percentage: 60 },
    { category: 'Elegante', score: 40, percentage: 40 }
  ];
  
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<QuizPage />} />
          <Route path="/resultado" element={<ResultPage />} />
          <Route path="/editor" element={<EditorPage />} />
          <Route path="/editor/:style" element={<EditorPage />} />
          <Route path="/templates" element={<TemplateBrowser />} />
          <Route 
            path="/template/premium-expert" 
            element={<PremiumExpertTemplate primaryStyle={mockStyleResult} secondaryStyles={mockSecondaryStyles} />}
          />
          <Route 
            path="/template/emotional-journey" 
            element={<EmotionalJourneyTemplate primaryStyle={mockStyleResult} secondaryStyles={mockSecondaryStyles} />}
          />
        </Routes>
        <Toaster />
      </Router>
    </AuthProvider>
  );
}

export default App;
