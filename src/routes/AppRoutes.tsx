
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Import pages
import HomePage from '@/pages/HomePage';
// Import pages directly from their correct paths
import QuizPage from '@/pages/QuizPage.tsx';
import ResultPage from '@/pages/ResultPage';
import VerificationPage from '@/pages/VerificationPage.tsx';
import AdminPage from '@/pages/admin/AdminPage';
import EditorPage from '@/pages/admin/EditorPage';
import TypeformEditorPage from '@/pages/admin/TypeformEditorPage';
import QuizTemplatesPage from '@/pages/admin/QuizTemplatesPage.tsx';
import ResultsPage from '@/pages/admin/ResultsPage.tsx';
import StatisticsPage from '@/pages/admin/StatisticsPage.tsx';
import SettingsPage from '@/pages/admin/SettingsPage';
import UnifiedEditorPage from '@/pages/UnifiedEditorPage';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/quiz" element={<QuizPage />} />
      <Route path="/result" element={<ResultPage />} />
      <Route path="/verification" element={<VerificationPage />} />
      
      {/* Admin routes */}
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/admin/editor" element={<EditorPage />} />
      <Route path="/admin/editor/typeform" element={<TypeformEditorPage />} />
      <Route path="/admin/editor/unified" element={<UnifiedEditorPage />} />
      <Route path="/admin/templates" element={<QuizTemplatesPage />} />
      <Route path="/admin/results" element={<ResultsPage />} />
      <Route path="/admin/statistics" element={<StatisticsPage />} />
      <Route path="/admin/settings" element={<SettingsPage />} />
      
      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
