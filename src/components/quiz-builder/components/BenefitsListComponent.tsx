
import React from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle, PlusCircle } from 'lucide-react';

interface BenefitsListComponentProps {
  data: {
    title?: string;
    subtitle?: string;
    benefits?: string[];
    accentColor?: string;
  };
  style?: {
    textColor?: string;
    backgroundColor?: string;
  };
  isEditing?: boolean;
  isSelected?: boolean;
}

const BenefitsListComponent: React.FC<BenefitsListComponentProps> = ({
  data,
  style,
  isEditing = false,
  isSelected = false
}) => {
  const accentColor = data.accentColor || '#9b87f5';
  const benefits = data.benefits || [];
  
  return (
    <div className="w-full">
      <div className="text-center mb-6">
        <h2 
          className={cn(
            "text-2xl font-bold mb-3",
            isEditing && !data.title && "opacity-50"
          )}
          style={{ color: style?.textColor || 'inherit' }}
        >
          {data.title || 'Benefícios do Seu Estilo'}
        </h2>
        
        {(data.subtitle || isEditing) && (
          <p 
            className={cn(
              "text-lg opacity-80",
              isEditing && !data.subtitle && "opacity-50"
            )}
            style={{ color: style?.textColor || 'inherit' }}
          >
            {data.subtitle || 'Como conhecer seu estilo pessoal pode transformar sua vida'}
          </p>
        )}
      </div>
      
      <div className="space-y-4">
        {benefits.length > 0 ? (
          benefits.map((benefit, index) => (
            <div 
              key={index}
              className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm"
            >
              <CheckCircle 
                className="h-6 w-6 flex-shrink-0" 
                style={{ color: accentColor }} 
              />
              <div>
                <p className="font-medium">{benefit}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-400 border border-dashed rounded-lg">
            <div className="flex flex-col items-center">
              <PlusCircle className="w-10 h-10 mb-2" />
              <p>Nenhum benefício configurado</p>
              <p className="text-sm mt-1">Adicione benefícios no painel de propriedades</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BenefitsListComponent;
