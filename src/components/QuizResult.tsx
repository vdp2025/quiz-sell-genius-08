import React, { useEffect, useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import Logo from './ui/logo';
import { StyleResult } from '../types/quiz';
import { useAuth } from '../context/AuthContext';
import { ArrowRight, ShoppingCart, GiftIcon } from 'lucide-react';
import { styleConfig } from '../config/styleConfig';
import { useIsMobile } from '../hooks/use-mobile';

interface QuizResultProps {
  primaryStyle: StyleResult;
  secondaryStyles: StyleResult[];
}

const QuizResult: React.FC<QuizResultProps> = ({ primaryStyle, secondaryStyles }) => {
  const { user } = useAuth();
  const [userName, setUserName] = useState<string>('Visitante');
  const isMobile = useIsMobile();
  
  useEffect(() => {
    if (user && user.userName) {
      setUserName(user.userName);
      console.log("Setting name from auth context:", user.userName);
    } else {
      const storedName = localStorage.getItem('userName');
      if (storedName) {
        setUserName(storedName);
        console.log("Setting name from localStorage:", storedName);
      }
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-[#FAF9F7] px-2 md:px-4 py-4 md:py-8">
      <div className="max-w-4xl mx-auto space-y-4 md:space-y-8">
        <div className="text-center space-y-3">
          <Logo className="h-10 md:h-14 mx-auto" />
          <h1 className="font-playfair text-lg md:text-2xl font-semibold text-[#432818] px-2">
            Olá, {userName}, seu Estilo Predominante é:
          </h1>
        </div>

        <Card className="p-3 md:p-6 bg-white shadow-md">
          {isMobile ? (
            <div className="flex flex-col gap-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-playfair text-[#B89B7A]">
                      {primaryStyle.category}
                    </h2>
                    <span className="text-sm font-medium">{primaryStyle.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                    <div 
                      className="bg-[#B89B7A] h-1.5 rounded-full transition-all duration-300 ease-in-out" 
                      style={{ width: `${primaryStyle.percentage}%` }}
                    ></div>
                  </div>
                  <p className="text-[#1A1818]/80 text-sm mt-2">
                    {styleConfig[primaryStyle.category].description}
                  </p>
                </div>
                <div className="w-40 flex-shrink-0">
                  <img
                    src={styleConfig[primaryStyle.category].image}
                    alt={`Estilo ${primaryStyle.category}`}
                    className="w-full h-40 object-contain scale-90 rounded-lg shadow-sm"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row gap-4 md:gap-6">
              <div className="flex flex-col space-y-3">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl md:text-2xl font-playfair text-[#B89B7A]">
                    {primaryStyle.category}
                  </h2>
                  <span className="text-sm font-medium">{primaryStyle.percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div 
                    className="bg-[#B89B7A] h-1.5 rounded-full transition-all duration-300 ease-in-out" 
                    style={{ width: `${primaryStyle.percentage}%` }}
                  ></div>
                </div>
                <p className="text-[#1A1818]/80 text-sm md:text-base">
                  {styleConfig[primaryStyle.category].description}
                </p>
              </div>
              <div className="w-full md:w-48 lg:w-64 flex-shrink-0">
                <img
                  src={styleConfig[primaryStyle.category].image}
                  alt={`Estilo ${primaryStyle.category}`}
                  className="w-full h-[200px] md:h-[250px] object-contain scale-90 rounded-lg shadow-sm mx-auto"
                />
              </div>
            </div>
          )}

          <div className="mt-4 md:mt-6 space-y-3">
            <h3 className="text-base md:text-lg font-playfair text-[#432818]">
              Seus Estilos Complementares
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {secondaryStyles.slice(0, 2).map((style, index) => (
                <div key={style.category} className="flex gap-3 items-start bg-gray-50 p-2 md:p-3 rounded-lg">
                  {!isMobile && (
                    <img
                      src={styleConfig[style.category].image}
                      alt={`Estilo ${style.category}`}
                      className="w-14 md:w-16 h-14 md:h-16 object-contain scale-90 rounded"
                    />
                  )}
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <h4 className="font-playfair text-sm md:text-base text-[#432818]">{style.category}</h4>
                      <span className="text-xs font-medium">{style.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1">
                      <div 
                        className="bg-[#B89B7A] h-1 rounded-full" 
                        style={{ width: `${style.percentage}%` }}
                      ></div>
                    </div>
                    <p className="text-xs md:text-sm text-[#1A1818]/70 mt-1">
                      {styleConfig[style.category].description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card className="p-3 md:p-6 border border-[#B89B7A] bg-white">
          <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-center">
            <div className="w-full md:w-1/3">
              <div className="bg-[#B89B7A]/10 rounded-lg p-4 md:p-6 flex justify-center">
                <GiftIcon className="w-16 h-16 md:w-24 md:h-24 text-[#B89B7A]" />
              </div>
            </div>
            <div className="w-full md:w-2/3 space-y-4">
              <h3 className="text-xl md:text-2xl font-playfair text-[#432818]">Guia Completo do Estilo {primaryStyle.category}</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <span className="text-[#B89B7A] font-bold">✓</span>
                  <span>Melhores cores para seu subtom de pele</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#B89B7A] font-bold">✓</span>
                  <span>Peças essenciais para seu estilo</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#B89B7A] font-bold">✓</span>
                  <span>Combinações perfeitas para diversas ocasiões</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#B89B7A] font-bold">✓</span>
                  <span>Dicas de acessórios e acabamentos</span>
                </li>
              </ul>

              <div className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="line-through text-gray-500">R$ 97,00</div>
                  <div className="text-2xl font-bold text-[#432818]">R$ 47,00</div>
                </div>
                <Button className="w-full bg-[#B89B7A] hover:bg-[#B89B7A]/90 py-6 rounded-full">
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Quero Comprar Agora
                </Button>
              </div>
            </div>
          </div>
        </Card>
          
        <div className="text-center mt-6">
          <p className="text-[#1A1818]/80 mb-4">
            Aproveite esta oferta especial por tempo limitado!
          </p>
          <Button variant="outline" className="border-[#B89B7A] text-[#B89B7A]">
            Ver Mais Produtos
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuizResult;
