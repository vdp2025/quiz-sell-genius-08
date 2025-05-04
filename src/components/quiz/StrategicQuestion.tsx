import React from 'react';
import { Card } from '@/components/ui/card';
import { InfoIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface StrategicQuestionProps {
  question: {
    id: string;
    text: string;
    description?: string;
    imageUrl?: string;
  };
  children: React.ReactNode;
}

const StrategicQuestion: React.FC<StrategicQuestionProps> = ({
  question,
  children
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="p-6 mb-8 border-l-4 border-l-[#B89B7A] relative overflow-hidden">
        {/* Indicador visual de questão estratégica */}
        <div className="absolute top-0 right-0 bg-[#B89B7A] text-white px-3 py-1 text-xs font-medium rounded-bl-lg">
          Questão Estratégica
        </div>
        
        {/* Elementos decorativos */}
        <div className="absolute -bottom-16 -right-16 w-32 h-32 rounded-full bg-[#B89B7A]/5"></div>
        <div className="absolute -top-16 -left-16 w-32 h-32 rounded-full bg-[#aa6b5d]/5"></div>
        
        <div className="relative z-10">
          <div className="flex items-start gap-3 mb-4">
            <div className="bg-[#B89B7A]/10 p-2 rounded-full">
              <InfoIcon className="w-5 h-5 text-[#B89B7A]" />
            </div>
            <div>
              <h3 className="text-xl font-medium text-[#432818]">{question.text}</h3>
              {question.description && (
                <p className="text-[#432818]/70 mt-1">{question.description}</p>
              )}
            </div>
          </div>
          
          {question.imageUrl && (
            <div className="mb-6">
              <img 
                src={question.imageUrl} 
                alt={question.text}
                className="w-full max-h-64 object-cover rounded-lg"
                loading="lazy"
              />
            </div>
          )}
          
          <div className="mt-4">
            {children}
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default StrategicQuestion;