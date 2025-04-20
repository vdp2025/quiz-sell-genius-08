import React from 'react';
import { cn } from '@/lib/utils';
import { QuizComponentData } from '@/types/quizBuilder';
import StageCoverComponent from './components/StageCoverComponent';
import StageQuestionComponent from './components/StageQuestionComponent';
import StageResultComponent from './components/StageResultComponent';

interface ComponentRendererProps {
  component: QuizComponentData;
  isPreview: boolean;
  isSelected: boolean;
}

export const ComponentRenderer: React.FC<ComponentRendererProps> = ({ 
  component, 
  isPreview,
  isSelected
}) => {
  const { type, data, style } = component;
  
  const renderComponent = () => {
    switch (type) {
      case 'stageCover':
        return <StageCoverComponent data={data} style={style} isSelected={isSelected && !isPreview} />;
      
      case 'stageQuestion':
        return <StageQuestionComponent data={data} style={style} isSelected={isSelected && !isPreview} />;
      
      case 'stageResult':
        return <StageResultComponent data={data} style={style} isSelected={isSelected && !isPreview} />;
        
      case 'header':
        return (
          <header className="text-center py-8">
            <h1 className="text-3xl font-playfair text-[#432818]">{data.title || 'Título do Quiz'}</h1>
            {data.subtitle && <p className="mt-2 text-[#8F7A6A]">{data.subtitle}</p>}
          </header>
        );
        
      case 'headline':
        return (
          <div className="py-4">
            <h2 className="text-2xl font-playfair text-[#432818]">{data.title || 'Título da Seção'}</h2>
            {data.subtitle && <p className="mt-1 text-[#8F7A6A]">{data.subtitle}</p>}
          </div>
        );
        
      case 'text':
        return (
          <div className="py-2">
            <p className="text-[#432818]">{data.text || 'Insira seu texto aqui...'}</p>
          </div>
        );
        
      case 'image':
        return (
          <div className="py-4">
            {data.imageUrl ? (
              <img 
                src={data.imageUrl} 
                alt={data.alt || "Imagem"} 
                className="mx-auto rounded-lg max-w-full h-auto"
              />
            ) : (
              <div className="bg-gray-200 rounded-lg w-full h-40 flex items-center justify-center text-[#8F7A6A]">
                Selecione uma imagem
              </div>
            )}
          </div>
        );
        
      case 'multipleChoice':
        return (
          <div className="py-4">
            <h3 className="text-xl font-medium text-[#432818] mb-4">{data.question || 'Sua pergunta aqui?'}</h3>
            <div className="space-y-2">
              {(data.options || ['Opção 1', 'Opção 2', 'Opção 3']).map((option, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 border rounded-lg border-[#B89B7A]/30 hover:border-[#B89B7A]">
                  <input type="checkbox" className="h-5 w-5 text-[#B89B7A] focus:ring-[#B89B7A]" />
                  <label className="text-[#432818]">{option}</label>
                </div>
              ))}
            </div>
          </div>
        );
        
      case 'singleChoice':
        return (
          <div className="py-4">
            <h3 className="text-xl font-medium text-[#432818] mb-4">{data.question || 'Sua pergunta aqui?'}</h3>
            <div className="space-y-2">
              {(data.options || ['Opção 1', 'Opção 2', 'Opção 3']).map((option, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 border rounded-lg border-[#B89B7A]/30 hover:border-[#B89B7A]">
                  <input type="radio" name="singleChoice" className="h-5 w-5 text-[#B89B7A] focus:ring-[#B89B7A]" />
                  <label className="text-[#432818]">{option}</label>
                </div>
              ))}
            </div>
          </div>
        );
        
      default:
        return (
          <div className="py-4 px-6 border border-dashed border-[#B89B7A]/40 rounded-lg text-center">
            <p className="text-[#8F7A6A]">Componente {type} ainda não implementado</p>
          </div>
        );
    }
  };
  
  return (
    <div 
      className={cn(
        "transition-all duration-200",
        !isPreview && "hover:outline-dashed hover:outline-1 hover:outline-[#B89B7A]/40",
        isSelected && !isPreview && "outline-dashed outline-2 outline-[#B89B7A]",
        !isPreview && "cursor-pointer"
      )}
    >
      {renderComponent()}
    </div>
  );
};
