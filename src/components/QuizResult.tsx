
import React, { useEffect, useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { StyleResult } from '../types/quiz';
import { useAuth } from '../context/AuthContext';
import { ArrowRight, ShoppingCart, GiftIcon } from 'lucide-react';
import { styleConfig } from '../config/styleConfig';

interface QuizResultProps {
  primaryStyle: StyleResult;
  secondaryStyles: StyleResult[];
}

const QuizResult: React.FC<QuizResultProps> = ({ primaryStyle, secondaryStyles }) => {
  const { user } = useAuth();
  const [userName, setUserName] = useState<string>('Visitante');
  
  useEffect(() => {
    // Try to get name from context first
    if (user && user.userName) {
      setUserName(user.userName);
      console.log("Setting name from auth context:", user.userName);
    } else {
      // Fall back to localStorage
      const storedName = localStorage.getItem('userName');
      if (storedName) {
        setUserName(storedName);
        console.log("Setting name from localStorage:", storedName);
      }
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-[#FAF9F7] px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-10">
        <div className="text-center space-y-4">
          <img
            src="/lovable-uploads/ce883c46-80e0-4171-9c2d-9288f44f88eb.png"
            alt="Logo Gisele Galvão"
            className="h-16 mx-auto"
          />
          <h1 className="font-playfair text-xl md:text-4xl font-semibold text-[#432818]">
            Olá, {userName}, seu Estilo Predominante é: {primaryStyle.category} ({primaryStyle.percentage}%)
          </h1>
        </div>

        <Card className="p-6 md:p-8 bg-white shadow-md">
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row items-start gap-8">
              <div className="w-full md:w-1/3">
                <img
                  src={styleConfig[primaryStyle.category].image}
                  alt={`Estilo ${primaryStyle.category}`}
                  className="w-full h-[200px] md:h-[300px] object-contain scale-90 rounded-lg shadow-sm"
                />
              </div>
              <div className="w-full md:w-2/3 space-y-4">
                <h2 className="text-2xl md:text-3xl font-playfair text-[#432818]">
                  {primaryStyle.category}
                </h2>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div 
                    className="bg-[#B89B7A] h-4 rounded-full" 
                    style={{ width: `${primaryStyle.percentage}%` }}
                  ></div>
                </div>
                <p className="text-[#1A1818]/80 text-base md:text-lg">
                  {styleConfig[primaryStyle.category].description}
                </p>

                <div className="mt-6 space-y-4">
                  <h3 className="text-lg md:text-xl font-playfair text-[#432818]">
                    Seus Estilos Complementares
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {secondaryStyles.slice(0, 2).map((style, index) => (
                      <div key={style.category} className="flex gap-3 items-start bg-gray-50 p-3 rounded-lg">
                        <img
                          src={styleConfig[style.category].image}
                          alt={`Estilo ${style.category}`}
                          className="w-16 h-16 object-contain scale-90 rounded"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-1">
                            <h4 className="font-playfair text-base text-[#432818]">{style.category}</h4>
                            <span className="text-sm font-medium">{style.percentage}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                            <div 
                              className="bg-[#B89B7A]/70 h-2 rounded-full" 
                              style={{ width: `${style.percentage}%` }}
                            ></div>
                          </div>
                          <p className="text-xs md:text-sm text-[#1A1818]/70 line-clamp-2">
                            {styleConfig[style.category].description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-8 border-2 border-[#B89B7A] bg-white">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="w-full md:w-1/3">
              <div className="bg-[#B89B7A]/10 rounded-lg p-6 flex justify-center">
                <GiftIcon className="w-24 h-24 text-[#B89B7A]" />
              </div>
            </div>
            <div className="w-full md:w-2/3 space-y-4">
              <h3 className="text-2xl font-playfair text-[#432818]">Guia Completo do Estilo {primaryStyle.category}</h3>
              <ul className="space-y-2">
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
          
        <div className="text-center mt-8">
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
