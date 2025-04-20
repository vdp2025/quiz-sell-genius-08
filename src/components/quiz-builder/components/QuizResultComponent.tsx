
import React from 'react';
import { QuizComponentData } from '@/types/quizBuilder';
import { cn } from '@/lib/utils';

interface QuizResultComponentProps {
  data: QuizComponentData['data'];
  style: QuizComponentData['style'];
  isSelected: boolean;
}

const QuizResultComponent: React.FC<QuizResultComponentProps> = ({ 
  data, 
  style, 
  isSelected 
}) => {
  return (
    <div 
      className={cn(
        "w-full",
        isSelected && "ring-2 ring-inset ring-[#B89B7A]/20"
      )}
      style={{
        backgroundColor: style?.backgroundColor || 'transparent',
        color: style?.textColor || 'inherit',
        borderRadius: `${style?.borderRadius || 0}px`,
        padding: `${style?.paddingY || 16}px ${style?.paddingX || 16}px`,
      }}
    >
      <div className="text-center mb-4">
        <h2 className="text-xl md:text-2xl font-playfair text-[#432818] mb-2">
          {data.title || 'Seu Resultado'}
        </h2>
        
        <p className="text-[#8F7A6A]">
          {data.description || 'Aqui será exibido o resultado do quiz com base nas respostas selecionadas.'}
        </p>
      </div>
      
      <div className="bg-[#FAF9F7] rounded-lg p-4 mb-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-lg font-medium text-[#432818] mb-2">Estilo Predominante</h3>
            <div className="bg-white p-3 rounded border border-[#B89B7A]/20">
              <div className="font-bold text-[#B89B7A]">Elegante • 42%</div>
              <p className="text-sm text-[#8F7A6A] mt-1">
                Você valoriza a sofisticação e qualidade em suas escolhas de moda.
              </p>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-[#432818] mb-2">Estilos Complementares</h3>
            <div className="space-y-2">
              <div className="bg-white p-2 rounded border border-[#B89B7A]/20">
                <div className="font-medium text-[#B89B7A]">Clássico • 25%</div>
              </div>
              <div className="bg-white p-2 rounded border border-[#B89B7A]/20">
                <div className="font-medium text-[#B89B7A]">Contemporâneo • 18%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-center">
        <button className="bg-[#B89B7A] hover:bg-[#A38A69] text-white px-6 py-3 rounded-md">
          Continuar para Oferta Especial
        </button>
      </div>
    </div>
  );
};

export default QuizResultComponent;
