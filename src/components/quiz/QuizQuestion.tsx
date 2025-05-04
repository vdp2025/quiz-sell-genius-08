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
  'strategic-1': 'https://res.cloudinary.com/dqljyf76t/image/upload/v1746334756/ChatGPT_Image_4_de_mai._de_2025_01_42_42_jlugsc.webp',
  'strategic-2': 'https://res.cloudinary.com/dqljyf76t/image/upload/v1746334754/ChatGPT_Image_4_de_mai._de_2025_00_30_44_naqom0.webp',
  'strategic-3': 'https://res.cloudinary.com/dqljyf76t/image/upload/v1746334753/ChatGPT_Image_4_de_mai._de_2025_01_30_01_vbiysd.webp',
  'strategic-4': 'https://res.cloudinary.com/dqljyf76t/image/upload/v1746334752/ChatGPT_Image_4_de_mai._de_2025_01_00_30_qckn7n.webp',
  'strategic-5': 'https://res.cloudinary.com/dqljyf76t/image/upload/v1746334752/ChatGPT_Image_4_de_mai._de_2025_01_38_24_vdlamr.webp',
  'default': 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745515862/Sem_nome_1000_x_1000_px_1280_x_720_px_vmqk3j.webp'
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