import React from 'react';
import { useQuizBuilder } from '@/hooks/useQuizBuilder';

interface ExportButtonProps {
  className?: string;
}

export const ExportButton: React.FC<ExportButtonProps> = ({ className = '' }) => {
  const { components, stages } = useQuizBuilder();

  const handleExport = () => {
    const dataStr = JSON.stringify({ components, stages }, null, 2);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
    
    const exportFileDefaultName = `quiz-config-${new Date().toISOString().slice(0, 10)}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <button
      onClick={handleExport}
      className={`px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 ${className}`}
    >
      Exportar JSON
    </button>
  );
};

export default ExportButton; 