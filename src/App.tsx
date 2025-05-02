
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { QuizProvider } from './context/QuizContext';
import HomePage from './pages/HomePage';
import QuizPage from './components/QuizPage';
import ResultPage from './pages/ResultPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import EditorPage from './pages/admin/EditorPage';
import SettingsPage from './pages/admin/SettingsPage';
import AnalyticsPage from './pages/admin/AnalyticsPage';
import NotFoundPage from './pages/NotFoundPage';
import { TooltipProvider } from '@/components/ui/tooltip';
import { initFacebookPixel, captureUTMParameters } from './utils/analytics';
import ResultPageEditorPage from './pages/ResultPageEditorPage';
import { Toaster } from '@/components/ui/toaster';

// Avalia se o dispositivo tem performance limitada
const isLowPerformanceDevice = () => {
  const memory = (navigator as any).deviceMemory;
  if (memory && memory < 4) return true;
  
  // Se o dispositivo tem menos de 4GB de RAM ou não tem informação disponível, verificar CPU cores
  const cpuCores = navigator.hardwareConcurrency;
  if (cpuCores && cpuCores < 4) return true;
  
  return false;
};

const App = () => {
  const [pixelLoaded, setPixelLoaded] = useState(false);
  const lowPerformance = isLowPerformanceDevice();

  // Inicializar analytics na montagem do componente
  useEffect(() => {
    // Inicializar Facebook Pixel
    initFacebookPixel();
    setPixelLoaded(true);
    
    // Capturar UTM parameters para analytics de marketing
    captureUTMParameters();
    
    console.log(`App initialized with performance optimization${lowPerformance ? ' (low-performance mode)' : ''}`);
  }, [lowPerformance]);

  // Reinicializar Facebook Pixel em mudanças de rota
  useEffect(() => {
    if (!pixelLoaded) return;
    
    // Função para lidar com mudanças de rota
    const handleRouteChange = () => {
      if (window.fbq) {
        window.fbq('track', 'PageView');
        console.log('PageView tracked on route change');
      }
    };
    
    // Adicionar listener para mudanças de rota
    window.addEventListener('popstate', handleRouteChange);
    
    // Limpar o listener
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, [pixelLoaded]);

  return (
    <AuthProvider>
      <QuizProvider>
        <TooltipProvider>
          <Router>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/quiz" element={<QuizPage />} />
              <Route path="/resultado" element={<ResultPage />} />
              <Route path="/resultado/editar" element={<ResultPageEditorPage />} />
              <Route path="/admin" element={<AdminDashboard />} />
              {/* Use the EditorPage as the main editor */}
              <Route path="/admin/editor" element={<EditorPage />} />
              <Route path="/admin/editor/unified" element={<EditorPage />} />
              <Route path="/admin/quiz-builder" element={<Navigate to="/admin/editor?tab=quiz" replace />} />
              <Route path="/admin/settings" element={<SettingsPage />} />
              <Route path="/admin/analytics" element={<AnalyticsPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Router>
          <Toaster />
        </TooltipProvider>
      </QuizProvider>
    </AuthProvider>
  );
};

export default App;
