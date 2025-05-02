
import React, { useEffect, useState } from 'react';
import { useQuiz } from '@/hooks/useQuiz';
import { useGlobalStyles } from '@/hooks/useGlobalStyles';
import { Header } from '@/components/result/Header';
import { styleConfig } from '@/config/styleConfig';
import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';
import { ShoppingCart, CheckCircle } from 'lucide-react';
import { AnimatedWrapper } from '@/components/ui/animated-wrapper';
import SecondaryStylesSection from '@/components/quiz-result/SecondaryStylesSection';
import ErrorState from '@/components/result/ErrorState';
import MotivationSection from '@/components/result/MotivationSection';
import MentorSection from '@/components/result/MentorSection';
import GuaranteeSection from '@/components/result/GuaranteeSection';
import Testimonials from '@/components/quiz-result/sales/Testimonials';
import { Button } from '@/components/ui/button';
import { useLoadingState } from '@/hooks/useLoadingState';
import { useIsLowPerformanceDevice } from '@/hooks/use-mobile';
import ResultSkeleton from '@/components/result/ResultSkeleton';
import { trackButtonClick } from '@/utils/analytics';

const ResultPage: React.FC = () => {
  const { primaryStyle, secondaryStyles } = useQuiz();
  const { globalStyles } = useGlobalStyles();
  const [imagesLoaded, setImagesLoaded] = useState({ style: false, guide: false });
  const isLowPerformance = useIsLowPerformanceDevice();
  const { isLoading, completeLoading } = useLoadingState({ 
    minDuration: isLowPerformance ? 600 : 1000,
    disableTransitions: isLowPerformance
  });

  useEffect(() => {
    if (!primaryStyle) return;
    window.scrollTo(0, 0);
    const { category } = primaryStyle;
    const { image, guideImage } = styleConfig[category];
    const styleImg = new Image();
    styleImg.src = `${image}?q=100&f=auto`;
    styleImg.onload = () => setImagesLoaded(prev => ({ ...prev, style: true }));
    const guideImg = new Image();
    guideImg.src = `${guideImage}?q=100&f=auto`;
    guideImg.onload = () => setImagesLoaded(prev => ({ ...prev, guide: true }));
    if (globalStyles.logo) {
      const logoImg = new Image();
      logoImg.src = globalStyles.logo;
    }
  }, [primaryStyle, globalStyles.logo]);

  useEffect(() => {
    if (imagesLoaded.style && imagesLoaded.guide) completeLoading();
  }, [imagesLoaded, completeLoading]);

  if (!primaryStyle) return <ErrorState />;
  if (isLoading) return <ResultSkeleton />;

  const { category } = primaryStyle;
  const { image, guideImage, description } = styleConfig[category];

  const handleCTAClick = () => {
    // Track checkout initiation
    trackButtonClick('checkout_button', 'Iniciar Checkout', 'results_page');
    window.location.href = 'https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912';
  };

  return (
    <div className="min-h-screen bg-[#fffaf7]" style={{ backgroundColor: globalStyles.backgroundColor || '#fffaf7', color: globalStyles.textColor || '#432818', fontFamily: globalStyles.fontFamily || 'inherit' }}>
      <Header primaryStyle={primaryStyle} logoHeight={globalStyles.logoHeight} logo={globalStyles.logo} logoAlt={globalStyles.logoAlt} />

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <Card className="p-6 mb-10 bg-white shadow-md border border-[#B89B7A]/20">
          <AnimatedWrapper animation="fade" show={true} duration={600} delay={300}>
            <div className="text-center mb-8">
              <div className="max-w-md mx-auto mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-[#8F7A6A]">Seu Estilo em Destaque</span>
                  <span className="text-[#aa6b5d] font-medium">{primaryStyle.percentage}%</span>
                </div>
                <Progress value={primaryStyle.percentage} className="h-2 bg-[#F3E8E6]" indicatorClassName="bg-[#B89B7A]" />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <AnimatedWrapper animation={isLowPerformance ? 'none' : 'fade'} show={true} duration={400} delay={400}>
                  <p className="text-[#432818] leading-relaxed">{description}</p>
                </AnimatedWrapper>
                <AnimatedWrapper animation={isLowPerformance ? 'none' : 'fade'} show={true} duration={400} delay={600}>
                  <div className="bg-white rounded-lg p-4 shadow-sm border border-[#B89B7A]/10">
                    <h3 className="text-lg font-medium text-[#432818] mb-2">Estilos que Também Influenciam Você</h3>
                    <SecondaryStylesSection secondaryStyles={secondaryStyles} />
                  </div>
                </AnimatedWrapper>
                <Button onClick={handleCTAClick} className="w-full mt-4 text-white py-4 bg-brand-gold hover:bg-[#A38A69] text-md shadow-md">
                  Quero meu Guia + Bônus por R$39,00
                </Button>
              </div>
              <AnimatedWrapper animation={isLowPerformance ? 'none' : 'scale'} show={true} duration={500} delay={500}>
                <div className="max-w-[340px] mx-auto">
                  <img src={`${image}?q=100&f=auto`} alt={`Estilo ${category}`} className="w-full h-auto rounded-lg shadow-md hover:scale-105 transition-transform duration-300" />
                </div>
              </AnimatedWrapper>
            </div>
            <AnimatedWrapper animation={isLowPerformance ? 'none' : 'fade'} show={true} duration={400} delay={800}>
              <div className="mt-8 max-w-[540px] mx-auto">
                <img src={`${guideImage}?q=100&f=auto`} alt={`Guia de Estilo ${category}`} loading="lazy" className="w-full h-auto rounded-lg shadow-md hover:scale-105 transition-transform duration-300" />
              </div>
            </AnimatedWrapper>
          </AnimatedWrapper>
        </Card>

        <AnimatedWrapper animation={isLowPerformance ? 'none' : 'fade'} show={true} duration={400} delay={900}>
          <MotivationSection />
        </AnimatedWrapper>

        <AnimatedWrapper animation={isLowPerformance ? 'none' : 'fade'} show={true} duration={400} delay={950}>
          <div className="text-center my-6">
            <Button onClick={handleCTAClick} className="text-white py-4 px-6 rounded-md bg-brand-gold hover:bg-[#A38A69] text-md shadow-md">
              Aplique seu Estilo com Propósito — Quero o Guia
            </Button>
          </div>
        </AnimatedWrapper>

        <AnimatedWrapper animation={isLowPerformance ? 'none' : 'fade'} show={true} duration={400} delay={1000}>
          <Testimonials />
        </AnimatedWrapper>

        <AnimatedWrapper animation={isLowPerformance ? 'none' : 'fade'} show={true} duration={400} delay={1050}>
          <div className="text-center my-6">
            <Button onClick={handleCTAClick} className="text-white py-4 px-6 rounded-md bg-brand-gold hover:bg-[#A38A69] text-md shadow-md">
              Garantir meu Guia de Estilo + Bônus Exclusivos
            </Button>
          </div>
        </AnimatedWrapper>

        <AnimatedWrapper animation={isLowPerformance ? 'none' : 'fade'} show={true} duration={400} delay={1100}>
          <MentorSection />
          <GuaranteeSection />
        </AnimatedWrapper>

        <AnimatedWrapper animation={isLowPerformance ? 'none' : 'fade'} show={true} duration={400} delay={1200}>
          <div className="text-center mt-10">
            <h2 className="text-2xl md:text-3xl font-playfair text-[#aa6b5d] mb-4">Vista-se de Você — na Prática</h2>
            <p className="text-[#432818] mb-6 max-w-xl mx-auto">
              Agora que você conhece seu estilo, é hora de aplicá-lo com clareza e intenção. O Guia da Gisele Galvão foi criado para mulheres como você — que querem se vestir com autenticidade e transformar sua imagem em ferramenta de poder.
            </p>

            <div className="bg-[#fff7f3] p-6 rounded-lg mb-6">
              <h3 className="text-xl font-medium text-[#aa6b5d] mb-4">O Guia de Estilo e Imagem + Bônus Exclusivos</h3>
              <ul className="space-y-3 text-left max-w-xl mx-auto text-[#432818]">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#aa6b5d] mt-0.5 mr-2 flex-shrink-0" /> Looks com intenção e identidade
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#aa6b5d] mt-0.5 mr-2 flex-shrink-0" /> Cores, modelagens e tecidos a seu favor
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#aa6b5d] mt-0.5 mr-2 flex-shrink-0" /> Imagem alinhada aos seus objetivos
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#aa6b5d] mt-0.5 mr-2 flex-shrink-0" /> Guarda-roupa funcional, sem compras por impulso
                </li>
              </ul>
            </div>

            <Button onClick={handleCTAClick} className="text-white py-5 px-8 rounded-md bg-brand-gold hover:bg-[#A38A69] text-lg shadow-md transition-colors">
              <ShoppingCart className="w-5 h-5 mr-2" /> Quero meu Guia + Bônus por R$39,00
            </Button>

            <p className="text-sm text-[#aa6b5d] mt-3">
              ⏳ Oferta exclusiva nesta página. Se sair, ela desaparece.
            </p>
          </div>
        </AnimatedWrapper>
      </div>
    </div>
  );
};

export default ResultPage;
