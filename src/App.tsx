
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Suspense } from 'react';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from './components/ui/toaster';
import { LoadingState } from './components/ui/loading-state';
import { QuizProvider } from './context/QuizContext';
import Index from './pages/Index';
import ResultPage from './pages/ResultPage';
import ResultPageEditorPage from './pages/admin/ResultPageEditorPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import { useAuth } from './context/AuthContext';

const ProtectedAdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isAdmin } = useAuth();
  
  if (!user || !isAdmin) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <AuthProvider>
      <QuizProvider>
        <Router>
          <Suspense fallback={<LoadingState />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/resultado" element={<ResultPage />} />
              <Route path="/admin" element={<ProtectedAdminRoute><AdminDashboard /></ProtectedAdminRoute>} />
              <Route path="/admin/resultado-editor" element={<ProtectedAdminRoute><ResultPageEditorPage /></ProtectedAdminRoute>} />
              <Route path="/admin/settings" element={<ProtectedAdminRoute><SettingsPage /></ProtectedAdminRoute>} />
              <Route path="/admin/utm-analytics" element={<ProtectedAdminRoute><UTMAnalyticsPage /></ProtectedAdminRoute>} />
            </Routes>
          </Suspense>
          <Toaster />
        </Router>
      </QuizProvider>
    </AuthProvider>
  );
}

export default App;
