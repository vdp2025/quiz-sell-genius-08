
import React from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { StyleResult } from '../types/quiz';
import { useAuth } from '../context/AuthContext';
import { ArrowRight, Award, Gift, ShoppingCart } from 'lucide-react';

interface StyleDescriptionProps {
  styleCategory: StyleResult['category'];
}

const StyleDescription: React.FC<StyleDescriptionProps> = ({ styleCategory }) => {
  const descriptions: Record<StyleResult['category'], { title: string; description: string }> = {
    'Natural': {
      title: 'Estilo Natural',
      description: 'Você valoriza o conforto, praticidade e autenticidade. Suas escolhas de vestuário refletem uma personalidade descomplicada e uma abordagem relaxada à moda.'
    },
    'Clássico': {
      title: 'Estilo Clássico',
      description: 'Você aprecia peças atemporais, elegância discreta e qualidade. Sua abordagem à moda é refinada, organizada e foca em investimentos duradouros.'
    },
    'Contemporâneo': {
      title: 'Estilo Contemporâneo',
      description: 'Você busca o equilíbrio entre o clássico e o moderno, valorizando peças atuais mas com praticidade e versatilidade no dia a dia.'
    },
    'Elegante': {
      title: 'Estilo Elegante',
      description: 'Você preza pela sofisticação, requinte e apresentação impecável. Sua imagem transmite status, excelência e um gosto refinado.'
    },
    'Romântico': {
      title: 'Estilo Romântico',
      description: 'Você valoriza a delicadeza, feminilidade e os detalhes suaves. Sua aparência expressa sensibilidade e uma natureza sonhadora.'
    },
    'Sexy': {
      title: 'Estilo Sexy',
      description: 'Você gosta de valorizar suas curvas e atrair olhares. Sua imagem transmite confiança, sensualidade e uma personalidade marcante.'
    },
    'Dramático': {
      title: 'Estilo Dramático',
      description: 'Você aprecia peças com impacto visual, estrutura e modernidade. Sua imagem comunica ousadia, autoridade e uma mentalidade vanguardista.'
    },
    'Criativo': {
      title: 'Estilo Criativo',
      description: 'Você gosta de experimentar, misturar e expressar sua individualidade. Sua imagem reflete originalidade, liberdade e uma personalidade artística.'
    }
  };

  return (
    <div className="space-y-2">
      <h3 className="text-xl font-playfair text-[#432818]">{descriptions[styleCategory].title}</h3>
      <p className="text-[#1A1818]/80">{descriptions[styleCategory].description}</p>
    </div>
  );
};

interface QuizResultProps {
  primaryStyle: StyleResult;
  secondaryStyles: StyleResult[];
}

const QuizResult: React.FC<QuizResultProps> = ({ primaryStyle, secondaryStyles }) => {
  const { user } = useAuth();
  const topThreeStyles = [primaryStyle, ...secondaryStyles.slice(0, 2)];

  return (
    <div className="min-h-screen bg-[#FAF9F7] px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-10">
        <div className="text-center space-y-4">
          <img
            src="/lovable-uploads/ce883c46-80e0-4171-9c2d-9288f44f88eb.png"
            alt="Logo Gisele Galvão"
            className="h-16 mx-auto"
          />
          <h1 className="font-playfair text-4xl font-semibold text-[#432818]">
            Seu Resultado, {user?.userName || 'Visitante'}!
          </h1>
          <p className="text-lg text-[#1A1818]/80 max-w-2xl mx-auto">
            Com base nas suas respostas, identificamos seu estilo predominante e estilos complementares.
            Use essas informações para construir um guarda-roupa que realmente combine com sua personalidade!
          </p>
        </div>

        <Card className="p-8 bg-white shadow-md">
          <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
            <div className="w-full md:w-1/3 flex justify-center">
              <div className="rounded-full bg-[#B89B7A]/20 p-6 inline-block">
                <Award className="w-24 h-24 text-[#B89B7A]" />
              </div>
            </div>
            <div className="w-full md:w-2/3 space-y-4">
              <h2 className="text-3xl font-playfair text-[#432818]">
                Seu estilo predominante é: <span className="font-semibold">{primaryStyle.category}</span>
              </h2>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div 
                  className="bg-[#B89B7A] h-4 rounded-full" 
                  style={{ width: `${primaryStyle.percentage}%` }}
                ></div>
              </div>
              <p className="text-sm text-end">{primaryStyle.percentage}%</p>
              <StyleDescription styleCategory={primaryStyle.category} />
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topThreeStyles.map((style, index) => (
            <Card key={style.category} className="p-6 bg-white shadow-sm">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-playfair text-xl text-[#432818]">{style.category}</h3>
                  <span className="text-sm font-medium">{style.percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-[#B89B7A] h-2 rounded-full" 
                    style={{ width: `${style.percentage}%` }}
                  ></div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-playfair text-center text-[#432818]">
            Aprimore seu estilo com nossos produtos
          </h2>
          
          <Card className="p-8 border-2 border-[#B89B7A] bg-white">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="w-full md:w-1/3">
                <div className="bg-[#B89B7A]/10 rounded-lg p-6 flex justify-center">
                  <Gift className="w-24 h-24 text-[#B89B7A]" />
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
    </div>
  );
};

export default QuizResult;
