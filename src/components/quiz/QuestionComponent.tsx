import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { toast } from '../ui/use-toast';

interface QuestionProps {
  question: {
    id: string;
    text: string;
    options: Array<{
      id: string;
      text: string;
    }>;
    isStrategic?: boolean;
  };
  onNext: () => void;
  onSelect: (optionIds: string[]) => void;
}

const QuestionComponent: React.FC<QuestionProps> = ({
  question,
  onNext,
  onSelect,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [canAdvance, setCanAdvance] = useState(false);

  useEffect(() => {
    const requiredSelections = question.isStrategic ? 1 : 3;
    setCanAdvance(selectedOptions.length === requiredSelections);
  }, [selectedOptions, question.isStrategic]);

  const handleOptionSelect = (optionId: string) => {
    const requiredSelections = question.isStrategic ? 1 : 3;

    setSelectedOptions((prev) => {
      // Se a opção já está selecionada, remove ela
      if (prev.includes(optionId)) {
        return prev.filter(id => id !== optionId);
      }
      
      // Se já atingiu o limite de seleções, mostra mensagem e não adiciona
      if (prev.length >= requiredSelections) {
        toast({
          title: "Limite de seleções atingido",
          description: `Você só pode selecionar ${requiredSelections} ${requiredSelections === 1 ? 'opção' : 'opções'}`,
          variant: "destructive"
        });
        return prev;
      }

      // Adiciona a nova seleção
      return [...prev, optionId];
    });
  };

  const handleNext = () => {
    const requiredSelections = question.isStrategic ? 1 : 3;
    
    if (selectedOptions.length !== requiredSelections) {
      toast({
        title: "Seleção incompleta",
        description: `Por favor, selecione ${requiredSelections} ${requiredSelections === 1 ? 'opção' : 'opções'} antes de avançar`,
        variant: "destructive"
      });
      return;
    }

    onSelect(selectedOptions);
    onNext();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-[#432818]">{question.text}</h2>
      
      <div className="space-y-3">
        {question.options.map((option) => (
          <button
            key={option.id}
            onClick={() => handleOptionSelect(option.id)}
            className={`w-full p-4 text-left rounded-lg border transition-all ${
              selectedOptions.includes(option.id)
                ? 'border-[#B89B7A] bg-[#FAF9F7] text-[#432818]'
                : 'border-gray-200 hover:border-[#B89B7A] text-[#8F7A6A]'
            }`}
          >
            {option.text}
          </button>
        ))}
      </div>

      <div className="flex justify-end">
        <Button
          onClick={handleNext}
          disabled={!canAdvance}
          className={`px-6 py-2 ${
            canAdvance
              ? 'bg-[#B89B7A] hover:bg-[#A38A69] text-white'
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          }`}
        >
          Próxima Questão
        </Button>
      </div>

      <div className="text-sm text-[#8F7A6A] text-center">
        {question.isStrategic ? (
          <p>Selecione 1 opção para continuar</p>
        ) : (
          <p>Selecione 3 opções para continuar</p>
        )}
      </div>
    </div>
  );
};

export default QuestionComponent;