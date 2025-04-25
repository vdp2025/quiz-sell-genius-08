import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Suspense } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/react-query';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Toaster } from './components/ui/toaster';
import { LoadingState } from './components/ui/loading-state';
import { QuizProvider } from './context/QuizContext';
import Index from './pages/Index';
import ResultPage from './pages/ResultPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import QuizEditorPage from './pages/admin/QuizEditorPage';
import EditorResultadoPage from './pages/admin/EditorResultadoPage';
import SettingsPage from './pages/admin/SettingsPage';
import UTMAnalyticsPage from './pages/admin/UTMAnalyticsPage';

const ProtectedAdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isAdmin } = useAuth();
  if (!user || !isAdmin) {
    return <Navigate to="/" />;
  }
  return <>{children}</>;
};

function App() {
  return (
    <div className="bg-blue-500 text-white p-8 rounded-lg text-2xl">
      Tailwind está funcionando! 🚀
    </div>
  );
}

export default App;