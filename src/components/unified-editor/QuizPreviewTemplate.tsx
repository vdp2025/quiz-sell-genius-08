import React from 'react';
import { QuizStage, QuizComponentType, QuizComponentData } from '@/types/quizBuilder';

// Exemplos de layouts para diferentes tipos de etapas de quiz
const TEMPLATE_PREVIEWS = {
  welcome: (
    <div className="preview-container">
      <div className="preview-header">
        <img src="/previews/logo.png" alt="Logo" className="h-12 mx-auto my-4" />
        <div className="w-full h-2 bg-gradient-to-r from-[#E6C892] via-[#F0F0F0] to-[#F0F0F0]"></div>
      </div>
      
      <div className="text-center p-6">
        <h1 className="text-3xl font-serif text-[#432818] mb-6">Teste de Estilo Pessoal</h1>
        
        <div className="border-2 border-dashed border-blue-300 rounded-lg p-4 mb-6">
          <img 
            src="/previews/quiz-welcome.png" 
            alt="Imagem de boas-vindas" 
            className="max-w-full h-auto rounded"
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 mb-1">NOME *</label>
          <input 
            type="text" 
            placeholder="Digite seu nome aqui..." 
            className="w-full p-3 border border-gray-300 rounded-md" 
          />
        </div>
        
        <button className="w-full bg-[#D2B586] text-white py-3 rounded-md font-medium">
          Continuar
        </button>
      </div>
    </div>
  ),
  
  image_choice: (
    <div className="preview-container">
      <div className="preview-header">
        <img src="/previews/logo.png" alt="Logo" className="h-12 mx-auto my-4" />
        <div className="w-full h-2 bg-gradient-to-r from-[#E6C892] via-[#F0F0F0] to-[#F0F0F0]"></div>
      </div>
      
      <div className="p-6">
        <h2 className="text-2xl font-serif text-center text-[#432818] mb-6">
          2- Qual é o seu tipo de roupa favorita?
        </h2>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="border-2 border-dashed border-blue-300 rounded-lg overflow-hidden">
            <div className="aspect-w-3 aspect-h-4 bg-gray-100">
              <img 
                src="/previews/outfit-casual.png" 
                alt="Roupa casual" 
                className="w-full h-full object-cover" 
              />
            </div>
            <div className="p-3 text-center">
              <p className="font-medium">A) Amo roupas confortáveis e práticas para o dia a dia.</p>
            </div>
          </div>
          
          <div className="border-2 border-dashed border-blue-300 rounded-lg overflow-hidden">
            <div className="aspect-w-3 aspect-h-4 bg-gray-100">
              <img 
                src="/previews/outfit-elegant.png" 
                alt="Roupa elegante" 
                className="w-full h-full object-cover" 
              />
            </div>
            <div className="p-3 text-center">
              <p className="font-medium">B) Prefiro peças discretas, clássicas e atemporais.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
  
  text_choice: (
    <div className="preview-container">
      <div className="preview-header">
        <img src="/previews/logo.png" alt="Logo" className="h-12 mx-auto my-4" />
        <div className="w-full h-2 bg-gradient-to-r from-[#E6C892] via-[#F0F0F0] to-[#F0F0F0]"></div>
      </div>
      
      <div className="p-6">
        <h2 className="text-2xl font-serif text-center text-[#432818] mb-6">
          11. Como você gosta de realizar suas compras?
        </h2>
        
        <div className="space-y-4">
          <div className="p-3 border border-gray-200 rounded-md flex items-center hover:bg-gray-50 cursor-pointer">
            <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center bg-gray-100 rounded-full mr-3">
              <span className="text-yellow-500">👍</span>
            </div>
            <div>
              <p>A) Compro quando preciso, não gosto de perder tempo e adoro facilidades.</p>
            </div>
          </div>
          
          <div className="p-3 border border-gray-200 rounded-md flex items-center hover:bg-gray-50 cursor-pointer">
            <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center bg-gray-100 rounded-full mr-3">
              <span className="text-yellow-500">🤔</span>
            </div>
            <div>
              <p>B) Faço compras planejadas, priorizo qualidade e espero até encontrar a peça perfeita.</p>
            </div>
          </div>
          
          <div className="p-3 border border-gray-200 rounded-md flex items-center hover:bg-gray-50 cursor-pointer">
            <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center bg-gray-100 rounded-full mr-3">
              <span className="text-yellow-500">🛍️</span>
            </div>
            <div>
              <p>C) Compro peças para atualizar meu guarda-roupa. Às vezes, compro pela internet pela praticidade.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

interface QuizPreviewTemplateProps {
  stage: QuizStage;
  components: QuizComponentData[];
}

export const QuizPreviewTemplate: React.FC<QuizPreviewTemplateProps> = ({ stage, components }) => {
  // Determinar o tipo de template a mostrar com base no estágio ou nos componentes
  const getPreviewTemplate = () => {
    // Se for a primeira etapa, use o template de boas-vindas
    if (stage.order === 0) {
      return TEMPLATE_PREVIEWS.welcome;
    }
    
    // Verificar se há componentes de imagem para escolher o template adequado
    const hasImageChoices = components.some(c => 
      c.type === 'image' || c.data.displayType === 'image' || c.data.displayType === 'both'
    );
    
    if (hasImageChoices) {
      return TEMPLATE_PREVIEWS.image_choice;
    }
    
    // Default para escolhas de texto
    return TEMPLATE_PREVIEWS.text_choice;
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      {getPreviewTemplate()}
    </div>
  );
}; 