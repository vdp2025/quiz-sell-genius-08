
import React, { useEffect, useState } from 'react';
import { StyleResult } from '@/types/quiz';

interface SecondaryStylesBlockPreviewProps {
  content: {
    title?: string;
    style?: any;
  };
}

const SecondaryStylesBlockPreview: React.FC<SecondaryStylesBlockPreviewProps> = ({ content }) => {
  const [secondaryStyles, setSecondaryStyles] = useState<StyleResult[]>([]);
  
  // Carregar os estilos secundários do localStorage
  useEffect(() => {
    const savedResult = localStorage.getItem('quizResult');
    if (savedResult) {
      try {
        const result = JSON.parse(savedResult);
        if (result.secondaryStyles && Array.isArray(result.secondaryStyles)) {
          setSecondaryStyles(result.secondaryStyles.slice(0, 2));
        }
      } catch (error) {
        console.error('Erro ao carregar estilos secundários:', error);
      }
    }
  }, []);

  return (
    <div style={content.style}>
      <h3 className="text-xl font-bold mb-4 text-[#aa6b5d] text-center">
        {content.title || 'Seus Estilos Complementares'}
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {secondaryStyles.length > 0 ? (
          secondaryStyles.map((style) => (
            <div key={style.category} className="bg-[#fff7f3] p-4 rounded-lg">
              <div className="flex justify-between items-center mb-1">
                <h4 className="font-medium text-[#aa6b5d]">{style.category}</h4>
                <span className="text-sm font-medium text-[#8F7A6A]">{style.percentage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5 mb-2">
                <div 
                  className="bg-[#B89B7A] h-1.5 rounded-full" 
                  style={{ width: `${style.percentage}%` }}
                />
              </div>
              <p className="text-[#1A1818]/80 text-sm">
                {getStyleDescription(style.category)}
              </p>
            </div>
          ))
        ) : (
          // Fallback se não houver estilos secundários
          <>
            <div className="bg-[#fff7f3] p-4 rounded-lg">
              <h4 className="font-medium text-[#aa6b5d] mb-2">Natural</h4>
              <p className="text-[#1A1818]/80 text-sm">
                Você valoriza o conforto e a praticidade. Seu estilo é descontraído e casual, com peças fáceis de usar no dia a dia.
              </p>
            </div>
            
            <div className="bg-[#fff7f3] p-4 rounded-lg">
              <h4 className="font-medium text-[#aa6b5d] mb-2">Contemporâneo</h4>
              <p className="text-[#1A1818]/80 text-sm">
                Você gosta de estar atualizado e seguir as tendências. Seu estilo é moderno e versátil, combinando o clássico com o atual.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// Função auxiliar para obter descrições de estilos
function getStyleDescription(category: string): string {
  const descriptions: Record<string, string> = {
    'Natural': 'Você valoriza o conforto e a praticidade. Seu estilo é descontraído e casual, com peças fáceis de usar no dia a dia.',
    'Clássico': 'Você aprecia a tradição e o refinamento. Seu estilo é atemporal e elegante, com peças de qualidade que duram por anos.',
    'Contemporâneo': 'Você gosta de estar atualizado e seguir as tendências. Seu estilo é moderno e versátil, combinando o clássico com o atual.',
    'Elegante': 'Você valoriza a sofisticação e o requinte. Seu estilo é marcado por peças bem estruturadas e acabamentos impecáveis.',
    'Romântico': 'Você aprecia a delicadeza e a feminilidade. Seu estilo é suave e gracioso, com tecidos fluidos e detalhes delicados.',
    'Sexy': 'Você valoriza a sensualidade e a confiança. Seu estilo é marcante e atraente, evidenciando suas curvas naturais.',
    'Dramático': 'Você busca o impacto visual e a originalidade. Seu estilo é marcante e ousado, com peças estruturadas e volumes exagerados.',
    'Criativo': 'Você aprecia a expressão pessoal e a experimentação. Seu estilo é único e eclético, misturando diferentes influências e estilos.'
  };
  
  return descriptions[category] || 'Este estilo reflete uma parte importante da sua personalidade e complementa seu estilo predominante.';
}

export default SecondaryStylesBlockPreview;
