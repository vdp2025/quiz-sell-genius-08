
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface QuizOptionProps {
  option: {
    id: string;
    text: string;
    image?: string;
  };
  isSelected: boolean;
  onSelect: (id: string) => void;
  disabled?: boolean;
}

const QuizOption: React.FC<QuizOptionProps> = ({
  option,
  isSelected,
  onSelect,
  disabled = false
}) => {
  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      onClick={() => !disabled && onSelect(option.id)}
      className={cn(
        "relative overflow-hidden rounded-lg border cursor-pointer transition-all duration-300",
        isSelected 
          ? "border-[#aa6b5d] ring-2 ring-[#aa6b5d] ring-opacity-50" 
          : "border-gray-200 hover:border-[#aa6b5d]/50",
        disabled && "opacity-60 cursor-not-allowed"
      )}
    >
      {/* Efeito de seleção estilo Typeform */}
      {isSelected && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 bg-gradient-to-r from-[#aa6b5d]/10 to-[#B89B7A]/10 z-0"
        />
      )}
      
      <div className="p-4 relative z-10">
        {option.image && (
          <div className="mb-3">
            <img 
              src={option.image} 
              alt={option.text}
              className="w-full h-auto rounded-md"
              loading="lazy"
            />
          </div>
        )}
        <p className={cn(
          "text-sm md:text-base transition-colors duration-300",
          isSelected ? "text-[#432818] font-medium" : "text-[#432818]/80"
        )}>
          {option.text}
        </p>
      </div>
      
      {/* Indicador de seleção animado */}
      {isSelected && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-2 right-2 w-5 h-5 rounded-full bg-[#aa6b5d] flex items-center justify-center"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 3L4.5 8.5L2 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>
      )}
    </motion.div>
  );
};

export default QuizOption;
