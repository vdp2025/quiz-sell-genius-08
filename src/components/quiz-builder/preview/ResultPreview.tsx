
import React from 'react';
import { QuizResult, StyleResult } from '@/types/quiz';
import { StyleCategory, styleCategoryColors } from '@/types/styleTypes';

interface ResultPreviewProps {
  result: QuizResult;
}

const ResultPreview: React.FC<ResultPreviewProps> = ({ result }) => {
  const { primaryStyle, secondaryStyles } = result;

  const StyleBar = ({ style }: { style: StyleResult }) => (
    <div className="space-y-1 mb-4">
      <div className="flex justify-between items-center">
        <div className="font-medium">{style.category}</div>
        <div className="text-sm text-gray-500">{style.percentage}%</div>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="h-full rounded-full"
          style={{ 
            width: `${style.percentage}%`,
            backgroundColor: styleCategoryColors[style.category as StyleCategory] || '#B89B7A'
          }}
        ></div>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-playfair text-[#432818] mb-2">Seu Estilo Predominante</h1>
        <p className="text-gray-600">Descubra mais sobre seu estilo único e como aproveitar ao máximo suas características</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <div className="bg-[#FAF9F7] p-6 rounded-lg">
            <h2 className="text-2xl font-playfair text-[#432818] mb-4">
              {primaryStyle.category}
            </h2>
            <StyleBar style={primaryStyle} />
            
            <div className="space-y-4 mt-6">
              <h3 className="font-medium text-[#432818]">Estilos Secundários</h3>
              {secondaryStyles.map((style, index) => (
                <StyleBar key={index} style={style} />
              ))}
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="bg-white p-6 rounded-lg border border-[#B89B7A]/20">
            <h2 className="text-xl font-playfair text-[#432818] mb-4">
              Sobre seu estilo {primaryStyle.category}
            </h2>
            
            <div className="prose max-w-none">
              <p>
                O estilo {primaryStyle.category} reflete sua personalidade e preferências estéticas.
                Este estilo se caracteriza por peças que valorizam sua essência e realçam sua beleza natural.
              </p>
              <p>
                Com este guia personalizado, você poderá explorar melhor as possibilidades do seu estilo
                e construir um guarda-roupa mais autêntico e funcional.
              </p>
            </div>

            <div className="mt-8 bg-[#FAF9F7] p-6 rounded-lg border border-[#B89B7A]/20">
              <h3 className="text-lg font-medium text-[#432818] mb-3">
                Guia de Estilo e Imagem Personalizado
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Adquira seu guia completo com análise detalhada, paleta de cores personalizada e 
                recomendações de peças específicas para o seu tipo de estilo.
              </p>
              
              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-[#B89B7A] font-bold">✓</span>
                  <span>Análise detalhada do seu estilo pessoal</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#B89B7A] font-bold">✓</span>
                  <span>Paleta de cores personalizada</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#B89B7A] font-bold">✓</span>
                  <span>Guia de peças essenciais para o seu guarda-roupa</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#B89B7A] font-bold">✓</span>
                  <span>Dicas de tecidos e modelagens ideais</span>
                </li>
              </ul>
              
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="line-through text-gray-500">R$ 97,00</span>
                  <span className="text-2xl font-bold text-[#432818] ml-2">R$ 67,00</span>
                </div>
                <button className="bg-[#B89B7A] text-white px-4 py-2 rounded-md hover:bg-[#A38A69] transition-colors">
                  Adquirir meu Guia
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultPreview;
