
import React from 'react';
import EnhancedQuizBuilder from '@/components/enhanced-editor/EnhancedQuizBuilder';
import { Navigate } from 'react-router-dom';

const QuizBuilderPage: React.FC = () => {
  // Redirect to the unified editor
  return <Navigate to="/admin/editor" replace />;
};

export default QuizBuilderPage;
