
import React from 'react';

export const QuizContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#FAF9F7] flex flex-col">
      <div className="flex-1 max-w-5xl mx-auto w-full p-4 md:p-8">
        {children}
      </div>
    </div>
  );
};
