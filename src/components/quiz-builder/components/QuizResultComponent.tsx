
import React from 'react';
import { cn } from '@/lib/utils';
import { Award, Trophy } from 'lucide-react';

interface QuizResultComponentProps {
  data: {
    title?: string;
    subtitle?: string;
    primaryStyleTitle?: string;
    secondaryStylesTitle?: string;
    showPercentages?: boolean;
    showDescriptions?: boolean;
    accentColor?: string;
  };
  style?: {
    textColor?: string;
    backgroundColor?: string;
  };
  isEditing?: boolean;
  isSelected?: boolean;
}

const QuizResultComponent: React.FC<QuizResultComponentProps> = ({
  data,
  style,
  isEditing = false,
  isSelected = false
}) => {
  const accentColor = data.accentColor || '#9b87f5';
  
  // Sample data for preview
  const primaryStyle = { category: 'Contemporâneo', percentage: 40 };
  const secondaryStyles = [
    { category: 'Natural', percentage: 30 },
    { category: 'Elegante', percentage: 20 },
    { category: 'Dramático', percentage: 10 },
  ];
  
  return (
    <div className="w-full">
      <div className="text-center mb-6">
        <h2 
          className={cn(
            "text-2xl md:text-3xl font-bold mb-3",
            isEditing && !data.title && "opacity-50"
          )}
          style={{ color: style?.textColor || 'inherit' }}
        >
          {data.title || 'Seu Resultado de Estilo Pessoal'}
        </h2>
        
        {(data.subtitle || isEditing) && (
          <p 
            className={cn(
              "text-lg opacity-80",
              isEditing && !data.subtitle && "opacity-50"
            )}
            style={{ color: style?.textColor || 'inherit' }}
          >
            {data.subtitle || 'Conheça seu estilo predominante e como ele afeta suas escolhas'}
          </p>
        )}
      </div>
      
      <div className="bg-white shadow-sm rounded-lg p-6 mb-6">
        <h3 
          className={cn(
            "text-xl font-medium mb-4 flex items-center gap-2",
            isEditing && !data.primaryStyleTitle && "opacity-50"
          )}
          style={{ color: accentColor }}
        >
          <Trophy className="h-5 w-5" />
          {data.primaryStyleTitle || 'Seu Estilo Principal'}
        </h3>
        
        <div className="flex items-center justify-between mb-2">
          <span className="font-bold text-2xl">{primaryStyle.category}</span>
          {data.showPercentages && (
            <span className="text-lg font-medium" style={{ color: accentColor }}>
              {primaryStyle.percentage}%
            </span>
          )}
        </div>
        
        {data.showDescriptions && (
          <p className="text-gray-700 mt-3">
            O estilo Contemporâneo é caracterizado por uma abordagem moderna e versátil ao se vestir. 
            Você valoriza peças atuais, mas sem exageros ou modismos passageiros.
          </p>
        )}
      </div>
      
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h3 
          className={cn(
            "text-xl font-medium mb-4 flex items-center gap-2",
            isEditing && !data.secondaryStylesTitle && "opacity-50"
          )}
          style={{ color: accentColor }}
        >
          <Award className="h-5 w-5" />
          {data.secondaryStylesTitle || 'Seus Estilos Secundários'}
        </h3>
        
        <div className="space-y-3">
          {secondaryStyles.map((style, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className="font-medium">{style.category}</span>
              {data.showPercentages && (
                <span style={{ color: accentColor }}>{style.percentage}%</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizResultComponent;
