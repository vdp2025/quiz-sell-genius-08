import React, { useState, useEffect } from 'react';
import { QuizOption } from './QuizOption';
import { Question, UserResponse } from '@/types/quiz';
import { Card } from './ui/card';

interface QuizQuestionProps {
  question: Question;
  onAnswer: (response: UserResponse) => void;
  currentAnswers: string[];
  autoAdvance?: boolean;
  isStrategic?: boolean; // Nova prop para identificar se é pergunta estratégica
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  onAnswer,
  currentAnswers,
  autoAdvance = false,
  isStrategic = false
}) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>(currentAnswers || []);
  
  // Constantes para controle de seleções
  const MAX_SELECTIONS = isStrategic ? 1 : 3;
  const MIN_SELECTIONS = isStrategic ? 1 : 3;

  // Efeito para sincronizar com respostas externas
  useEffect(() => {
    setSelectedOptions(currentAnswers || []);
  }, [currentAnswers]);

  const handleOptionSelect = (optionId: string) => {
    let newSelectedOptions: string[];

    if (selectedOptions.includes(optionId)) {
      // Remove a opção se já estiver selecionada
      newSelectedOptions = selectedOptions.filter(id => id !== optionId);
    } else {
      // Adiciona a opção se ainda não atingiu o limite
      if (selectedOptions.length < MAX_SELECTIONS) {
        newSelectedOptions = [...selectedOptions, optionId];
      } else {
        return; // Não faz nada se já atingiu o limite
      }
    }

    setSelectedOptions(newSelectedOptions);

    // Se autoAdvance está ativado e atingimos o número necessário de seleções
    if (autoAdvance && newSelectedOptions.length === MIN_SELECTIONS) {
      onAnswer({
        questionId: question.id,
        selectedOptions: newSelectedOptions
      });
    } else {
      // Sempre notifica o componente pai sobre a mudança
      onAnswer({
        questionId: question.id,
        selectedOptions: newSelectedOptions
      });
    }
  };

  return (
    <Card className="p-6 bg-white/80 backdrop-blur-sm shadow-md border-[#B89B7A]/20">
      {/* Título da Questão */}
      <h3 className="text-xl md:text-2xl font-playfair text-[#432818] mb-6 text-center">
        {question.text}
      </h3>

      {/* Mensagem de instrução */}
      <p className="text-sm text-[#432818]/80 mb-4 text-center">
        {isStrategic 
          ? "Selecione uma opção que mais combina com você"
          : `Selecione ${MAX_SELECTIONS} opções que mais combinam com você`
        }
      </p>

      {/* Contador de seleções */}
      <div className="text-center mb-4 text-sm font-medium text-[#B89B7A]">
        {selectedOptions.length} de {MAX_SELECTIONS} {isStrategic ? "opção" : "opções"} selecionada{selectedOptions.length !== 1 ? "s" : ""}
      </div>

      {/* Grid de opções */}
      <div className={`grid gap-4 ${
        question.options.length > 6 
          ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4' 
          : 'grid-cols-2 sm:grid-cols-3'
      }`}>
        {question.options.map((option) => (
          <QuizOption
            key={option.id}
            option={option}
            isSelected={selectedOptions.includes(option.id)}
            onSelect={handleOptionSelect}
            type={option.imageUrl ? 'both' : 'text'}
            questionId={question.id}
            selectedCount={selectedOptions.length}
            maxSelections={MAX_SELECTIONS}
            isStrategic={isStrategic}
          />
        ))}
      </div>

      {/* Mensagem de progresso */}
      {!isStrategic && selectedOptions.length < MAX_SELECTIONS && (
        <p className="text-sm text-[#432818]/60 mt-4 text-center">
          Selecione mais {MAX_SELECTIONS - selectedOptions.length} {MAX_SELECTIONS - selectedOptions.length === 1 ? 'opção' : 'opções'}
        </p>
      )}
    </Card>
  );
};

export { QuizQuestion };