
import React from 'react';
import { QuizComponentData } from '@/types/quizBuilder';
import { Card } from '@/components/ui/card';

interface ComponentRendererProps {
  component: QuizComponentData;
}

const ComponentRenderer: React.FC<ComponentRendererProps> = ({ component }) => {
  const renderComponentContent = () => {
    switch (component.type) {
      case 'header':
        return (
          <div className="text-center space-y-2">
            {component.data.title && (
              <h1 className="text-2xl md:text-3xl font-playfair font-semibold">
                {component.data.title}
              </h1>
            )}
            {component.data.subtitle && (
              <p className="text-lg text-gray-600">{component.data.subtitle}</p>
            )}
          </div>
        );
      
      case 'text':
        return <p className="text-gray-800">{component.data.text || 'Conteúdo de texto'}</p>;
      
      case 'image':
        return (
          <div className="text-center">
            {component.data.imageUrl ? (
              <img
                src={component.data.imageUrl}
                alt={component.data.alt || 'Imagem do quiz'}
                className="max-w-full max-h-[300px] mx-auto rounded-lg object-cover"
              />
            ) : (
              <div className="bg-gray-100 h-[200px] rounded-lg flex items-center justify-center">
                <p className="text-gray-400">Imagem não configurada</p>
              </div>
            )}
            {component.data.caption && (
              <p className="mt-2 text-sm text-gray-500">{component.data.caption}</p>
            )}
          </div>
        );
      
      case 'multipleChoice':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-medium">{component.data.question || 'Pergunta do quiz'}</h3>
            
            <div className={`grid gap-3 ${ 
              component.data.displayType === 'text' ? 'grid-cols-1' :
              component.data.displayType === 'both' ? 'grid-cols-1 md:grid-cols-2' :
              'grid-cols-2 md:grid-cols-4'
            }`}>
              {(component.data.options || ['Opção 1', 'Opção 2', 'Opção 3', 'Opção 4']).map((option, index) => (
                <div 
                  key={index}
                  className="border border-[#B89B7A]/30 rounded-lg p-4 hover:border-[#B89B7A] cursor-pointer transition-all"
                >
                  {component.data.displayType !== 'text' && component.data.optionImages && component.data.optionImages[index] && (
                    <div className="mb-3">
                      <img 
                        src={component.data.optionImages[index]}
                        alt={`Imagem para ${option}`}
                        className="w-full h-32 object-cover rounded-md"
                      />
                    </div>
                  )}
                  <div className={`text-[#432818] ${component.data.displayType === 'image' ? 'text-center' : ''}`}>
                    {option}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-sm text-gray-500 mt-1">
              Selecione {component.data.multiSelect || 3} opções
            </div>
          </div>
        );
      
      case 'quizResult':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-medium">Conteúdo do Resultado</h3>
            <p className="text-gray-600">
              Este componente exibirá o resultado do quiz com base nas respostas do usuário.
            </p>
          </div>
        );
      
      default:
        return (
          <div className="p-4 text-center text-gray-500">
            Componente tipo: {component.type}
          </div>
        );
    }
  };

  // Apply component styles
  const style: React.CSSProperties = {
    padding: component.style?.paddingY ? `${component.style.paddingY}px ${component.style.paddingX || 16}px` : undefined,
    backgroundColor: component.style?.backgroundColor || undefined,
    color: component.style?.textColor || undefined,
    borderRadius: component.style?.borderRadius ? `${component.style.borderRadius}px` : undefined,
  };

  return (
    <Card style={style} className="overflow-hidden">
      <div className="p-4">
        {renderComponentContent()}
      </div>
    </Card>
  );
};

export default ComponentRenderer;
