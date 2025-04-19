
import React from 'react';
import { StyleResult } from '@/types/quiz';
import ResultHeader from './quiz-result/ResultHeader';
import PrimaryStyleCard from './quiz-result/PrimaryStyleCard';
import SecondaryStylesSection from './quiz-result/SecondaryStylesSection';
import OfferCard from './quiz-result/sales/OfferCard';
import { useAuth } from '@/context/AuthContext';

interface QuizResultProps {
  primaryStyle: StyleResult;
  secondaryStyles: StyleResult[];
  isEditing?: boolean;
  onUpdate?: (path: string, value: any) => void;
  config?: any;
}

const QuizResult: React.FC<QuizResultProps> = ({
  primaryStyle,
  secondaryStyles,
  isEditing = false,
  onUpdate,
  config = {}
}) => {
  const { user } = useAuth();
  const userName = user?.userName || localStorage.getItem('userName') || 'Visitante';

  return (
    <div className="min-h-screen bg-[#fffaf7] pt-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <ResultHeader 
          userName={userName}
          customTitle={config?.header?.title}
          isEditing={isEditing}
          onUpdate={(value) => onUpdate?.('header', { title: value })}
        />
        
        <div className="bg-white rounded-lg shadow-sm p-6 my-8">
          <PrimaryStyleCard 
            primaryStyle={primaryStyle}
            customDescription={config?.primaryStyle?.description}
            isEditing={isEditing}
            onUpdate={(value) => onUpdate?.('primaryStyle', { description: value })}
          />
          
          <SecondaryStylesSection 
            secondaryStyles={secondaryStyles}
            isEditing={isEditing}
            onUpdate={(value) => onUpdate?.('secondaryStyles', value)}
          />
        </div>
        
        <OfferCard 
          primaryStyle={primaryStyle}
          config={config?.offer}
          isEditing={isEditing}
          onUpdate={(value) => onUpdate?.('offer', value)}
        />
      </div>
    </div>
  );
};

export default QuizResult;
