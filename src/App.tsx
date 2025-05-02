
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import QuizPage from './pages/QuizPage';
import ResultPage from './pages/ResultPage';
import { QuizProvider } from './contexts/QuizContext';
import { GlobalStylesProvider } from './contexts/GlobalStylesContext';
import { ThemeProvider } from './providers/ThemeProvider';
import { Toaster } from './components/ui/toaster';
import { ThirdPartyScriptsProvider } from './providers/ThirdPartyScriptsProvider';
import { LoadingStateProvider } from './contexts/LoadingStateContext';
import ErrorPage from './pages/ErrorPage';
import MaintenancePage from './pages/MaintenancePage';
import DebugPage from './pages/DebugPage';
import VisualEditorPlaceholder from './components/editor/VisualEditorPlaceholder';

// Application configuration
const config = {
  maintenance: false // Set to true to enable maintenance mode
};

const App = () => {
  if (config.maintenance) {
    return <MaintenancePage />;
  }

  return (
    <ThemeProvider>
      <ThirdPartyScriptsProvider>
        <GlobalStylesProvider>
          <QuizProvider>
            <LoadingStateProvider>
              <Router>
                <Routes>
                  {/* Main routes */}
                  <Route path="/" element={<QuizPage />} />
                  <Route path="/resultado" element={<ResultPage />} />
                  
                  {/* Placeholder for the future visual editor */}
                  <Route path="/admin/editor" element={<VisualEditorPlaceholder />} />
                  
                  {/* Debug routes (only visible with debug param) */}
                  <Route path="/debug" element={<DebugPage />} />
                  
                  {/* Error handling */}
                  <Route path="/error" element={<ErrorPage />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </Router>
              <Toaster />
            </LoadingStateProvider>
          </QuizProvider>
        </GlobalStylesProvider>
      </ThirdPartyScriptsProvider>
    </ThemeProvider>
  );
};

export default App;
