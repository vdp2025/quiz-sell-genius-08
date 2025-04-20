
import React from 'react';
import { StyleResult } from '@/types/quiz';

interface QuizResultHeaderProps {
  primaryStyle: StyleResult;
  styleDescription?: string;
}

export const QuizResultHeader: React.FC<QuizResultHeaderProps> = ({
  primaryStyle,
  styleDescription
}) => {
  return (
    <div className="text-center mb-8">
      <h1 className="text-2xl md:text-3xl font-playfair text-[#432818] mb-2">
        Seu Estilo Predominante é {primaryStyle.category}
      </h1>
      <div className="flex justify-center items-center mb-4">
        <div className="bg-[#B89B7A] h-1 w-20 rounded-full"></div>
      </div>
      {styleDescription && (
        <p className="text-[#8F7A6A] max-w-2xl mx-auto">
          {styleDescription}
        </p>
      )}
    </div>
  );
};
