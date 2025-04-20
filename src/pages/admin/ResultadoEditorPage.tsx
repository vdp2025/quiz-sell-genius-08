
import React from 'react';
import { useQuiz } from '@/hooks/useQuiz';
import { ResultPageVisualEditor } from '@/components/result-editor/ResultPageVisualEditor';

const ResultadoEditorPage = () => {
  const { primaryStyle, secondaryStyles } = useQuiz();

  if (!primaryStyle) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="text-2xl font-playfair text-[#432818] mb-4">
            Resultados não encontrados
          </h1>
          <p className="text-[#8F7A6A] mb-6">
            Parece que você ainda não completou o quiz.
          </p>
          <a 
            href="/" 
            className="inline-block px-6 py-3 bg-[#B89B7A] hover:bg-[#8F7A6A] text-white rounded-md transition-colors"
          >
            Fazer o Quiz
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <ResultPageVisualEditor selectedStyle={primaryStyle} />
    </div>
  );
};

export default ResultadoEditorPage;
