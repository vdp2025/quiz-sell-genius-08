
import React, { useEffect } from 'react';
import { useQuiz } from '@/hooks/useQuiz';
import { useGlobalStyles } from '@/hooks/useGlobalStyles';
import { Header } from '@/components/result/Header';
import { styleConfig } from '@/config/styleConfig';
import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { AnimatedWrapper } from '@/components/ui/animated-wrapper';
import SecondaryStylesSection from '@/components/quiz-result/SecondaryStylesSection';
import ErrorState from '@/components/result/ErrorState';
import MotivationSection from '@/components/result/MotivationSection';
import MentorSection from '@/components/result/MentorSection';
import GuaranteeSection from '@/components/result/GuaranteeSection';
import ProductShowcase from '@/components/quiz-result/sales/ProductShowcase';
import BenefitList from '@/components/quiz-result/sales/BenefitList';
import Testimonials from '@/components/quiz-result/sales/Testimonials';

const ResultPage: React.FC = () => {
  const { primaryStyle, secondaryStyles } = useQuiz();
  const { globalStyles } = useGlobalStyles();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!primaryStyle) {
    return <ErrorState />;
  }

  const { category } = primaryStyle;
  const { image, guideImage, description } = styleConfig[category];

  return (
    <div
      className="min-h-screen bg-[#fffaf7]"
      style={{
        backgroundColor: globalStyles.backgroundColor || '#fffaf7',
        color: globalStyles.textColor || '#432818',
        fontFamily: globalStyles.fontFamily || 'inherit',
      }}
    >
      <Header
        primaryStyle={primaryStyle}
        logoHeight={globalStyles.logoHeight}
        logo={globalStyles.logo}
        logoAlt={globalStyles.logoAlt}
      />

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Estilo Principal */}
        <Card className="p-6 mb-10 bg-white shadow-md border border-[#B89B7A]/20">
          <AnimatedWrapper show={true}>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-playfair text-[#aa6b5d] mb-4">
                Seu Estilo é {category}
              </h2>
              
              <div className="max-w-md mx-auto mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-[#8F7A6A]">Porcentagem de compatibilidade</span>
                  <span className="text-[#aa6b5d] font-medium">{primaryStyle.percentage}%</span>
                </div>
                <Progress 
                  value={primaryStyle.percentage} 
                  className="h-2 bg-[#F3E8E6]"
                  indicatorClassName="bg-[#B89B7A]"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <p className="text-[#432818] leading-relaxed">{description}</p>

                <div className="bg-white rounded-lg p-4 shadow-sm border border-[#B89B7A]/10">
                  <h3 className="text-lg font-medium text-[#432818] mb-2">
                    Seus Estilos Complementares
                  </h3>
                  <SecondaryStylesSection secondaryStyles={secondaryStyles} />
                </div>
              </div>
              <div>
                <img
                  src={image}
                  alt={`Estilo ${category}`}
                  className="w-full h-auto rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
            <div className="mt-8">
              <img
                src={guideImage}
                alt={`Guia de Estilo ${category}`}
                className="w-full h-auto rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
              />
            </div>
          </AnimatedWrapper>
        </Card>

        <MotivationSection />

        {/* Oferta + Bônus */}
        <Card className="p-6 mb-10 bg-white shadow-md border border-[#B89B7A]/20">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-playfair text-[#aa6b5d] mb-3">
              O Guia de Estilo e Imagem + Bônus Exclusivos
            </h2>
            <p className="text-[#432818]">
              Criado para mulheres que querem muito mais do que "saber seu
              estilo".<br />
              Esse guia é pra quem está pronta pra viver seu estilo na prática
              — com consciência, direção e autenticidade.
            </p>
          </div>

          <ProductShowcase />

          <div className="bg-[#fff7f3] p-6 rounded-lg mb-8">
            <h3 className="text-xl font-medium text-[#aa6b5d] mb-4 text-center">
              E ainda recebe 2 bônus poderosos:
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-medium text-[#432818] mb-2">
                  Peças-chave do Guarda-Roupa de Sucesso
                </h4>
                <p className="text-sm text-[#432818]/80 mb-4">
                  Itens essenciais que descomplicam a rotina e valorizam o seu
                  estilo pessoal.
                </p>
                <img
                  src="https://res.cloudinary.com/dqljyf76t/image/upload/v1744911677/C%C3%B3pia_de_MOCKUPS_15_-_Copia_grstwl.webp"
                  alt="Peças-chave do Guarda-Roupa"
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-medium text-[#432818] mb-2">
                  Mini Guia de Visagismo Facial
                </h4>
                <p className="text-sm text-[#432818]/80 mb-4">
                  Para alinhar seu rosto, cabelo e maquiagem com a sua
                  identidade visual.
                </p>
                <img
                  src="https://res.cloudinary.com/dqljyf76t/image/upload/v1744911687/C%C3%B3pia_de_MOCKUPS_12_w8fwrn.webp"
                  alt="Mini Guia de Visagismo Facial"
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </div>
          </div>

          <div className="mb-8">
            <img
              src="https://res.cloudinary.com/dqljyf76t/image/upload/v1744911682/C%C3%B3pia_de_MOCKUPS_13_znzbks.webp"
              alt="Todos os produtos e bônus"
              className="w-full h-auto rounded-lg"
            />
          </div>

          <div className="bg-[#fff7f3] p-6 rounded-lg text-center">
            <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-10 mb-6">
              <div className="text-center md:text-right">
                <p className="text-sm text-[#432818]/60 mb-1">Valor Total</p>
                <p className="text-xl line-through text-[#432818]/60">
                  R$ 175,00
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-[#aa6b5d] mb-1">Oferta especial</p>
                <p className="text-3xl font-bold text-[#aa6b5d]">R$ 39,00</p>
              </div>
            </div>

            <Button
              onClick={() =>
                (window.location.href =
                  'https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912')
              }
              className="w-full max-w-xl mx-auto text-white py-6 text-lg rounded-md bg-brand-gold hover:bg-[#A38A69] transition-colors"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Quero meu Guia + Bônus por R$39,00
            </Button>
            <p className="text-sm text-[#aa6b5d] mt-4">
              ⏳ Oferta válida apenas nesta página
            </p>
          </div>
        </Card>

        <Testimonials />
        <MentorSection />
        <GuaranteeSection />
      </div>
    </div>
  );
};

export default ResultPage;
