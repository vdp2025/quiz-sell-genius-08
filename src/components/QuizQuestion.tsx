
import React, { useEffect, useState } from 'react';
import { Card } from './ui/card';
import { AnimatedWrapper } from './ui/animated-wrapper';
import { cn } from '@/lib/utils';
import type { QuizQuestion as QuizQuestionType, QuizOption, UserResponse } from '../types/quiz';
import { useIsMobile } from '@/hooks/use-mobile';

interface QuizQuestionProps {
  question: QuizQuestionType;
  onAnswer: (response: UserResponse) => void;
  currentAnswers: string[];
  autoAdvance?: boolean;
}

const highlightStrategicWords = (text: string): React.ReactNode => {
  const strategicWords = [
    'confortáveis', 'soltos', 'práticos', 'discretas', 'clássico', 'despercebidas',
    'refinados', 'perfeito', 'atual', 'delicadas', 'suaves', 'fluídas',
    'marquem', 'decotes', 'fendas', 'estruturadas', 'assimétricas', 'modernas',
    'marcantes', 'mix', 'informal', 'espontânea', 'essencialista', 'conservadora',
    'exigente', 'sofisticada', 'feminina', 'meiga', 'sensível', 'glamorosa',
    'sensual', 'cosmopolita', 'audaciosa', 'exótica', 'aventureira', 'leve',
    'tradicional', 'casual', 'imponente', 'romântico', 'urbano', 'criativo',
    'colorido', 'ousado', 'discretos', 'sutis', 'clean', 'status', 'laços',
    'babados', 'couro', 'zíper', 'firmeza', 'peso', 'exclusivos', 'identidade',
    'flamingo', 'cores', 'marcado', 'definido'
  ];

  const pattern = new RegExp(`(${strategicWords.join('|')})`, 'gi');
  
  const parts = text.split(pattern);
  
  return parts.map((part, index) => {
    if (strategicWords.some(word => part.toLowerCase() === word.toLowerCase())) {
      return <strong key={index}>{part}</strong>;
    }
    return part;
  });
};

// Função para converter URLs de lovable-uploads para URLs Cloudinary equivalentes se disponíveis
const getImageUrl = (url: string): string => {
  // Se a URL já for do Cloudinary, use-a diretamente
  if (url.includes('cloudinary.com')) {
    return url;
  }
  
  // Se for um caminho relativo lovable-uploads, tente extrair o ID do arquivo
  if (url.includes('/lovable-uploads/')) {
    const fileName = url.split('/').pop()?.split('.')[0];
    // Verifique se temos um arquivo correspondente nas URLs do Cloudinary
    // Esta é uma solução temporária. Idealmente, teríamos um mapeamento completo.
    return `https://via.placeholder.com/400x500?text=Imagem+${fileName || ''}`;
  }
  
  // Se não corresponder a nenhum padrão conhecido, retorne a URL original
  return url;
};

const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  onAnswer,
  currentAnswers,
  autoAdvance = true,
}) => {
  const isMobile = useIsMobile();
  const [imagesLoaded, setImagesLoaded] = useState<Record<string, boolean>>({});
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (question.type !== 'text') {
      const newImagesLoaded: Record<string, boolean> = {};
      const newImageErrors: Record<string, boolean> = {};
      
      question.options.forEach(opt => {
        if (opt.imageUrl) {
          newImagesLoaded[opt.id] = false;
          newImageErrors[opt.id] = false;
          const img = new Image();
          img.onload = () => {
            setImagesLoaded(prev => ({
              ...prev,
              [opt.id]: true
            }));
          };
          img.onerror = (e) => {
            console.error(`Failed to load image: ${opt.imageUrl}`, e);
            setImageErrors(prev => ({
              ...prev,
              [opt.id]: true
            }));
          };
          img.src = opt.imageUrl;
        }
      });
    }
  }, [question]);

  const handleOptionSelect = (optionId: string) => {
    let newSelectedOptions: string[];
    
    if (currentAnswers.includes(optionId)) {
      newSelectedOptions = currentAnswers.filter(id => id !== optionId);
    } else {
      if (currentAnswers.length >= question.multiSelect) {
        newSelectedOptions = [...currentAnswers.slice(1), optionId];
      } else {
        newSelectedOptions = [...currentAnswers, optionId];
      }
    }
    
    onAnswer({
      questionId: question.id,
      selectedOptions: newSelectedOptions,
    });
  };

  // Função auxiliar para gerar estilo de imagem fallback para quando a imagem não carrega
  const getFallbackStyle = (styleCategory: string) => {
    const colorMap: Record<string, string> = {
      'Natural': '#D2C1A5',
      'Clássico': '#1F456E',
      'Contemporâneo': '#7F7F7F',
      'Elegante': '#AF9F7F',
      'Romântico': '#F5D0E3',
      'Sexy': '#A82743',
      'Dramático': '#222222',
      'Criativo': '#F79862'
    };
    
    return {
      backgroundColor: colorMap[styleCategory] || '#f0f0f0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: ['Natural', 'Elegante', 'Romântico', 'Contemporâneo'].includes(styleCategory) ? '#333' : '#fff',
      fontSize: '1rem',
      textAlign: 'center' as const,
      padding: '1rem'
    };
  };

  return (
    <AnimatedWrapper>
      <div className="w-full max-w-4xl mx-auto" id={`question-${question.id}`}>
        <h2 className="text-lg sm:text-xl font-playfair text-center mb-2 px-2 pt-2 text-[#432818]">
          {question.title}
        </h2>
        
        <div className={cn(
          "grid",
          question.type === 'text' 
            ? "grid-cols-1 gap-3 px-4" 
            : isMobile ? "grid-cols-2 gap-1 px-1" : "grid-cols-2 gap-6 px-4"
        )}>
          {question.options.map((option) => (
            <div 
              key={option.id} 
              className="relative group"
              onClick={() => handleOptionSelect(option.id)}
            >
              <div 
                className={cn(
                  "transition-all duration-200 cursor-pointer flex flex-col items-center",
                  "shadow-sm hover:shadow-md",
                  question.type === 'text' && "p-3 hover:bg-gray-50 rounded-lg border border-gray-100 hover:border-gray-200",
                  currentAnswers.includes(option.id) && question.type === 'text' && "bg-gray-50 border-gray-200",
                  currentAnswers.includes(option.id) && question.type !== 'text'
                    ? "border-[#B89B7A] border-[0.5px] shadow-md" 
                    : question.type !== 'text' && "border-transparent border-[0.5px]",
                )}
              >
                {question.type !== 'text' && option.imageUrl && (
                  <div className={cn(
                    "overflow-hidden w-full",
                    option.imageUrl.includes('sapatos') || option.imageUrl.includes('roupa') 
                      ? "aspect-square" 
                      : "aspect-[3/4]"
                  )}>
                    {imageErrors[option.id] ? (
                      <div 
                        className="w-full h-full" 
                        style={getFallbackStyle(option.styleCategory)}
                      >
                        <span>{option.styleCategory}</span>
                      </div>
                    ) : (
                      <img
                        src={option.imageUrl}
                        alt={option.text}
                        className={cn(
                          "object-cover w-full h-full transition-transform duration-300",
                          currentAnswers.includes(option.id) ? "scale-110" : "group-hover:scale-105"
                        )}
                        style={{ 
                          transformOrigin: 'center center',
                          objectFit: option.imageUrl.includes('sapatos') ? 'contain' : 'cover'
                        }}
                        onError={(e) => {
                          console.error(`Failed to load image: ${option.imageUrl}`);
                          setImageErrors(prev => ({
                            ...prev,
                            [option.id]: true
                          }));
                          // Não tentamos redefinir a src aqui para evitar loops infinitos
                        }}
                      />
                    )}
                  </div>
                )}
                <p className={cn(
                  "cursor-pointer text-[#1A1818]/80 text-center w-full",
                  question.type !== 'text' 
                    ? isMobile 
                      ? "text-[0.6rem] leading-[0.7rem] bg-white/90 px-1 py-1"
                      : "text-sm leading-tight p-2"
                    : isMobile 
                      ? "text-sm leading-relaxed"
                      : "text-base leading-relaxed"
                )}>
                  {highlightStrategicWords(option.text)}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <p className="text-xs sm:text-sm text-[#1A1818]/60 px-2 pb-2 mt-2 text-center">
          Selecione {question.multiSelect} {question.multiSelect === 1 ? 'opção' : 'opções'}
        </p>
      </div>
    </AnimatedWrapper>
  );
};

export { QuizQuestion };
