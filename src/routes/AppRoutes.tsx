
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Import pages
import HomePage from '@/pages/HomePage';
import QuizPage from '@/pages/QuizPage';
import ResultPage from '@/pages/ResultPage';
import VerificationPage from '@/pages/VerificationPage';
import AdminPage from '@/pages/admin/AdminPage';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import EditorPage from '@/pages/admin/EditorPage';
import TypeformEditorPage from '@/pages/admin/TypeformEditorPage';
import QuizTemplatesPage from '@/pages/admin/QuizTemplatesPage';
import ResultsPage from '@/pages/admin/ResultsPage';
import StatisticsPage from '@/pages/admin/StatisticsPage';
import SettingsPage from '@/pages/admin/SettingsPage';
import UnifiedEditorPage from '@/pages/UnifiedEditorPage';
import NotFoundPage from '@/pages/NotFoundPage';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/quiz" element={<QuizPage />} />
      <Route path="/resultado" element={<ResultPage />} />
      <Route path="/verification" element={<VerificationPage />} />
      
      {/* Admin routes */}
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/dashboard" element={<AdminPage />} />
      <Route path="/admin/editor" element={<Navigate to="/admin/editor/unified" replace />} />
      <Route path="/admin/editor/unified" element={<UnifiedEditorPage />} />
      <Route path="/admin/editor/typeform" element={<TypeformEditorPage />} />
      <Route path="/admin/templates" element={<QuizTemplatesPage />} />
      <Route path="/admin/results" element={<ResultsPage />} />
      <Route path="/admin/statistics" element={<StatisticsPage />} />
      <Route path="/admin/settings" element={<SettingsPage />} />
      
      {/* Fallback route */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
