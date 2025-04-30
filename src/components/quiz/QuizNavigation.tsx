interface QuizNavigationProps {
  canProceed: boolean;
  onNext: () => void;
  onPrevious?: () => void;
  currentQuestionType: 'normal' | 'strategic';
  selectedOptionsCount: number;
  isLastQuestion?: boolean;
}

const QuizNavigation: React.FC<QuizNavigationProps> = ({
  canProceed,
  onNext,
  onPrevious,
  currentQuestionType,
  selectedOptionsCount,
  isLastQuestion = false
}) => {
  const requiredOptions = currentQuestionType === 'strategic' ? 1 : 3;
  
  // Lógica de ativação mais rigorosa
  const isButtonEnabled = useMemo(() => {
    if (currentQuestionType === 'strategic') {
      return selectedOptionsCount === 1;
    }
    return selectedOptionsCount === 3;
  }, [currentQuestionType, selectedOptionsCount]);

  const getHelperText = () => {
    if (!isButtonEnabled) {
      if (currentQuestionType === 'strategic') {
        return 'Selecione 1 opção para continuar';
      }
      return 'Selecione exatamente 3 opções para continuar';
    }
    return '';
  };

  return (
    <div className="flex justify-between items-center mt-6">
      {onPrevious && (
        <Button 
          variant="outline" 
          onClick={onPrevious}
          className="text-[#8F7A6A] border-[#8F7A6A]"
        >
          Voltar
        </Button>
      )}
      
      <div className="flex flex-col items-center ml-auto">
        {!isButtonEnabled && (
          <p className="text-sm text-[#8F7A6A] mb-2">{getHelperText()}</p>
        )}
        <Button
          onClick={onNext}
          disabled={!isButtonEnabled}
          className={`bg-[#B89B7A] hover:bg-[#A38A69] ${!isButtonEnabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isLastQuestion ? 'Ver Resultado' : 'Próximo'}
        </Button>
      </div>
    </div>
  );
};

export default QuizNavigation;