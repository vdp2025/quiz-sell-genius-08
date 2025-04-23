
import React from 'react';
import { QuizQuestion, QuizOption } from '@/types/quiz';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface QuizPreviewProps {
  activeQuestion: QuizQuestion | null;
  isPreviewing: boolean;
}

const QuizPreview: React.FC<QuizPreviewProps> = ({ activeQuestion, isPreviewing }) => {
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);
  
  // Reset selected options when question changes
  React.useEffect(() => {
    setSelectedOptions([]);
  }, [activeQuestion]);
  
  const handleOptionSelect = (optionId: string) => {
    if (!isPreviewing) return;
    
    setSelectedOptions(prev => {
      // If already selected, deselect
      if (prev.includes(optionId)) {
        return prev.filter(id => id !== optionId);
      }
      
      // If multiselect limit reached, remove the first selection
      if (activeQuestion && prev.length >= activeQuestion.multiSelect) {
        return [...prev.slice(1), optionId];
      }
      
      // Add new selection
      return [...prev, optionId];
    });
  };
  
  if (!activeQuestion) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-sm">
        <div className="flex flex-col items-center justify-center text-center h-64">
          <p className="text-gray-500">Selecione uma pergunta para visualizar</p>
        </div>
      </div>
    );
  }
  
  // Determine grid layout based on options count
  const getGridClass = () => {
    const count = activeQuestion.options.length;
    if (count <= 2) return 'grid-cols-1';
    if (count <= 4) return 'grid-cols-1 md:grid-cols-2';
    if (count <= 6) return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
    return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4';
  };
  
  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-sm">
      <div className="mb-8">
        <h2 className="text-2xl font-medium text-center mb-2">{activeQuestion.title}</h2>
        <p className="text-center text-gray-500">
          {isPreviewing ? `Selecione ${activeQuestion.multiSelect} ${activeQuestion.multiSelect > 1 ? 'opções' : 'opção'}` : 'Visualização da pergunta'}
        </p>
      </div>
      
      <div className={`grid ${getGridClass()} gap-4 mb-8`}>
        {activeQuestion.options.map((option) => (
          <div
            key={option.id}
            className={cn(
              "border p-4 rounded-lg cursor-pointer transition-all",
              isPreviewing 
                ? (selectedOptions.includes(option.id) 
                    ? "bg-[#FAF9F7] border-[#B89B7A]" 
                    : "hover:bg-[#FAF9F7] border-gray-200") 
                : "border-gray-200"
            )}
            onClick={() => handleOptionSelect(option.id)}
          >
            {option.imageUrl && activeQuestion.type !== 'text' && (
              <div className="mb-3 rounded-md overflow-hidden">
                <img 
                  src={option.imageUrl} 
                  alt={option.text || ''} 
                  className="w-full h-auto object-cover aspect-[4/3]" 
                />
              </div>
            )}
            {activeQuestion.type !== 'image' && <p>{option.text}</p>}
          </div>
        ))}
      </div>
      
      <div className="flex justify-center">
        <Button
          className="bg-[#B89B7A] hover:bg-[#A38A69] min-w-[120px]"
          disabled={!isPreviewing || selectedOptions.length < activeQuestion.multiSelect}
        >
          Continuar
        </Button>
      </div>
    </div>
  );
};

export default QuizPreview;
