
import React from 'react';
import { StyleResult } from '@/types/quiz';
import { ResultPageConfig } from '@/types/resultPageConfig';

export interface QuizResultProps {
  primaryStyle: StyleResult;
  secondaryStyles: StyleResult[];
  config?: ResultPageConfig;
  previewMode?: boolean;
}

const QuizResult: React.FC<QuizResultProps> = ({ 
  primaryStyle, 
  secondaryStyles,
  config,
  previewMode = false
}) => {
  // Use config if provided, otherwise use default content
  // This makes the component work both with and without config
  
  return (
    <div className="min-h-screen bg-[#FAF9F7] py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-playfair text-[#432818] mb-6 text-center">
            {primaryStyle?.category || "Seu Estilo Pessoal"}
          </h1>
          
          {/* Aqui estaria o conteúdo detalhado do resultado */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <p className="text-[#8F7A6A] mb-4">
              Seu estilo predominante é <strong className="text-[#B89B7A]">{primaryStyle?.category}</strong>, 
              representando <strong className="text-[#B89B7A]">{primaryStyle?.percentage}%</strong> do seu perfil de estilo pessoal.
            </p>
            
            <p className="text-[#8F7A6A]">
              Isso significa que você tem afinidade com roupas e acessórios que possuem estas características...
              {previewMode && " (Este é um texto de exemplo para visualização)"}
            </p>
          </div>
          
          <h2 className="text-xl md:text-2xl font-playfair text-[#432818] mb-4 text-center">
            Estilos Secundários
          </h2>
          
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            {secondaryStyles.map((style, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-4">
                <h3 className="font-medium text-[#B89B7A] mb-2">{style.category}</h3>
                <p className="text-sm text-[#8F7A6A]">{style.percentage}% de influência</p>
              </div>
            ))}
          </div>
          
          {/* Aqui seguiriam mais seções de conteúdo */}
        </div>
      </div>
    </div>
  );
};

export default QuizResult;
