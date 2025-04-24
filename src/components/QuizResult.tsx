
import React from 'react';
import { StyleResult } from '@/types/quiz';
import { Card } from '@/components/ui/card';
import { StyleResultSection } from '@/components/result/StyleResult';
import OfferCard from '@/components/quiz-result/sales/OfferCard';
import { getStyleDescription, getStyleImage } from '@/utils/styleUtils';

interface QuizResultProps {
  primaryStyle: StyleResult;
  secondaryStyles: StyleResult[];
}

const QuizResult: React.FC<QuizResultProps> = ({ 
  primaryStyle, 
  secondaryStyles 
}) => {
  const userName = localStorage.getItem('userName') || 'Visitante';
  
  return (
    <div className="min-h-screen bg-[#FFFAF7]">
      {/* Header */}
      <header className="bg-white shadow-sm py-4 px-6 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <img 
            src="/lovable-uploads/d9da05d3-6fdd-46d0-afea-42417af058c5.png" 
            alt="Quiz de Estilo Pessoal"
            className="h-12" 
          />
          <div className="text-[#432818]">
            Olá, <span className="font-medium">{userName}</span>
          </div>
        </div>
      </header>
      
      <main className="max-w-6xl mx-auto py-8 px-4">
        {/* Result Announcement */}
        <div className="text-center mb-12">
          <h1 className="font-playfair text-3xl md:text-4xl text-[#432818] mb-4">
            Seu Resultado: Estilo {primaryStyle.category}
          </h1>
          <p className="text-[#8F7A6A] max-w-2xl mx-auto">
            Vamos descobrir como o estilo {primaryStyle.category} pode valorizar sua imagem e transformar a maneira como você se apresenta ao mundo.
          </p>
        </div>
        
        {/* Style Result Section */}
        <div className="mb-12">
          <StyleResultSection
            primaryStyle={primaryStyle}
            description={getStyleDescription(primaryStyle.category)}
            image={getStyleImage(primaryStyle.category)}
            secondaryStyles={secondaryStyles}
          />
        </div>
        
        {/* Offer Card */}
        <OfferCard 
          primaryStyle={primaryStyle}
        />
      </main>
      
      {/* Footer */}
      <footer className="py-6 bg-[#432818] text-white text-center text-sm">
        <div className="max-w-6xl mx-auto px-4">
          <p>© {new Date().getFullYear()} Quiz de Estilo Pessoal. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default QuizResult;
