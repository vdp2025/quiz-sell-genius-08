
import React from 'react';
import { QuizResult } from '@/types/quiz';
import { styleConfig } from '@/config/styleConfig';
import { Card } from '@/components/ui/card';

interface ResultPreviewProps {
  result: QuizResult;
}

const ResultPreview: React.FC<ResultPreviewProps> = ({ result }) => {
  const userName = localStorage.getItem('userName') || 'Usuário';
  
  return (
    <div className="space-y-8">
      <div className="text-center space-y-3">
        <h1 className="font-playfair text-lg md:text-2xl font-semibold text-[#432818] px-2">
          {`Olá, ${userName}, seu Estilo Predominante é:`}
        </h1>
        <h2 className="text-2xl md:text-3xl font-playfair font-bold text-[#B89B7A]">
          {result.primaryStyle.category}
        </h2>
      </div>
      
      <Card className="p-6 bg-white mb-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <p className="text-[#432818] leading-relaxed">
              {styleConfig[result.primaryStyle.category]?.description || 
                'Descrição do estilo predominante. Esta área será preenchida com informações detalhadas sobre as características do estilo escolhido, incluindo dicas de vestuário, acessórios e combinações.'}
            </p>
          </div>
          <div className="order-first md:order-last">
            <img 
              src={styleConfig[result.primaryStyle.category]?.image || '/placeholder-style.jpg'} 
              alt={`Estilo ${result.primaryStyle.category}`} 
              className="w-full h-full object-cover rounded-lg"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://placehold.co/600x400?text=Estilo+Predominante';
              }}
            />
          </div>
        </div>
      </Card>
      
      <div className="space-y-4">
        <h3 className="text-xl font-playfair font-medium text-[#432818]">
          Seus Estilos Secundários
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {result.secondaryStyles.slice(0, 3).map((style) => (
            <Card key={style.category} className="p-4 bg-white">
              <div className="space-y-2">
                <h4 className="font-medium text-[#B89B7A]">{style.category}</h4>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-[#B89B7A] h-2 rounded-full" 
                    style={{ width: `${style.percentage}%` }}
                  ></div>
                </div>
                <p className="text-right text-sm text-gray-600">{style.percentage}%</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
      
      <div className="space-y-4 mt-8">
        <h3 className="text-xl font-playfair font-medium text-[#432818]">
          Guia de Estilo e Imagem
        </h3>
        
        <Card className="p-6 bg-white">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-[#B89B7A] mb-3">O que está incluído:</h4>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-[#B89B7A] mr-2">✓</span>
                  <span>Análise detalhada do seu estilo pessoal</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#B89B7A] mr-2">✓</span>
                  <span>Paleta de cores personalizada</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#B89B7A] mr-2">✓</span>
                  <span>Guia de peças essenciais para o seu guarda-roupa</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#B89B7A] mr-2">✓</span>
                  <span>Dicas de tecidos e modelagens ideais</span>
                </li>
              </ul>
            </div>
            <div>
              <img 
                src="https://res.cloudinary.com/dqljyf76t/image/upload/v1745071347/MOCKUP_TABLETE_-_GUIA_DE_IMAGEM_E_ESTILO_ncctzi.webp"
                alt="Guia de Estilo e Imagem"
                className="rounded-lg w-full h-auto"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://placehold.co/600x400?text=Guia+de+Estilo';
                }}
              />
            </div>
          </div>
        </Card>
      </div>
      
      <div className="text-center py-8">
        <button className="bg-[#B89B7A] hover:bg-[#9F836A] text-white rounded-md px-8 py-3 text-lg font-medium transition-all duration-200">
          Adquirir meu Guia de Estilo
        </button>
      </div>
    </div>
  );
};

export default ResultPreview;
