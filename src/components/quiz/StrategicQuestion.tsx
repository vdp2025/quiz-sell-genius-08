import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Lightbulb, ArrowRight } from 'lucide-react';

interface StrategicQuestionProps {
  question: {
    id: string;
    text: string;
    description?: string;
    imageUrl: string;
    imageAlt?: string;
  };
  children: React.ReactNode;
  index: number;
}

export const StrategicQuestion: React.FC<StrategicQuestionProps> = ({
  question,
  children,
  index
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="mb-8"
    >
      <Card className="overflow-hidden border-0 shadow-lg bg-gradient-to-r from-[#fff7f3] to-[#f9f4ef]">
        <div className="grid md:grid-cols-2 gap-0">
          {/* Imagem à esquerda com melhor tratamento */}
          <div className="relative h-full min-h-[300px]">
            <div className="absolute inset-0 bg-gradient-to-r from-[#aa6b5d]/10 to-transparent z-10"></div>
            {question.imageUrl ? (
              <img 
                src={question.imageUrl} 
                alt={question.imageAlt || question.text}
                className="w-full h-full object-cover" 
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[#f9ede8] to-[#f5e1d8] flex items-center justify-center">
                <Lightbulb className="w-16 h-16 text-[#aa6b5d]/30" />
              </div>
            )}
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-[#aa6b5d] shadow-sm">
              Questão Reflexiva
            </div>
          </div>
          
          {/* Conteúdo à direita */}
          <div className="p-6 md:p-8 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-[#aa6b5d]/10 p-2 rounded-full">
                <Lightbulb className="w-5 h-5 text-[#aa6b5d]" />
              </div>
              <h3 className="text-xl font-medium text-[#432818]">{question.text}</h3>
            </div>
            
            {question.description && (
              <p className="text-[#432818]/80 mb-6">{question.description}</p>
            )}
            
            <div className="space-y-4">
              {children}
            </div>
            
            <div className="mt-6 flex justify-end">
              <motion.button
                whileHover={{ x: 5 }}
                className="flex items-center text-[#aa6b5d] font-medium"
              >
                <span>Continuar</span>
                <ArrowRight className="ml-2 w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default StrategicQuestion;