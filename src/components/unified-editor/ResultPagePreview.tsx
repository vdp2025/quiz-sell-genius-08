
import React from 'react';
import { StyleResult } from '@/types/quiz';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ResultPagePreviewProps {
  primaryStyle: StyleResult;
  secondaryStyles: StyleResult[];
  resultSettings: any;
  activeBlockId: string | null;
  isPreviewing: boolean;
}

const ResultPagePreview: React.FC<ResultPagePreviewProps> = ({
  primaryStyle,
  secondaryStyles,
  resultSettings,
  activeBlockId,
  isPreviewing
}) => {
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm">
      {/* Preview mode shows the entire result page */}
      {isPreviewing ? (
        <div className="p-8">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-3xl font-playfair mb-4 text-[#432818]">
              Seu Resultado de Estilo Pessoal
            </h1>
            <p className="text-gray-600 max-w-lg mx-auto">
              Com base nas suas respostas, identificamos seu estilo predominante e suas influências secundárias.
            </p>
          </div>
          
          {/* Primary Style Section */}
          <div className="bg-[#FAF9F7] p-8 rounded-lg mb-12">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-medium mb-2 text-[#432818]">
                Seu estilo predominante é <span className="font-bold">{primaryStyle.category}</span>
              </h2>
              <p className="text-gray-600">{primaryStyle.percentage}% de suas escolhas refletem esse estilo</p>
            </div>
            
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="md:w-1/3">
                <div className="rounded-lg overflow-hidden aspect-square">
                  <img 
                    src={`https://res.cloudinary.com/dqljyf76t/image/upload/v1744735329/13_uvbciq.webp`}
                    alt={`Estilo ${primaryStyle.category}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              <div className="md:w-2/3">
                <p className="text-gray-700 mb-4">
                  O estilo <strong>{primaryStyle.category}</strong> é caracterizado por peças elegantes, 
                  sofisticadas e com caimento impecável. Você aprecia roupas de qualidade, 
                  cortes clássicos e tecidos nobres. Sua imagem transmite sofisticação e status.
                </p>
                
                <h3 className="font-medium mb-2">Principais características:</h3>
                <ul className="list-disc list-inside space-y-1 mb-4">
                  <li>Peças bem estruturadas com caimento impecável</li>
                  <li>Cores neutras e sóbrias</li>
                  <li>Tecidos de alta qualidade</li>
                  <li>Acessórios refinados e discretos</li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Secondary Styles Section */}
          <div className="mb-12">
            <h3 className="text-xl font-medium mb-6 text-[#432818] text-center">
              Seus estilos secundários
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {secondaryStyles.map((style, index) => (
                <div key={style.category} className="border rounded-lg p-4">
                  <h4 className="font-medium mb-1">{style.category}</h4>
                  <div className="flex items-center space-x-2">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-[#B89B7A] h-2.5 rounded-full" 
                        style={{ width: `${style.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-500">{style.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Offer Section */}
          <div className="border-t pt-12">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-playfair mb-3 text-[#432818]">
                Aprimore seu estilo com consultoria especializada
              </h3>
              <p className="text-gray-600 max-w-lg mx-auto">
                Descubra como destacar o melhor do seu estilo com nossa consultoria personalizada.
              </p>
            </div>
            
            <div className="bg-[#FAF9F7] p-6 rounded-lg">
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="md:w-1/3">
                  <div className="rounded-lg overflow-hidden">
                    <img 
                      src="https://res.cloudinary.com/dqljyf76t/image/upload/v1744735317/5_dhrgpf.webp"
                      alt="Consultoria de Imagem"
                      className="w-full h-auto"
                    />
                  </div>
                </div>
                
                <div className="md:w-2/3">
                  <h4 className="text-xl font-medium mb-3 text-[#432818]">Consultoria de Imagem</h4>
                  <p className="mb-4">
                    Uma consultoria personalizada para ajudar você a potencializar seu estilo {primaryStyle.category} 
                    e integrar elementos dos seus estilos secundários de forma harmoniosa.
                  </p>
                  
                  <div className="mb-6">
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">Preço:</span>
                      <span className="font-medium text-[#432818]">R$ 497,00</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>Parcelamento:</span>
                      <span>12x de R$ 49,90</span>
                    </div>
                  </div>
                  
                  <Button className="w-full bg-[#B89B7A] hover:bg-[#A38A69] py-6">
                    Quero aprimorar meu estilo
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Edit mode shows blocks with highlight for selected block
        <div className="p-6">
          {/* Header Block */}
          <div 
            className={cn(
              "p-6 border-2 mb-4 rounded-lg cursor-pointer transition-all",
              activeBlockId === 'header' ? "border-[#B89B7A]" : "border-dashed border-gray-300 hover:border-gray-400"
            )}
          >
            <div className="text-center">
              <h1 className="text-3xl font-playfair mb-4 text-[#432818]">
                Seu Resultado de Estilo Pessoal
              </h1>
              <p className="text-gray-600">
                Com base nas suas respostas, identificamos seu estilo predominante e suas influências secundárias.
              </p>
            </div>
          </div>
          
          {/* Primary Style Block */}
          <div 
            className={cn(
              "p-6 border-2 mb-4 rounded-lg cursor-pointer transition-all",
              activeBlockId === 'primary-style' ? "border-[#B89B7A]" : "border-dashed border-gray-300 hover:border-gray-400"
            )}
          >
            <div className="text-center mb-4">
              <h2 className="text-2xl font-medium mb-2 text-[#432818]">
                Seu estilo predominante é <span className="font-bold">{primaryStyle.category}</span>
              </h2>
              <p className="text-gray-600">{primaryStyle.percentage}% de suas escolhas refletem esse estilo</p>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="md:w-1/3">
                <div className="bg-gray-100 rounded-lg aspect-square flex items-center justify-center">
                  <span className="text-gray-400">Imagem do estilo</span>
                </div>
              </div>
              <div className="md:w-2/3">
                <p className="text-gray-700">
                  Descrição do estilo predominante com suas principais características e recomendações.
                </p>
              </div>
            </div>
          </div>
          
          {/* Secondary Styles Block */}
          <div 
            className={cn(
              "p-6 border-2 mb-4 rounded-lg cursor-pointer transition-all",
              activeBlockId === 'secondary-styles' ? "border-[#B89B7A]" : "border-dashed border-gray-300 hover:border-gray-400"
            )}
          >
            <h3 className="text-xl font-medium mb-4 text-[#432818] text-center">
              Seus estilos secundários
            </h3>
            
            <div className="grid grid-cols-2 gap-3">
              {secondaryStyles.slice(0, 4).map((style) => (
                <div key={style.category} className="border rounded-lg p-3">
                  <h4 className="font-medium mb-1">{style.category}</h4>
                  <div className="flex items-center space-x-2">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-[#B89B7A] h-2.5 rounded-full" 
                        style={{ width: `${style.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-500">{style.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Offer Block */}
          <div 
            className={cn(
              "p-6 border-2 mb-4 rounded-lg cursor-pointer transition-all",
              activeBlockId === 'product-offer' ? "border-[#B89B7A]" : "border-dashed border-gray-300 hover:border-gray-400"
            )}
          >
            <div className="text-center mb-4">
              <h3 className="text-xl font-medium mb-2 text-[#432818]">
                Aprimore seu estilo com consultoria especializada
              </h3>
            </div>
            
            <div className="bg-[#FAF9F7] p-4 rounded-lg">
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="md:w-1/3">
                  <div className="bg-gray-200 rounded-lg aspect-[4/3] flex items-center justify-center">
                    <span className="text-gray-500">Imagem do produto</span>
                  </div>
                </div>
                
                <div className="md:w-2/3">
                  <h4 className="font-medium mb-2">Consultoria de Imagem</h4>
                  <p className="text-sm mb-3">
                    Descrição breve da oferta personalizada com base no estilo do usuário.
                  </p>
                  
                  <div className="mb-4">
                    <div className="flex justify-between text-sm">
                      <span>Preço:</span>
                      <span className="font-medium">R$ 497,00</span>
                    </div>
                  </div>
                  
                  <Button className="w-full bg-[#B89B7A] hover:bg-[#A38A69]">
                    Botão de ação
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultPagePreview;
