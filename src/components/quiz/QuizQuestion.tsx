import React from 'react';
import { QuizOption } from './QuizOption';
import { StrategicQuestion } from './StrategicQuestion';
import { motion } from 'framer-motion';

interface QuizQuestionProps {
  question: {
    id: string;
    text: string;
    description?: string;
    options: Array<{
      id: string;
      text: string;
      image?: string;
    }>;
    isStrategic?: boolean;
    strategicImageUrl?: string;
  };
  selectedOptionId: string | null;
  onSelectOption: (optionId: string) => void;
  isDisabled?: boolean;
}

// Mapeamento de questões estratégicas para imagens específicas
const strategicImages = {
  'strategic-1': 'https://res.cloudinary.com/dqljyf76t/image/upload/t_Antes%20e%20Depois%20-%20de%20Descobrir%20seu%20Estilo/v1745193439/2dd7e159-43a1-40b0-8075-ba6f591074c1_gpsauh.webp',
  'strategic-2': 'https://res.cloudinary.com/dqljyf76t/image/upload/t_Antes%20e%20Depois%20-%20de%20Descobrir%20seu%20Estilo/v1745193438/6cceaaa9-9383-4890-95a4-da036f8421e3_u7tuaw.webp',
  'strategic-3': 'https://res.cloudinary.com/dqljyf76t/image/upload/t_Antes%20e%20Depois%20-%20de%20Descobrir%20seu%20Estilo/v1745193438/c0c9c1a2-e7c9-4c0c-9a5c-c1a2e7c94c0c_xvzpqr.webp',
  'strategic-4': 'https://res.cloudinary.com/dqljyf76t/image/upload/t_Antes%20e%20Depois%20-%20de%20Descobrir%20seu%20Estilo/v1745193438/d1d8d1d8-d1d8-4d1d-8d1d-8d1d8d1d8d1d_qwerty.webp',
  'strategic-5': 'https://res.cloudinary.com/dqljyf76t/image/upload/t_Antes%20e%20Depois%20-%20de%20Descobrir%20seu%20Estilo/v1745193438/e2e2e2e2-e2e2-4e2e-2e2e-2e2e2e2e2e2e_asdfgh.webp',
  'default': 'https://res.cloudinary.com/dqljyf76t/image/upload/t_Antes%20e%20Depois%20-%20de%20Descobrir%20seu%20Estilo/v1745193438/default-strategic-image_zxcvbn.webp'
};

const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  selectedOptionId,
  onSelectOption,
  isDisabled = false
}) => {
  // Determinar a imagem para questão estratégica
  const getStrategicImage = (questionId: string) => {
    return strategicImages[questionId] || strategicImages['default'];
  };

  if (question.isStrategic) {
    return (
      <StrategicQuestion 
        question={{
          ...question,
          imageUrl: question.strategicImageUrl || getStrategicImage(question.id)
        }}
        index={parseInt(question.id.split('-')[1]) || 0}
      >
        <div className="grid grid-cols-1 gap-4">
          {question.options.map((option) => (
            <QuizOption
              key={option.id}
              option={option}
              isSelected={selectedOptionId === option.id}
              onSelect={onSelectOption}
              disabled={isDisabled}
            />
          ))}
        </div>
      </StrategicQuestion>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      <h2 className="text-xl md:text-2xl font-medium text-[#432818] mb-2">{question.text}</h2>
      {question.description && (
        <p className="text-[#432818]/70 mb-6">{question.description}</p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {question.options.map((option) => (
          <QuizOption
            key={option.id}
            option={option}
            isSelected={selectedOptionId === option.id}
            onSelect={onSelectOption}
            disabled={isDisabled}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default QuizQuestion;