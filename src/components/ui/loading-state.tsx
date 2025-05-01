
import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingStateProps {
  message?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ 
  message = "Carregando..." 
}) => {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center bg-[#FAF9F7]">
      <Loader2 className="h-8 w-8 animate-spin text-[#B89B7A] mb-4" />
      <p className="text-[#8F7A6A]">{message}</p>
    </div>
  );
};
