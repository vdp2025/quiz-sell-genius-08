
import React from 'react';

interface LoadingStateProps {
  message?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ 
  message = 'Carregando...' 
}) => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-4">
      <div className="w-12 h-12 border-4 border-t-4 border-[#B89B7A] border-t-transparent rounded-full animate-spin" />
      <p className="mt-4 text-[#432818]">{message}</p>
    </div>
  );
};
