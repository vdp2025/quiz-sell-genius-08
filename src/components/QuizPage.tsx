
import React from 'react';
import { useAuth } from '../context/AuthContext';

const QuizPage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">
        Bem-vindo, {user.userName}!
      </h1>
      {/* Quiz content will be added here in the next steps */}
      <p>Seu quiz começará em breve...</p>
    </div>
  );
};

export default QuizPage;
