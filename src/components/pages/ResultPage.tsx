import React, { useEffect, useState } from 'react';
import { useQuiz } from '@/hooks/useQuiz';
import { useGlobalStyles } from '@/hooks/useGlobalStyles';
import { Header } from '@/components/result/Header';
import { styleConfig } from '@/config/styleConfig';
import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';
import { ShoppingCart } from 'lucide-react';
import { AnimatedWrapper } from '@/components/ui/animated-wrapper';
import SecondaryStylesSection from '@/components/quiz-result/SecondaryStylesSection';
import ErrorState from '@/components/result/ErrorState';
import MotivationSection from '@/components/result/MotivationSection';
import MentorSection from '@/components/result/MentorSection';
import GuaranteeSection from '@/components/result/GuaranteeSection';
import Testimonials from '@/components/quiz-result/sales/Testimonials';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

const ResultPage: React.FC = () => {
  const { primaryStyle, secondaryStyles } = useQuiz();
  const { globalStyles } = useGlobalStyles();
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!primaryStyle) return <ErrorState />;

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
        <Card className="p-6 mb-10 bg-white shadow-md border border-[#B89B7A]/20">
          <AnimatedWrapper show={imgLoaded}>
            <div className="text-center mb-8">
              <div className="max-w-md mx-auto mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-[#8F7A6A]">Seu Estilo em Destaque</span>
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
                <p className="text-[#432818] leading-relaxed">
                  {description}
                </p>
                <div className="bg-white rounded-lg p-4 shadow-sm border border-[#B89B7A]/10">
                  <h3 className="text-lg font-medium text-[#432818] mb-2">
                    Estilos que Também Influenciam Você
                  </h3>
                  <SecondaryStylesSection secondaryStyles={secondaryStyles} />
                </div>
              </div>
              <div>
                <img
                  src={`${image}?q=100&f=auto`}
                  alt={`Estilo ${category}`}
                  loading="lazy"
                  onLoad={() => setImgLoaded(true)}
                  className="w-full h-auto rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
            <div className="mt-8">
              <img
                src={`${guideImage}?q=100&f=auto`}
                alt={`Guia de Estilo ${category}`}
                loading="lazy"
                className="w-full h-auto rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
              />
            </div>
          </AnimatedWrapper>
        </Card>

        <MotivationSection />
        <Testimonials />
        <MentorSection />
        <GuaranteeSection />

        <div className="text-center mt-10">
          <h2 className="text-2xl md:text-3xl font-playfair text-[#aa6b5d] mb-4">
            Oferta Especial: Transforme Seu Estilo com Clareza e Confiança
          </h2>
          <p className="text-[#432818] mb-6 max-w-xl mx-auto">
            O seu resultado é só o começo. Aprofunde-se com o Guia de Estilo e
            Imagem + Bônus que vão elevar sua presença e te ajudar a se vestir com estratégia, todos os dias.
          </p>

          <Button
            onClick={() => window.location.href = 'https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912'}
            className="text-white py-5 px-8 rounded-md bg-brand-gold hover:bg-[#A38A69] text-lg shadow-md transition-colors"
          >
            <ShoppingCart className="w-5 h-5 mr-2" /> Quero meu Guia + Bônus por R$39,00
          </Button>

          <p className="text-sm text-[#aa6b5d] mt-3">
            ⏳ Oferta válida apenas nesta página. Se sair, ela desaparece.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
