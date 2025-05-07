import React, { useState } from 'react';
import { Card } from '../ui/card';
import { QuizQuestion } from '../QuizQuestion';
import { strategicQuestions } from '@/data/strategicQuestions';
import { UserResponse } from '@/types/quiz';
import { toast } from '../ui/use-toast';
import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';

interface MainTransitionProps {
  onAnswer: (response: UserResponse) => void;
  strategicAnswers: Record<string, string[]>;
}

export const MainTransition: React.FC<MainTransitionProps> = ({
  onAnswer,
  strategicAnswers,
}) => {
  const [showIntro, setShowIntro] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  
  // Define the currentAnswersForQuestion variable
  const currentQuestion = strategicQuestions[currentQuestionIndex];
  const currentAnswersForQuestion = currentQuestion 
    ? (strategicAnswers[currentQuestion.id] || []) 
    : [];

  // Determina a categoria da questão atual para tratamento visual personalizado
  const getQuestionCategory = () => {
    const id = currentQuestion?.id || "";
    if (id.startsWith("strategic-1") || id.startsWith("strategic-2")) return "perception";
    if (id.startsWith("strategic-3") || id.startsWith("strategic-4")) return "experience";
    if (id.startsWith("strategic-5") || id.startsWith("strategic-6")) return "intent";
    return "outcome";
  };

  // Obtém cor de fundo apropriada para cada categoria - CORRIGIDO para manter consistência com identidade visual
  const getCategoryBackground = () => {
    const category = getQuestionCategory();
    switch(category) {
      // Cores atualizadas para ficarem consistentes com a identidade visual
      case "perception": return "bg-[#FAF5ED]";  // Simplificado para cor sólida
      case "experience": return "bg-[#FAF9F7]";  // Cor de fundo neutra consistente
      case "intent": return "bg-[#F7F8FA]";      // Cor neutra mais suave
      case "outcome": return "bg-[#F9FAF7]";     // Cor neutra consistente
      default: return "bg-[#FAF9F7]";            // Cor padrão neutra
    }
  };

  // Obtém imagem ilustrativa para a categoria atual
  const getCategoryImage = () => {
    const category = getQuestionCategory();
    switch(category) {
      case "perception": return "https://res.cloudinary.com/dqljyf76t/image/upload/v1683512320/quiz-images/perception-illustration.jpg";
      case "experience": return "https://res.cloudinary.com/dqljyf76t/image/upload/v1683512320/quiz-images/style-experience.jpg";
      case "intent": return "https://res.cloudinary.com/dqljyf76t/image/upload/v1683512320/quiz-images/intent-illustration.jpg";
      case "outcome": return "https://res.cloudinary.com/dqljyf76t/image/upload/v1683512320/quiz-images/desired-outcome.jpg"; // URL corrigida
      default: return "";
    }
  };

  const handleQuestionAnswer = (response: UserResponse) => {
    try {
      console.log('Strategic Question Answered:', response);
      onAnswer(response);
      
      // Only auto advance if the user has selected an option
      if (response.selectedOptions.length > 0) {
        // We don't auto-advance here anymore, we'll do it through the onNextClick
      }
    } catch (error) {
      console.error('Error handling strategic question:', error);
      toast({
        title: "Erro na transição do quiz",
        description: "Não foi possível processar sua resposta. Por favor, tente novamente.",
        variant: "destructive",
      });
    }
  };

  const handleNextClick = () => {
    if (currentQuestionIndex < strategicQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // If this is the last strategic question, notify the parent component
      onAnswer({
        questionId: currentQuestion.id,
        selectedOptions: currentAnswersForQuestion,
      });
    }
  };

  return (
    <div className={`min-h-screen ${showIntro ? "bg-[#FAF9F7]" : getCategoryBackground()} px-4 py-10 flex items-start justify-center transition-colors duration-500`}>
      <div className="max-w-3xl w-full mx-auto">
        {showIntro ? (
          <Card className="p-8 space-y-8 bg-white shadow-lg border-[#B89B7A]/20 mb-10 rounded-2xl">
            <div className="text-center">
              <img
                src="https://res.cloudinary.com/dqljyf76t/image/upload/v1683512320/quiz-images/personal-style-journey.jpg"
                alt="Jornada do Estilo Pessoal"
                className="h-40 mx-auto mb-6 rounded-lg object-cover"
              />
            </div>
            
            <h2 className="text-2xl font-playfair text-[#432818] text-center tracking-normal font-bold mt-4">
              Enquanto calculamos o seu resultado...
            </h2>
            
            <p className="text-[#1A1818]/90 text-lg">
              Queremos te fazer algumas perguntas que vão tornar sua <strong className="text-[#432818]">experiência</strong> ainda mais <strong className="text-[#432818]">completa</strong>.
            </p>
            
            <p className="text-[#1A1818]/90 text-lg">
              A ideia é simples: te ajudar a enxergar com mais <strong className="text-[#432818]">clareza</strong> onde você está agora — e para onde pode ir com mais <strong className="text-[#432818]">intenção</strong>, <strong className="text-[#432818]">leveza</strong> e <strong className="text-[#432818]">autenticidade</strong>.
            </p>
            
            <div className="bg-gradient-to-r from-[#B89B7A]/10 to-[#432818]/10 p-6 rounded-lg border border-[#B89B7A]/20">
              <p className="text-[#432818] italic text-center font-medium text-lg">
                Responda com <strong className="text-[#432818] not-italic">sinceridade</strong>. Isso é só entre você e a sua <strong className="text-[#432818] not-italic">nova versão</strong>.
              </p>
            </div>

            <div className="flex justify-center mt-6">
              <Button 
                variant="default" 
                size="lg"
                onClick={() => setShowIntro(false)}
                className="bg-[#B89B7A] text-white hover:bg-[#9A8163] shadow-md hover:shadow-lg transition-all"
              >
                Continuar
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </Card>
        ) : (
          <Card className="p-0 overflow-hidden bg-white shadow-xl border-[#B89B7A]/20 mb-10 rounded-2xl">
            {/* Imagem ilustrativa para a categoria da pergunta */}
            <div className="w-full h-40 overflow-hidden relative">
              <img 
                src={getCategoryImage()}
                alt="Ilustração da questão" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  console.error(`Failed to load category image: ${getCategoryImage()}`);
                  // Fallback para uma imagem padrão em caso de erro
                  e.currentTarget.src = "https://res.cloudinary.com/dqljyf76t/image/upload/v1683512320/quiz-images/personal-style-journey.jpg";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
            </div>
            
            <div className="p-8 space-y-6 relative">
              {/* Indicador de progresso - mantido apenas aqui, removido do QuizQuestion */}
              <div className="flex justify-between items-center mb-4">
                <div className="text-xs text-[#1A1818]/50">Questão {currentQuestionIndex + 1} de {strategicQuestions.length}</div>
                <div className="w-2/3 h-1 bg-[#F0EBE4] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#B89B7A] transition-all" 
                    style={{width: `${((currentQuestionIndex + 1) / strategicQuestions.length) * 100}%`}}
                  ></div>
                </div>
              </div>
              
              {/* Título da pergunta com destaque visual */}
              <div className="mb-8">
                <h3 className="text-xl sm:text-2xl font-playfair text-center mb-2 text-[#432818] relative">
                  <span className="relative">
                    {strategicQuestions[currentQuestionIndex].title}
                    <span className="absolute -bottom-2 left-0 right-0 h-1 bg-[#B89B7A]/30 rounded-full"></span>
                  </span>
                </h3>
                <p className="text-[#1A1818]/50 text-center text-xs mt-3">
                  Selecione 1 opção para avançar
                </p>
              </div>

              <QuizQuestion
                key={`strategic-${currentQuestionIndex}`}
                question={strategicQuestions[currentQuestionIndex]}
                onAnswer={handleQuestionAnswer}
                currentAnswers={currentAnswersForQuestion}
                autoAdvance={true}
                hideTitle={true}
                onNextClick={handleNextClick}
                showQuestionImage={false} /* Desativando a imagem no QuizQuestion para evitar duplicação */
              />
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};
